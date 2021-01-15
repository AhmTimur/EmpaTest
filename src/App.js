import './App.css'
import React from 'react'
import {Provider} from 'react-redux'
import store from './redux/redux-store'
import 'bootstrap/dist/css/bootstrap.min.css'
import {history} from './history'
import MainRouter from './components/MainRouter/MainRouter'
import {Router} from 'react-router'

const App = () => {
    return (
        <Provider store={store}>
            <Router history={history}>
                <MainRouter/>
            </Router>
        </Provider>
    )
}

export default App
