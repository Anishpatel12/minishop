import API from "./api";

// GET PRODUCTS
export const getProducts =
  async () => {
    const { data } =
      await API.get(
        "/products"
      );

    return data;
  };

// GET SINGLE PRODUCT
export const getProduct =
  async (id) => {
    const { data } =
      await API.get(
        `/products/${id}`
      );

    return data;
  };

// CREATE PRODUCT
export const createProduct =
  async (productData) => {
    const { data } =
      await API.post(
        "/products",
        productData
      );

    return data;
  };

// UPDATE PRODUCT
export const updateProduct =
  async (
    id,
    productData
  ) => {
    const { data } =
      await API.put(
        `/products/${id}`,
        productData
      );

    return data;
  };

// DELETE PRODUCT
export const deleteProduct =
  async (id) => {
    const { data } =
      await API.delete(
        `/products/${id}`
      );

    return data;
  };