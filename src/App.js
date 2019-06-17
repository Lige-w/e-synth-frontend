import React, {useState, useEffect} from 'react'
import { Route, Switch, Redirect} from 'react-router-dom'

import './App.css';

import Profile from './containers/Profile'
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
                .then( ({ user }) => {
                    console.log(user)
                    setLoading(false)
                    setCurrentUser(user)
                })
        } else {
            setLoading(false)
        }
    },[])

    const addUserSetup = (setup) => {
        const userCopy = {...currentUser}
        userCopy.setups = [...userCopy.setups, setup]
        setCurrentUser(userCopy)
    }

    const showRegister = () => loading ? null : (
        currentUser ? <Redirect to={`/${currentUser.username}`} /> : <Register />
    )

    const showLogIn = () => loading ? null : (
        currentUser ?
            <Redirect to={`/${currentUser.username}`} /> :
            <Login setCurrentUser={setCurrentUser} />
    )

    const redirectHome = () => loading ? null : (
        currentUser ? <Redirect to={`/${currentUser.username}`} />: <Redirect to="/login" />
    )


    return (
        <Switch>
            <Route exact path='/' render={redirectHome}/>
            <Route exact path='/login' render={showLogIn}/>
            <Route exact path='/register' render={showRegister} />
            {currentUser ?
                <Route exact path={`/${currentUser.username}`} render={(routerProps) => (
                    <Profile {...routerProps} addUserSetup={addUserSetup} user={currentUser} />
                )} /> :
                <Redirect to='/login' />}
        </Switch>
    )
}

export default App;
