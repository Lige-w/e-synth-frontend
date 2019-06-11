import React, {Component} from 'react'

class Pad extends Component{

    render() {
        return (
            <div className='pad'>
               This is pad {this.props.pad}
            </div>
        );
    }
}

export default Pad