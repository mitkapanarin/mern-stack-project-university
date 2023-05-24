import { useParams } from "react-router-dom";
import { useGetUniversityQuery } from "../store/index";
import { nanoid } from "@reduxjs/toolkit";
import { iFaculty } from "../types/faculty.interface";
import FacultyCard from "../components/FacultyCard";
import {useGetAllFacultiesQuery} from "../store/API/FacultyApi"

const UniversityDetails = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>Invalid university ID</div>;
  }

  const { data: university, isLoading, isError } = useGetUniversityQuery(id);
  console.log(university);

  const getAllFaculties  = useGetAllFacultiesQuery(id);
  console.log(university);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching university data.</div>;
  }

  return (
    <div>
      <h2>{university?.name}</h2>
      <p>{university?.address}</p>
      <ol>
        {university?.faculties?.map((item) => (
          <li key={nanoid()}>
              <FacultyCard key={item?._id} {...item} />
          </li>
        ))}
      </ol>
    </div>
  );
};

export default UniversityDetails;
