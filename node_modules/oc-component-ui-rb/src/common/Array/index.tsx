import { ReactNode } from "react";

interface TableColumn {
  header: string;
  accessor: string;
}

interface TableRow {
  [key: string]: ReactNode;
}

interface TableProps {
  columns: TableColumn[];
  data: TableRow[];
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <div className="oc-ui-overflow-x-auto">
      <table className="oc-ui-min-w-full oc-ui-bg-white oc-ui-rounded-lg oc-ui-shadow">
        <thead className="oc-ui-bg-gray-100">
          <tr>
            {columns.map((column) => (
              <th
                key={column.accessor}
                className="oc-ui-py-2 oc-ui-px-4 oc-ui-text-left oc-ui-font-medium oc-ui-text-gray-600"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="oc-ui-border-b last:oc-ui-border-b-0">
              {columns.map((column) => (
                <td
                  key={column.accessor}
                  className="oc-ui-py-2 oc-ui-px-4 oc-ui-text-left"
                >
                  {row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
