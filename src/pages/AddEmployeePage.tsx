import { useDispatch, useSelector } from "react-redux";
import { Employee, SeamstressTeam } from "../types/Employee";
import { v4 as uuidv4 } from 'uuid';
import EmployeeForm from "../components/Employees/EmployeeForm/EmployeeForm";
import { Box } from "@mui/material";
import { addEmployee } from "../store/slices/employeesSlice";
import EmployeeHeader from "../components/Employees/EmployeeHeader/EmployeeHeader";
import { RootState } from "../store/store";
import { addTeam, updateTeam } from '../store/slices/seamstressTeamSlice';
import { useState } from "react";
import Employees from "../components/Employees/Employees";


const AddEmployeePage = () => {

    const [isCreateNewTeam, setIsCreateNewTeam] = useState(false);

    const dispatch = useDispatch();

    const seamstressTeams = useSelector((state: RootState) => state.seamstressTeam.seamstressTeam);

    const handleAddEmployee = (data: Omit<Employee, 'id'>) => {
        const newEmployee: Employee = { ...data, id: uuidv4() };
        dispatch(addEmployee(newEmployee));
        setIsCreateNewTeam(false);

        if (isCreateNewTeam) {
            createNewSeamstressTeam(newEmployee);
        }
        if (!isCreateNewTeam && newEmployee.teamId) {
            updateSeamstressTeam(newEmployee, newEmployee.teamId);
        }

        window.location.reload();
    };


    const createNewSeamstressTeam = (employee: Employee) => {
        const newTeam: SeamstressTeam = {
            id: `team-${seamstressTeams.length + 1}`,
            active: true,
            employees: [employee]
        };
        dispatch(addTeam(newTeam));
    };

    const updateSeamstressTeam = (employee: Employee, teamId: string) => {
        const team = seamstressTeams.find(team => team.id === teamId);
        if (team) {
            const updatedTeam: SeamstressTeam = {
                ...team,
                employees: [...team.employees, employee]
            };
            dispatch(updateTeam(updatedTeam));
        }
    };


    return (
        <Box sx={{ padding: '32px', width: '100%', backgroundColor: '#979CA3' }}>
            <EmployeeHeader />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '16px', }}>
                <EmployeeForm
                    onSubmit={handleAddEmployee}
                    createNewSeamstressTeam={() => createNewSeamstressTeam}
                    setIsCreateNewTeam={setIsCreateNewTeam}
                    updateSeamstressTeam={() => updateSeamstressTeam} />
                <Employees />
            </Box>
        </Box>
    )
}

export default AddEmployeePage