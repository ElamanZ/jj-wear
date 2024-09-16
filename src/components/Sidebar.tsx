import { Box, List, ListItem } from '@mui/material';
import Logo from '../assets/Icons/Logo.svg?react';
import AnaltycsIcon from '../assets/Icons/trending-up.svg?react';
import WalletIcon from '../assets/Icons/wallet.svg?react';
import WearsIcon from '../assets/Icons/shirt-thin.svg?react';
import AddEmployeeIcon from '../assets/Icons/person-add.svg?react';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
    { path: '/', icon: <Logo />, label: 'Home' },
    { path: '/analytics', icon: <AnaltycsIcon />, label: 'Analytics' },
    { path: '/wallet', icon: <WalletIcon />, label: 'Wallet' },
    { path: '/wears', icon: <WearsIcon />, label: 'Wears' },
    { path: '/add-employee', icon: <AddEmployeeIcon />, label: 'Add Employee' },
];

const Sidebar = () => {
    const location = useLocation();

    return (
        <Box flex={1} p={2} sx={{ display: { xs: 'none', sm: 'block' }, backgroundColor: '#D8E7FC', minWidth: '70px', height: 'calc(100vh - 32px)' }}>
            <Box position='fixed'>
                <List sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>
                    {menuItems.map(item => {
                        const isActive = location.pathname === item.path;
                        const color = isActive ? '#4B46E0' : 'black';
                        return (
                            <ListItem key={item.path} disablePadding sx={{ justifyContent: 'center' }}>
                                <Link to={item.path}>
                                    <Box sx={{ color: { color }, display: 'flex', paddingX: '16px', alignItems: 'center' }}>{item.icon}</Box>
                                </Link>
                            </ListItem>
                        );
                    })}
                </List>
            </Box>
        </Box>
    );
};

export default Sidebar;
