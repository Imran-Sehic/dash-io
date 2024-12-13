import { useQuery } from "@tanstack/react-query";
import { fetchTableData } from ".";

export const useFetchTableData = () => {
  const res = useQuery({
    queryKey: ["table_data"],
    queryFn: () => fetchTableData(),
  });

  return res;
};
