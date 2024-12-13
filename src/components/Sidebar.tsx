import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  EllipsisVerticalIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import { Dispatch, SetStateAction, useState } from "react";
import Spinner from "../util-components/Spinner";

interface SidebarInterface {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  isLoading: boolean;
  shownColumns: string[];
  hiddenColumns: string[];
  setShownColumns: Dispatch<SetStateAction<string[]>>;
  setHiddenColumns: Dispatch<SetStateAction<string[]>>;
}

const Sidebar: React.FC<SidebarInterface> = ({
  isSidebarOpen,
  toggleSidebar,
  isLoading,
  shownColumns,
  hiddenColumns,
  setShownColumns,
  setHiddenColumns,
}) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (index: number) => {
    if (draggedIndex === null || draggedIndex === index) return;

    // Swap the dragged item with the target item
    const updatedColumns = [...shownColumns];
    [updatedColumns[draggedIndex], updatedColumns[index]] = [
      updatedColumns[index],
      updatedColumns[draggedIndex],
    ];

    setShownColumns(updatedColumns);
    setDraggedIndex(null);
  };

  return (
    <div
      className={`absolute right-0 w-[300px] top-0 h-full bg-blue-300 text-white transition-transform duration-300 ${
        isSidebarOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div
        onClick={toggleSidebar}
        className="absolute cursor-pointer top-1/3 transform -translate-x-[100%] bg-blue-500 hover:bg-blue-700 text-white py-4 px-4 rounded-s shadow-lg transition-all duration-300"
      >
        {isSidebarOpen ? (
          <ChevronDoubleRightIcon className="w-4" />
        ) : (
          <ChevronDoubleLeftIcon className="w-4" />
        )}
      </div>
      <div className="p-6">
        {isLoading ? (
          <Spinner />
        ) : (
          <div>
            <p className="text-xl">Skrivene Kolone</p>
            <div className="grid grid-cols-[auto_auto] justify-start items-center gap-1">
              <InformationCircleIcon className="w-4" />
              <p className="text-xs">
                Duplim klikom dodajete kolonu na tabelu.
              </p>
            </div>
            {hiddenColumns.length > 0 ? (
              hiddenColumns.map((col) => (
                <div
                  className="bg-red-400 my-2 cursor-pointer hover:bg-red-500 transition py-2 text-white text-xl rounded flex items-center justify-center"
                  onDoubleClick={() => {
                    setHiddenColumns(
                      hiddenColumns.filter((column) => column != col)
                    );
                    setShownColumns([...shownColumns, col]);
                  }}
                >
                  {col}
                </div>
              ))
            ) : (
              <div className="flex justify-center my-4">No hidden columns!</div>
            )}
            <div className="border-2 my-5" />
            <p className="text-xl">Prikazane Kolone</p>
            <div className="grid grid-cols-[auto_auto] justify-start items-center gap-1">
              <InformationCircleIcon className="w-4" />
              <p className="text-xs">
                Duplim klikom brisete kolonu sa tabele (minimalno 3 kolone
                moraju biti vidljive).
                <br />
                Takodje preko drag-drop funkcionalnosti mozete da promjenite
                redosljed kolona.
              </p>
            </div>
            {shownColumns.map((col, index) => (
              <div
                className="bg-green-500 flex gap-2 my-2 cursor-pointer hover:bg-green-600 transition py-2 text-white text-xl rounded"
                key={index}
                draggable // Enable dragging
                onDragStart={() => handleDragStart(index)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(index)}
                onDoubleClick={() => {
                  if (shownColumns.length > 3) {
                    setShownColumns(
                      shownColumns.filter((column) => column != col)
                    );
                    setHiddenColumns([...hiddenColumns, col]);
                  }
                }}
              >
                <EllipsisVerticalIcon className="w-6" />
                {col}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
