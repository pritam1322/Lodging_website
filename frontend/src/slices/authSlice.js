import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
}

//user
const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        logout: (state, action) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        },
    }
})

//book
const bookSlice = createSlice({
    name:'book',
    initialState: {book:null},
    reducers:{
        booking: (state,action)=> {
            state.book = action.payload;
        }
    }
})

export const { setCredentials, logout } = authSlice.actions;
export const {booking} = bookSlice.actions;

export default authSlice.reducer;
export const bookSliceReducer = bookSlice.reducer ;