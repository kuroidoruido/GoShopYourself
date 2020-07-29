export interface LoginResponse {
    username: string;
    roles: string[];
    access_token: string;
    token_type: 'Bearer';
    expires_in: number;
}

export type UserRight = 'CREATE' | 'READ' | 'UPDATE' | 'DELETE';
export type UserRights = UserRight[];

export interface OneStoreMetadata {
    dataContext: string;
    owner: string;
    connectedUserRights: UserRights;
    anonymousUserRights: UserRights;
}
