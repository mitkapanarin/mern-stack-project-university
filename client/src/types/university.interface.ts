import { iFaculty } from "./faculty.interface";

export interface IUniversity {
  _id: string
  name: string;
  address: string;
  faculties: iFaculty[];
  body: string
}

export interface CreateUniversityRequest {
  name: string;
  address: string;
  faculties: iFaculty[];
}

export interface DeleteUniversityRequest {
  _id: string;
}

export interface UpdateUniversityRequest {
  name: string;
  address: string;
  _id: string;
  faculties: iFaculty[];
}