import { useState } from "react";

function Logo() {
  return <h1>My Travel List</h1>;
}

function Form({ handleAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

// activity 3 pt 1
  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;
    alert("Please enter an item description.")
    // create a new item
    const newItem = {
      id: Date.now(), 
      description, 
      quantity, 
      packed: false 
    };
    // add the new item to the array 
    handleAddItem(newItem);
    // set the states to default values 
    setDescription("");
    setQuantity(1);
  }

  function handleDescription(e) {
    setDescription(e.target.value);
  }

  function handleQuantity(e) {
    setQuantity(Number(e.target.value));
  }

  return (
    <form className="add-form"
    // activity 3 pt 2
    onSubmit={handleSubmit}>
      <h3>What do you need to pack?</h3>
      {/* activity 2  */}
      <select>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
      </select>
      <input 
      type="text"
      placeholder="Item..."
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

// parent component to item component
// responsible for supplying data to the child component
function PackingList({ items, onTogglePacked, onDeleteItem, onUpdateItem }) {
  // separate items into packed and unpacked groups
  const packedItems = items.filter((item) => item.packed);
  const unpackedItems = items.filter((item) => !item.packed);

  return (
    <div className="list">
      <h2>Unpacked Items</h2>
      <ul>
        {unpackedItems.map((item) => (
          <Item 
          item={item} 
          onTogglePacked={onTogglePacked}
          onDeleteItem={onDeleteItem}
          onUpdateItem={onUpdateItem}
          key={item.id}>
          </Item>
        ))}
      </ul>
      <h2>Packed Items</h2>
      <ul>
        {packedItems.map((item) => (
          <Item
          item={item} 
          onTogglePacked={onTogglePacked}
          onDeleteItem={onDeleteItem}
          key={item.id}>
          </Item>
        ))}
      </ul>
    </div>
  );
}

// child component
// template
function Item({ item, onUpdateItem, onDeleteItem }) {
  return (
    <li>
      <input
      type="checkbox"
      value={item.packed}
      onChange={() => onUpdateItem(item.id)}
      />
      <span
      style={{
        textDecoration: item.packed ? "line-through" : "none",
      }}
      >
        {item.description} - Quantity: {item.quantity}
      </span>
      <button
        style={{
          marginLeft: "10px",
          backgroundColor: "red",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "30px",
          height: "30px",
          fontSize: "16px",
          cursor: "pointer",
          textAlign: "center",
          lineHeight: "30px",
        }}
        onClick={() => onDeleteItem(item.id)}
      >
        X
      </button>
    </li>
  );
}

function Stats({items}) {
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked/numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
        ? "You got everything!"
        : `You have ${numItems} items in the list. You already packed ${numPacked} ${percentage}%).`}
      </em>
    </footer>
  );
}

function App() {
  // responsible for supplying data to PackingList 
  const [items, setItems] = useState([]);
  
  function handleAddItem(item) {
    setItems((prevItems)=>[...prevItems, item]);
  }

  // delete items from the list 
  function handleDeleteItem(id) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  // update items packed status in the list 
  function handleUpdateItem(id) {
    setItems((prevItems) => prevItems.map((item) =>
    item.id === id ? {...item, packed: !item.packed} : item
    )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList 
      items={items}
      onDeleteItem={handleDeleteItem}
      onUpdateItem={handleUpdateItem}
      />
      <Stats 
      items={items}
      />
    </div>
  );
}

export default App;
