// create questions list
// var questions = [
	// new Question("1 + 1 = ... ?", ["4", "2", "3", "1"], "2"),
	// new Question("8 9 10 ... ?", ["11", "13", "J", "7"], "J"),
// ];

// create quiz
// var quiz = new Quiz(questions);
// var quiz;
// display quiz
// populate();

// GET QUIZ

function getQuiz () {
	var questions = [];

	$.ajax({
		url: 'quizGet.php',
		method: 'POST',
		dateType: 'json',
	}).done(function (data) {
		

		if (data.result) {
			$.each(data.quizs, function(index, quizs){
				// var question = new Question(quizs.question, [quizs.choice1, quizs.choice2, quizs.choice3, quizs.choice4], quizs.answer);
				var question = new Question("1 + 1 = ... ?", ["4", "2", "3", "1"], "2");
				questions.push(question);
			})
		}	

	}).fail(function (jqXHR, statusText, errorThrown) {
		console.log('fail: '+ jqXHR.responseText);
		console.log(statusText);
		console.log(errorThrown);
	})

	return questions;
} // get quiz

// DOCUMENT
$(document).ready(function(){
	var questions = [];
	questions = getQuiz();

	// var quiz = new Quiz(questions);
	console.log(questions);
	console.log(questions.length);
	console.log(questions[0]);
	// console.log(quiz);
	// console.log(quiz.questions);
	// console.log(quiz.questions.length);

	// var quiz;

	// getQuiz();
	// populate(quiz);
	
function populate(quiz){
	
	if (quiz.isEnded() == true) {
		showScores(quiz);

	} else {
		// show question
		var questionTag = $('#question');
		questionTag.html(quiz.getQuestionIndex().text);

		// show choices
		var choices = quiz.getQuestionIndex().choices;
		// loop 4 times
		for (var i = 0; i < choices.length; i++) {
			var choiceTag = $('#choice'+ i);
			choiceTag.html(choices[i]);
			guess("btn" + i, choices[i]);
		}

		showProgress(quiz);
	}
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
    	quiz.guess(guess);
    	populate();
    };
};

function showProgress(quiz){
	var currentQuizNum = quiz.questionIndex + 1;

	var progressTag = $('#progress');
	progressTag.html('Question ' + currentQuizNum + " of " + quiz.questions.length);

};

function showScores(quiz){
	var gameOverHtml = "<h1>Result</h1>";
		gameOverHtml += "<h2 id='score'>Your Scores: " + quiz.score + "</h2>";

	var quizTag = $('#quiz');
	quizTag.html(gameOverHtml);
	
};

});
