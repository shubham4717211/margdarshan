import { IsString, IsEmail, IsNotEmpty, IsDateString, IsNumber } from 'class-validator';
import { Gender } from 'src/emun/gender.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  // @IsNotEmpty()
  // @IsString()
  // lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  gender: Gender;

  // @IsNotEmpty()
  // @IsDateString()
  // dateOfBirth: string;


  @IsNumber()
  pin: number;


  @IsString()
  state: string;


  @IsString()
  city: string;

  // @IsNotEmpty()
  // @IsString()
  // education : string;

  // @IsNotEmpty()
  // @IsString()
  // level_of_study : string;

  // @IsNotEmpty()
  // @IsString()
  // field_of_study : string;
}
