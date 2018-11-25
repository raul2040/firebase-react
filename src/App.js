import React, {Component} from 'react';
import firebase from 'firebase';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            user: null
        };
        this.renderLoginButton = this.renderLoginButton.bind(this);
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
                </div>
            )
        }
        else{
            return (<button onClick={this.handleAuth}> Login con Google </button>)
        }
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h2>Proyecto despliegue de aplicaciones web</h2>
                </header>
                <p className={"App-intro"}>
                    {this.renderLoginButton()}
                </p>
            </div>
        );
    }
}

export default App;
