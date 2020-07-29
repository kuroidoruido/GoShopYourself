import { Injectable } from '@angular/core';
import { Selector, State, Action, StateContext, Store } from '@ngxs/store';
import { tap, mergeMap, filter, map, flatMap } from 'rxjs/operators';

import { LoginResponse, OneStoreInstanceInfo } from '../one-store';
import { SetUserState, TryLogIn, UserConnected, Disconnect } from './user.actions';
import { OneStoreManagerService } from '../one-store-manager.service';
import { Navigate } from '@ngxs/router-plugin';
import { SettingsState } from './settings.state';

export type ConnectionStatus = 'OFFLINE' | 'SHOULD_LOG_IN' | 'CONNECTED';

export interface UserStateModelOffline {
    connectionStatus: 'OFFLINE';
}
export interface UserStateModelShouldLogin {
    connectionStatus: 'SHOULD_LOG_IN';
}
export interface UserStateModelConnected {
    connectionStatus: 'CONNECTED';
    tokenInfo: LoginResponse;
}

export type UserStateModel = UserStateModelOffline | UserStateModelShouldLogin | UserStateModelConnected;

const SHOULD_LOG_IN_STATE: UserStateModel = {
    connectionStatus: 'SHOULD_LOG_IN',
};

@State<UserStateModel>({
    name: 'user',
    defaults: SHOULD_LOG_IN_STATE,
})
@Injectable()
export class UserState {
    @Selector()
    static isOffline(state: UserStateModel) {
        return state.connectionStatus === 'OFFLINE';
    }
    @Selector()
    static isConnected(state: UserStateModel) {
        return state.connectionStatus === 'CONNECTED';
    }
    @Selector()
    static shouldLogIn(state: UserStateModel) {
        return state.connectionStatus === 'SHOULD_LOG_IN';
    }

    constructor(private onestoreManager: OneStoreManagerService, private store: Store) {}

    @Action(SetUserState)
    setState(ctx: StateContext<UserStateModel>, action: SetUserState) {
        ctx.setState(action.state);
    }

    @Action(TryLogIn)
    tryLogin(ctx: StateContext<UserStateModel>, action: TryLogIn) {
        return this.onestoreManager.login(action.password).pipe(
            filter((tokenInfo) => tokenInfo.access_token !== undefined),
            tap((tokenInfo) => {
                ctx.setState({ connectionStatus: 'CONNECTED', tokenInfo });
            }),
            mergeMap(() => ctx.dispatch([new UserConnected(), new Navigate(['/'])]))
        );
    }

    @Action(UserConnected)
    ensureMetadataConfigOnUserConnection(ctx: StateContext<UserStateModel>) {
        const userState = ctx.getState();
        if (userState.connectionStatus === 'CONNECTED') {
            return this.store.selectOnce(SettingsState).pipe(
                map(
                    (settingsState): OneStoreInstanceInfo => ({
                        onestoreUrl: settingsState.onestoreUrl,
                        username: settingsState.onestoreShoppingListOwner,
                        token: userState.tokenInfo.access_token,
                    })
                ),
                flatMap((instance) => this.onestoreManager.ensureAccountConfigured(instance))
            );
        }
    }

    @Action(Disconnect)
    disconnect(ctx: StateContext<UserStateModel>) {
        if (ctx.getState().connectionStatus === 'CONNECTED') {
            ctx.setState(SHOULD_LOG_IN_STATE);
        }
        ctx.dispatch(new Navigate(['/login']));
    }
}
