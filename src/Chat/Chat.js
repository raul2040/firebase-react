import React, {Component} from 'react';
import firebase from 'firebase';
import './Chat.css';
import {Button} from 'reactstrap';
import { InputGroup, InputGroupAddon, Input } from 'reactstrap';


export default class Chat extends Component {
    constructor() {
        super();
        this.state = {
            userColor: null
        };
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
    randomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    displayChatMessage(data) {
    var messages = document.getElementById('messages');
    var newMessage = `<p style=color:${this.state.userColor[data.id]} class='user'>` + data.id  +"</p>" + ": " + "<p class='messageData'>" + data.message + "</p>";
    newMessage = "<div class='mensaje'>" + newMessage + "<div>";
    messages.innerHTML = messages.innerHTML + newMessage;
    }

    componentDidMount(){
        var ref = firebase.database().ref("posts");
        var that = this;
        const usersColor = {};
        ref.on('child_added',function (data) {
            usersColor[data.id] = that.randomColor();
            that.setState({userColor:usersColor});
            that.displayChatMessage(data.val())
        });
    }

    render() {
        return (
            <div>
                <div id="messages" style={{backgroundImage: `url(${this.props.photo})`, backgroundPosition:'center', backgroundRepeat:'no-repeat', backgroundSize:'100%'}}>
                </div>
                <InputGroup>
                    <Input id="message" type="text"  onKeyDown={this.push} placeholder="Message" className="box"/>
                    <InputGroupAddon  addonType="append"> <Button color="success" type="button" onClick={this.push}>Enviar</Button></InputGroupAddon>
                </InputGroup>
            </div>
        )
    }
}
