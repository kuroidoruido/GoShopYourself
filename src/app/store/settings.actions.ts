import { SettingsStateModel } from './settings.state';

export class PatchSettings {
    static readonly type = '[Settings] Patch';
    constructor(public patch: Partial<SettingsStateModel>) {}
}
