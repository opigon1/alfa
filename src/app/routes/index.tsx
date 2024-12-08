import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../../widgets/layout/ui";
import { CardList } from "../../widgets";
import PATHS from "./paths";

export const routes = createBrowserRouter([
    {
        path: PATHS.MAIN,
        element: <Layout />,
        children: [
            {
                index: true,
                element: <CardList />
            },
            {
                path: PATHS.PRODUCTS,
                element: <CardList />
            },
            {
                path: PATHS.PRODUCT,
                element: <div>Product</div>
            },
            {
                path: PATHS.CREATE_PRODUCT,
                element: <div>Create product</div>
            }
        ]
    }
]);