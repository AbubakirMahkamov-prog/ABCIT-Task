import { ApiProperty } from "@nestjs/swagger";

export class PublicationDto {
	@ApiProperty()
	title: string;

	@ApiProperty()
	content?: string;
}