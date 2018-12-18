import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, InputGroupAddon, Input} from 'reactstrap';
import './CustomModal.css';

class CustomModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            username: "",
            password: "",
            repeatPass: ""
        };

        this.toggle = this.toggle.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleInfo = this.handleInfo.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    handleRegister() {
        this.props.save(this.state.username, this.state.password);
    }
    handleInfo() {
        let showButton = this.state.password !== "" ?
            <Button color="primary" onClick={this.handleRegister}>Registrarse</Button> : "";
            return showButton;
    }

    render() {
        return (
            <div>
                <Button color={this.props.color} onClick={this.toggle}>{this.props.buttonLabel}</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Registro</ModalHeader>
                    <ModalBody>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">@</InputGroupAddon>
                            <Input onKeyDown={e => {
                                this.setState({
                                    username: e.target.value
                                })
                            }} placeholder="email"/>
                        </InputGroup>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">🔐</InputGroupAddon>
                            <Input onKeyDown={e => {
                                this.setState({
                                    password: e.target.value
                                })
                            }} placeholder="password"/>
                        </InputGroup>
                    </ModalBody>
                    <ModalFooter>
                        {this.handleInfo()}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default CustomModal;