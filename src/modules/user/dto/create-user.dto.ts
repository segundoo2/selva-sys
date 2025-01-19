export class CreateUserDto {
  levelAccess: 'admin' | 'diretor' | 'secretario' | 'tesoureiro' | 'instrutor';
  name: string;
  email: string;
  password: string;
}
