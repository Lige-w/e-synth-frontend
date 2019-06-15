import React, {useState, useEffect} from 'react'
import { Route, Switch, Redirect} from 'react-router-dom'

import './App.css';

import UserSetup from './containers/UserSetup'
import Login from './containers/Login'
import Register from './containers/Register'
import Fetch from './helpers/Fetch'


const App = () => {

    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            Fetch.AUTH(Fetch.AUTH_URL, token)
                .then(user => {
                    console.log(user)
                    setLoading(false)
                    setCurrentUser(user)
                })
        } else {
            setLoading(false)
        }
    },[])

    const showSetup = () => loading ? null : (
        currentUser ? <UserSetup /> : <Redirect to="/login" />
    )

    const showLogIn = () => loading ? null : (
        currentUser ?
            <Redirect to="/setup" /> :
            <Login setCurrentUser={setCurrentUser} />
    )



    return (
        <Switch>
            <Route exact path='/' render={() => <Redirect to="/setup"/>} />
            <Route exact path='/login' render={showLogIn}/>
            <Route exact path='/register' render={() => (
                currentUser ? <Redirect to='/setup' /> :  <Register setCurrentUser={setCurrentUser}/>
            )} />
            <Route exact path='/setup' component={showSetup} />
        </Switch>
    )
}

export default App;
