import express from "express";
import { simService } from "../services/simService.js";
const router = express.Router();
router.get("/", async (req, res, next) => {
    try {
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.min(100, parseInt(req.query.limit) || 100);
        const allData = await simService.getAllActiveSimLogs(limit, page);
        const response = {
            success: true,
            data: allData,
            timestamp: new Date().toISOString(),
        };
        res.status(200).json(response);
    }
    catch (error) {
        next(error);
    }
});
router.post("/activate", async (req, res, next) => {
    try {
        const { iccid } = req.body;
        const updatedSim = await simService.updateSimByIccid(iccid);
        const response = {
            success: true,
            data: updatedSim,
            timestamp: new Date().toISOString(),
        };
        res.status(200).json(response);
    }
    catch (error) {
        next(error);
    }
});
export default router;
//# sourceMappingURL=sims.js.map