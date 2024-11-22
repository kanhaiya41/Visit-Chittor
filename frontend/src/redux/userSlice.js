import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {},
        selected: {},
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setSelected: (state, action) => {
            state.selected = action.payload;
        }
    }
});

export const { setUser, setSelected } = userSlice.actions;
export default userSlice.reducer;