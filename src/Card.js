import React, { useState } from "react"; 

import back from './assets/b.png'
import S3 from './assets/0.png'
import H3 from './assets/1.png'
import C3 from './assets/2.png'
import D3 from './assets/3.png'
import S4 from './assets/4.png'
import H4 from './assets/5.png'
import C4 from './assets/6.png'
import D4 from './assets/7.png'
import S5 from './assets/8.png'
import H5 from './assets/9.png'
import C5 from './assets/10.png'
import D5 from './assets/11.png'
import S6 from './assets/12.png'
import H6 from './assets/13.png'
import C6 from './assets/14.png'
import D6 from './assets/15.png'
import S7 from './assets/16.png'
import H7 from './assets/17.png'
import C7 from './assets/18.png'
import D7 from './assets/19.png'
import S8 from './assets/20.png'
import H8 from './assets/21.png'
import C8 from './assets/22.png'
import D8 from './assets/23.png'
import S9 from './assets/24.png'
import H9 from './assets/25.png'
import C9 from './assets/26.png'
import D9 from './assets/27.png'
import S10 from './assets/28.png'
import H10 from './assets/29.png'
import C10 from './assets/30.png'
import D10 from './assets/31.png'
import SJ from './assets/32.png'
import HJ from './assets/33.png'
import CJ from './assets/34.png'
import DJ from './assets/35.png'
import SQ from './assets/36.png'
import HQ from './assets/37.png'
import CQ from './assets/38.png'
import DQ from './assets/39.png'
import SK from './assets/40.png'
import HK from './assets/41.png'
import CK from './assets/42.png'
import DK from './assets/43.png'
import SA from './assets/44.png'
import HA from './assets/45.png'
import CA from './assets/46.png'
import DA from './assets/47.png'
import S2 from './assets/48.png'
import H2 from './assets/49.png'
import C2 from './assets/50.png'
import D2 from './assets/51.png'
import Bj from './assets/52.png'
import Cj from './assets/53.png'

export default function Card({card, isSelected, onClick}){
    

    function idConvertWord(){
        return (getSuit(card)+getPoint(card));
    }
    const word = idConvertWord();

    // map word to corresponding image source
    const wordImageMap = {
        S3: S3,H3: H3, C3: C3, D3 : D3,
        S4 : S4, H4: H4,"C4": C4,"D4": D4,
        "S5": S5, "H5": H5, "C5": C5, "D5": D5,
        "S6": S6, "H6": H6, "C6": C6, "D6": D6,
        "S7": S7, "H7": H7, "C7": C7, "D7": D7,
        "S8": S8, "H8": H8, "C8": C8, "D8": D8,
        "S9": S9, "H9": H9, "C9": C9, "D9": D9,
        "S10": S10, "H10": H10, "C10": C10, "D10": D10,
        "SJ": SJ, "HJ":HJ, "CJ":CJ, "DJ":DJ,
        "SQ": SQ, "HQ":HQ, "CQ":CQ, "DQ":DQ,
        "SK": SK, "HK":HK, "CK":CK, "DK":DK,
        "SA": SA, "HA":HA, "CA":CA, "DA":DA,
        "S2": S2, "H2": H2, "C2": C2, "D2": D2,
        "Bwj": Bj,
        "Cj": Cj,
    };
    const imageSrc = wordImageMap[word];


    //const [selected, setSelect] = useState(false);
    //const [isHovering, setIsHovering] = useState(false);

    /* function handleCardClick(){
        if(isSelected){
            setSelect(false);
        }
        else{
            setSelect(true);
        }
        onClick(card);
    } */
    function handleCardClick(){        
        onClick(card);
    }

    /* ${isHovering ? 'hover':''}
    onMouseEnter={() => setIsHovering(true)}
    onMouseLeave={() => setIsHovering(false)} */
    return(
        <div className={`Card ${isSelected ? 'selected':''} `}>
            <div>
                <img alt='card front'               
                className='front'               
                src={imageSrc}/* {require(`./assets/${card}.png`).default} */
                onClick={handleCardClick}
                />
                <img alt='card back'
                className="back"
                src={back}/>
            </div> 
        </div>
    )
}

const getPoint = function (id) {
    id = parseInt(id);
    var point = Math.floor(id / 4)+3;
    if (id >= 0 && id <= 51) {
        if (point >= 3 && point <= 10) {
            return point.toString();
        } else {
            switch (point) {
                case 11:
                    return "J";
                case 12:
                    return "Q";
                case 13:
                    return "K";
                case 14: 
                    return "A";
                case 15: 
                    return "2";
                default:
                    throw "Don't have this card";
            }
        }
    } else if (id === 52) {
        return "Bwj";
    } else if (id === 53) {
        return "Cj";
    } else {
        throw "Don't have this card";
    }
};

const getSuit = function (id) {
    id = parseInt(id);
    var suit = Math.ceil(id % 4);

    if (id >= 0 && id <= 51) {
        return {"0": ["S"],
         "1":["H"], 
         "2":["C"],
         "3":["D"]}[suit];
    } else if (id === 52) {
        return ["Bwj"];            //what color
    } else if (id === 53) {
        return ["Cj"];              //what color
    } else {
        throw "Don't have this card";
    }
};

// get card value 3-17
const getValue = function (id) {
    id = parseInt(id);

    if (id >= 0 && id <= 51) {
        return Math.floor((id) / 4) + 3;
    } else if (id === 52) {
        return 16;
    } else if (id === 53) {
        return 17;
    } else {
        throw "Don't have this card";
    }
};