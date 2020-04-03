import React, { Component } from 'react';
import { Widget, addResponseMessage,toggleMsgLoader,toggleInputDisabled,setQuickButtons, addLinkSnippet, addUserMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import logo from 'assets/img/logo/doc_covid.png';

import {ApiAiClient} from 'api-ai-javascript';
const accessToken='6c5db87a66114b7494ef682a29127dc2';
const client=new ApiAiClient({accessToken});

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      badge:1,
      activo:true
    };
  }

  componentDidMount() {
    addResponseMessage("¡Hola! ¿como puedo ayudarte?");
  }

 onSuccess(response){
   toggleMsgLoader();  
   toggleInputDisabled();
    console.log(response.result.fulfillment.speech)
    addResponseMessage(response.result.fulfillment.speech);
    let isLoggedIn = this.state.activo;
    
    if(isLoggedIn){
      addLinkSnippet ({
        title: 'Estoy en facebook',
        link: 'https://www.facebook.com/drcovidcol/',
        target: '_blank'
      })
     this.setState({activo:false})
    }
   
}

handleQuickButtonClicked = (e) => {
  addResponseMessage('Jose Luis tu ' + e);
  setQuickButtons([]);
}

handleNewUserMessage = (newMessage) => {   
  this.setState({badge:0}) 
    toggleMsgLoader();
    toggleInputDisabled();
    setTimeout(() => {    
      if (newMessage === 'desarrollador') {
        setQuickButtons([ { label: 'Jose', value: 'Eres lo maximo !!' }, { label: 'Luis', value: 'Eres lo maximo !!' }, { label: 'Sarta', value: 'Eres lo maximo !!' }, { label: 'Alvarez', value: 'Eres lo maximo !!' } ]);
      } else {
        client.textRequest(newMessage).then(this.onSuccess.bind(this))
      }
    }, 1000);
  }


  render() {
    return (
      <div className="Chat">
        <Widget
          handleNewUserMessage={this.handleNewUserMessage}
          title="DR.Covid"
          profileAvatar={logo}
          titleAvatar={logo}
          senderPlaceHolder="Escribe un mensaje..."
          subtitle="Preguntame sobre coronavirus COVID19"
          handleQuickButtonClicked={this.handleQuickButtonClicked}
          badge={this.state.badge}
        />
      </div>
    );
    }
}

export default Chat;
