import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useFetchTableColumns } from "../api/main-table/queries/useFetchTableColumns";
import { useFetchTableData } from "../api/main-table/queries/useFetchTableData";
import Sidebar from "../components/Sidebar";
import Table from "../components/Table";
import MainLayout from "../layouts/MainLayout";
import Search from "../util-components/Search";
import Spinner from "../util-components/Spinner";
import useTailwindBreakpoint from "../utils/useTailwindBreakpoint";

const Main: React.FC = () => {
  const screenSize = useTailwindBreakpoint();
  const isMobile = screenSize == "xs";

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(!isMobile);
  const [search, setSearch] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [shownColumns, setShownColumns] = useState<string[]>([]);
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);
  const [targets, setTargets] = useState<Record<string, string | number>[]>([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
    if (tableColumns != undefined) {
      setShownColumns(tableColumns.slice(0, 5));
      setHiddenColumns(tableColumns.slice(5));
    }
  }, [tableColumns]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setIsSearching(false);
    }, 1000);

    return () => {
      clearTimeout(handler);
      setIsSearching(true);
    };
  }, [search]);

  useEffect(() => {
    if (debouncedSearch.trim().length >= 3) {
      const filtered = targets.filter((item) =>
        (item.naziv as string).toLowerCase().includes(debouncedSearch)
      );
      setTargets(filtered);
    } else if (tableData != undefined) {
      setTargets(tableData);
    }
  }, [debouncedSearch, tableData]);

  useEffect(() => {
    if (columnsError || dataError) toast.error("Error loading table data!");
  }, [columnsError, dataError]);

  const isLoading = loadingColumns || loadingData || isSearching;

  return (
    <MainLayout>
      <div className="relative flex h-full overflow-hidden">
        <div
          className={`flex-grow transition-all duration-300 ${
            isSidebarOpen ? "pr-0 sm:pr-[300px]" : "pr-0"
          }`}
        >
          <div className="p-6 h-full w-[100vw] sm:w-auto overflow-auto">
            <Search
              search={search}
              setSearch={setSearch}
              placeholder="Pretraga po nazivu..."
              label="Pretraga"
              type="text"
              className="border-2 rounded-2xl w-full mb-2 sm:w-[400px] px-4 h-[40px] outline-blue-300"
            />
            {isLoading ? (
              <Spinner />
            ) : targets.length > 0 ? (
              <Table
                targets={targets}
                columns={shownColumns}
                pages={[10, 20, 30]}
              />
            ) : (
              <div className="flex flex-col text-slate-500 mt-5 justify-center items-center">
                <ExclamationCircleIcon className="w-8" />
                <p>Nema šifri za prikaz!</p>
              </div>
            )}
          </div>
        </div>
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          isLoading={isLoading}
          shownColumns={shownColumns}
          hiddenColumns={hiddenColumns}
          setShownColumns={setShownColumns}
          setHiddenColumns={setHiddenColumns}
        />
      </div>
    </MainLayout>
  );
};

export default Main;
