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

    async getAllActiveSimLogs(limit: number = 100, page: number = 1) {
        try {
            const simRepo = AppDataSource.getRepository(SimCard);

            const offset = (page - 1) * limit;
            const [items, total] = await simRepo.findAndCount({
                skip: offset,
                take: limit,
            });
            return { items, total, page, limit };
        } catch (error: any) {
            console.log("getAllActiveSimLogs failed", error);
            throw new Error(`Failed to fetch SIMs: ${error.message}`);
        }
    },

    async updateSimByIccid(searchedIccid: string) {
        try {
            const simRepo = AppDataSource.getRepository(SimCard);
            const simToUpdate = await simRepo.findOneBy({ iccid: searchedIccid});

            if (!simToUpdate) {
                throw new Error(`SIM with ICCID ${searchedIccid} not found`);
            }

            const generatedActivity = this.generateActivationStatus();
            simToUpdate.status = generatedActivity;

            if (generatedActivity === "active") {
                simToUpdate.phoneNumber = this.generatePhoneNumberFromICCID(searchedIccid);                 
            }
            const updated = await simRepo.save(simToUpdate);
            return updated;
        } catch (error: any) {
            console.log(`updateSimByIccid failed for ${searchedIccid}`, error);
            throw error;
        }
    }
}
