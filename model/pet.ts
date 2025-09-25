import mongoose from "mongoose";

const Schema = mongoose.Schema;

const petSchema = new Schema({
  id: { type: Schema.Types.ObjectId, require: true },
  name: { type: String },
  age: { type: Number },
  type: { type: String, enum: ["Dog", "Cat"] },
  weight: { type: Number },
  length: { type: Number },
  breed: { type: String },
  color: { type: String },
  vaccinated: { type: Boolean },
  dewormed: { type: Boolean },
  sterilized: { type: Boolean },
  dateAdd: { type: String },
});

const petModel = mongoose.model("pet", petSchema);
export default petModel;
