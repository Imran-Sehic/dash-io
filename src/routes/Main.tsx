import { useEffect } from "react";
import { toast } from "react-toastify";
import { useFetchTableColumns } from "../api/main-table/queries/useFetchTableColumns";
import { useFetchTableData } from "../api/main-table/queries/useFetchTableData";
import MainLayout from "../layouts/MainLayout";
import Spinner from "../util-components/Spinner";

const Main: React.FC = () => {
  const {
    data: tableColumns,
    isLoading: loadingColumns,
    error: columnsError,
  } = useFetchTableColumns();

  const {
    data: tableData,
    isLoading: loadingData,
    error: dataError,
  } = useFetchTableData();

  useEffect(() => {
    if (columnsError || dataError) toast.error("Error loading table data!");
  }, [columnsError, dataError]);

  return (
    <MainLayout>
      <div className="p-10">
        <p>Main Page</p>
        <Spinner />
      </div>
    </MainLayout>
  );
};

export default Main;
