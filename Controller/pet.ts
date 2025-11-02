import { Request, Response } from "express";
import { typePet, typeSearchPet } from "../types/pet_type";
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

// ham chinh sua thong tin pet
const patchPet = async function (req: Request, res: Response) {
  try {
    const petInfo: typePet = req.body;
    const newPet: typePet = {
      name: petInfo.name,
      age: petInfo.age,
      type: petInfo.type,
      weight: petInfo.weight,
      length: petInfo.length,
      breed: petInfo.breed,
      color: petInfo.color,
      vaccinated: petInfo.vaccinated,
      dewormed: petInfo.dewormed,
      sterilized: petInfo.sterilized,
      dateAdd: petInfo.dateAdd,
    };
    const petCurrent = await petModel.findByIdAndUpdate(petInfo.id, newPet);
    res.status(200).json(petCurrent);
  } catch (err) {
    console.log(err);
  }
};
// ham tim kiem pet
const getSearchPet = async function (req: Request, res: Response) {
  try {
    const searchPet = req.query;
    const filterInfo = {
      type: { $regex: searchPet.type },
      name: { $regex: searchPet.name },
      breed: { $regex: searchPet.breed },
    };
    const filterVaccinated = {
      vaccinated: searchPet.vaccinated,
    };
    const filterDewormed = {
      dewormed: searchPet.dewormed,
    };
    const filterSterilized = {
      sterilized: searchPet.sterilized,
    };
    const filter = {
      $and: [
        filterInfo,
        searchPet.vaccinated === "true" ? filterVaccinated : {},
        searchPet.dewormed === "true" ? filterDewormed : {},
        searchPet.sterilized === "true" ? filterSterilized : {},
      ],
    };
    console.log(filter);
    const listPet = await petModel.find(filter);
    console.log(listPet);
    res.status(200).json(listPet);
  } catch (err) {
    console.log(err);
  }
};
const petController = {
  postPet,
  getPet,
  deletePet,
  patchPet,
  getSearchPet,
};
export default petController;
