import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login'
import Register from './Register'
import Dashboard from './Dashboard'
import App from './App'
const Router = () => {
    return(
        <div>
        <Routes>
        <Route path='/login' element={(<Login></Login>)}/>
        <Route path='/register' exact element={(<Register></Register>)}></Route>
        <Route path='/home' exact element={(<Dashboard></Dashboard>)}></Route>
        <Route path='/app' element={(<App></App>)}></Route>
        </Routes>
        </div>
    )
}

export default Router