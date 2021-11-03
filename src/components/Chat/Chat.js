import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { socket } from '../../helpers/socket';


import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';
import './Chat.css';

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  // const ENDPOINT = 'localhost: 5000';
  const ENDPOINT = " https://project-realtime-chatapp.herokuapp.com/";
  
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    console.log(name, room);
    
    setName(name);
    setRoom(room);

    //a user joins
    socket.emit('join', {name, room}, (error) => {
      if (error) {
        do{
          alert(error + " Please use another username!")
        }while(error);
      }
    });

    return () => {
       socket.disconnect();
       socket.off();
    }

  }, [ENDPOINT, location.search]);
  
  //useEffect hook for handling messages
  useEffect(() => {
    socket.on('message', (message) => {
       setMessages([...messages, message]);
     });

     socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  });


  //function for sending messages by users
  const sendMessage = (event) => {
    event.preventDefault()
    
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''))
    }
  }

  console.log(message, messages);

  return(
    <div className="outerContainer">
        <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} room={room} />
          <Input
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </div>
        <TextContainer users={users}/>
      </div>
  )
}

export default Chat