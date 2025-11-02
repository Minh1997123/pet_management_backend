import express from "express";
import petController from "../Controller/pet";
const router = express.Router();

// post => pet
router.post("/pet", petController.postPet);
// get => pet
router.get("/pet", petController.getPet);
// delete => pet
router.delete("/pet/:petId", petController.deletePet);
//patch => pet
router.patch("/pet", petController.patchPet);
//get => pet
router.get("/pet/search", petController.getSearchPet);
export default router;
