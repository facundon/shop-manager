import {
   BaseEntity,
   Column,
   Entity,
   OneToMany,
   PrimaryGeneratedColumn,
} from "typeorm"
import { Raise } from "./Raise"

@Entity("raw_materials")
export class RawMaterial extends BaseEntity {
   @PrimaryGeneratedColumn()
   id!: number

   @Column()
   name!: string

   @Column()
   price!: number

   @OneToMany(() => Raise, raise => raise.item)
   raises!: Raise[]
}
