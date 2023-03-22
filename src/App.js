//import './App.css';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import io from 'socket.io-client';
import LoadingScreen from './LoadingScreen';
import GameScreen from './GameScreen';

//import axios from 'axios';
const socket = io();

function App() {

  useEffect(() => {
    fetch('')
      .then(resp => {
        console.log(resp);
        console.log('======success=======');
      })
      .catch(err => {
        console.log('======failure=======');
        console.log(err);
      });
  }, [])

  const [isInRoom, setInRoom] = useState(false);
  const [roomId, setRoomId] = useState(-1);
  
  
  useEffect(() => {
    socket.on('connection', () => {
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    /*******  Waiting Game Part  ********/
    socket.on("roomCreated", (data) => {
      console.log(`Created room ${data.roomId}`);
      setRoomId(data.roomId);
      setInRoom(data.inRoom);
    });

    socket.on("allReady", (data) => {
      console.log(`All Ready in room ${data.room}, Game start`);
      setRoomId(data.roomId);
      setInRoom(data.inRoom);
    });

    socket.on("roomFull", () => {
      alert("This room is full.");
    });
  
    socket.on("roomNotFound", () => {
        alert("This room does not exist.");
    });
    
  }, [/* socket */]);

  
  /* useEffect(() => {
    async function fetchData() {
      const result = await axios('/api/some-endpoint');
      setData(result.data);
    }
    fetchData();
  }, []); */

  const handleCreateGame = () => {
    console.log("create Game");
    socket.emit('createRoom');
  };

  const handleJoinRoom = roomId => {
    console.log(roomId);
    socket.emit('joinRoom', { roomId });
  };

  const handleLeaveRoom = () =>{
    socket.emit('leaveGame');
  };

  
  
  return (
    <div className='App'>
      {/* {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))} */}      
      
      {isInRoom ? (
        <GameScreen Room={roomId} socket = {socket}/>
      ) : (
        <LoadingScreen onCreateGame={handleCreateGame} onJoinRoom={handleJoinRoom} />
      )}
    </div>
  );
}

export default App;
