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
    { name: "Ben", age: 30, email: "bob@example.com" },
    { name: "Marc", age: 30, email: "bob@example.com" },
    { name: "Jean", age: 30, email: "bob@example.com" },
    { name: "Paul", age: 30, email: "bob@example.com" },
    { name: "Eric", age: 30, email: "bob@example.com" },
    { name: "Antoine", age: 30, email: "bob@example.com" },
    { name: "Lucas", age: 30, email: "bob@example.com" },
    { name: "Rémis", age: 30, email: "bob@example.com" },
    { name: "Charlie", age: 35, email: "charlie@example.com" }
  ];
  
  return (
    <div>
      <h1>Hello World</h1>
      <Button type='submit' onClick={() => setOpen(true)}>Open Modal</Button>
      <Input />
      <Link>Patate</Link>
      <Modal open={open} onClose={() => setOpen(false)} id="modal-test">
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
