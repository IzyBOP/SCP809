import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from './supabase';
import './App.css'; 

function NavMenu() {
  const [items, setItems] = useState([]); //atate to store SCP items

  useEffect(() => {
    //fetch items from the Supabase 'scp' table
    const fetchItems = async () => {
      const { data, error } = await supabase
        .from('scp')
        .select('id, item');

      if (error) {
        console.error('Error fetching items:', error);
      } else {
        setItems(data); //update state with fetched items
      }
    };

    fetchItems();
  }, []); 

  return (
    <nav className="sidebar">
      <ul className="navlist">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/admin">Admin Panel</Link>
        </li>
        {}
        {items.map((item) => (
          <li key={item.id}>
            <Link to={`/item/${item.id}`}>{item.item}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavMenu;
