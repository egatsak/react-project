import { FeatureFlags } from "@/shared/types/featureFlags";
import { UserRole } from "../consts/userConsts";

export interface User {
    id: string;
    username: string;
    avatar?: string;
    roles?: UserRole[];
    features?: FeatureFlags;
}

export interface UserSchema {
    _inited: boolean;
    authData?: User;
}
