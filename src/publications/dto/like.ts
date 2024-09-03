import { ApiProperty } from "@nestjs/swagger";

export class LikeDto {
	@ApiProperty()
	publication_id: string;
}