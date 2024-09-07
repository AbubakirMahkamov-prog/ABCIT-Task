import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, Length, MaxLength } from 'class-validator';

export class PublicationDto {
  @ApiProperty({
    description: 'Title of the publication',
    minLength: 5,
    maxLength: 1000
  })
  @IsString()
  @Length(5, 1000)
  title: string;

  @ApiProperty({
    description: 'Content of the publication',
    maxLength: 10000,
    required: false
  })
  @IsOptional()
  @IsString()
  @MaxLength(10000)
  content?: string;
}

export class PublicationPagenatedDto {
  @ApiProperty({
    description: 'Page number for pagination',
    required: false
  })
  @IsOptional()
  page?: number;

  @ApiProperty({
    description: 'Limit of items per page',
    required: false
  })
  @IsOptional()
  limit?: number;
}
