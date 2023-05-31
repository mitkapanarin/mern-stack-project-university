import { PlusIcon } from "@heroicons/react/24/outline";

const AddCard = () => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col items-center">
      <h5 className="mt-4">Add University</h5>
      <PlusIcon className="h-20 w-20 text-gray-400" />
    </div>
  );
};

export default AddCard;
