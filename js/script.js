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
    var cat = $(".normal, .fast, .slow");
    var audio = new Audio('./audio/NyanCatoriginal.mp3');
    audio.play();

    audio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
    audio.play();

    $("#audio-controller").on('click','.audio-button', function() {
        audio.muted = !audio.muted;
        $(".audio-button").toggleClass("muted");
    });

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
        gems = [];
        for (var i = 0; i < 4; i++) {
            gems.push({
                color: colors[i],
                value: Math.floor((Math.random() * 12) + 1)
            })
        }
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
                cat.css('background-position', "-1000px");
            }, 500);

        } else if (tempScore === goalScore) {
            wins++;
            scoreContainer.html("You Win!")


            setTimeout(function() {
                resetGame()
                gemsContainer.empty()
                createGems()
                cat.css('background-position', "-1000px");
            }, 1000);

        } else {

            scoreContainer.html(tempScore);
        }

        var benchmarks = tempScore / goalScore;
        benchmarks = Math.floor(benchmarks * 100);
        updateCat(benchmarks);


    }

    //update the cat based on progress
    function updateCat(benchmarks) {


        if (benchmarks > 0 && benchmarks <= 20) {
            cat.css('background-position', "-1000px");
        } else if (benchmarks <= 40) {
            cat.css('background-position', "-750px");
        } else if (benchmarks <= 60) {
            cat.css('background-position', "-500px");
        } else if (benchmarks <= 80) {
            cat.css('background-position', "-250px");
        } else if (benchmarks <= 100) {
            cat.css('background-position', "-100px");
        }


        if (wins === 1) {
            $(".slow, fast").css("display", "none");
            $(".normal").css("display", "block");
        } else if (wins >= 2) {
            $(".slow, .normal").css("display", "none");
            $(".fast").css("display", "block");
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