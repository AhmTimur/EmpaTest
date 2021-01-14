import './App.css'
import React from 'react'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import {Provider} from "react-redux"
import store from "./redux/redux-store"
import Users from "./components/Users/Users"
import LoginPage from "./components/LoginPage/LoginPage"
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
 return (
     <Switch>
         <Route exact path='/' render={()=> <Redirect to={'/login'}/> }/>
         <Route path='/login' render={()=> <LoginPage/> }/>
         <Route path='/users' render={()=> <Users/>}/>
         <Route path="*" render={() => <div>404 PAGE IS NOT FOUND</div>}/>
     </Switch>

     )
}

const AppContainerWrap = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    )
}

export default AppContainerWrap;
