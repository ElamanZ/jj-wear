import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import employeeReducer from './slices/employeesSlice';
import seamstressTeamReducer from './slices/seamstressTeamSlice';
import searchReducer from './slices/searchSlice';


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['employees', 'seamstressTeam'],
};

const persistedEmployeeReducer = persistReducer(persistConfig, employeeReducer);
const persistedTeamsReducer = persistReducer(persistConfig, seamstressTeamReducer);

export const store = configureStore({
    reducer: {
        employees: persistedEmployeeReducer,
        seamstressTeam: persistedTeamsReducer,
        search: searchReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
