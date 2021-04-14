import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppRouter from '../container/router';

axios.defaults.baseURL = `http://localhost:5000`;
axios.defaults.withCredentials = true;

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState('');

    useEffect(() => {
        setIsLoggedIn(sessionStorage.userid);
      }, []);

    return (
        <>
            <AppRouter isLoggedIn={Boolean(isLoggedIn)} />
        </>
    )
}