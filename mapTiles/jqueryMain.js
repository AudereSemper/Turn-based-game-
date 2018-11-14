var character = {
    image: "",
    sex: "1",
    name: "2",
    past: "4",
    job: "5",
    health: 0,
    mana: 0,
    hit: 0
};

/* character creation, first module */

$(".select").on("click", function firstSection(e){
    $(".select").slideUp();
    character.sex=(this.id);
    $(".section1").fadeOut();
    $(".section2").show();
});

/* character creation, first module  END*/

/*section 2 and 3 are hides */
$(".section2").hide();
$(".section3").hide();
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

/* confirm and name(still to implement)/choice check */



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
    if(character.sex === "female"){
        $("#warrior").attr("src", "sprite/warriorF.png");
        $("#wizard").attr("src", "sprite/wizardF.png");
        $("#archer").attr("src", "sprite/archerF.png");
    }
}

/* we use this function to check the rythms of the click during the selection, iwe need it to avoi that multiple box coloring them self in white */

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

/* remember to delete the double class in the function */

$(".classPast").on("click", function secondModule(e){
        var color = $(this).css("background-color");
        control();
        $(this).css( "background", "white");
        $(this).css("color", "black");
        character.job=(this.id);
        count++;
        check++;
});


$("#createChar").on("click", function buildChar(){
    var sex= character.sex,
        past = character.past,
        job = character.job;

      
        switch(past){
            case "orphanPast":
                character.health = 40;
                character.hit = 1;
                break;
            
            case "studyFamily":
                character.mana = 30;
                character.hit = 1;
                break;
            
            case "richFamily":
                character.health = 20;
                character.hit = 1;
                character.mana = 20;
                break;
            
            case "forgetPast":
                //definire questa funzione. sarebbe opportuno generare tutto casualmente? se si creare i limiti superiori e inferiori.
                break;
                
            default:
                alert("something goes wrong");
                // ha senso avere il default dato che non ci possono essere errori ? 
                break;
        }
        
        switch(job){
            case "wizard":
                character.health = character.health + 40;
                character.hit = character.hit + 2;
                
                if(sex === "male"){
                    character.image="sprite/wizardImageGame.png"
                }else{
                    character.image="sprite/SorcerFemaleImageGame.png"
                }
                break;
                
            case "warrior":
                character.mana= character.mana + 40;
                character.hit= character.hit + 1;
                
                if(sex === "male"){
                    character.image="sprite/warriorImageGame.png"
                }else{
                    character.image="sprite/warriorFImageGame.png"
                }
                break;
            
            case "archer":
                character.hit = character.hit + 3;
                character.health= character.health + 20;
                
                if(sex === "male"){
                    character.image="sprite/ArcherMGame.png"
                }else{
                    character.image="sprite/ArcherFGame.png"
                };
                break;
                
            default:
                alert("something goes wrong");
                // ha senso avere il default dato che non ci possono essere errori ? 
                break;
        }
    
        
});