import { IsString, IsDateString, IsNumber, IsOptional } from 'class-validator';

export class OnBoardDto {
  @IsOptional()
  @IsString()
  fullName: string;

  @IsOptional()
  @IsDateString()
  dateOfBirth: string;

  @IsOptional()
  @IsNumber()
  pin: number;

  @IsOptional()
  @IsString()
  state: string;

  @IsOptional()
  @IsString()
  city: string;

  // @IsNotEmpty()
  // @IsString()
  // education : string;

  @IsOptional()
  @IsString()
  level_of_study: string;

  @IsOptional()
  @IsString()
  field_of_study: string;

  @IsOptional()
  @IsString()
  degree: string;

  @IsOptional()
  @IsString()
  category: string;

  @IsOptional()
  @IsNumber()
  father_yearly_income: number;

  @IsOptional()
  @IsNumber()
  tenth_percentage: number;

  @IsOptional()
  @IsNumber()
  twelve_percentage: number;
}
