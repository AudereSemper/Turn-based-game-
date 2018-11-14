var character = {
    image: "",
    gender: "",
    name: "",
    past: "",
    job: "",
    health: 0,
    mana: 0,
    hit: 0,
    actualPosition: {
        row: 0,
        cell: 0,
    }
};

var characterTwo = {
    image: "https://image.ibb.co/kfbwQz/warrior_Image_Game.png",
    gender: "male",
    name: "Alexander",
    past: "orphanPast",
    job: "warrior",
    health: 80,
    mana: 0,
    hit: 3,
    item: "",
    actualPosition: {
        row: 0,
        cell: 0,
    }
};

const items=[
    {
        name: "axe",
        image: "https://image.ibb.co/n1hTEe/icons8_small_axe_64.png",
        hit: 3,
        actualPosition: {
            row: 0,
            cell: 0
        }
    },

    {   
        name: "scythe", 
        image: "https://image.ibb.co/nqpJ2z/if_holidays_scythe_1459435.png",
        hit: 4,
        actualPosition: {
            row: 0,
            cell: 0
        }    
    },
    
    {
        name: "sword",
        image: "https://image.ibb.co/jXzuLK/icons8_sword_48.png",
        hit: 2,
        actualPosition: {
            row: 0,
            cell: 0
        }     
    },
    
    {
        name:"knife",
        image:"https://image.ibb.co/gzgnPe/if_knife_50502.png",
        hit:1,
        actualPosition: {
            row: 0,
            cell: 0
        }    
    }

];

/* character creation, first module */

$('.select').on('click', function firstSection(){
    $(".select").slideUp();
    character.gender=(this.id);
    $(".section1").fadeOut();
    $(".section2").show();
});
                                                                        
/* character creation, first module  END*/

/*section 2, 3 and Section map are hides */
$(".section2").hide();
$(".section3").hide();
$('.parent').hide();
/* character creation, Second module */

var count = 0,
    check = 0;

$(".textPast").on("click", function secondModule(e){
        var color = $(this).css("background-color");
    
        control();
        
        $(this).css("background", "white");
        $(this).css("color", "black");
        character.past=(this.id);
        count++;
        check++;
});

/* confirm and name/choice check */

$("#buttonId").on("click", function(e){ 
    if(check == 0){
        window.alert("you forget to select your past");
        secondModule();
    }
    character.name= $("#charName").val(); 
    
    $(".section2").fadeOut();
    buildSection();     
})

/*the function below is usefull to build the images of the last section based on the user gender choice */

function buildSection(){
    $(".section3").fadeIn();
    if(character.gender === "female"){
        $("#imgWarrior").attr("src", "https://image.ibb.co/m8PS7e/warriorF.png");
        $("#imgWizard").attr("src", "https://image.ibb.co/iFsQtK/wizardF.png");
        $("#imgArcher").attr("src", "https://image.ibb.co/bPJ9Lz/archerF.png");
    }
}

/* we use this function to check the rythms of the click during the selection, we need it to avoid that multiple box coloring */

function control(){
    if((count/2) != 0){
        $('.textPast').css("background", "rgb(2, 15, 34, 0.8)");
        $('.textPast').css("color", "silver");
        $('.classPast').css("background", "rgb(2, 15, 34, 0.8)");
        $('.classPast').css("color", "silver");
        count=0;
        check=0;
        return;
        }
}

$(".classPast").on("click", function secondModule(e){
        var color = $(this).css("background-color");
        control();
        $(this).css( "background", "white");
        $(this).css("color", "black");
        character.job=(this.id);
        count++;
        check++;
});

//the function below will assemble the character based on the first player choices

function buildChar(){
    
    playerChoices();
    
    $('.section3').fadeOut();
    $('header').fadeOut();
    $('.container').remove();
    $('.parent').fadeIn();
    
    gameReady();
    
};  

