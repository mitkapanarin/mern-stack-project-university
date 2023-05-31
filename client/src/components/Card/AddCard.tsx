import React from "react";
import {PlusIcon} from "@heroicons/react/24/outline"

const AddCard = () => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex justify-center items-center">
      <PlusIcon className="h-20 w-20 text-gray-400" />
      AddCard
    </div>
  );
};

export default AddCard;
