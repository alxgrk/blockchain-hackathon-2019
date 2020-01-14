import React from "react";
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8091/'
});
const localStorageLoginKey = 'loggedIn';

const initialAuthInfo = {
    basicHash: '',
    id: '',
    email: '',
    vorname: ''
};

const basicAuthHeaderInternal = (base64Hash) => {
    return {
        Authorization: 'Basic ' + base64Hash
    }
};
export const basicAuthHeader = () => {
    return basicAuthHeaderInternal(JSON.parse(localStorage.getItem(localStorageLoginKey)).basicHash)
};


export const getAuthInfo = () => {
    let item = localStorage.getItem(localStorageLoginKey);
    return item !== null ? JSON.parse(item) : initialAuthInfo;
};
export const isLoggedIn = () => {
    return getAuthInfo().basicHash !== '';
};
export const register = (profilInfo, cb, onRegistrationError, onLoginError) => {
    axiosInstance.post("profil", profilInfo)
        .then(() => {
            login(btoa(profilInfo.email + ':' + profilInfo.password), cb, onLoginError)
        })
        .catch((err) => {
            console.error("Registration error: " + JSON.stringify(err));
            onRegistrationError(err)
        });
};
export const login = (base64Hash, cb, onError) => {
    axiosInstance.get("whoami",
        {
            headers: basicAuthHeaderInternal(base64Hash)
        })
        .then((res) => {
            const authInfo = {
                basicHash: base64Hash,
                id: res.data.id,
                email: res.data.email,
                vorname: res.data.vorname
            };
            localStorage.setItem(localStorageLoginKey, JSON.stringify(authInfo));
            cb()
        })
        .catch((err) => {
            console.error("Login error: " + JSON.stringify(err));
            onError(err)
        });
};
export const signOut = (cb) => {
    localStorage.setItem(localStorageLoginKey, JSON.stringify(initialAuthInfo));
    setTimeout(cb, 100);
};


