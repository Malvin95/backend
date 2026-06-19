import { AppDataSource } from "../data-source.js";
import { SimCard } from "../entities/SimCard.js";
export const simService = {
    generateActivationStatus() {
        const statusList = {
            0: "active",
            1: "failed"
        };
        const status = statusList[Math.floor(Math.random() * Object.keys(statusList).length)];
        return status;
    },
    generatePhoneNumberFromICCID(iccid, countryCode = '+44') {
        // Extract last 10 digits (or use a simple transform)
        const suffix = iccid.slice(-10);
        return `${countryCode}${suffix}`;
    },
    async getAllActiveSimLogs(limit = 100, page = 1) {
        try {
            const simRepo = AppDataSource.getRepository(SimCard);
            const offset = (page - 1) * limit;
            const [items, total] = await simRepo.findAndCount({
                skip: offset,
                take: limit,
            });
            return { items, total, page, limit };
        }
        catch (error) {
            console.log("getAllActiveSimLogs failed", error);
            throw new Error(`Failed to fetch SIMs: ${error.message}`);
        }
    },
    async updateSimByIccid(searchedIccid) {
        try {
            const simRepo = AppDataSource.getRepository(SimCard);
            const simToUpdate = await simRepo.findOneBy({ iccid: searchedIccid });
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
        }
        catch (error) {
            console.log(`updateSimByIccid failed for ${searchedIccid}`, error);
            throw error;
        }
    }
};
//# sourceMappingURL=simService.js.map