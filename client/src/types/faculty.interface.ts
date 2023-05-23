export interface Faculty {
  _id: string;
  name: string;
  address: string;
  universityOwner: string;
}

export interface GetAllFacultiesResponse {
  message: string;
  Faculty: Faculty[];
}

export interface CreateFacultyRequest {
  name: string;
  address: number;
  universityID: number;
  body: string | number;
}

export interface DeleteFacultyRequest {
  universityID: number;
  facultyID: number;
}

export interface EditFacultyRequest {
  universityID: number;
  facultyID: number;
  updatedData: Partial<Faculty>;
}
