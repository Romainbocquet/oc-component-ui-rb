# Documentation du Composant Table

Le composant `Table` est un tableau interactif et personnalisable pour les applications React. Il offre des fonctionnalités telles que le tri, la recherche et la pagination.

## Props

### `columns`
- **Type** : `TableColumn[]`
- **Description** : Un tableau d'objets définissant les colonnes du tableau.
- **Structure**:
  ```typescript
  interface TableColumn {
    header: string;   // Le nom affiché de l'en-tête de la colonne.
    accessor: string; // La clé dans les objets de données pour accéder à la valeur correspondante.
  }```

### `data`
- **Type**: `TableRow[]`
- **Description** : Un tableau d'objets représentant les lignes du tableau. Chaque objet doit contenir des clés correspondant aux valeurs accessor des colonnes.
- **Structure**:
```typescript
interface TableRow {
  [key: string]: ReactNode; // Une paire clé-valeur représentant une cellule dans la ligne.
}
```

### `itemsPerPageOptions (optionnel)`
- **Type**: `number[]`
- **Défaut**: [5, 10, 15]
- **Description** : Un tableau de nombres définissant les options disponibles pour le nombre d'éléments par page.

### `defaultItemsPerPage (optionnel)`
- **Type**: `number`
- **Défaut**: 5
- **Description** : Le nombre initial d'éléments à afficher par page.

## Exemple d'utilisation
```typescript
import React from 'react';
import Table from './Table';

const columns = [
  { header: 'Nom', accessor: 'name' },
  { header: ' ge', accessor: 'age' },
  { header: 'Adresse', accessor: 'address' },
];

const data = [
  { name: 'John Doe', age: 28, address: '123 Main St' },
  { name: 'Jane Smith', age: 34, address: '456 Maple Ave' },
  // ...autres lignes
];

const App = () => (
  <Table
    columns={columns}
    data={data}
    itemsPerPageOptions={[5, 10, 20]}
    defaultItemsPerPage={10}
  />
);

export default App;
```

## Fonctionnalités

### Tri

- **Description** : Vous pouvez trier les données du tableau en cliquant sur les en-têtes des colonnes.
- **Comment ça marche** :
  1. Cliquez une fois sur un en-tête de colonne pour trier les données dans l'ordre croissant.
  2. Cliquez à nouveau sur le même en-tête pour basculer en ordre décroissant.

### Recherche

- **Description** : Utilisez le champ de recherche pour filtrer les lignes en fonction de votre requête.
- **Comment ça marche** :
  1. Saisissez votre requête dans le champ de recherche.
  2. La recherche est insensible à la casse et vérifie toutes les colonnes du tableau.

### Pagination

- **Description** : Naviguez entre les pages de données du tableau.
- **Comment ça marche** :
  1. Utilisez les boutons "Précédent" et "Suivant" pour passer d'une page à l'autre.
  2. Sélectionnez le nombre d'éléments à afficher par page dans le menu déroulant.

## Remarques

- **Clés accessor** : Assurez-vous que les clés accessor dans vos columns correspondent aux clés dans les lignes de vos data.
- **Valeurs nulles et indéfinies** : Le composant gère gracieusement les valeurs nulles et indéfinies pendant le tri.
- **Réinitialisation de la recherche** : La fonctionnalité de recherche réinitialise la page actuelle à 1 lors du changement de requête.

# Documentation du Composant Modal

Le composant `Modal` est une boîte de dialogue modale réutilisable pour les applications React. Il permet d'afficher du contenu au-dessus de la page principale, avec des fonctionnalités pour ouvrir et fermer la boîte de dialogue.

## Props

### `open`
- **Type** : `boolean`
- **Description** : Indique si la modal est ouverte (`true`) ou fermée (`false`). Quand cette valeur est `true`, la modal est visible. Quand elle est `false`, la modal est cachée.

### `onClose`
- **Type** : `() => void`
- **Description** : Fonction appelée lorsque la modal doit être fermée. Cette fonction est généralement utilisée pour modifier l'état parent qui contrôle la visibilité de la modal.

### `children`
- **Type** : `ReactNode`
- **Description** : Le contenu à afficher à l'intérieur de la modal. Cela peut être n'importe quel élément React ou composant.

### `id`
- **Type** : `string`
- **Description** : L'identifiant unique pour la modal. Utilisé pour la gestion des éléments dans le DOM.

## Exemple d'utilisation

```javascript
import React, { useState } from 'react';
import Modal from './Modal';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={handleOpenModal}>
        Ouvrir la Modal
      </button>
      <Modal open={isModalOpen} onClose={handleCloseModal} id="example-modal">
        <h2>Contenu de la Modal</h2>
        <p>Ceci est un exemple de contenu dans la modal.</p>
      </Modal>
    </div>
  );
};

export default App;
```

## Fonctionnalités

### Ouverture et Fermeture
- La modal s'ouvre et se ferme en fonction de la prop open.
- La modal peut être fermée en cliquant sur le fond (backdrop) ou sur le bouton de fermeture marqué "X".

## Remarques

- Assurez-vous que la fonction onClose modifie l'état parent pour contrôler la visibilité de la modal.
- Le composant empêche la propagation des clics à l'intérieur de la modal pour éviter une fermeture accidentelle en cliquant sur le contenu.

En suivant cette documentation, vous devriez être en mesure d'utiliser et de personnaliser efficacement le composant Modal dans vos applications React.
