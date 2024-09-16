import { Box, TextField } from "@mui/material"
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../../../store/slices/searchSlice";

const EmployeeHeader = () => {

    const dispatch = useDispatch();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchQuery(event.target.value));
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'end', marginBottom: '16px', }}>
            <TextField
                sx={{ bgcolor: 'white' }}
                onChange={handleChange}
                variant="filled"
                id="outlined-textarea"
                label="Поиск по имени"
                placeholder="Введите имя сотрудника"
            />
        </Box>
    )
}

export default EmployeeHeader