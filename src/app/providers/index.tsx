import {Provider as ReduxProvider} from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { store } from '../store/index';
import { routes } from '../routes';


export const Provider = () => {
    return (
        <ReduxProvider store={store}>
            <RouterProvider router={routes} />
        </ReduxProvider>
    );
};