import React, { useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";
import { toast } from "react-toastify"

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const { addItem } = useContext(CartContext)

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/category/electronics?limit=10")
      .then((response) => response.json())
      .then((data) => {
        const formatted = data.map((item) => ({
          id: String(item.id),
          name: item.title,
          price: Number(item.price),
          quantity: 1,
          image: item.image,
        }));
        setProducts(formatted);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Product List</h2>
      {products.length === 0 ? (
        <p>Loading or no products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded shadow">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-contain mb-2"
              />
              <h2 className="text-lg font-bold">{product.name}</h2>
              <p className="mb-2">Price: ${product.price}</p>
              <p>Qty: {product.quantity}</p>
              <button
                onClick={() => addItem(product)}
                className="mt-4 bg-blue-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-blue-600"
              >
                Add to cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
