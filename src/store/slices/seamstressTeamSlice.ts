import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SeamstressTeam } from '../../types/Employee';

interface seamstressTeamState {
    seamstressTeam: SeamstressTeam[];
}

const initialState: seamstressTeamState = {
    seamstressTeam: [],
};

const seamstressTeamSlice = createSlice({
    name: 'seamstressTeam',
    initialState,
    reducers: {
        setseamstressTeam: (state, action: PayloadAction<SeamstressTeam[]>) => {
            state.seamstressTeam = action.payload;
        },
        addTeam: (state, action: PayloadAction<SeamstressTeam>) => {
            state.seamstressTeam.push(action.payload);
        },
        updateTeam: (state, action: PayloadAction<SeamstressTeam>) => {
            const index = state.seamstressTeam.findIndex(team => team.id === action.payload.id);
            if (index !== -1) {
                state.seamstressTeam[index] = action.payload;
            }
        },
        changeActiveTeam: (state, action: PayloadAction<string>) => {
            const team = state.seamstressTeam.find(team => team.id === action.payload);
            if (team) {
                team.active = !team.active;
            }
        },
        removeTeam: (state, action: PayloadAction<string>) => {
            state.seamstressTeam = state.seamstressTeam.filter(team => team.id !== action.payload);
        },
    },
});

export const { setseamstressTeam, addTeam, updateTeam, changeActiveTeam, removeTeam } = seamstressTeamSlice.actions;
export default seamstressTeamSlice.reducer;
