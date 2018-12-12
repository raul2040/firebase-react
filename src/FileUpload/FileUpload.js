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
        const file = event.target.files[0];
        const storageRef = firebase.storage().ref(`/fotos/${file.name}`);
        const task = storageRef.put(file);

        task.on('state_changed' , snapshot => {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.setState({
                uploadValue:percentage
            })
        }, error => {
            console.log(error.message)
        },  () =>{
            storageRef.getDownloadURL().then(url => {
                this.setState({
                    picture: url,
                    uploadValue:0
                });
                this.props.url(this.state.picture);
            })
        });
    }

    render() {
        return (
            <div>
                <progress value={this.state.uploadValue} max="100"/>
                <br/>
                <input type="file" onChange={this.handleUpload}/>
                <br />
            </div>
        );
    }
}

export default FileUpload;