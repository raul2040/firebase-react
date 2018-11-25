import React, {Component} from 'react';
import firebase from 'firebase';

class FileUpload extends Component {
    constructor() {
        super();
        this.state = {
            uploadValue: 0,
            picture: null
        };
        this.handleUpload = this.handleUpload.bind(this);
    }

    handleUpload(event) {
        const file = event.target.file[0];
        const storageRef = firebase.storage().ref(`/fotos/${file.name`);
        const task = storageRef.put(file);
    }

    render() {
        return (
            <div>
                <progress value={this.state.uploadValue} max="100"/>
                <br/>
                <input type="file" onChange={this.handleUpload}/>
                <br />
                <img width="320" src={this.state.picture} alt="" />
            </div>
        );
    }
}

export default FileUpload;