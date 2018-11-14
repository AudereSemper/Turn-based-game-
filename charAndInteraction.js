var playerStart = 1 + Math.floor(Math.random() * 20);


$(".buttonTurn").on('click', function startTurn() {
    if (playerStart < 10){
        $(".buttonTurn").html('End turn, ' + character.name);
        turn(character);
        playerStart=11;
    }else{
        $(".buttonTurn").html('End turn, ' + characterTwo.name);
        turn(characterTwo);
        playerStart=0;
    };
    
});

$("#victory").hide();

function winner(winner){
$(".parent").fadeOut();
$("#victory").fadeIn();
$(".parent").remove();

$("#endGame").fadeIn();
 
};

function turn(player){

        catchAnObjects(player);
        movements(player);
        catchAnObjects(player);
        fight(player);
        
};

// posso fare una cosa: crea un tasto start, se premuto lancia la funzione gamestart, la quale farà apparire il tasto" fine turno " nella casella del relativo giocatore. Ogni volta che premi fine turno, setti una variabile che fa il cambio da un giocatore all'altro, l'unico check che dovrai fare sarà alla fine di questa funzione, dovrai fare il check dell'health, se questa è a 0 o inferiore avrai il game over. 

function fight(playerInFight){
    let charRow = playerInFight.actualPosition.row;
    let charCell = playerInFight.actualPosition.cell;
    let directions = [ [charRow-1, charCell], [charRow+1, charCell], [charRow, charCell+1], [charRow, charCell-1]];
    let charToCompare =[];
    
    if(playerInFight.name =='Alexander'){
        charToCompare=[character.actualPosition.row, character.actualPosition.cell];
        for(let i = 0; i<directions.length; i++){
            if(directions[i][0] === charToCompare[0] &&
               directions[i][1] === charToCompare[1]){
                possibleAction(playerInFight);
            }  
        }
    }else{
        charToCompare=[characterTwo.actualPosition.row, characterTwo.actualPosition.cell];
        for(let i = 0; i<directions.length; i++){
            if(directions[i][0] === charToCompare[0] &&
               directions[i][1] === charToCompare[1]){
                possibleAction(playerInFight);
            }  
        }
    }
    
};

function possibleAction(charInFight){
    if(charInFight.name === "Alexander"){
        $( ".colTwo" ).css("border", "2px solid white");
        $( ".colOne" ).css("border", "0px");
        $('table td').removeClass('possibleSteps');
        action(charInFight);
    }else{
        $('table td').removeClass('possibleSteps');
        $( ".colOne" ).css("border", "2px solid white");
        $( ".colTwo" ).css("border", "0px");
        action(charInFight);
    };
};

function randomNumber(){
    var hit=Math.floor(Math.random() * 20) + 1; 
    
    return hit;
}

var halfDamageOnPlayerOne = 0;
var halfDamageOnPlayerTwo = 0;

function action(charInFight){

    if(charInFight.name === "Alexander"){
        $("#attackPlayerTwo").on("click", function(){
             
             halfDamageOnPlayerOne = 0;
             let hit=randomNumber();
             let newHit = charInFight.hit+hit;
             $("#hitPlayerTwo").html(newHit);
             if(newHit >= 12){
                 if(halfDamageOnPlayerTwo === 1){
                    newHit=newHit/2;
                 };
                 let newHealth = character.health - (newHit*2);
                 if(newHealth <= 0){
                 winner(charInFight.name);
                 }
                 character.health=newHealth;
                 $("#healthPlayer").html("health : " + newHealth);
                 $('.buttonTurn').trigger('click');
                 return;
             }else{
                 $('.buttonTurn').trigger('click');
             }
        });
        
        $("#defendPlayerTwo").on("click", function(){
            
                halfDamageOnPlayerTwo = 1;
            $('.buttonTurn').trigger('click');        
        });
    }else{
        $("#attackPlayerOne").on("click", function(){
             halfDamageOnPlayerTwo = 0;
             let hit=randomNumber();
             let newHit = charInFight.hit+hit;
             $("#hitPlayerOne").html(newHit);
             if(newHit > 12){
                 if(halfDamageOnPlayerOne === 1){
                    newHit=newHit/2; 
                 };
                 let newHealth = characterTwo.health - (newHit*2);
                 if(newHealth <= 0){
                 winner(charInFight.name);
                 };
                 characterTwo.health=newHealth;
                 $("#healthPlayerTwo").html("health : " + newHealth);
                 $('.buttonTurn').trigger('click');
                 return;
             }
            $('.buttonTurn').trigger('click');
        });
        
        $("#defendPlayerTwo").on("click", function(){
                halfDamageOnPlayerOne = 1;
            $('.buttonTurn').trigger('click');        
        });
    }
};

function catchAnObjects(characterInRound){
    
    let rowChar = characterInRound.actualPosition.row,
        cellChar = characterInRound.actualPosition.cell;
        itemRow = 0,
        itemCell = 0;
            
    for(var i = 0; i<items.length; i++){
        
        itemRow = items[i].actualPosition.row;
        itemCell = items[i].actualPosition.cell;
        
        if(itemRow === rowChar && itemCell === cellChar){
            characterInRound.hit = characterInRound.hit + items[i].hit;
            if(characterInRound.name !="Alexander"){
                console.log('sei qua item player one');
                $("#itemPlayerOne").attr("src", items[i].image);
                break;
            }else{
                $("#itemPlayerTwo").attr("src", items[i].image);
                break;
            };
        };
    };
};

