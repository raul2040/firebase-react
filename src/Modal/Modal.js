import React, {Component} from 'react';
import './Modal.css'

class Modal extends Component {
    constructor() {
        super();
        this.state = {

        }
    }
    render() {
        return(
            <div className={"Modal"}>
                <h2>Email</h2>
                <br/>
                <input type='text'/>
                <h2>Password</h2>
                <input type="password"/>
            </div>

        )
    }
}

export default Modal;