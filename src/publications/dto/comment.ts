import { ApiProperty } from "@nestjs/swagger";

export class CommentDto {
	@ApiProperty()
	comment: string;

	@ApiProperty()
	publication_id: string;
}

export class EditCommentDto {
	@ApiProperty()
	comment: string;
}