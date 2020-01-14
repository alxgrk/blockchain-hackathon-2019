import {useHistory} from "react-router";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import LockIcon from "@material-ui/core/SvgIcon";
import React from "react";
import {getAuthInfo, isLoggedIn, signOut} from "./service";

export default function LogoutButton(props) {
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