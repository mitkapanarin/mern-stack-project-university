import { useSelector } from "react-redux";
import { RootState, useGetAllUniversitiesQuery } from "../store/store";
import { IUniversity } from "../types/university.interface";
import UniversityCard from "../components/Card/UniversityCard";
import AddCard from "../components/Card/AddCard";

const Universities = () => {
  const state = useSelector((x: RootState) => x);

  const { data } = useGetAllUniversitiesQuery(undefined);
  console.log(data);
  
  return (
    <div className="grid grid-cols-4 gap-4">
      <AddCard />
      {data?.map((item: IUniversity) => (
        <UniversityCard key={item?._id} {...item} />
      ))}
    </div>
  );
};

export default Universities;