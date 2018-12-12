import React, {Component} from 'react';
import firebase from 'firebase';
import './App.css';
import FileUpload from './FileUpload/FileUpload';
import CustomModal from './CustomModal/CustomModal';
import CustomHeader from './customHeader/customHeader';
import Chat from './Chat/Chat';
import {Button} from 'reactstrap';

class App extends Component {
    constructor() {
        super();
        this.state = {
            user: null,
            photoUrl: ""
        };
        this.renderLoginButton = this.renderLoginButton.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.addImageToState = this.addImageToState.bind(this);
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({user});
        });
    }

    handleAuth(e) {
        const provider = e.target.getAttribute('Provider') === "Google" ?
            new firebase.auth.GoogleAuthProvider() : new firebase.auth.EmailAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(result => console.log(`${result.user.email} ha inciado sesión`))
            .catch(error => console.log(`Error: ${error.code}: ${error.message}`))
    }

    renderLoginButton() {
        if (this.state.user) {
            return (
                <div id='contents'>
                        <img src={this.state.user.photoURL} alt={this.state.user.displayName}/>
                    <div id="contents-body">
                        <h1>Hola {this.state.user.displayName}!</h1>
                        <FileUpload url={this.addImageToState}/>
                        <Chat id={this.state.user.displayName} photo={this.state.photoUrl}/>
                        <Button color="danger" onClick={this.handleLogout}>Cerrar Sesión</Button>
                    </div>
                </div>
            )
        }
        else {
            return (
                <Button color="success" provider={"Google"} onClick={this.handleAuth}> Login con Google </Button>
            )
        }
    }

    handleLogout() {
        firebase.auth().signOut();
    }

    addImageToState(url) {
        this.setState({
            photoUrl:url
        })
    }

    render() {
        let modal = this.state.user ? null : <CustomModal color="success" buttonLabel={"Registrarse"}/>;
        return (
            <div className="App">
                <CustomHeader title={"Proyecto despliegue de aplicaciones web"}
                              description={"Desarrollado por: Raúl Avilés, Adrián Carmona e Iván Román"}
                />
                <div className={'buttons'}>
                    {this.renderLoginButton()}
                    {modal}
                </div>
            </div>
        );
    }
}

export default App;
