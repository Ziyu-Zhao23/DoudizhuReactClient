import React, { useState } from 'react';

export default function LoadingScreen({ onCreateGame, onJoinRoom }) {
    const [roomId, setRoomId] = useState('');
  
    const handleCreateGameClick = () => {
      onCreateGame();
    };
  
    const handleJoinGameClick = () => {
      if(roomId !== ""){
        onJoinRoom(roomId);
      }
      
    };
  
    const handleRoomIdChange = event => {
      setRoomId(event.target.value);
    };
  
    return (
      <div className='LoadPage'>
        {/* <img src={require('./assets/...').default} width='200px'/> */}
        <h1>Waiting for players...</h1>
        <button className='Buttons' onClick={()=>handleCreateGameClick()}>Start Game</button>
        <div className='loading-join'>
          <input type="text" placeholder='RoomID' value={roomId} onChange={()=>handleRoomIdChange()} />
          <button className='Buttons' onClick={()=>handleJoinGameClick()}>Join Game</button>
        </div>
        <div> 0 rooms</div>
      </div>
    );
}

  