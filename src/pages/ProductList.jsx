import React, { useEffect, useState } from "react";
import ProductItem from "../Components/ProductItem";
import { productApi } from "../services/productsApi";
import { Link } from "react-router";
import { toast } from "react-toastify";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const fetchProducts = async () => {
    productApi
      .getProducts()
      .then((response) => {
        console.log({ response });
        setProducts(response.data);
      })
      .catch((e) => {
        console.log({ e });
        setError(true);
      })
      .finally(() => setIsLoading(false));
  };

  const deleteProduct = async (id) => {
    try {
      setIsLoading(true);
      await productApi.deleteProduct(id);
      await fetchProducts();
      toast.success("Product Deleted Successfully");
    } catch (error) {
      console.log({ error });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("Rendered");
    fetchProducts();
  }, []);

  if (isLoading) return <div>Loading..............</div>;

  if (error) return <div>Error Fetching Products</div>;

  return (
    <div>
      <div>
        <Link to={"/products/create"}>Create Product +</Link>
      </div>
      {products.map((product) => (
        <ProductItem
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          onDelete={deleteProduct}
        />
      ))}
    </div>
  );
}
