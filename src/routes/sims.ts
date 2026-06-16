import express from "express";
import { simService } from "../services/simService.ts";

const router = express.Router();

router.get("/", async (req, res) => {
    console.log('GET - /api/sims');
    const allData = await simService.getAllActiveSimLogs();
    res.json(allData);
});

router.post("/activate", async (req, res) => {
    console.log('POST - /api/sims/activate');
    const { iccid } = req.body;
    const updatedSim = await simService.updateSimByIccid(iccid);
    res.json(updatedSim);
})

export default router;