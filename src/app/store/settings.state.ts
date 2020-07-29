import { Injectable } from '@angular/core';
import { Selector, State, Action, StateContext } from '@ngxs/store';

import { PatchSettings } from './settings.actions';

export interface SettingsStateModel {
    onestoreUrl: string | undefined;
    onestoreUsername: string | undefined;
    onestoreShoppingListOwner: string | undefined;
}

@State<SettingsStateModel>({
    name: 'settings',
    defaults: {
        onestoreUrl: undefined,
        onestoreUsername: undefined,
        onestoreShoppingListOwner: undefined,
    },
})
@Injectable()
export class SettingsState {
    @Selector()
    static onestoreUrl(state: SettingsStateModel) {
        return state.onestoreUrl;
    }

    @Action(PatchSettings)
    patchSettings(ctx: StateContext<SettingsStateModel>, action: PatchSettings) {
        ctx.patchState(action.patch);
    }
}
