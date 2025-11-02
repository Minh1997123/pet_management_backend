import { Response, Request } from "express";
import breedModel from "../model/breed";
import { typeBreed } from "../types/breed_type";
// ham lay breed
const getBreed = async function (req: Request, res: Response) {
  try {
    const breeds = await breedModel.find();
    res.status(200).json(breeds);
  } catch (err) {
    console.log(err);
  }
};

// ham them breed
const postBreed = async function (req: Request, res: Response) {
  try {
    const breedInfo: typeBreed = req.body;
    const newBreed = new breedModel({
      type: breedInfo.type,
      name: breedInfo.name,
    });
    const breedCurrent = await newBreed.save();
    return res.status(200).json(breedCurrent);
  } catch (err) {
    console.log(err);
  }
};

// ham xoa breed
const deleteBreed = async function (req: Request, res: Response) {
  try {
    const _id: String = req.params.breedId;
    const breedCurrent = await breedModel.findByIdAndDelete(_id);
    res.status(200).json(breedCurrent);
  } catch (err) {
    console.log(err);
  }
};

const breedController = {
  getBreed,
  postBreed,
  deleteBreed,
};
export default breedController;
