import axios from "axios";
import { loginFailed, loginStart, loginSuccess, logoutFailed, logoutStart, logoutSuccess, registerFailed, registerStart, registerSuccess } from "./authSlice";

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("http://localhost:8000/v1/auth/login", user);
        dispatch(loginSuccess(res.data));
        navigate("/");
    } catch (err) {
        dispatch(loginFailed(err.message || "Login failed"));
    }
};

export const registerUser = async (user, dispatch , navigate) => {
    dispatch(registerStart());
    try{
        await axios.post("http://localhost:8000/v1/auth/register",user);
        dispatch(registerSuccess());
        navigate("/login");
    }catch (err){
        dispatch(registerFailed(err.message || "Register failed"));
    }
};

export const userLogout = async ( dispatch , navigate ) => {
    dispatch(logoutStart());
    try{
        await axios.post("http://localhost:8000/v1/auth/logout");
        dispatch(logoutSuccess());
        navigate("/");
    }catch(err){
        dispatch(logoutFailed(err.message || "Logout failed"));

    }
}   