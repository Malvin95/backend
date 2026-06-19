import { activationStatusType, SimCard } from "../entities/SimCard.ts";
export declare const simService: {
    generateActivationStatus(): activationStatusType;
    generatePhoneNumberFromICCID(iccid: string, countryCode?: string): string;
    getAllActiveSimLogs(limit?: number, page?: number): Promise<{
        items: SimCard[];
        total: number;
        page: number;
        limit: number;
    }>;
    updateSimByIccid(searchedIccid: string): Promise<SimCard>;
};
//# sourceMappingURL=simService.d.ts.map