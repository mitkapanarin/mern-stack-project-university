export interface iFaculty {
  _id: string;
  name: string;
  address: string;
  universityOwner: string;
}

export interface GetAllFacultiesResponse {
  message: string;
  Faculty: iFaculty[];
}

export interface CreateFacultyRequest {
  name: string;
  address: number;
  _id: number;
  body: string | number;
}

export interface DeleteFacultyRequest {
  _id: number;
  facultyID: number;
}

export interface EditFacultyRequest {
  _id: number;
  facultyID: number;
  updatedData: Partial<iFaculty>;
}
