import React , {Component} from 'react';

import { Link, BrowserRouter, useHistory } from "react-router-dom";

export default function ChangeRoute(route) {
    let history = useHistory();
    history.push("/"+route);
}