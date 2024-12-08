import {Provider as ReduxProvider} from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../store/index';

interface ProviderProps {
    children: React.ReactNode;
}

export const Providers = ({ children }: ProviderProps) => {
    return (
        <ReduxProvider store={store}>
            <BrowserRouter>
                {children}
            </BrowserRouter>
        </ReduxProvider>
    );
};