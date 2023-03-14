import React from "react";

export default function Card({card, toggleCard}){

    function handleCardClick(){
        toggleCard(card);
    }

    return(
        <div className="Card">
            <div>
                <img alt='card front'               
                className='front'               
                src={require(`./assets/${card}.png`).default}
                onClick={handleCardClick}
                />
                <image alt='card back'
                className="back"
                src={require(`./assets/b.png`).default}/>
            </div> 
        </div>
    )
}