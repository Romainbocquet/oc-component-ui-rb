import { useState } from "react"
import { Button, Input } from "oc-component-ui-rb/forms";
import { Link } from "oc-component-ui-rb/nav";
import { Modal, Array } from "oc-component-ui-rb/common";

function App() {
  const [open, setOpen] = useState(false)

  const columns = [
    { header: "Nom", accessor: "name" },
    { header: "Âge", accessor: "age" },
    { header: "Email", accessor: "email" }
  ];

  const data = [
    { name: "Alice", age: 25, email: "alice@example.com" },
    { name: "Bob", age: 30, email: "bob@example.com" },
    { name: "Charlie", age: 35, email: "charlie@example.com" }
  ];
  
  return (
    <div>
      <h1>Hello World</h1>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Input />
      <Link>Patate</Link>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div>
          <div>
            <h3>Modal text</h3>
          </div>
        </div>
      </Modal>
      <Array columns={columns} data={data} />
    </div>
  )
}

export default App
