import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Employee } from '../../types/Employee';


interface EmployeeState {
    employees: Employee[];
}


const initialState: EmployeeState = {
    employees: [],
};

const employeeSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        addEmployee: (state, action: PayloadAction<Employee>) => {
            state.employees.push(action.payload);
        },
        removeEmploy: (state, action: PayloadAction<string>) => {
            state.employees = state.employees.filter(employee => employee.id !== action.payload);
        },
        changeActiveEmployee: (state, action: PayloadAction<string>) => {
            const employee = state.employees.find(employee => employee.id === action.payload);
            if (employee) {
                employee.active = !employee.active;
            }
        },
    },
});

export const { addEmployee, removeEmploy, changeActiveEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;