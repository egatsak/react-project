import { Profile } from "@/entities/Profile";
import { ValidateProfileError } from "../consts/consts";

export interface ProfileSchema {
    data?: Profile;
    form?: Profile;
    isLoading: boolean;
    readonly: boolean;
    error?: string;
    validateErrors?: ValidateProfileError[];
}
