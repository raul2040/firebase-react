import React, {Component} from 'react';
import firebase from 'firebase';
import './App.css';
import FileUpload from './FileUpload/FileUpload';
import CustomModal from './CustomModal/CustomModal';
import CustomHeader from './customHeader/customHeader';

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
        if (this.state.user) {
            return (
                <div>
                    <img src={this.state.user.photoURL} alt={this.state.user.displayName}/>
                    <p>Hola {this.state.user.displayName}!</p>
                    <button onClick={this.handleLogout}>Cerrar Sesión</button>
                    <FileUpload/>
                </div>
            )
        }
        else {
            return (<button onClick={this.handleAuth}> Login con Google </button>)
        }
    }

    handleLogout() {
        firebase.auth().signOut();
    }

    render() {
        let modal = this.state.user ? null : <CustomModal color={"success"} buttonLabel={"Registrarse"}/>;
        return (
            <div className="App">
                <CustomHeader title={"Proyecto despliegue de aplicaciones web"}
                              description={"Desarrollado por: Raúl Avilés, Adrian Carmona e Iván Román"}
                />
                {this.renderLoginButton()}
                {modal}
            </div>
        );
    }
}

export default App;
