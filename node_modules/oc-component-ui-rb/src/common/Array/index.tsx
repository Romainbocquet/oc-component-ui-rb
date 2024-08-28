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
  // État pour suivre la page actuelle dans la pagination, initialisée à 1
  const [currentPage, setCurrentPage] = useState(1);

  // État pour le nombre d'éléments par page, initialisé à la valeur par défaut
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);

  // État pour la configuration du tri, contenant la clé de tri et la direction ('asc' ou 'desc')
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  // État pour la requête de recherche, initialisé à une chaîne vide
  const [searchQuery, setSearchQuery] = useState("");

  // Fonction pour gérer le tri lorsqu'une colonne est cliquée
  const handleSort = (accessor: string) => {
    // Par défaut, la direction de tri est ascendante
    let direction: 'asc' | 'desc' = 'asc';

    // Si la même colonne est déjà triée en ascendant, inverser la direction en descendant
    if (sortConfig && sortConfig.key === accessor && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    // Mettre à jour la configuration de tri avec la nouvelle clé et direction
    setSortConfig({ key: accessor, direction });
  };

  // Fonction pour gérer les changements dans le champ de recherche
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Mettre à jour la requête de recherche avec la valeur saisie
    setSearchQuery(event.target.value);

    // Réinitialiser la page actuelle à 1 lors d'une nouvelle recherche
    setCurrentPage(1);
  };

  // Filtrer les données en fonction de la requête de recherche
  const filteredData = data.filter(row =>
    // Vérifier si au moins une colonne contient la requête de recherche
    columns.some(column => {
      // Obtenir la valeur de la cellule pour la colonne actuelle
      const cellValue = row[column.accessor];

      // Vérifier si la valeur de la cellule inclut la requête de recherche (insensible à la casse)
      return cellValue && cellValue.toString().toLowerCase().includes(searchQuery.toLowerCase());
    })
  );

  // Trier les données filtrées en fonction de la configuration de tri actuelle
  const sortedData = sortConfig ? [...filteredData].sort((a, b) => {
    // Obtenir les valeurs à comparer pour la clé de tri spécifiée
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    // Gérer les cas où les valeurs sont nulles ou indéfinies
    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;
    if (aValue === bValue) return 0;

    // Comparer les valeurs et appliquer la direction de tri appropriée
    return (aValue > bValue ? 1 : -1) * (sortConfig.direction === 'asc' ? 1 : -1);
  }) : filteredData;

  // Calculer l'index de départ et de fin pour la pagination actuelle
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Obtenir les données à afficher pour la page actuelle
  const currentData = sortedData.slice(startIndex, endIndex);

  // Calculer le nombre total de pages en fonction des données filtrées et du nombre d'éléments par page
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Fonction pour gérer le changement de page lors de la pagination
  const handlePageChange = (page: number) => {
    // Mettre à jour la page actuelle avec la nouvelle valeur
    setCurrentPage(page);
  };

  // Fonction pour gérer le changement du nombre d'éléments par page
  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // Mettre à jour le nombre d'éléments par page avec la nouvelle valeur sélectionnée
    setItemsPerPage(Number(event.target.value));

    // Réinitialiser la page actuelle à 1 lors du changement du nombre d'éléments par page
    setCurrentPage(1);
  };

  // Rendu du composant Table (le code JSX correspondant devrait être ajouté ici)
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