import React from "react";
import { useNavigate } from "react-router";

export default function ProductItem({ name, price, onDelete, id }) {
  const navigate = useNavigate();
  return (
    <div className="p-2 border border-yellow-500 my-2 flex justify-between">
      <div>
        {id} - {name}
      </div>
      <div>{price}$</div>
      <div className="flex gap-2">
        <button
          onClick={() => navigate(`/products/${id}`)}
          className="bg-green-300 p-2 rounded-2xl cursor-pointer hover:opacity-70 transition-opacity"
        >
          Edit Product
        </button>
        <button
          onClick={() => onDelete(id)}
          className="bg-red-300 p-2 rounded-2xl cursor-pointer hover:opacity-70 transition-opacity"
        >
          Delete Product
        </button>
      </div>
    </div>
  );
}
