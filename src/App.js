import './App.css';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import io from 'socket.io-client';
import LobbyScreen from './LobbyScreen';
import GameScreen from './GameScreen';

//import axios from 'axios';
//const socket = io();
//"proxy": "http://localhost:3000",
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
    function onConnect() {
      console.log('Connected to server');
    }

    function onDisconnect() {
      console.log('Disconnected from server');
    }

    function onRoomCreate(data){
      console.log(`Created room ${data.roomId}`);
      setRoomId(data.roomId);
      setInRoom(data.inRoom);
    }

    function onAllReady(data){
      console.log(`All Ready in room ${data.roomId}, Game start`);
      setRoomId(data.roomId);
      setInRoom(data.inRoom);
    }
    function onRoomFull(){
      alert("This room is full.");
    }
    function onRoomNotFound(){
      alert("This room does not exist.");
    }

    function onJoinedRoom(data){
      console.log(`Join room ${data.roomId}`);
      setRoomId(data.roomId);
      setInRoom(data.inRoom);
    }

    function onLeaveRoom(data){
      console.log(data.msg);
      alert(data.msg);
      setInRoom(data.inRoom);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    /*******  Waiting Game Part  ********/
    socket.on("roomCreated", onRoomCreate);
    socket.on("allReady",onAllReady);
    socket.on("roomFull",onRoomFull);
    socket.on("roomNotFound",onRoomNotFound);
    socket.on("joinedRoom",onJoinedRoom)
    socket.on("leaveRoom", onLeaveRoom);
    socket.on("leaveGame",onLeaveRoom);


    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off("roomCreated", onRoomCreate);
      socket.off("allReady",onAllReady);
      socket.off("roomFull",onRoomFull);
      socket.off("roomNotFound",onRoomNotFound);
      socket.off("leaveRoom", onLeaveRoom);
      socket.off("leaveGame",onLeaveRoom);
    };
  }, []);
  
  /* useEffect(() => {
    async function fetchData() {
      const result = await axios('/api/some-endpoint');
      setData(result.data);
    }
    fetchData();
  }, []); */

  const handleCreateGame = () => {
    console.log("create Game");
    socket.emit('createGame');
  };

  const handleCreateRoom = () => { 
    console.log("Create a room");
    socket.emit('createRoom');
  }

  const handleJoinRoom = roomId => {
    console.log(roomId);
    socket.emit('joinRoom',roomId);
  };
  
  return (
    <div className='App'>
      {/* {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))} */}      
      
      {isInRoom ? (
        <GameScreen Room={roomId} socket = {socket}/>
      ) : (
        <LobbyScreen onCreateGame={handleCreateGame} onCreateRoom = {handleCreateRoom} onJoinRoom={handleJoinRoom}/>
      )}
    </div>
  );
}

export default App;
