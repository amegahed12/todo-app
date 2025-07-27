import axios from "axios";

export const productApi = {
  getProducts: async () => axios.get("http://localhost:3000/products"),
  getProduct: async (id) => {
    const { data } = await axios.get(`http://localhost:3000/products/${id}`);
    return data;
  },
  createProduct: async (name, price) =>
    axios.post("http://localhost:3000/products", { name, price }),
  updateProduct: async (id, name, price) =>
    axios.patch(`http://localhost:3000/products/${id}`, { name, price }),
  deleteProduct: async (productId) =>
    axios.delete(`http://localhost:3000/products/${productId}`),
};
