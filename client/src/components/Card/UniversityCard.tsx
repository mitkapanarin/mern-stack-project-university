// UniversityCard.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteUniversityMutation, useUpdateUniversityMutation } from "../../store/API/UniversityApi";
import { IUniversity } from "../../types/university.interface";
import { ArrowRightIcon, TrashIcon } from "@heroicons/react/24/outline";
import DeleteModal from "../Modal/DeleteModal";

const UniversityCard = ({
  _id,
  name,
  email,
  totalStudents,
  image,
  faculties,
}: IUniversity) => {
  const [newUser, setNewUser] = useState<IUniversity>({
    _id,
    name,
    email,
    totalStudents,
    image,
    faculties,
  });

  const [updateUniversity] = useUpdateUniversityMutation();
  const [deleteUniversity] = useDeleteUniversityMutation();

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setNewUser((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   try {
  //     await updateUniversity({ body: newUser });
  //     console.log("University updated successfully");
  //   } catch (error) {
  //     console.error("Failed to update university", error);
  //   }
  // };

  const handleDelete = async () => {
    try{
      await deleteUniversity({ _id });
      console.log("University deleted successfully");
    }
    catch(err){
      console.log("unable to delete university")
    }
  }

  const navigate = useNavigate();

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img className="rounded-t-lg" src={image} alt={name} />
      <div className="p-5 items-center justify-between space-x-2">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {email}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {totalStudents}
        </p>
      </div>
      <div className="p-5 flex items-center justify-between">
        <div className="flex space-x-2">
          <button
            onClick={() => navigate(`/api/university/${_id}`)}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            See details
            <ArrowRightIcon
              strokeWidth={3}
              className="w-4 h-4 ml-2 -mr-1"
              aria-hidden="true"
            />
          </button>
          <DeleteModal onClick={handleDelete} button={<TrashIcon className="w-6 h-6"/>} />
        </div>
      </div>
    </div>
  );
};

export default UniversityCard;
