import Header from '../../../shared/ui/header';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    );
}
