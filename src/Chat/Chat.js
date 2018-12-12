import React, {Component} from 'react';
import firebase from 'firebase';

export default class Chat extends Component {
    constructor() {
        super();
        this.state = {

        };
        this.push = this.push.bind(this);
        this.displayChatMessage = this.displayChatMessage.bind(this);
    }
    componentWillMount(){
        let commentsRef = firebase.database().ref('posts');
        commentsRef.on('child_added', function (data) {
            this.displayChatMessage(data.val());
        });
    }
    push() {
        let message = document.getElementById("message").value;
        firebase.database().ref().child('posts').push({id: this.props.id , message: message}).
            then(result => console.log(`${result} ha inciado sesión`))
            .catch(error => console.log(`Error: ${error.code}: ${error.message}`));
        console.log('posted message to server');
    }
    displayChatMessage(data) {
    var messages = document.getElementById('messages');
    var newMessage = "Guest" + this.props.id + ": " + data.message;
    newMessage = "<div>" + newMessage + "<div>";
    messages.innerHTML = messages.innerHTML + newMessage;
    }

    render() {
        return (
            <div>
                <div id="username"/>
                <input id="message" type="text" placeholder="Message" className="box"/>
                    <button type="button" onClick={this.push}>Submit</button>
                    <div id="messages"/>
            </div>)
    }
}