import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import PeopleIcon from '@material-ui/icons/People';
import List from "@material-ui/core/List";
import Avatar from "@material-ui/core/Avatar";
import Drawer from "@material-ui/core/Drawer";
import logo from './static/images/logo.jpg';
import {BrowserRouter, Route, Link} from "react-router-dom";


export const mainListItems = (
    <div>
        <ListItem button component={Link} to="/finder">
            <ListItemIcon>
                <SearchIcon/>
            </ListItemIcon>
            <ListItemText primary="Finder"/>
        </ListItem>
        <ListItem button component={Link} to="/profil">
            <ListItemIcon>
                <PersonIcon/>
            </ListItemIcon>
            <ListItemText primary="Profil"/>
        </ListItem>
        <ListItem button component={Link} to="/auszeichnungen">
            <ListItemIcon>
                <EmojiEventsIcon/>
            </ListItemIcon>
            <ListItemText primary="Auszeichnungen"/>
        </ListItem>
        <ListItem button component={Link} to="/engagement-typ">
            <ListItemIcon>
                <PeopleIcon/>
            </ListItemIcon>
            <ListItemText primary="Engagement-Typ"/>
        </ListItem>
        <ListItem>
            <ListItemIcon>
                <img alt="Logo" src={logo} width={24} height={24} />
            </ListItemIcon>
        </ListItem>
    </div>
);
