import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from './supabase';
import './App.css'; // Ensure styles are applied

function NavMenu() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase
        .from('scp')
        .select('id, item');

      if (error) {
        console.error('Error fetching items:', error);
      } else {
        setItems(data);
      }
    };

    fetchItems();
  }, []);

  return (
    <nav className="sidebar">
      <ul className="nav-list">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/admin">Admin Panel</Link>
        </li>
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
