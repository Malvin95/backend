import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export type activationStatusType = "pending" | "active" | "failed";

@Entity()
export class SimCard {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ 
        type: "varchar", 
    })
    iccid: string;

    @Column({
        type: "varchar",
        nullable: true
    })
    phoneNumber: string;

    @Column({
        type: "set",
        enum: ["pending","active","failed"],
        default: ["pending"],
    })
    status: activationStatusType;
}
