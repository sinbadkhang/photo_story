function Quiz(questions) {
	this.score = 0;
	this.questions = questions;
	this.questionIndex = 0;
};

// QUESTION'S INDEX IN LIST
Quiz.prototype.getQuestionIndex = function(){
	return this.questions[this.questionIndex];
};

// GAME OVER ?
Quiz.prototype.isEnded = function(){
	return this.questions.length === this.questionIndex;
};

// CHECK ANSWER AND CHOICE
Quiz.prototype.guess = function(answer){		
	// if correct score +1		
	if (this.getQuestionIndex().isCorrectAnswer(answer)) {
		this.score++;
	}

	// next quiz
	this.questionIndex++;
};