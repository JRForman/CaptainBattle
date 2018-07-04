//DEFINE CHARACTERS
//SELECT A HERO
//SELECT AN OPPONENT
//FIGHT 
//WIN LOSS
//FIGHT NEXT
//REPEAT
//FINAL FIGHT WIN/LOSS
//RESTART FUNCITON
var playerName = " ";
var characters = [
    { name: "Picard", health: 100, attack: 10, counter: 10, image: "assets/images/Picard.jpg", alive: true },
    { name: "Sisko", health: 100, attack: 10, counter: 10, image: "assets/images/Sisko.jpg", alive: false },
    { name: "Janeway", health: 100, attack: 10, counter: 10, image: "assets/images/Janeway.jpg", alive: true },
    { name: "Kirk", health: 100, attack: 10, counter: 10, image: "assets/images/Kirk.jpg", alive: true },
    { name: "Archer", health: 100, attack: 10, counter: 10, image: "assets/images/Archer.jpg", alive: true },
];
var hero;
var opp;

$(window).resize(loadLCARS);

$(document).ready(getPlayerName);

function welcome() {



}

function loadLCARS() {

    var topWidth = window.innerWidth - 300;
    $("#top-corner").fadeIn(500, function () {
        $("#top-bar").animate({ width: + topWidth + "px" }, function () {
            $("#name-text").text(playerName.toUpperCase());
            $("#name-text").fadeIn(200);
            $("#banner").text("STAR TREK CAPTAIN BATTLE");
            $("#banner").fadeIn(400);
        });
        $("#top-bar").animate({ borderTopRightRadius: "10px", borderBottomRightRadius: "10px" });
        $("#side-bar").animate({ height: "80vh" });

    });
}


function getPlayerName() {
    $("#container").append("<h1>Hello Admiral, what is your name?</h1>");
    $("#container").append('<textarea type="text-box" name="player" class="all-text" id="input-name">');
    $(".border-container").append('<p id="button-1" class = "all-text">START</p>');
    $("#input-name").focus();
    $("#button-1").click(function () {

        playerName = "ADMIRAL " + $("#input-name").val().toUpperCase();
        console.log("Player submitted", playerName);
        $("#container").empty();
        loadLCARS();
        hideButton("#button-1");
        startGame();
    })
}

function addButton(name, buttonNumber){
    var buttonAddName = '<p id ="button-' + buttonNumber + '" class = "all-text">' + name + '</p>'
    $(".border-container").append(buttonAddName);
    $("#button-" +buttonNumber).css("width", "0px");
    $("#button-" +buttonNumber).animate({width:"150px"});
}

function hideButton(e) {
    // console.log("Hide Button Called on", e);
    $(e).empty();
    $(e).animate({ width: "0px" }, function () {
        $(e).css("border-left", "0px");
    });
    $(e).remove();
}

function startGame() {

    chooseHero();


}

function chooseHero() {

    $("#container").empty();
    $("#container").append("<div id='choice-banner'><div id=choice-1>Please choose your hero...</div></div>");
    $(characters).each(function (image, val) {
        imgVal = '<img style="width: 20%" id = "' + val.name + '" class = "headshot" src = "' + val.image + '"</img> '
        $("#container").append(imgVal);
    });
    $('#container img').each(function () {
        $(this).hide();
    });
    $('#container img').each(function (index) {
        $(this).delay(200 * index).fadeIn(500);
    });


    $('#container').on('click', function (event) {
        if (event.target != this) {
            if (hero == null) {
                hero = $(event.target).attr("id");
                console.log("Hero Chosen", hero);
                $('#container img').each(function (index) {
                    $(this).fadeOut("slow");
                });
                $("#" + hero).delay(0).fadeIn();
                $("#" + hero).delay(200).animate({ width: "40%" });
                $("#" + hero).delay(300).animate({ width: "20%" });
                setTimeout(chooseOpponent, 2500);
                
            }
        }
    });



}
function chooseOpponent() {

    console.log("chooseOpponent called");
    $("#choice-1").css("text-align", "right");
    $("#choice-1").text("Please choose your opponent");
    $("#container").append("<div id='opponent-col' style ='float:right; width:50%'></div>")

    $(characters).each(function (image, val) {
        if (val.name != hero) {
            if (this.alive == true) {
                imgVal = '<img style="width: 40%; clear:both" id = "' + val.name + '" class = "headshot" src = "' + val.image + '"</img> ';
                $("#opponent-col").append(imgVal);
            }else{
                imgVal = '<img style="width: 40%; clear:both; opacity:0.4" id = "' + val.name + '" class = "headshot" src = "' + val.image + '"</img> ';
                $("#opponent-col").append(imgVal);
            }
        }
    })
    $('#opponent-col').on('click', function (event) {
        if (event.target != this) {
            if (opp == null) {
                selected = $(event.target).attr("id");
                isAlive = characters[characters.findIndex(x => x.name==selected)].alive;
                
                if(isAlive == true){
                    opp=selected;
                console.log(isAlive);
                console.log("Opponent Chosen", opp);
                $('#opponent-col img').each(function (index) {
                    // console.log(this);
                    $(this).fadeOut("slow");
                });

                $("#" + opp).delay(0).fadeIn();
                $("#" + opp).css("float", "right");
                $("#" + opp).delay(200).animate({ width: "40%" });
                $("#" + opp).delay(300).animate({ width: "20%" });
                addButton("ATTACK", 1);
                addButton("RESET", 2);


                
                 }
            }
        }
    });



}




