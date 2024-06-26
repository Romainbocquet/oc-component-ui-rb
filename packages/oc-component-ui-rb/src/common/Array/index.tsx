import { useState } from "react";
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
  itemsPerPageOptions?: number[];
  defaultItemsPerPage?: number;
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  itemsPerPageOptions = [5, 10, 15],
  defaultItemsPerPage = 5,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSort = (accessor: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === accessor && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: accessor, direction });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const filteredData = data.filter(row =>
    columns.some(column => {
      const cellValue = row[column.accessor];
      return cellValue && cellValue.toString().toLowerCase().includes(searchQuery.toLowerCase());
    })
  );

  const sortedData = sortConfig ? [...filteredData].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;
    if (aValue === bValue) return 0;

    return (aValue > bValue ? 1 : -1) * (sortConfig.direction === 'asc' ? 1 : -1);
  }) : filteredData;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = sortedData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="oc-ui-overflow-x-auto">
      <div className="oc-ui-mb-4 oc-ui-flex oc-ui-justify-between">
        <div>
          <label htmlFor="itemsPerPage" className="oc-ui-mr-2">
            Items per page:
          </label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="oc-ui-px-2 oc-ui-py-1 oc-ui-border oc-ui-border-gray-300"
          >
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="search" className="oc-ui-mr-2">
            Search:
          </label>
          <input
            id="search"
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            className="oc-ui-px-2 oc-ui-py-1 oc-ui-border oc-ui-border-gray-300"
          />
        </div>
      </div>
      <table className="oc-ui-min-w-full oc-ui-bg-white oc-ui-rounded-lg oc-ui-shadow">
        <thead className="oc-ui-bg-gray-100">
          <tr>
            {columns.map((column) => (
              <th
                key={column.accessor}
                className="oc-ui-py-2 oc-ui-px-4 oc-ui-text-left oc-ui-font-medium oc-ui-text-gray-600 hover:oc-ui-cursor-pointer"
                onClick={() => handleSort(column.accessor)}
              >
                {column.header}
                {sortConfig && sortConfig.key === column.accessor && (
                  <span>
                    {sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽'}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, rowIndex) => (
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
      <div className="oc-ui-mt-4 oc-ui-flex oc-ui-justify-between oc-ui-items-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="oc-ui-px-4 oc-ui-py-2 oc-ui-bg-gray-300 oc-ui-text-gray-700 oc-ui-rounded"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="oc-ui-px-4 oc-ui-py-2 oc-ui-bg-gray-300 oc-ui-text-gray-700 oc-ui-rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;