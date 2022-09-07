export interface userRegisterDto {
    name: string;
    email: string;
    password: string;
    activationToken: string | undefined;
}

export interface userLoginDto {
    email: string;
    password: string;
}

export interface userActivateDto {

}

export interface userVerifPasswordRestDto {

}
