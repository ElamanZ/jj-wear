import { Box, Typography } from "@mui/material"
import { useDispatch, } from "react-redux";
import { removeEmploy } from "../../store/slices/employeesSlice";
import { changeActiveEmployee } from "../../store/slices/employeesSlice";
import { changeActiveTeam, removeTeam } from "../../store/slices/seamstressTeamSlice";
import EmployeeList from "./EmployeeList/EmployeeList";
import styles from './Employees.module.css'


const Employees = () => {

    const dispatch = useDispatch();

    const handleDeleteEmployee = (id: string) => {
        dispatch(removeEmploy(id));
    };

    const handleDeleteTeam = (id: string) => {
        dispatch(removeTeam(id));
    };

    const onToggleActiveEmployee = (id: string) => {
        dispatch(changeActiveEmployee(id));
    };

    const onToggleActiveTeam = (id: string) => {
        dispatch(changeActiveTeam(id));
    };

    return (
        <Box className={styles.employees}>
            <Typography sx={{ fontWeight: 'bold', fontSize: '24px' }}>Все сотрудники</Typography>

            <EmployeeList onDeleteTeam={handleDeleteTeam} onDeleteEmployee={handleDeleteEmployee} onToggleActiveEmployee={onToggleActiveEmployee} onToggleActiveTeam={onToggleActiveTeam} />
        </Box>
    )
}

export default Employees