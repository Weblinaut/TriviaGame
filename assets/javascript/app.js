var panel = $("#quiz-area");
var countStartNumber = 30;

// Question set
var questions = [{
    question: "Which thunderstorm lifecycle stage is mostly characterized by downdrafts?",
    answers: ["Cumulus", "Disappating", "Mature",],
    correctAnswer: "Disappating",
    image: "assets/images/dissipating.jpeg"
}, {
    question: "An aircraft announces, “left downwind for runway one six”. This means that the aircraft is on a heading of:",
    answers: ["80 degrees", "160 degrees", "340 degrees",],
    correctAnswer: "340 degrees",
    image: "assets/images/runway16.jpeg"
}, {
    question: "While monitoring the Cooperstown CTAF you hear an aircraft announce that they are midfield left downwind to RWY 13. Where would the aircraft be relative to the runway?",
    answers: ["The aircraft is East", "The aircraft is South", "The aircraft is West",],
    correctAnswer: "The aircraft is East",
    image: "assets/images/planerunway.jpeg"
}, {
    question: "Which is true regarding the presence of alcohol within the human body?",
    answers: ["A small amount of alcohol increases vision acuity", "Consuming an equal amount of water will increase the destruction of alcohol and alleviate a hangover", "Judgment and decision-making abilities can be adversely affected by even small amounts of alcohol"],
    correctAnswer: "Judgment and decision-making abilities can be adversely affected by even small amounts of alcohol",
    image: "assets/images/alchohol.jpeg"
}, {
    question: "When using a small UA in a commercial operation, who is responsible for briefing the participants about emergency procedures?",
    answers: ["The FAA inspector-in-charge", "The lead visual observer.", "The remote PIC"],
    correctAnswer: "The remote PIC",
    image: "assets/images/pic.jpg"
}, {
    question: "According to 14 CFR part 107, the responsibility to inspect the small UAS to ensure it is in a safe operating condition rests with the",
    answers: ["Remote pilot-in-command", "Visual observer", "Owner of the small UAS",],
    correctAnswer: "Remote pilot-in-command",
    image: "assets/images/maintenence.jpg"
}, {
    question: "Identify the hazardous attitude or characteristic a remote pilot displays while taking risks in order to impress others?",
    answers: ["Impulsivity.", "Macho", "Invulnerability"],
    correctAnswer: "Macho",
    image: "assets/images/macho.jpeg"
}, {
    question: "Under what condition would a small UA not have to be registered before it is operated in the United States?",
    answers: ["When the aircraft weighs less than .55 pounds on takeoff, including everything that is on-board or attached to the aircraft", "When the aircraft has a takeoff weight that is more than .55 pounds, but less than 55 pounds, not including fuel and necessary attachments", "All small UAS need to be registered regardless of the weight of the aircraft before, during, or after the flight"],
    correctAnswer: "When the aircraft weighs less than .55 pounds on takeoff, including everything that is on-board or attached to the aircraft",
    image: "assets/images/register.jpg"
}];

// Variable to hold our setInterval
var timer;

var game = {

    questions: questions,
    currentQuestion: 0,
    counter: countStartNumber,
    correct: 0,
    incorrect: 0,

    timer: function() {
        game.counter--;
        $("#counter-number").text(game.counter);
        if (game.counter === 0) {
            console.log("TIMER HAS EXPIRED");
            game.timeUp();
        }
    },

    userQuestion: function() {

        timer = setInterval(game.timer, 1000);

        panel.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

        for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
            panel.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i]
                + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
        }
    },

    nextQuestion: function() {
        game.counter = countStartNumber;
        $("#counter-number").text(game.counter);
        game.currentQuestion++;
        game.userQuestion();
    },

    timeUp: function() {

        clearInterval(timer);

        $("#counter-number").html(game.counter);

        panel.html("<h2>Out of Time!</h2>");
        panel.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
        panel.append("<img src='" + questions[this.currentQuestion].image + "' />");

        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        }
        else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },

    results: function() {

        clearInterval(timer);

        panel.html("<h2>All done, heres how you did!</h2>");

        $("#counter-number").text(game.counter);

        panel.append("<h3>Correct Answers: " + game.correct + "</h3>");
        panel.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
        panel.append("<h3>Unanswered: " + (questions.length - (game.incorrect + game.correct)) + "</h3>");
        panel.append("<br><button id='start-over'>Start Over?</button>");
    },

    clicked: function(e) {
        clearInterval(timer);
        if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
            this.answeredCorrectly();
        }
        else {
            this.answeredIncorrectly();
        }
    },

    answeredIncorrectly: function() {

        game.incorrect++;

        clearInterval(timer);

        panel.html("<h2>Nope!</h2>");
        panel.append("<h3>The Correct Answer was: " + questions[game.currentQuestion].correctAnswer + "</h3>");
        panel.append("<img src='" + questions[game.currentQuestion].image + "' />");

        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        }
        else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },

    answeredCorrectly: function() {

        clearInterval(timer);

        game.correct++;

        panel.html("<h2>Correct!</h2>");
        panel.append("<img src='" + questions[game.currentQuestion].image + "' />");

        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        }
        else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },

    reset: function() {
        this.currentQuestion = 0;
        this.counter = countStartNumber;
        this.correct = 0;
        this.incorrect = 0;
        this.userQuestion();
    }
};

// CLICK EVENTS

$(document).on("click", "#start-over", function() {
    game.reset();
});

$(document).on("click", ".answer-button", function(e) {
    game.clicked(e);
});

$(document).on("click", "#start", function() {
    $("#sub-wrapper").append("<h2 id='answer-timer'><span id='counter-number'>30</span> Seconds</h2>");
    game.userQuestion();
});