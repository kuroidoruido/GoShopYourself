import { UserStateModel } from './user.state';

export class SetUserState {
    static readonly type = '[User] set state';
    constructor(public state: UserStateModel) {}
}

export class TryLogIn {
    static readonly type = '[User] try login';
    constructor(public password: string) {}
}

export class UserConnected {
    static readonly type = '[User] connected';
}

export class Disconnect {
    static readonly type = '[User] disconnect';
}
