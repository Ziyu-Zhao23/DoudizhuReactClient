import React, { useEffect, useState } from 'react';
import Card from './Card';

import one from './assets/1.png'

export default function GameScreen({ Room, socket/* , onPlayCards  */}) {

  //initialize game state
  const [isTurn, setTurn] = useState(false);
  const [isLandlord, setLandlord] = useState(false);

  const [bottomCards, setBottomCards] = useState([]);
  const [handList,setHandList] = useState([]);
  const [lastPlayedCategory,setLastPlayedCategory] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  //const [playingCards] = useState([]);
  
  const [player2Id,setPlayer2Id] = useState(-1);  
  const [player2HandLength,setPlayer2HandLength] = useState(0);
  const [player3Id,setPlayer3Id] = useState(-1);
  const [player3HandLength,setPlayer3HandLength] = useState(0);

  const [resultText,setResultText] = useState('');
  const [timeDisplay,setTime] = useState(0);

  //const [disabledPlayBtn, setDisablePlayBtn] = useState(true);
  //const [] = useState([]) 

  console.log({
    isTurn,
    isLandlord,
    handList,
    selectedCards
  })


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
      
    /* if (selectedCards.includes(cardId)) {
      //callback funtion
      //log the updated state immediately after updating it
      setSelectedCards(prevArray =>{
        const newArray = prevArray.filter(c => c !== cardId);
        if(newArray.length < prevArray.length){
          console.log(`remove card ${cardId} from Selected Card List ${newArray} `);
        }  
        return newArray;      
      });  
    } else {
      setSelectedCards(prevArray => {
        const newArray = [...prevArray, cardId];
        if(newArray.length > prevArray.length){
          console.log(`add card ${cardId} to Selected Card List ${newArray} `);
        }
        return newArray;
      });
    } */
    if (selectedCards.includes(cardId)) {
      setSelectedCards(selectedCards.filter(c => c !== cardId));
      //console.log(`remove card ${cardId} from Selected Card List ${selectedCards} `);
    }
    else{
      setSelectedCards([...selectedCards, cardId])
      //console.log(`add card ${cardId} to Selected Card List ${selectedCards} `);
    }

    //console.log(selectedCards);
  };

  useEffect(() => {
    console.log(`Current handlist ${handList}`);
  },[handList]);

  useEffect(() => {
    console.log(`Current player2 Hand Length ${player2HandLength}`);
  },[player2HandLength]);

  useEffect(() => {
    console.log(`Current player3 Hand Length ${player3HandLength}`);
  },[player3HandLength]);

  useEffect(() => {
    console.log(`Landlord: ${isLandlord}`);
  },[isLandlord]);

  useEffect(() => {
    console.log(`Turn ${isTurn}`);
  },[isTurn]);

  useEffect(() => {
    console.log(`Last Played Category ${lastPlayedCategory}`);
  },[lastPlayedCategory]);

  useEffect(() => {
    
  },[timeDisplay]);

  /* socket part */
  useEffect(() => {

    socket.on("updatetimer", (remainingTime) => {
      setTime(remainingTime);
    });

    socket.on("respond", (res) =>{
      const { data, type } = res;
      // eslint-disable-next-line default-case
      switch (type) {
        case "startgame":
          alert(data.msg);
          setHandList(data.cardlist);
          //!!!cleanShowedCards(); 
          
          setPlayer2Id(data.nextplayer1Id);
          setPlayer2HandLength(data.nextplayer1length);
          setPlayer3Id(data.nextplayer2Id);
          setPlayer3HandLength(data.nextplayer2length);
/*           console.log(player2HandLength);
          console.log(player3HandLength);  */ 
          break;
        case "setlandlord":
          setResultText(data.msg + " You turn");

          setLandlord(data.landlord);
          setTurn(data.turn);
          break;
        case "showbottomcards":
          setBottomCards(data.bottomcards);
          break;
        case "addbottomcards":
          setHandList(data.cardlist);
          //cleanShowedCards();
          setPlayer2Id(data.nextplayer1Id);
          setPlayer2HandLength(data.nextplayer1length);
          setPlayer3Id(data.nextplayer2Id);
          setPlayer3HandLength(data.nextplayer2length);
          break;
        case "youTurn":
          setResultText("Your turn");
          setTurn(data.turn);

          //setDisablePlayBtn(false);
          break;
        case "sucessplay":
          setResultText(data.msg);
          setLastPlayedCategory(data.cradlist);

          setSelectedCards([]);
          setTurn(true);
          break;
        case "win":
          alert(data.msg);
          setTurn(true);
          break;
        case "defeat":
          alert(data.msg);
          setTurn(true);
          break;
        case "error":
          alert(data.msg);
          setSelectedCards([]);
          break;

      }
    });

    socket.on("respondtoallbutme", (res) =>{
      const { data, type } = res;
      // eslint-disable-next-line default-case
      switch (type) {
        case "setfarmer":
          setResultText(data.msg);
          setLandlord(data.landlord);
          setTurn(data.turn);
          break;
        case "otherturn":
          setResultText(`Player ${data.playerid} Turn`);
          setTurn(data.turn);
          //setDisablePlayBtn(true);
          break;
        case "otherplayed":
          setResultText(`player ${data.otherplayer} plays ${data.cardlist}`);
          setLastPlayedCategory(data.cardlist);

          if(player2Id === data.otherplayer){
            setPlayer2HandLength((prevLength) => prevLength - lastPlayedCategory.length);
          }
          else if(player3Id === data.otherplayer){
            setPlayer3HandLength((prevLength) => prevLength - lastPlayedCategory.length);
          }
          break;

      }
    });
  }, [socket]);

  const beat = function(){
    return true;
  };

  return (
    <div className='game-scrren'>
      {/* <img src={require('../assets/logo.png').default} /> */}
      <h1>Room {Room}</h1>
      <div id="bottomCards" className="showedCards" style={{pointerEvents: 'none'}}>
      <p className='showedCardsText'>bottom Cards</p>
          {bottomCards && bottomCards.map((id) => (
            <Card 
              key={id} 
              card = {id}
            />
          ))}
      </div>

      <Card 
        key={0} 
        card = {0}
      />

      <div id="player1Hands" className="hand">
        <p className='player1DeckText'>Your hand</p>
        {handList.map((id) => (
          <Card 
            key={id} 
            card = {id}
            isSelected = {selectedCards.includes(id)}
            onClick = {handleCardClick}
          />
        ))}
      </div>

      <div id ="player2Hands" className="backhand" >
        {player2HandLength}
      </div>

      <div id = "player3Hands" className="backhand" style={{pointerEvents: 'none'}}>
        {player3HandLength}
      </div>
      
      <div id ="resultText" className="text">{resultText}</div>
      <div id="timeDisplay" className="text">{timeDisplay}</div>
      
      <div id="playedCards" className="showedCards" style={{pointerEvents: 'none'}}>
        <p className='showedCardsText'>Last Played Category</p>
          {lastPlayedCategory && lastPlayedCategory.map((id) => (
            <Card 
              key={id} 
              card = {id}
            />
          ))}
      </div>

      <div className="buttons">         
          <button id="playHandButton" onClick={()=>handlePlayCards()} disabled={!isTurn}/*disabledPlayBtn*/>
            Play Hand
          </button>
          <button id="donotPlayButton" onClick={()=>handleDontPlay()} disabled={!isTurn}>
            Don't play
          </button>
          <button id="leaveButton">
            Leave Game
          </button>
      </div>

      <div>
        {/* gameState.currentPlayerCards.map(card => (
          <div key={card} onClick={() => handleCardClick(card)}>
            {card} {selectedCards.includes(card) && '(selected)'}
          </div>
        )) */}
      </div>
      
    </div>
  );
}