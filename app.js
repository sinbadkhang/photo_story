// DOCUMENT
$(document).ready(function(){
	var questions = [];
	questions = getQuiz(questions);
});

// GET QUIZ
function getQuiz (questions) {
	$.ajax({
		url: 'quizGet.php',
		method: 'POST',
		dateType: 'json',

	}).done(function (data) {
		$.each(data.quizs, function(index, quizs){
			var question = new Question(quizs.question, [quizs.choice1, quizs.choice2], quizs.answer, quizs.image);
			
			questions.push(question);
		})

		var quiz = new Quiz(questions);
		populate(quiz);
	}).fail(function (jqXHR, statusText, errorThrown) {
		console.log('fail: '+ jqXHR.responseText);
		console.log(statusText);
		console.log(errorThrown);
	});
} // get quiz

// create game UI
function populate(quiz){
	if (quiz.isEnded() == true) {
		showScores(quiz);

	} else {
		// show question
		var questionTag = $('#question');
		questionTag.html(quiz.questions[quiz.questionIndex].text);
		var img = $('.wrapper img');
		img.attr('src', quiz.questions[quiz.questionIndex].image);
		
		// show choices
		var choices = quiz.getQuestionIndex().choices;
		for (var i = 0; i < choices.length; i++) {
			var choiceTag = $('#choice'+ i);
			choiceTag.html(choices[i]);
			guess("btn" + i, choices[i], quiz);
		}

		showProgress(quiz);
	}
};

// check answer and guess
function guess(id, guess, quiz) {
    var button = document.getElementById(id);

    button.onclick = function() {
    	quiz.guess(guess);
    	populate(quiz);
    };
};

// show progress
function showProgress(quiz){
	var currentQuizNum = quiz.questionIndex + 1;

	var progressTag = $('#progress');
	progressTag.html('Question ' + currentQuizNum + " of " + quiz.questions.length);

	var chancesTag = $('#chances');
	chancesTag.html('Chance(s) left: ' + quiz.chances);
};

// show score
function showScores(quiz){
	var gameOverHtml = "<h1>Result</h1>";
		gameOverHtml += "<h2 id='score'>Your Scores: " + quiz.score + "</h2>";

	var totalScore = quiz.questions.length*2;
	if (quiz.score == totalScore) {
		gameOverHtml += "<h2>Very good <br> You got it all correct!</h2>";
	} else if (quiz.score >= totalScore/2) {
		gameOverHtml += "<h2>Goodjob <br> You got half of it right.</h2>";
	} else {
		gameOverHtml += "<h2>You have to try harder.</h2>";
	}

	var quizTag = $('#quiz');
	quizTag.html(gameOverHtml);
	$('.wrapper').attr('hidden', true);
	
};