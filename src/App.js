import React, {Fragment, Component} from 'react'
import './App.css';
import UserSetup from './containers/UserSetup'

class App extends Component {

    render(){
        return (
            <Fragment>
                <UserSetup/>
            </Fragment>
        )
    }
}

export default App;
