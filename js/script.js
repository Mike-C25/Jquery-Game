$(document).ready(function() {
    var goal = 0;
    var wins = 0;
    var losses = 0;
    var gems = [];
    var score = 0;
    var colors = ["green", "red", "blue", "yellow"];
    var gemsContainer = $("#gems");
    var goalContainer = $("#goal");
    var scoreContainer = $("#total-score");
    var statsContainer = $("#stats");

    function initGame() {
        var goal = 0;
        var wins = 0;
        var losses = 0;
        var score = 0;
        //Set Goal Value
        goal = Math.floor((Math.random() * 120) + 19);
        gemsContainer.empty();
        goalContainer.html(goal);
        scoreContainer.html(score);
        statsContainer.html("Wins: " + wins + "<br/>" + "Losses: " + losses);
        //Set Gems Values
        for (var i = 0; i < 4; i++) {
            gems.push({
                color: colors[i],
                value: Math.floor((Math.random() * 12) + 1)
            })
        }

    }

    function createGems() {
        for (var i = 0; i < gems.length; i++) {
            var newGem = $("<div>");
            newGem.attr({ "id": gems[i].color, "class": "gem", "value": gems[i].value });
            gemsContainer.append(newGem);
        }
    }

    function resetGame() {
        var goal = 0;
        var score = 0;
        //Set Goal Value
        goal = Math.floor((Math.random() * 120) + 19);
        gemsContainer.empty();
        goalContainer.html(goal);
        scoreContainer.html(score);
        statsContainer.html("Wins: " + wins + "<br/>" + "Losses: " + losses);
    }


    function updateGame(color, value) {
        //grab current score and add value of gem clicked
        var tempScore = parseInt(scoreContainer[0].innerHTML);
        var goalScore = parseInt(goalContainer[0].innerHTML);

        tempScore += value;
        if (tempScore > goalScore) {
            losses++;
            scoreContainer.html("You Lose!")
            setTimeout(function() {
                resetGame()
                gemsContainer.empty()
                createGems()
            }, 1000);

        } else if (tempScore === goalScore) {
            wins++;
            scoreContainer.html("You Win!")
            setTimeout(function() {
                resetGame()
                gemsContainer.empty()
                createGems()
            }, 1000);

        } else {

            scoreContainer.html(tempScore);
        }


    }
    //single gem on click
    $("#gems").on('click', '.gem', function() {
        var gem = this;
        var color = gem.id;
        var value = parseInt($(this).attr("value"));

        updateGame(color, value);
    });




    initGame();
    createGems();


});