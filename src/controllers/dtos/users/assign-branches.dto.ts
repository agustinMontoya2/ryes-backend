import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsUUID } from "class-validator";

export class AssignBranchesDto {
  @ApiProperty({
    description: "Array of branch IDs to assign",
    example: ["550e8400-e29b-41d4-a716-446655440000"],
  })
  @IsArray()
  @IsUUID("4", { each: true })
  branchIds: string[];
}
