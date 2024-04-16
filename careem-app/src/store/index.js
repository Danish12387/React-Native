import { createSlice, configureStore } from '@reduxjs/toolkit'

const statusSlice = createSlice({
    name: 'status',
    initialState: {
        value: ""
    },
    reducers: {
        currentStatus: (state, payload) => {
            state.value = payload.payload
        }
    }
})

const { currentStatus } = statusSlice.actions;

const store = configureStore({
    reducer: statusSlice.reducer
})

export { store, currentStatus }; 