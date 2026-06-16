import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Application from "../pages/Application/Application";

import UserForm from "../components/UserForm";

function AppRoutes() {

return(

<BrowserRouter>

<Routes>

<Route

path="/"

element={<Login/>}

/>

<Route

path="/dashboard"

element={<Dashboard/>}

/>

<Route

path="/application"

element={<Application/>}

/>

<Route

path="/form"

element={<UserForm/>}

/>

</Routes>

</BrowserRouter>

);

}

export default AppRoutes;