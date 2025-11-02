import mongoose from "mongoose";

const Schema = mongoose.Schema;

const breedSchema = new Schema({
  name: { type: String },
  type: { type: String, enum: ["Dog", "Cat"] },
});

const breedModel = mongoose.model("breed", breedSchema);
export default breedModel;
