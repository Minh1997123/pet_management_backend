import express from "express";
import breedController from "../Controller/breed";

const router = express.Router();

// get => breed
router.get("/breed", breedController.getBreed);
// post => breed
router.post("/breed", breedController.postBreed);
// delete => breed
router.delete("/breed", breedController.deleteBreed);

export default router;
