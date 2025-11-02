export type typePet = {
  name: string;
  age: number;
  type: string;
  weight: number;
  length: number;
  breed: string;
  color: string;
  vaccinated: boolean;
  dewormed: boolean;
  sterilized: boolean;
  dateAdd: string;
  id?: string;
  _id?: string;
};

export type typeSearchPet = {
  name: string;
  type: string;
  breed: string;
  vaccinated: boolean;
  dewormed: boolean;
  sterilized: boolean;
};
