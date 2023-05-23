import { RootState, useGetAllUniversitiesQuery } from "../store";
import { useSelector } from "react-redux";
import { IUniversity } from "../types/university.interface";

const Universities = () => {
  const state = useSelector((x: RootState) => x);
  console.log(state);

  const { data } = useGetAllUniversitiesQuery(undefined);
  console.log(data);
  return (
    <div>
      {data?.map((item: IUniversity) => (
        <div key={item?._id}>{item?.name}</div>
      ))}
    </div>
  );
};

export default Universities;
