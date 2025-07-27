import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { productApi } from "../services/productsApi";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Product Name is Required")
    .min(4, "Product Must Be At least 4 Characters"),
  price: yup.number().required("Price is Required"),
});

export default function CreateProduct() {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const navigate = useNavigate();
  const handleCreate = async (values) => {
    try {
      setIsLoading(true);
      await productApi.createProduct(values.name, values.price);
      toast.success("Product Created");
      navigate("/products");
    } catch (error) {
      console.log({ error });
      toast.error("Error Creating Product");
    } finally {
      setIsLoading(false);
    }
  };
  const handleUpdate = async (values) => {
    try {
      setIsLoading(true);
      await productApi.updateProduct(id, values.name, values.price);
      toast.success("Product Updated");
      navigate("/products");
    } catch (error) {
      console.log({ error });
      toast.error("Error Creating Product");
    } finally {
      setIsLoading(false);
    }
  };

  const getProduct = async () => {
    try {
      setIsLoading(true);
      const product = await productApi.getProduct(id);
      formik.setValues(product);
    } catch (_) {
      toast.error("Error Fetching Data");
    } finally {
      setIsLoading(false);
    }
  };
  const formik = useFormik({
    initialValues: { name: "", price: undefined },
    validationSchema: schema,
    onSubmit: id ? handleUpdate : handleCreate,
  });

  useEffect(() => {
    if (id) {
      getProduct();
    }
  }, []);

  return (
    <div className="flex justify-center mt-4">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col items-center gap-4 border p-4 rounded border-green-500"
      >
        <div className="flex flex-col">
          <label htmlFor="username">Name</label>
          <input
            name="name"
            id="name"
            placeholder="Enter Your Product Name"
            className="border-green-100 mt-1 active:border-0 p-1"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.errors.name}
        </div>
        <div className="flex flex-col">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Enter Your Price"
            className="border-green-100 mt-1 active:border-0 p-1"
            {...formik.getFieldProps("price")}
          />
          {formik.errors.price}
        </div>
        <button
          disabled={Object.keys(formik.errors).length || isLoading}
          type="submit"
          className="bg-green-200 p-2 rounded disabled:bg-gray-200"
        >
          {isLoading ? "Loading...." : "Create"}
        </button>
      </form>
    </div>
  );
}