function playerChoices(){
    var gender= character.gender,
        past = character.past,
        job = character.job;

        switch(past){
            case "orphanPast":
                character.health = 40;
                character.hit = 1;
                break;
            
            case "familyStudy":
                character.mana = 10;
                character.hit = 1;
                character.health = 10;
                break;
            
            case "richFamily":
                character.hit = 1;
                character.health = 30;
                break;
            
            case "forgetPast":
                //definire questa funzione. sarebbe opportuno generare tutto casualmente? se si creare i limiti superiori e inferiori.
                break;
                
            default:
                alert("something goes wrong");
                break;
        }
        
        
        switch(job){
            case "wizard":
                character.mana = character.mana + 40;
                character.hit = character.hit + 1;
                character.health = character.health +10
                if(gender === "male"){
                    character.image="https://image.ibb.co/cTGKdK/wizard_Image_Game.png";
                }else{
                    character.image="https://image.ibb.co/mJNsyK/Sorcer_Female_Image_Game.png";
                }
                break;
                
            case "warrior":
                character.health= character.health + 40;
                character.hit= character.hit + 2;
                
                if(gender === "male"){
                    character.image="https://image.ibb.co/kfbwQz/warrior_Image_Game.png";
                }else{
                    character.image="https://image.ibb.co/nhH35z/warrior_FImage_Game.png";
                }
                break;
            
            case "archer":
                character.hit = character.hit + 3;
                character.health= character.health + 10;
                
                if(gender === "male"){
                    character.image="https://image.ibb.co/gNzSXe/Archer_MGame.png";
                }else{
                    character.image="shttps://image.ibb.co/fhSECe/Archer_FGame.png";
                };
                break;
                
            default:
                alert("something goes wrong");
                break;
        };
    
}

function gameReady(){
    
    playerTwoReady();
    playerOneReady(); // this one and the function above this will show the 2 characters
    
    placeChar(character, items);
    placeChar(characterTwo, items);
    
    
    placeItem();
};


function playerOneReady(){
    $(".playerName").text(character.name);
    $("#playerChoice").attr("src", character.image);
    $('#healthPlayer').append(character.health);
    $('#manaPlayer').append(character.mana);
};

function playerTwoReady(){
    $(".playerTwoName").text(characterTwo.name);
    $("#playerTwoChoice").attr("src", characterTwo.image);
    $('#healthPlayerTwo').append(characterTwo.health);
    $('#manaPlayerTwo').append(characterTwo.mana);
};

// this function generate the coordinate of the character spawn point
function randomCoord(){
    let rowCoord= mapA.length;
    let cellCoord = mapA[1].length;
    
    let coord={
        row: Math.floor(Math.random() * rowCoord),
        cell: Math.floor(Math.random() * cellCoord)
        };  
    
    return coord;
};

// the function below set the right coordinates

function rightCoordinate(){
    let coord = randomCoord();
    
    let toCheck = mapA[coord.row][coord.cell];     
    let check = toCheck.search('nonWalkable');
     
    
    while(check != -1){
        coord = randomCoord();
        toCheck = mapA[coord.row][coord.cell];     
        check= toCheck.search('nonWalkable');
    };
    
    return coord;
};

// the function below set the position for the character

function placeChar(char){
        coord=rightCoordinate();
        char.actualPosition=coord; // save the actual position 
        place(coord, char); 
};

// this function shows the character in the map 
function place(coord, char){
    let charImage = "";
  if(char.name==='Alexander'){
        charImage = $("<img>").attr("src", char.image).addClass('charTwo');
  }else{
        charImage = $("<img>").attr("src", char.image).addClass('char');
  };
  var row = $($("#tableGame tr")[coord.row]);
  var cell = $($("td", row)[coord.cell]);
  var tile = $(".tile", cell);  
  tile.prepend(charImage);
};

// the function below literally place the items on the table

function placeItem(){
    
  items.forEach(function(obj){
    coord=rightCoordinate(); // generate random coordinates 
    obj.actualPosition = coord;
    var itemImage = $("<img>").attr("src", obj.image).addClass('items ' + obj.name);
    var row = $($("#tableGame tr")[coord.row]);
    var cell = $($("td", row)[coord.cell]);
    var tile = $(".tile", cell);  
    tile.prepend(itemImage);
    });
};