function movements(char){
    let possibleMovement=3;
    let row = char.actualPosition.row;
    let cell = char.actualPosition.cell;
    /////these 4 functions are helpful to draw what movements are possible.
    forward(possibleMovement, row, cell);
    backward(possibleMovement, row, cell);
    goUp(possibleMovement, row, cell);
    goDown(possibleMovement, row, cell);
    /////the function below is helpful to move the character
    move(char);
};


function move(charToMove){
    let charRow=charToMove.actualPosition.row;
    let charCell=charToMove.actualPosition.cell;
    $('.possibleSteps').click(function toMove(){
        //coordinates where i click //
        var $this = $(this);
        let rowToMove = $this.closest('tr').index();
        let colToMove = $this.index();
        let itemImage= "";
        
        if(charToMove.name === 'Alexander'){
             itemImage =$('<img src=\"' + charToMove.image + '\" class=\"charTwo">');    
        }else{
            itemImage =$('<img src=\"' +charToMove.image + '\" class=\"char">');
        }
        
        remove(charToMove);
        
        var row = $($("#tableGame tr")[rowToMove]);
        var cell = $($("td", row)[colToMove]);
        var tile = $(".tile", cell);  
        tile.prepend(itemImage);
        
        charToMove.actualPosition.row=rowToMove;
        charToMove.actualPosition.cell=colToMove;
        
        $('table td').removeClass('possibleSteps');
    });
};



function remove(movePlayer){
        let actualRow=movePlayer.actualPosition.row;
        let actualCol=movePlayer.actualPosition.cell;
        let itemImage=movePlayer.image;
        let row = $($("#tableGame tr")[actualRow]);
        let cell = $($("td", row)[actualCol]);
        let tile = $(".tile", cell);
        if(movePlayer.name === 'Alexander'){
            $('.charTwo').remove(); 
            return;
        }else{
            $('.char').remove();
            return;
        }
};


function forward(possibleMovements, row, cell){
    
    let charRow = row;
    let charCell= cell;
    let table = $("table")[0];
    
    for(var i = 0; i<possibleMovements; i++){
        if(charCell+i >= mapA.length){
            break;
        }
        else{
            let cellToCheck = mapA[charRow][charCell+i];
            let substring = "nonWalkable";
            let check=cellToCheck.indexOf(substring)
            
            if(check != -1){
                break;
            }
            
            let cell = table.rows[charRow].cells[charCell+i]; // This is a DOM "TD" element
            let $cell = $(cell);
            $(cell).addClass('possibleSteps');
        }
    };
};

//come rimuovere le caselle evidenziate dopo il movimento ? ti salvi le precedenti coordinate in una nuova variabile globale, implementi un if all'interno dei vari possibili movimenti, se quella variabile è diversa da 0 togli la classe, altrimenti la aggiungi. Ricorda poi di settare di nuovo quella variabile a 0 alla fine della pulizia di classe.

function backward(possibleMovements, row, cell){
    let charRow = row;
    let charCell= cell;
    let table = $("table")[0];
    
    for(var i = -1; i>(possibleMovements*-1); i--){
        if(charCell + i < 0){
            break;
        }else{
        
        let cellToCheck = mapA[charRow][charCell+i];
        let substring = "nonWalkable";
        let check=cellToCheck.indexOf(substring)
        
        if(check != -1){
           break;
        };
        
        let cell = table.rows[charRow].cells[charCell+i]; // This is a DOM "TD" element
        let $cell = $(cell);
        $(cell).addClass('possibleSteps');
        };
    };
};

function goUp(possibleMovements, row, cell){
    let charRow = row;
    let charCell= cell;
    let table = $("table")[0];
    
    for(var i = -1; i>(possibleMovements*-1); i--){
        if(charRow+i < 0){
            break;
        }else{
        let cellToCheck = mapA[charRow+i][charCell];
        let substring = "nonWalkable";
        let check=cellToCheck.indexOf(substring)
        
        if(check != -1){
           break;
        };
        
            let cell = table.rows[charRow+i].cells[charCell]; // This is a DOM "TD" element
            let $cell = $(cell);
            $(cell).addClass('possibleSteps');
        };
    };
};


function goDown(possibleMovements, row, cell){
    let charRow = row;
    let charCell= cell;
    let table = $("table")[0];
    
    for(var i = 0; i<possibleMovements ; i++){
        if(charRow + i >= mapA.length){
            break;
        }else{
            let cellToCheck = mapA[charRow+i][charCell];
            let substring = "nonWalkable";
            let check=cellToCheck.indexOf(substring)
            if(check != -1){
                break;
            };
            let cell = table.rows[charRow+i].cells[charCell]; // This is a DOM "TD" element
            let $cell = $(cell);

            $(cell).addClass('possibleSteps');
        };
    };
};

function compareItemPosition(object){
    
}; 