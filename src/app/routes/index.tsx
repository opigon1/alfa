import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../../widgets/layout/ui";
import PATHS from "./paths";
import { Products } from "../../pages/products";
import { ProductDetailsPage } from "../../pages/product-details/ui";
import { fetchProductById } from "../../shared/api/api";
import { CreateProduct } from "../../pages/add-product";

export const routes = createBrowserRouter([
  {
    path: PATHS.MAIN,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products />,
      },
      {
        path: PATHS.PRODUCTS,
        element: <Products />,
      },
      {
        path: PATHS.PRODUCT,
        element: <ProductDetailsPage />,
        loader: async ({ params }) => {
          if (params.id) {
            return await fetchProductById(Number(params.id));
          }
          throw new Error("ID продукта не найден");
        },
      },
      {
        path: PATHS.CREATE_PRODUCT,
        element: <CreateProduct />,
      },
    ],
  },
]);
