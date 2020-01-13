import {Redirect, Route, useHistory} from "react-router-dom";
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import LockIcon from '@material-ui/icons/Lock';
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

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
export function PrivateRoute({children, ...rest}) {
    return (
        <Route
            {...rest}
            render={({location}) =>
                isLoggedIn() ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: {from: location}
                        }}
                    />
                )
            }
        />
    );
}

export function LogoutButton(props) {
    let history = useHistory();

    return isLoggedIn() ? (
            <IconButton color="inherit"
                        onClick={() => {
                            signOut(() => history.push("/"));
                        }}>
                <Typography component="h3" variant="h6" color="inherit" noWrap
                            className={props.className}>
                    {getAuthInfo().vorname !== '' ? getAuthInfo().vorname + ' ' : 'Logout '}
                </Typography>
                <LockIcon/>
            </IconButton>)
        : (<p/>);
}
