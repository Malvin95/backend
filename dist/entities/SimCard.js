var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
let SimCard = class SimCard {
    id;
    iccid;
    phoneNumber;
    status;
    createdAt;
    updatedAt;
};
__decorate([
    PrimaryGeneratedColumn("increment"),
    __metadata("design:type", String)
], SimCard.prototype, "id", void 0);
__decorate([
    Column("varchar", { length: 19, unique: true }),
    __metadata("design:type", String)
], SimCard.prototype, "iccid", void 0);
__decorate([
    Column("varchar", { length: 15, nullable: true }),
    __metadata("design:type", String)
], SimCard.prototype, "phoneNumber", void 0);
__decorate([
    Column({
        type: "set",
        enum: ["pending", "active", "failed"],
        default: "pending",
    }),
    __metadata("design:type", String)
], SimCard.prototype, "status", void 0);
__decorate([
    Column("timestamp", { default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], SimCard.prototype, "createdAt", void 0);
__decorate([
    Column("timestamp", {
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], SimCard.prototype, "updatedAt", void 0);
SimCard = __decorate([
    Entity("sim_card")
], SimCard);
export { SimCard };
//# sourceMappingURL=SimCard.js.map