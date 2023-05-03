import React, { useEffect, useState } from 'react';
import Card from './Card';
import { Col, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';
import { isBeat } from './CardRule';

export default function GameScreen({ Room, socket}) {

  //initialize game state
  const [isTurn, setTurn] = useState(false);
  const [isLandlord, setLandlord] = useState(false);

  const [bottomCards, setBottomCards] = useState([]);
  const [handList,setHandList] = useState([]);
  const [lastPlayedCategory,setLastPlayedCategory] = useState([]);
  const [lastPlayedPlayer,setLastPlayedPlayer] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  
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
    lastPlayedCategory,
    selectedCards,
    player2Id,
    player2HandLength,
    player3Id,
    player3HandLength
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
    if(lastPlayedCategory.length === 0 ||
    isBeat(lastPlayedCategory, selectedCards)){
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
  
  const handleLeaveGame = () =>{
    socket.emit('leaveGame',{
      roomId:Room,
      //socket:socket
    });
  };

  //click a card
  const handleCardClick = cardId => {
      
    if (selectedCards.includes(cardId)) {
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
    }
  };

  /* useEffect(() => {
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
    
  },[timeDisplay]); */

  useEffect(() => {
    function onRespond(res) {
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
          console.log(data.nextplayer1Id);
          console.log(data.nextplayer2Id);  
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
          setPlayer2HandLength(data.nextplayer1length);
          setPlayer3HandLength(data.nextplayer2length);
          break;
        case "yourturn":
          console.log("yourTurn" + data.turn);
          setResultText("Your turn");
          setTurn(data.turn);

          //setDisablePlayBtn(false);
          break;
        case "sucessplay":
          console.log(" sucess play " + data.cardlist);
          setResultText(data.msg);
          setLastPlayedCategory(data.cardlist);
          setLastPlayedPlayer([]);

          //romve played cards    
          setHandList(preHand =>{
            const newHand = preHand.filter((cardId) => !data.cardlist.includes(cardId));
            console.log(`current hand ${newHand}`);
            return newHand;
          })

          setSelectedCards([]);
          setTurn(data.turn);
          break;
        case "win":
          alert(data.msg);
          setTurn(true);
          handleLeaveGame();
          break;
        case "defeat":
          alert(data.msg);
          setTurn(true);
          handleLeaveGame();
          break;
        case "error":
          alert(data.msg);
          setSelectedCards([]);
          break;
      }
    }

    function onRespondToAllButMe(res) {
      const { data, type } = res;
      // eslint-disable-next-line default-case
      switch (type) {
        case "setfarmer":
          setResultText(data.msg);
          setLandlord(data.landlord);
          setTurn(data.turn);
          break;
        case "otherturn":
          console.log("other Trun");
          setResultText(`Player ${data.playerid} Turn`);
          setTurn(data.turn);
          //setDisablePlayBtn(true);
          break;
        case "otherplayed":
          console.log(`player ${data.otherplayer} plays ${data.cardlist}`);
          setResultText(`player ${data.otherplayer} plays ${data.cardlist}`);
          setLastPlayedCategory(data.cardlist);
          setLastPlayedPlayer(data.otherplayer);

          console.log(data.handlength,player2Id,player3Id);
          
          console.log(player2Id === data.otherplayer);
          console.log(player3Id === data.otherplayer);

          if(player2Id === data.otherplayer){
            console.log("delete player index 2 cards");
            console.log(lastPlayedCategory);
            //setPlayer2HandLength((prevLength) => prevLength - data.cardlist.length);
            setPlayer2HandLength(data.handlength);
          }
          else if(player3Id === data.otherplayer){
            console.log("delete player index 3 cards");
            console.log(lastPlayedCategory);
            //setPlayer3HandLength((prevLength) => prevLength - data.cardlist.length);
            setPlayer3HandLength(data.handlength);
          }
          break;
      }
    }

    function onRespondToAll(res){
      const { data, type } = res;
      // eslint-disable-next-line default-case
      switch (type) {
        case "emptyPlayedCategory":
          setLastPlayedCategory([]);
          setLastPlayedPlayer([])
          break;
      }
    }

    function onUpdateTimer(remainingTime){
      setTime(remainingTime);
    }

    socket.on('respond', onRespond);
    socket.on('respondtoallbutme', onRespondToAllButMe);
    socket.on('respondtoall', onRespondToAll);
    socket.on("updatetimer", onUpdateTimer);

    return () => {
      socket.off('respond', onRespond);
      socket.off('respondtoallbutme', onRespondToAllButMe);
      socket.off('respondtoall', onRespondToAll);
      socket.off('disconnect', onRespondToAllButMe);
      socket.off("updatetimer", onUpdateTimer);
    };
  }, [socket,player2Id,player3Id,lastPlayedCategory,handleLeaveGame]);

  /* socket part */
  /* useEffect(() => {

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
          // console.log(player2HandLength);
          //console.log(player3HandLength);  
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
  }, [socket]); */

  return (

    <div className='game-scrren'>
      {/* <img src={require('../assets/logo.png').default} /> */}
      <Row>
      <Col span={3}>
        <h1>Room {Room}</h1>
      </Col>
      <Col span={12}>
        <div id="bottomCards" className="showedCards" style={{pointerEvents: 'none'}}>
        <p className='showedCardsText'>bottom Cards</p>
            {bottomCards && bottomCards.map((id) => (
              <Card 
                key={id} 
                card = {id}
              />
            ))}
        </div>        
      </Col>
      <Col span={3} offset={6}>
        <button id="leaveButton" className='Buttons' onClick={()=>handleLeaveGame()}>
            Leave Game
        </button>
      </Col>        
      </Row>
      <Row>
        <Col span={2}>
          <Avatar  size="large" style={{ backgroundColor: '#1890ff' }}>
            {player3Id}
          </Avatar>
        </Col>
        <Col span={2}>
          <div id = "player3Hands" className="HandLengthText">
          {player3HandLength}
          </div>
        </Col>
        <Col span={16}>
          <div id="playedCards" className="showedCards" style={{pointerEvents: 'none'}}>
          <p className='showedCardsText'>Last Played Category: Player {lastPlayedPlayer}</p>
            {lastPlayedCategory && lastPlayedCategory.map((id) => (
              <Card 
                key={id} 
                card = {id}
              />
            ))}
          </div>
        </Col>
        <Col span={2}>
          <Avatar size="large" style={{ backgroundColor: '#1890ff' }}>
            {player2Id}
          </Avatar>
        </Col>
        <Col span={2}>
          <div id ="player2Hands" className="HandLengthText" >
          {player2HandLength}
          </div>
        </Col>
      </Row>
      <Row>        
        <Col span={8} offset={8}>
          <div id="timeDisplay" className="NoticeText">{timeDisplay}</div>     
        </Col>        
      </Row>
      <Row>        
        <Col span={8} offset={8}>
          <div id ="resultText" className="NoticeText">{resultText}</div>     
        </Col>        
      </Row>
      <Row>
        <Col span={12} offset={6}>
          <div className="buttons">         
            <button id="playHandButton" onClick={()=>handlePlayCards()} disabled={!isTurn}/*disabledPlayBtn*/ className="Buttons">
              Play Hand
            </button>
            <button id="donotPlayButton" onClick={()=>handleDontPlay()} disabled={!isTurn} className="Buttons">
              Don't play
            </button>           
          </div>
        </Col>       
      </Row>
      <Row>        
        <Col span={2}>
          <Avatar size="large" style={{ backgroundColor: '#1890ff' }} icon={<UserOutlined />} />
        </Col>
        <Col span={22}>
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
        </Col>

      </Row>

      {/* <Card 
        key={0} 
        card = {0}
      /> */}
 
      
    </div>
  );
}