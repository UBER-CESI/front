import { POST, PUT } from "./index";
import { loginType, registerType } from "../models/loginRegister";

export function login(user: loginType) {
    return POST("login", user);
};

export function register(user: registerType) {
    return PUT("register", user);
};
