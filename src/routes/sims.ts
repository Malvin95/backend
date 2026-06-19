import express from "express";
import { simService } from "../services/simService.ts";

const router = express.Router();

interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    timestamp: string;
}

router.get("/", async (req, res, next) => {
    try {
        const page = Math.max(1, parseInt(req.query.page as string) || 1);
        const limit = Math.min(100, parseInt(req.query.limit as string) || 100);
        const allData = await simService.getAllActiveSimLogs(limit, page);
        
        const response: ApiResponse<typeof allData> = {
            success: true,
            data: allData,
            timestamp: new Date().toISOString(),
        }

        res.status(200).json(response);
    } catch (error) {
        next(error);
    }

});

router.post("/activate", async (req, res, next) => {
    try {
        const { iccid } = req.body;
        const updatedSim = await simService.updateSimByIccid(iccid);
        
        const response: ApiResponse<typeof updatedSim> = {
            success: true,
            data: updatedSim,
            timestamp: new Date().toISOString(),
        };
        res.status(200).json(response);
    } catch(error) {
        next(error);
    }
})

export default router;