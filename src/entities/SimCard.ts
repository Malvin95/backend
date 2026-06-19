import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export type activationStatusType = "pending" | "active" | "failed";

@Entity("sim_card")
export class SimCard {
    @PrimaryGeneratedColumn("increment")
    id!: string;

    @Column("varchar",
        { length: 19, unique: true }
    )
    iccid!: string;

    @Column("varchar", { length: 15, nullable: true})
    phoneNumber!: string;

    @Column({
        type: "set",
        enum: ["pending","active","failed"],
        default: "pending",
    })
    status!: activationStatusType;

    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Column("timestamp", {
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
    })
    updatedAt!: Date;
}
