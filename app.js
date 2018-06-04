// $(document).ready(function () {
	function populate(){
		if (quiz.isEnded() == true) {
			showScores();
		}
		else {
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

			showProgress();
		}
	};

	function guess(id, guess) {
	    // var button = $('#' + id);
	    // button.click(function() {
	    // 	quiz.guess(guess);
	    // 	populate();
	    // });

	    // không dùng cách trên, lỗi questionIndex cộng thêm 2 thay vì 1

	    var button = document.getElementById(id);
	    button.onclick = function() {
	    	quiz.guess(guess);
	    	populate();
	    };
	};

	function showProgress(){
		var currentQuizNum = quiz.questionIndex + 1;

		var progressTag = $('#progress');
		progressTag.html('Question ' + currentQuizNum + " of " + quiz.questions.length);

	};

	function showScores(){
		var gameOverHtml = "<h1>Result</h1>";
			gameOverHtml += "<h2 id='score'>Your Scores: " + quiz.score + "</h2>";

		var quizTag = $('#quiz');
		quizTag.html(gameOverHtml);
		
	};

	// create questions list
	var questions = [
		new Question("1 + 1 = ... ?", ["4", "2", "3", "1"], "2"),
		new Question("8 9 10 ... ?", ["11", "13", "J", "7"], "J"),
		new Question("Hello ... ?", ["World", "There, General Kenobi", "From The Other Side", "Is It Me You're Looking For?"], "World"),
		new Question("Number ... ?", ["4", "0", "5", "9"], "4"),
		new Question("No = ... ?", ["Nope", "Nah", "Not Yes", "Yesn't"], "Yesn't"),
	];
	// create quiz
	var quiz = new Quiz(questions);
	// display quiz
	populate();
// });