import React, {useState} from 'react'
import { Route, Switch, Redirect} from 'react-router-dom'

import './App.css';

import UserSetup from './containers/UserSetup'
import Login from './containers/Login'
import Register from './containers/Register'


const App = () => {

    const [currentUser, setCurrentUser] = useState(null)

    return (
        <Switch>
            <Route exact path='/' render={() => (
                !currentUser ?
                    <Redirect to='/login' /> :
                    <UserSetup />
            ) }/>
            <Route exact path='/login' render={() => <Login setCurrentUser={setCurrentUser}/>}/>
            <Route exact path='/register' component={Register} />
        </Switch>
    )
}

export default App;
