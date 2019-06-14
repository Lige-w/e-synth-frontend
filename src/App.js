import React, {useState} from 'react'
import './App.css';
import UserSetup from './containers/UserSetup'
import Login from './containers/Login'
import { Route, Switch, Redirect} from 'react-router-dom'

const App = () => {

    const [currentUser, setCurrentUser] = useState(null)

    return (
        <Switch>
            <Route exact path='/' render={() => (
                !currentUser ?
                    <Redirect to='/login' /> :
                    <UserSetup currentUser={currentUser}/>
            ) }/>
            <Route exact path='/login' component={Login}/>
        </Switch>
    )
}

export default App;
