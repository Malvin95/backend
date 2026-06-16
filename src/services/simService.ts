import { AppDataSource } from "../data-source.ts";
import { activationStatusType, SimCard } from "../entities/SimCard.ts";

export const simService = {
    generateActivationStatus(): activationStatusType {
        const statusList: {[key: number]: string} = {
            0: "active",
            1: "failed"
        };

        const status: string = statusList[Math.floor(Math.random() * Object.keys(statusList).length)];
        return status as activationStatusType;
    },

    generatePhoneNumberFromICCID(iccid: string, countryCode: string = '+44'): string {
        // Extract last 10 digits (or use a simple transform)
        const suffix = iccid.slice(-10);
        return `${countryCode}${suffix}`;
    },

    async getAllActiveSimLogs() {
        try {
            const simRepo = AppDataSource.getRepository(SimCard);
            const allData = await simRepo.find();
            return allData;
        } catch (e) {
            console.log(e)
        }
    },

    async updateSimByIccid(searchedIccid: string) {
        try {
            const simRepo = AppDataSource.getRepository(SimCard);
            const simToUpdate = await simRepo.findOneBy({ iccid: searchedIccid});
            const generatedActivity = this.generateActivationStatus();
            if (simToUpdate) {
                simToUpdate.status = generatedActivity;
                generatedActivity === 'active' ? simToUpdate.phoneNumber = this.generatePhoneNumberFromICCID(searchedIccid) : '';                 
                await simRepo.save(simToUpdate);
                return simToUpdate;
            }
        } catch (e) {
            console.log(e)
        }
    }
}
