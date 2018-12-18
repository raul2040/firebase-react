import React, {Component} from 'react';
import firebase from 'firebase';
import './Chat.css';
import {Button} from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';


export default class Chat extends Component {
    constructor() {
        super();
        this.state = {};
        this.push = this.push.bind(this);
    }
    push(e) {
        if(e.keyCode === 13 ||e.keyCode === undefined) {
            let message = document.getElementById("message").value;
            document.getElementById('message').value = "";
            firebase.database().ref().child('posts').push({
                id: this.props.id,
                message: message
            }).then(result => console.log(`${result} ha inciado sesión`))
                .catch(error => console.log(`Error: ${error.code}: ${error.message}`));
            console.log('posted message to server');
        }
    }

    displayChatMessage(data) {
    var messages = document.getElementById('messages');
    var newMessage = "<p class='user'>" + data.id  +"</p>" + ": " + "<p class='messageData'>" + data.message + "</p>";
    newMessage = "<div class='mensaje'>" + newMessage + "<div>";
    messages.innerHTML = messages.innerHTML + newMessage;
    }

    componentDidMount(){
        var ref = firebase.database().ref("posts");
        var that = this;
        ref.on('child_added',function (data) {
            that.displayChatMessage(data.val())
        });
    }

    render() {
        return (
            <div>
                <div id="username"/>
                <InputGroup>
                    <Input id="message" type="text"  style={{width:"30%"}} onKeyDown={this.push} placeholder="Message" className="box"/>
                    <InputGroupAddon style={{width:"30%"}} addonType="append"> <Button color="success" type="button" onClick={this.push}>Submit</Button></InputGroupAddon>
                </InputGroup>
                <div id="messages" style={{backgroundImage: `url(${this.props.photo})`}} />
            </div>
        )
    }
}
