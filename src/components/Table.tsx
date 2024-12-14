import { Column, DataGrid, Pager, Paging } from "devextreme-react/data-grid";
import "devextreme/dist/css/dx.light.css";

interface TableInterface {
  targets: Record<string, string | number>[];
  columns: string[];
  pages: number[];
}

export const columnsMap = new Map<string, string>([
  ["id", "ID"],
  ["klasifikacija", "Klasifikacija"],
  ["naziv", "Naziv"],
  ["karakteristikaA", "Karakteristika A"],
  ["karakteristikaB", "Karakteristika B"],
  ["karakteristikaC", "Karakteristika C"],
  ["karakteristikaD", "Karakteristika D"],
  ["karakteristikaE", "Karakteristika E"],
]);

const Table: React.FC<TableInterface> = ({ targets, columns, pages }) => {
  return (
    <div className="mt-10 overflow-auto whitespace-nowrap">
      <h2>Šifre</h2>
      <DataGrid
        dataSource={targets}
        showBorders={true}
        rowAlternationEnabled={true}
        style={{ minWidth: "600px" }}
      >
        {columns.map((col) => (
          <Column dataField={col} caption={columnsMap.get(col)} />
        ))}
        <Paging defaultPageSize={pages[0]} />
        <Pager
          visible={true}
          showPageSizeSelector={true}
          allowedPageSizes={pages}
          showInfo={true}
        />
      </DataGrid>
    </div>
  );
};

export default Table;
