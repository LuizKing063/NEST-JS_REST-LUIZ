import { IsEmail, IsNotEmpty, Matches, MinLength } from "class-validator";

export class CreateUsersDto {
    @IsNotEmpty({
        message: 'Informe o email do usuário.',
    })
    @IsEmail()
    email: string;  

    @IsNotEmpty({
        message: 'A senha é obrigatória'
    })
    @MinLength(8, {
        message: 'A senha deve ter no mínimo 8 caracteres.'
    })
    @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%])/, {
        message: 'A senha deve conter no mínimo uma letra maiúscula, um número e um caracter special(@#$%)'
    })
    password: string;     
    
    @IsNotEmpty({
        message: 'Informe número do  funcionário.'
    })
    fk_users_funcionarios: number;
}
