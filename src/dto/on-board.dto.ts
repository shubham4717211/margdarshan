import { IsString, IsEmail, IsNotEmpty, IsDateString, IsNumber } from 'class-validator';
import { Gender } from 'src/emun/gender.enum';

export class OnBoardDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  // @IsNotEmpty()
  // @IsDateString()
  // dateOfBirth: string;

  @IsNotEmpty()
  @IsNumber()
  pin: number;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  // @IsNotEmpty()
  // @IsString()
  // education : string;

  @IsNotEmpty()
  @IsString()
  level_of_study : string;

  @IsNotEmpty()
  @IsString()
  field_of_study : string;
}
