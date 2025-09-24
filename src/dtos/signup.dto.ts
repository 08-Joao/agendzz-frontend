export interface SignUpInputDto {
    email: string;
    password: string;
    name: string;
    phoneNumber: string;
    birthDate: Date;
    globalRole?: string
}