import React, {Component} from 'react'
import { Icon } from 'semantic-ui-react'
import Pad from '../components/Pad'

class PadContainer extends Component {
    state = {
        pads: [1, 2, 3]
    }

    render() {
        const padComponents = this.state.pads.map(pad => (
            <Pad pad={pad}/>
        ))
        return (
            <div id='pad-container'>
                {padComponents}
            </div>
        );
    }
}

export default PadContainer