export interface AuthenticationModel {
    username: string;
    password: string;
    token?: string;
    loading?: boolean;
    error?: string;
}