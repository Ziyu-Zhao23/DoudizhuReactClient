import React, { useState } from 'react';

export default function LobbyScreen({ onCreateGame, onCreateRoom, onJoinRoom}) {
    const [roomId, setRoomId] = useState('');
  
    const handleCreateGameClick = () => {
      onCreateGame();
    };

    const handleCreateRoomClick = () =>{
      onCreateRoom();
    }
  
    const handleJoinGameClick = () => {
      if(roomId !== ""){
        onJoinRoom(roomId);
      }
      else alert("Please input value");
      
    };
  
    const handleRoomIdChange = event => {
      setRoomId(event.target.value);
    };
  
    return (
      <div className='LobbyPage'>
        {/* <img src={require('./assets/...').default} width='200px'/> */}
        <h1>Dou dizhu</h1>
        <button className='Buttons' onClick={()=>handleCreateGameClick()}>Start Game</button>
        <button className='Buttons' onClick={()=>handleCreateRoomClick()}>Create Room</button>
        <div className='lobbypage-join'>
          <input type="text" placeholder='RoomID' value={roomId} onChange={(event)=>handleRoomIdChange(event)} />
          <button className='Buttons' onClick={()=>handleJoinGameClick()}>Join Game</button>
        </div>
        {/* <div> 0 rooms</div> */}
      </div>
    );
}

  