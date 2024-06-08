import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class PaginatedQueryDto {
  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;
}
