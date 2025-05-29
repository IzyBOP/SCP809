import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "./supabase";
import './App.css';

function ItemDetail() {
  const { id } = useParams();
  const [itemData, setItemData] = useState(null);

  useEffect(() => {
    //fetch item details by id from supabase
    const fetchItemDetails = async () => {
      //check if id is missing
      if (!id) {
        console.error("No ID provided in route params.");
        return;
      }

      const { data, error } = await supabase
        .from("scp")
        .select("*")
        .eq("id", id)
        .single();

      //handle error or set item data
      if (error) {
        console.error("Error fetching item:", error);
      } else {
        setItemData(data);
      }
    };

    fetchItemDetails();
  }, [id]);

  return (
    <div>
      {itemData ? (
        <>
          {itemData.image && (
            <img
              src={`https://okxvgkdrkpyiphepggkb.supabase.co/storage/v1/object/public/images/images/${itemData.image}`}
              alt={itemData.item}
              className="infoimage"
            />
          )}

          <div className="info">
            <h3>Item #:</h3>
            <p>{itemData.item}</p>
          </div>

          <div className="info">
            <h3>Class:</h3>
            <p>{itemData.class}</p>
          </div>

          <div className="info">
            <h3>Description:</h3>
            <p>{itemData.description}</p>
          </div>

          <div className="info">
            <h3>Special Containment Procedure:</h3>
            <p>{itemData.containment}</p>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ItemDetail;
