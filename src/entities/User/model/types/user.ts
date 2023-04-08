export interface User {
    id: string;
    username: string;
}

export interface UserSchema {
    _inited: boolean;
    authData?: User;
}
