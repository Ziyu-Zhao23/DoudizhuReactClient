

/**
*Check the number of times each value appears in the given cardid list
*Sort elements increase order 
* @param {cardId List} fromHand  
*/
function countFreq(fromHand){
    //convert id to value
    var valuelist = fromHand.map(id =>{
        return getValue(id);
    })

    var dictionary = new Dictionary(); //key:cardvalue; value:times
    valuelist.forEach(function(cardValue,index){
        //If has the key, the value + 1
        if(dictionary.has(cardValue)){
            dictionary.set(cardValue, dictionary.get(cardValue)+1);
        }
        else{
            dictionary.set(cardValue,1);
        }
    });

    var allDicItems = dictionary.getDictionaryItems();
    var maxFreq = 0;  //maximum number of times the same value
    var maxFreqValue = 0; //value of the card with the most occurrences

    //get the max Frequncy and the value in this dictionary
    for(let value in allDicItems){
        if(allDicItems[value] > maxFreq){
            maxFreq = allDicItems[value];
            maxFreqValue = value;
        }
    }

    return {allDicItems,maxFreq,maxFreqValue};
}

/**
 * Check what category is
 * @param {cardId List} cardList 
 * @returns categoryWeight + miniValue
 */
export function getCategory(fromHand){
    var categoryInfo = countFreq(fromHand);
    var allDicItems = categoryInfo.allDicItems;
    var maxFreq = categoryInfo.maxFreq;
    var maxFreqValue = categoryInfo.maxFreqValue;
    var hlength = fromHand.length;

    var valuelist = fromHand.map(id =>{
        return getValue(id);
    })

    if(maxFreq === 1){
        if(hlength === 1){
            console.log("One card");
            return {
                CategoryType:"Single",
                weight:1,
                miniValue:maxFreqValue
            };
        }
        else if(hlength === 2 
            && valuelist[0] === 16
            && valuelist[1] === 17){
            console.log("Roket");
            return {
                CategoryType:"Rocket",
                weight:3
            };
        }
        else if(hlength >= 5 && hlength <= 12){
            console.log("Chain");

            if(valuelist[hlength-1] > 14){
                console.log("Cards greater than A");
                return false;
            }
            else if (valuelist[0] < 3){
                console.log("No card less than 3");
                return false;
            }
            else{
                for(let i=0;i<hlength;i++){
                    if(i+1 === hlength){
                        break;
                    }
                    if(valuelist[i+1] - valuelist[i] !== 1){
                        console.log("Not consecutive");
                        return false;
                    }                
                }
            }

            return {
                CategoryType:"Chain",
                weight:1,
                miniValue:valuelist[0]
            };
        }
        
        else {
            return false;
        }
    }
    else if(maxFreq === 2){
        if(hlength === 2){
            console.log("One Pair");

            if(valuelist.length === 2 
                && valuelist[0] === valuelist[1]){
                return {
                    CategoryType:"Pair",
                    weight:1,
                    miniValue:maxFreqValue
                };
            }
            else return false;
        }
        else if(hlength >= 6 && hlength <= 24 
                && hlength%2 === 0){
            console.log("PairChain");

            //smallest value is 3, greatest is 14(A)
            if(valuelist[hlength-1] > 14){
                console.log("Cards greater than A");
                return false;
            }
            else if (valuelist[0] < 3){
                console.log("No card less than 3");
                return false;
            }
            
            // check if all are pair
            for(let key in allDicItems){
                if(allDicItems[key] !== 2){
                    console.log("Not all pair");
                    return false;
                }
            }

            //get what value in array
            let keys = Object.keys(allDicItems);
            if(keys.length<3){
                //need at least 3 Pair
                return false;
            }
            keys.sort((a,b) => Number(a)-Number(b));//asending
            
            //check if they are consecutive
            for(let i=0;i<keys.length;i++){
                if(i+1 === keys.length){
                    break;
                }
                let v1 = Number(keys[i]);
                let v2 = Number(keys[i+1]);
                if(v2-v1 !== 1){
                    console.log("Not consecutive");
                    return false;
                }
            }

            return {
                CategoryType:"PairChain",
                weight:1,
                miniValue:maxFreqValue
            };        
        }
    }
    else if(maxFreq === 3){
        if(hlength === 3){
            console.log("Trio");

            if(valuelist.length === 3 && valuelist[0] !== undefined
                && valuelist[0] === valuelist[1]
                && valuelist[1] === valuelist[2]){
                return {
                    CategoryType:"Trio",
                    weight:1,
                    miniValue:maxFreqValue
                };
            }
            else return false;
        }
        else if(hlength === 4){
            console.log("TrioWithSingle");

            for(let value in allDicItems){
                if(allDicItems[value] === 1){
                    return {
                        CategoryType:"TrioWithSingle",
                        weight:1,
                        miniValue:maxFreqValue
                    };
                }
            }
            return false;
        }
        else if(hlength === 5){
            console.log("TrioWithPair");

            for(let value in allDicItems){
                if(allDicItems[value] === 2){
                    return {
                        CategoryType:"TrioWithPair",
                        weight:1,
                        miniValue:maxFreqValue
                    };
                }
            }
            return false;
        }
        else if(hlength >=6 && hlength<=16){
            // get all ranks of trios, single, and pair
            let trioValue = [];
            let singleValue = [];
            let pairValue = [];
            for(let key in allDicItems){
                if(allDicItems[key] === 3){
                    trioValue.push(key);
                }
                else if(allDicItems[key] === 1){
                    singleValue.push(key);
                }
                
                else if(allDicItems[key]=== 2){
                    pairValue.push(key);
                }
                //else return false;
            }

            //console.log(JSON.stringify(trioValue),JSON.stringify(singleValue),JSON.stringify(pairValue));
            //console.log(singleValue.length===0);

            //Trio Chain  3*n
            if(hlength % 3 === 0 && singleValue.length===0 
                    && pairValue.length === 0){
                console.log("TrioChain");

                //smallest value is 3, greatest is 14(A)
                if(valuelist[hlength-1] > 14){
                    console.log("Cards greater than A");
                    return false;
                }
                else if (valuelist[0] < 3){
                    console.log("No card less than 3");
                    return false;
                }                

                //get what value in array
                let keys = Object.keys(allDicItems);
                if(keys.length<2){
                    //need at least 2 Trio
                    return false;
                }
                keys.sort((a,b) => Number(a)-Number(b));
                
                //check if they are consecutive
                for(let i=0;i<keys.length;i++){
                    if(i+1 === keys.length){
                        break;
                    }
                    let v1 = Number(keys[i]);
                    let v2 = Number(keys[i+1]);
                    if(v2-v1 !== 1){
                        console.log("Not consecutive");
                        return false;
                    }
                }
                return {
                    CategoryType:"TrioChain",
                    weight:1,
                    miniValue:maxFreqValue
                };
            }
            //Trio Chain With Singles (3+1)*n
            else if(hlength % 4 === 0 && pairValue.length ===0 
                    && singleValue.length>0){
                console.log("TrioChainWithSingles");
                /* There is no rank of single is same as rank of Trio
                    if it is, the maxFreq should be 4 */                          

                //sort make sure it's ordered
                trioValue.sort((a,b) => Number(a)-Number(b));

                //additional Single cards with the same amount of trios
                if(trioValue.length !== singleValue.length){
                    return false;
                }
                
                //two or more consecutive trios
                for(let i=0;i<trioValue.length;i++){
                    if(i+1 === trioValue.length){
                        break;
                    }
                    let v1 = Number(trioValue[i]);
                    let v2 = Number(trioValue[i+1]);
                    if(v2-v1 !== 1){
                        console.log("Not consecutive");
                        return false;
                    }
                }

                // trio part can't greater than A(14),singles no matter
                if(trioValue.length >= 2 && trioValue[0]>=3
                    &&trioValue[trioValue.length-1]<=14){
                    return {
                        CategoryType:"TrioChainWithSingles",
                        weight:1,
                        miniValue:trioValue[0]
                    };
                }
                else return false;
            }
            //Trio Chain With Pairs (3+2)*n
            else if(hlength % 5 === 0 && pairValue.length > 0){
                console.log("TrioChainWithPairs");               

                //sort make sure it's ordered
                trioValue.sort((a,b) => Number(a)-Number(b));

                //pairs with the same amount of trios，
                //amount of trios more than 2 
                if(trioValue.length !== pairValue.length
                    && trioValue.length >= 2 ){
                    return false;
                }

                //two or more consecutive trios
                for(let i=0;i<trioValue.length;i++){
                    if(i+1 === trioValue.length){
                        break;
                    }
                    let v1 = Number(trioValue[i]);
                    let v2 = Number(trioValue[i+1]);
                    if(v2-v1 !== 1){
                        console.log("Not consecutive");
                        return false;
                    }
                }

                // trio part can't greater than A(14),singles no matter
                if(trioValue[0]>=3 && trioValue[trioValue.length-1]<=14){
                        return {
                            CategoryType:"TrioChainWithPairs",
                            weight:1,
                            miniValue:trioValue[0]
                        };
                }
                else return false;
            }  
        }            
    }
    else if(maxFreq === 4){
        if(hlength === 4){
            console.log("Bomb");

            for(let i = 0;i<valuelist.length-1;i++){
                if(valuelist[i].value !== valuelist[i+1].value){
                    return false;
                }
            }

            return {
                CategoryType:"Bomb",
                weight:2,
                miniValue:maxFreqValue
            };
        }
        
    }
    
    return undefined;
}

