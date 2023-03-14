import React, { useEffect, useState } from 'react';
import Card from './Card';

export default function GameScreen({ Room, socket/* , onPlayCards  */}) {

  //initialize game state
  const [isTurn, setTurn] = useState(false);
  const [isLandlord, setLandlord] = useState(false);

  const [bottomCards, setBottomCards] = useState([]);
  const [handList,setHandList] = useState([]);
  const [lastPlayedCategory,setLastPlayedCategory] = useState([]);
  const [selectedCards, setSelectedCards] = useState([1,2]);
  const [playingCards] = useState([]);
  
  const [player2Id,setPlayer2Id] = useState(-1);  
  const [player2HandLength,setPlayer2HandLength] = useState(0);
  const [player3Id,setPlayer3Id] = useState(-1);
  const [player3HandLength,setPlayer3HandLength] = useState(0);
  //const [] = useState([])

  setHandList([0,1,2,3,4,8,12]);

  const sendToSever = (type,data) => {
    console.log("Message =" + JSON.stringify(data));
    socket.emit("message", {
        type: type,       
        data: data,
    });
  };

  //press play Button
  const handlePlayCards = () => {
    if(beat()){
      sendToSever('playhand', { 
        msg:"played Hand(pass_turn)",
        playedcards: selectedCards });
    }
    else alert("Error category, try again");
  };

  //press Don't play Button
  const handleDontPlay = () =>{
    sendToSever("dontplay",{
      msg:"Don't playHand(pass_turn)"});
  }       

  //click a card
  const handleCardClick = cardId => {
    if (selectedCards.includes(cardId)) {
      setSelectedCards(selectedCards.filter(c => c !== cardId));
    } else {
      setSelectedCards([...selectedCards, cardId]);
    }
  };

  /* useEffect(() => {
    socket.on("respond", (res) =>{
      const { data, type } = res;
      // eslint-disable-next-line default-case
      switch (type) {
        case "startgame":
          alert(data.msg);
          setHandList(data.cardlist);
          console.log(handList);
          //!!!cleanShowedCards(); 
          
          setPlayer2Id(data.nextplayer1Id);
          setPlayer2HandLength(data.nextplayer1length);
          setPlayer3Id(data.nextplayer2Id);
          setPlayer3HandLength(data.nextplayer2length);
          console.log(player2HandLength);
          console.log(player3HandLength);  
          break;
      }
    });
  }, [socket]); */

  const beat = function(){
    return true;
  };

  return (
    <div className='game-scrren'>
      {/* <img src={require('../assets/logo.png').default} /> */}
      <h1>Room {Room}</h1>
      <div id="bottomCards" className="showedCards" style={{pointerEvents: 'none'}}></div>
      <div id="player1Hands" className="hand">
        <p className='player1DeckText'>Your hand</p>
        {handList.map((id) => (
          <Card 
            key={id} 
            card = {id}
            toggleCard = {handleCardClick}
          />
        ))}
      </div>
      <div id ="player2Hands" className="backhand" >
        {player2HandLength}
      </div>
      <div id = "player3Hands" className="backhand" style={{pointerEvents: 'none'}}>
        {player3HandLength}
      </div>
      
      <div id ="resultText" className="text">Text</div>
      <div id="timeDisplay" className="text"></div>
      
      <div id="playedCards" className="showedCards" style={{pointerEvents: 'none'}}></div>

      <div class="buttons">         
          <button id="playHandButton" onClick={()=>handlePlayCards()}>Play Hand</button>
          <button id="donotPlayButton" onClick={()=>handleDontPlay()}>Don't play</button>
          <button id="leaveButton">Leave Game</button>
      </div>

      <div>
        {/* gameState.currentPlayerCards.map(card => (
          <div key={card} onClick={() => handleCardClick(card)}>
            {card} {selectedCards.includes(card) && '(selected)'}
          </div>
        )) */}
      </div>
      <button onClick={handlePlayCards}>Play Cards</button>
    </div>
  );
}