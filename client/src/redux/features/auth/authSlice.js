import { createSlice } from "@reduxjs/toolkit";


const loadUserFromSessionStorage = () =>{
    try {
        const serializedState = sessionStorage.getItem('user');
        if(serializedState==null) return{user:null}
        return {user:JSON.parse(serializedState)}
    } catch (error) {
        return {user:null}
    }
}

const initialState=loadUserFromSessionStorage()

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUser: (state,action)=>{
            state.user = action.payload.user;
            state.token = action.payload.token;
            sessionStorage.setItem('user',JSON.stringify(state.user));
            sessionStorage.setItem('token',JSON.stringify(state.token));
        },
        logout:(state)=>{
            state.user = null;
            state.token = null;
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('token');
        }
    }
})

export const {setUser, logout} =authSlice.actions;
export default authSlice.reducer;