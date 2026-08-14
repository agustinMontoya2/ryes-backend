import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("branches")
export class BranchEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "location", type: "varchar" })
  location: string;
}