/**
 * Compare two categories
 * If current one greater than pervious one,return true 
 * @param {Cardid List*} preCardList 
 * @param {CardId List} curCardList 
 * @returns 
 */
export function isBeat(preCardList,curCardList){
    console.log("Pre cards"+ preCardList);
    console.log("current cards"+ curCardList);
    let preCategory = getCategory(preCardList);
    console.log("PreCategory Weight"+JSON.stringify(preCategory));
    
    let curCategory = getCategory(curCardList);  //?? why they are same
    console.log("curCategory Weight"+JSON.stringify(curCategory));

    if(preCategory && curCategory){ // both are not undefined
        if(preCategory.weight < curCategory.weight){
            console.log("Beat");
            return true;
        }
        else if(preCategory.weight === curCategory.weight){
            if(preCardList.length === curCardList.length 
             && preCategory.CategoryType === curCategory.CategoryType){
                //compare the miniValue
                console.log((Number(preCategory.miniValue) < Number(curCategory.miniValue)));
                return Number(preCategory.miniValue) < Number(curCategory.miniValue); //need convert to int
                
             }
        }
    }
    return false;
    
};



const Dictionary = function  () {
    var items = {};

    // Check whether the key exists in the dictionary
    this.has = function (key) {
        return key in items;
    };

    // add a new key
    this.set = function (key, value) {
        items[key] = value;
    };

    // remove a key
    this.remove = function (key) {
        if (this.has(key)) {
            delete items[key];
            return true;
        }
        return false;
    };

    // Get the value of the specified key
    this.get = function (key) {
        return this.has(key) ? items[key] : undefined;
    };

    // clear dictionary(all)
    this.clear = function () {
        items = {};
    };

    // get all items
    this.getDictionaryItems = function () {
        return items;
    };
};

export const getPoint = function (id) {
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

export const getSuit = function (id) {
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
export const getValue = function (id) {
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