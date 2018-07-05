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
    { name: "Picard", health: 100, attack: 1, counter: 10, image: "assets/images/Picard.jpg", alive: true },
    { name: "Sisko", health: 100, attack: 10, counter: 10, image: "assets/images/Sisko.jpg", alive: true },
    { name: "Janeway", health: 100, attack: 10, counter: 10, image: "assets/images/Janeway.jpg", alive: true },
    { name: "Kirk", health: 100, attack: 10, counter: 10, image: "assets/images/Kirk.jpg", alive: true },
    { name: "Archer", health: 100, attack: 10, counter: 10, image: "assets/images/Archer.jpg", alive: true },
];
var hero;
var opp;
var attackPower = 0;
var attackPowerIncrement = 0;
var counterPower = 0;
var heroHealth = 0;
var heroMaxHealth = 0;
var oppHealth = 0;
var oppMaxHealth = 0;


$(window).resize(loadLCARS);

$(document).ready(getPlayerName);

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
        chooseHero();
    })
}

function addButton(name, buttonNumber) {
    var buttonAddName = '<p id ="button-' + buttonNumber + '" class = "all-text">' + name + '</p>'
    $(".border-container").append(buttonAddName);
    $("#button-" + buttonNumber).css("width", "0px");
    $("#button-" + buttonNumber).animate({ width: "150px" });
}

function hideButton(e) {
    // console.log("Hide Button Called on", e);
    $(e).empty();
    $(e).animate({ width: "0px" }, function () {
        $(e).css("border-left", "0px");
    });
    $(e).remove();
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
                heroIndex = characters[characters.findIndex(x => x.name == hero)]
                attackPower = heroIndex.attack;
                attackPowerIncrement = heroIndex.attack;
                heroMaxHealth = heroIndex.health;
                heroHealth = heroIndex.health;
                // console.log("attackpower", attackPower);
                setTimeout(chooseOpponent, 2500);

            }
        }
    });



}


function chooseOpponent() {

    console.log("chooseOpponent called");
    $("#choice-1").css("text-align", "right");
    $("#choice-1").text("Please choose your opponent");
    if ($("#opponent-col").length) {

    } else {
        $("#container").append("<div id='opponent-col' style ='float:right; width:50%'></div>")
    }
    $(characters).each(function (image, val) {
        if (val.name != hero) {
            pictureName = "#" + val.name;
            if (this.alive == true) {

                // imgVal = '<img style="width: 40%; clear:both" id = "' + val.name + '" class = "headshot" src = "' + val.image + '"</img> ';


                $(pictureName).appendTo("#opponent-col");
                $(pictureName).css("width", "40%");
                $(pictureName).fadeTo("slow", 1);
            } else {
                // imgVal = '<img style="width: 40%; clear:both; opacity:0.4" id = "' + val.name + '" class = "headshot" src = "' + val.image + '"</img> ';
                $(pictureName).appendTo("#opponent-col");
                $(pictureName).css("width", "40%").css("opacity", ".2").css("background","red");
                $(pictureName).css("float","left").css("background-size", "cover");
                $(pictureName).fadeIn();
            }
        }
    })

    $('#opponent-col').on('click', function (event) {
        console.log(event.target);
        console.log(event.target.tagName);
        if (event.target.tagName == "IMG") {
            if (opp == null) {
                selected = $(event.target).attr("id");

                isAlive = characters[characters.findIndex(x => x.name == selected)].alive;

                if (isAlive == true) {
                    opp = selected;
                    console.log("Opponent Chosen", opp);
                    $('#opponent-col img').each(function (index) {
                        // console.log(this);
                        $(this).fadeTo("slow", 0.15);
                        $(this).hide();
                    });
                    $("#choice-1").empty();

                    $("#" + opp).delay(0).fadeTo("fast", 1);
                    $("#" + opp).css("float", "right");


                    // $("#" + opp).delay(200).animate({ width: "50%" });
                    // $("#" + opp).delay(300).animate({ width: "40%" });
                    oppIndex = characters[characters.findIndex(x => x.name == opp)]
                    counterPower = oppIndex.counter;
                    oppMaxHealth = oppIndex.health;
                    oppHealth = oppIndex.health;
                    console.log("CounterPower =", counterPower);
                    addButton("ATTACK", 1);
                    addButton("RESET", 2);
                    $("#" + opp).animate({ width: "71%" });
                    $("#" + hero).animate({width: "35%"});
                    runGame();



                }
            }
        }
    });


    console.log("chooseOpponent called");

}



function runGame() {
    $("#button-1").click(function () {
        attackOpp();
    });
    $("#button-2").click(function () {
        hideButton("#button-1")
        hideButton("#button-2")
        opp = null;
        hero = null;
        $(characters).each(function (index) {
            this.alive = true;
            console.log(this.alive);
        });

        chooseHero();
    });
}

function attackOpp() {
    console.log("Attacked");
    oppHealth = oppHealth - attackPower;
    heroHealth = heroHealth - counterPower;
    attackPower = attackPower + attackPowerIncrement;
    if (heroHealth <= 0) {
        heroDead();
    }
    if (oppHealth <= 0) {
        oppDead();
    }
}

function heroDead() {
    console.log(hero, "died");
    hideButton("#button-1")
    hideButton("#button-2")
    hero = null;
    opp = null;
    $(characters).each(function (index) {
        this.alive = true;
    });

    setTimeout(chooseHero, 2000);
}

function oppDead() {
    console.log(opp, "died")
    oppIndex.alive = false;
    console.log(characters);
    $("#" + opp).hide();
    hideButton("#button-1");
    hideButton("#button-2");
    opp = null;
    console.log(opp);
    setTimeout(chooseOpponent, 1000);


}

