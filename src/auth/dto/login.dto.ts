import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto{
    @IsNotEmpty({
        message: 'Informe o email.'
    })
    @IsEmail()
    email: string;

    @IsNotEmpty({
        message: 'Informe a senha.'
    })
    password: string;
    
}