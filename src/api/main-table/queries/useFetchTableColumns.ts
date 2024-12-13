import { useQuery } from "@tanstack/react-query";
import { fetchTableColumns } from ".";

export const useFetchTableColumns = () => {
  const res = useQuery({
    queryKey: ["table_columns"],
    queryFn: () => fetchTableColumns(),
  });

  return res;
};
