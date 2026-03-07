import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsOptional()
  userId?: number; // If you want to assign a task to a user
}
