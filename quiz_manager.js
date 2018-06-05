function Quiz(questions) {
	this.score = 0;
	this.questions = questions;
	this.questionIndex = 0;
	this.chances = 3;
};

// QUESTION'S INDEX IN LIST
Quiz.prototype.getQuestionIndex = function(){
	return this.questions[this.questionIndex];
};

// GAME OVER ?
Quiz.prototype.isEnded = function(){
	return (this.questions.length === this.questionIndex || this.chances == 0);
};

// CHECK ANSWER AND CHOICE
Quiz.prototype.guess = function(answer){
	// if correct	
	if (this.getQuestionIndex().isCorrectAnswer(answer)) {
		this.score = this.score + 2;
	} else {
		// if wrong
		this.chances--;
	}

	// next quiz
	this.questionIndex++;
};