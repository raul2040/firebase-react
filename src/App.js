import React, {Component} from 'react';
import firebase from 'firebase';
import './App.css';
import FileUpload from './FileUpload/FileUpload';
import Modal from './Modal/Modal';

class App extends Component {
    constructor() {
        super();
        this.state = {
            user: null
        };
        this.renderLoginButton = this.renderLoginButton.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }
    componentWillMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({user});
        });
    }

    handleAuth() {
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider)
            .then(result => console.log(`${result.user.email} ha inciado sesión`))
            .catch(error => console.log(`Error: ${error.code}: ${error.message}`))
    }
    renderLoginButton() {
        if(this.state.user) {
            return(
                <div>
                    <img src={this.state.user.photoURL} alt={this.state.user.displayName} />
                    <p>Hola {this.state.user.displayName}!</p>
                    <button onClick={this.handleLogout}>Cerrar Sesión</button>
                    <FileUpload/>
                </div>
            )
        }
        else{
            return (<button onClick={this.handleAuth}> Login con Google </button>)
        }
    }
    handleLogout() {
        firebase.auth().signOut();
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h2>Proyecto despliegue de aplicaciones web</h2>
                </header>
                    <Modal/>
                   <p className={"App-intro"}>
                    {this.renderLoginButton()}
                </p>
            </div>
        );
    }
}

export default App;
