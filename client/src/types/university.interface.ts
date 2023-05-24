import { Faculty } from "./faculty.interface";

export interface IUniversity {
  _id: string
  name: string;
  address: string;
  faculties: Faculty[];
  body: string
}

export interface CreateUniversityRequest {
  name: string;
  address: string;
  faculties: Faculty[];
}

export interface DeleteUniversityRequest {
  _id: string;
}

export interface UpdateUniversityRequest {
  name: string;
  address: string;
  _id: string;
  faculties: Faculty[];
}