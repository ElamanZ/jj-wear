import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout';
import EmployeesPage from '../pages/EmployeesPage';
import AddEmployeePage from '../pages/AddEmployeePage';
import Dashboard from '../pages/Dashboard';
import AnalyticsPage from '../pages/AnalyticsPage';
import WalletPage from '../pages/WalletPage';
import WearsPage from '../pages/WearsPage';

const AppRouter = () => {
    return (
        <Router basename="/jj-wear">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="employees" element={<EmployeesPage />} />
                    <Route path="analytics" element={<AnalyticsPage />} />
                    <Route path="wallet" element={<WalletPage />} />
                    <Route path="wears" element={<WearsPage />} />
                    <Route path="add-employee" element={<AddEmployeePage />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRouter;