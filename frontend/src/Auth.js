import {Redirect, Route, useHistory} from "react-router-dom";
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import LockIcon from '@material-ui/icons/Lock';

const localStorageLoginKey = 'loggedIn';

// Note: custom hook functions need to start with 'use'
// const useLoginStateWithLocalStorage = () => {
//     const [value, setValue] = useState(
//     localStorage.getItem(localStorageLoginKey) || ''
//     );
//     useEffect(() => {
//         localStorage.setItem(localStorageLoginKey, value);
//     }, [value]);
//     return [value, setValue];
// };
//
// export const useIsLoggedIn = () => {
//     const [isLoggedIn] = useLoginStateWithLocalStorage();
//     return isLoggedIn !== '';
// };
//
// export const useLogin = (cb) => {
//     const [_, setLoggedIn] = useLoginStateWithLocalStorage();
//     setTimeout(() => {
//         setLoggedIn(true);
//         cb()
//     }, 100); // fake async
// };
//
// export const useSignout = (cb) => {
//     const [_, setLoggedIn] = useLoginStateWithLocalStorage();
//     setTimeout(() => {
//         setLoggedIn(false);
//         cb()
//     }, 100); // fake async
// };

export function LogoutButton(props) {
    let history = useHistory();

    return isLoggedIn() ? (
            <IconButton color="inherit"
                        onClick={() => {
                            signOut(() => history.push("/"));
                        }}>
                <LockIcon/>
                <Typography component="h3" variant="h6" color="inherit" noWrap
                            className={props.className}>
                    Logout
                </Typography>
            </IconButton>)
        : (<p/>);
}

export const isLoggedIn = () => {
    return sessionStorage.getItem(localStorageLoginKey) === 'loggedIn';
};
export const login = (cb) => {
    sessionStorage.setItem(localStorageLoginKey, 'loggedIn');
    setTimeout(cb, 100); // fake async
};
export const signOut = (cb) => {
    sessionStorage.setItem(localStorageLoginKey, '');
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
