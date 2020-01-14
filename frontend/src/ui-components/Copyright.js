import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import React from "react";

export default function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            {'Aktivist | komm mit - hilf deiner Community'}
            {' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}