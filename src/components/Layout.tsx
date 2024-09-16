import { Box } from "@mui/material"
import Sidebar from "./Sidebar"
import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <Box display="flex">
            <Sidebar />
            <Outlet />
        </Box>
    )
}

export default Layout