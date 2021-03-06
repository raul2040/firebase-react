import React, {Component} from 'react';
import firebase from 'firebase';
import './App.css';
import FileUpload from './FileUpload/FileUpload';
import CustomModal from './CustomModal/CustomModal';
import CustomHeader from './customHeader/customHeader';
import Chat from './Chat/Chat';
import {Button, Nav, NavItem} from 'reactstrap';
import logoFirebase from './img/Firebase.png';
import notUserImg from './img/notUserImg.png';

class App extends Component {
    constructor() {
        super();
        this.state = {
            user: null,
            photoUrl: ""
        };
        this.renderSignInLayout = this.renderSignInLayout.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.addImageToState = this.addImageToState.bind(this);
        this.handleUserImg = this.handleUserImg.bind(this);
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
    handleAuthmanually(email, password) {
        new firebase.auth().createUserWithEmailAndPassword(email, password).catch(error => alert(error + " ha ocurrido un error"));
    }

    handleAuthWithEmail(email, password) {
        new firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(error => alert(error))
    }

    handleUserImg() {
        let urlPhoto = this.state.user.photoURL !== null ? this.state.user.photoURL : notUserImg;
        return (
            <img src={urlPhoto} alt={this.state.user.displayName}/>
        )
    }

    renderSignInLayout() {
        if (this.state.user) {
            return (
                <div id='contents'>
                    <h1>Hola {this.state.user.displayName}!</h1>
                    {this.handleUserImg()}
                    <div id="contents-body">
                        <Chat id={this.state.user.displayName} photo={this.state.photoUrl}/>
                    </div>
                    <div>
                        <FileUpload url={this.addImageToState}/>
                    </div>
                    <div id="close-session">
                        <Button color="danger" onClick={this.handleLogout}>Cerrar Sesión</Button>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div id={'preLogin'}>
                    <Nav>
                        <NavItem>
                            <Button color="primary" provider={"Google"} onClick={this.handleAuth}> Login con
                                Google </Button>
                        </NavItem>
                        <NavItem>
                            <CustomModal handleAuthUser={this.handleAuthUser} saveUser={this.handleAuthWithEmail}
                                         color="success"
                                         buttonLabel={"sign in / sign up"}/>
                        </NavItem>
                    </Nav>
                    <img id={'logo'} src={logoFirebase} alt={"firebase"}/>
                </div>
            )
        }
    }

    handleLogout() {
        firebase.auth().signOut();
    }

    handleAuthUser(email, password) {
        new firebase.auth().signInWithEmailAndPassword(email, password)
            .catch(error => alert(error))
    }

    addImageToState(url) {
        this.setState({
            photoUrl: url
        })
    }

    render() {
        let modal = this.state.user ? null : <CustomModal save={this.handleAuthmanually} color="success" buttonLabel={"Registrarse"}/>;
        return (
            <div className="App">
                <CustomHeader title={"Proyecto despliegue de aplicaciones web"}
                              description={"Desarrollado por: Raúl Avilés, Adrián Carmona e Iván Román"}
                />
                <div className={'buttons'}>
                    {this.renderSignInLayout()}
                </div>
            </div>
        );
    }
}

export default App;
