import { useState, useEffect } from "react";
import { supabase } from "./supabase";

function AdminPanel() {
  const [items, setItems] = useState([]);
  const [newRecord, setNewRecord] = useState({
    item: '',
    class: '',
    description: '',
    containment: '',
    image: ''
  });
  const [editRecord, setEditRecord] = useState(null);

  // Fetch all items from Supabase
  const fetchItems = async () => {
    const { data, error } = await supabase.from("scp").select("*");
    if (error) {
      console.error("Fetch error:", error);
    } else {
      setItems(data);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Add new item
  const addItem = async () => {
    const { data, error } = await supabase
      .from("scp")
      .insert([newRecord])
      .select(); 

    if (error) {
      console.error("Insert error:", error);
    } else if (data && data.length > 0) {
      setItems([...items, data[0]]);
      setNewRecord({ item: '', class: '', description: '', containment: '', image: '' });
    }
  };

  // Delete item
  const deleteItem = async (id) => {
    const { error } = await supabase.from("scp").delete().eq("id", id);
    if (error) {
      console.error("Delete error:", error);
    } else {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  // Start editing
  const startEditing = (item) => {
    setEditRecord({ ...item }); // create a copy
  };

  // Save edited item
  const saveEdit = async (id) => {
    const { error } = await supabase.from("scp").update(editRecord).eq("id", id);
    if (error) {
      console.error("Update error:", error);
    } else {
      setEditRecord(null);
      fetchItems();
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {editRecord && editRecord.id === item.id ? (
              <>
                <input
                  value={editRecord.image}
                  onChange={(e) => setEditRecord({ ...editRecord, image: e.target.value })}
                  placeholder="Image URL"
                />
                <input
                  value={editRecord.item}
                  onChange={(e) => setEditRecord({ ...editRecord, item: e.target.value })}
                  placeholder="Item"
                />
                <input
                  value={editRecord.class}
                  onChange={(e) => setEditRecord({ ...editRecord, class: e.target.value })}
                  placeholder="Class"
                />
                <input
                  value={editRecord.description}
                  onChange={(e) => setEditRecord({ ...editRecord, description: e.target.value })}
                  placeholder="Description"
                />
                <input
                  value={editRecord.containment}
                  onChange={(e) => setEditRecord({ ...editRecord, containment: e.target.value })}
                  placeholder="Containment"
                />
                <button onClick={() => saveEdit(item.id)}>Save</button>
                <button onClick={() => setEditRecord(null)}>Cancel</button>
              </>
            ) : (
              <>
                <p><strong>{item.item}</strong></p>
                <p>
                  <img
                    src={`https://okxvgkdrkpyiphepggkb.supabase.co/storage/v1/object/public/images/images/${item.image}`}
                    alt={item.item}
                    width="100"
                  />
                </p>
                <p>{item.class}</p>
                <p>{item.description}</p>
                <p>{item.containment}</p>
                <button onClick={() => startEditing(item)}>Edit</button>
                <button onClick={() => deleteItem(item.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>

      <h3>Add New Record</h3>
      <input
        value={newRecord.item}
        onChange={(e) => setNewRecord({ ...newRecord, item: e.target.value })}
        placeholder="Item"
      />
      <input
        value={newRecord.class}
        onChange={(e) => setNewRecord({ ...newRecord, class: e.target.value })}
        placeholder="Class"
      />
      <input
        value={newRecord.description}
        onChange={(e) => setNewRecord({ ...newRecord, description: e.target.value })}
        placeholder="Description"
      />
      <input
        value={newRecord.containment}
        onChange={(e) => setNewRecord({ ...newRecord, containment: e.target.value })}
        placeholder="Containment"
      />
      <input
        value={newRecord.image}
        onChange={(e) => setNewRecord({ ...newRecord, image: e.target.value })}
        placeholder="Image URL"
      />
      <button onClick={addItem}>Add Item</button>
    </div>
  );
}

export default AdminPanel;
