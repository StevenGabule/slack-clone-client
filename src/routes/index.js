import React from "react";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import CreateTeam from "./CreateTeam";

const Root = ({refetch, session}) => (
    <BrowserRouter>
        <Switch>
            <Route path={'/'} exact component={Home}/>
            <Route path={'/register'} render={() => <Register refetch={refetch} session={session} />}/>
            <Route path={'/login'} render={() => <Login refetch={refetch} session={session}/>}/>
            <Route path={'/create-team'} render={() => <CreateTeam session={session} />}/>
            <Redirect to={'/'}/>
        </Switch>
    </BrowserRouter>
);

export default Root;
