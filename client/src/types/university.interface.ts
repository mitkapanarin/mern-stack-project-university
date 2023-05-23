import { Faculty } from "./faculty.interface";

export interface IUniversity {
  _id: string
  name: string;
  address: string;
  faculties: Faculty[];
}

export interface CreateUniversityRequest {
  name: string;
  address: string;
  faculties: Faculty[];
}

export interface DeleteUniversityRequest {
  universityID: number;
}

export interface UpdateUniversityRequest {
  name: string;
  address: string;
  universityID: number;
  faculties: Faculty[];
}