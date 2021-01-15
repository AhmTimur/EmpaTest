import {Redirect, Route, Switch} from 'react-router'
import LoginPage from '../LoginPage/LoginPage'
import Users from '../Users/Users'
import React from 'react'
import {connect} from 'react-redux'

const MainRouter = (props) => {
    const verifyToken = !!localStorage.getItem('Token') || props.token

    return <Switch>
        <Route exact path='/' render={() => <Redirect to='/login'/>}/>
        <Route path='/login' render={() => <LoginPage/>}/>
        <Route path='/users' render={() => verifyToken ? <Users/> : <Redirect to='/login'/>}/>
        <Route path="*" render={() => <div>404 PAGE IS NOT FOUND</div>}/>
    </Switch>
}

const mapStateToProps = (state) => ({
    token: state.auth.token
})

export default connect(mapStateToProps)(MainRouter)