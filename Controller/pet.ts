import { Request, Response } from "express";
import { typePet } from "../types/pet_type";
import petModel from "../model/pet";
import { getIOHandler } from "../socket-io";

// ham add pet
const postPet = async function (req: Request, res: Response) {
  try {
    const pet: typePet = req.body;
    const newPet = new petModel({
      ...pet,
    });
    const petCurrent = await newPet.save();
    // nghe du lieu thay doi va gui ve cho nguoi dung qua socket io
    await getIOHandler(petCurrent, petModel);
    return res.status(200).json(petCurrent);
  } catch (err) {}
};
// ham get list pet
const getPet = async function (req: Request, res: Response) {
  const listPet = await petModel.find();
  res.status(200).json(listPet);
};

// ham xoa pet
const deletePet = async function (req: Request, res: Response) {
  const id: string = req.params.petId;
  const petCurrent = await petModel.findByIdAndDelete(id);
  // nghe du lieu thay doi va gui ve cho nguoi dung qua socket io
  await getIOHandler(petCurrent, petModel);
  res.status(200).json(petCurrent);
};
const petController = {
  postPet,
  getPet,
  deletePet,
};
export default petController;
