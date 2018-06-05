function Question(text, choices, answer){
	this.text = text;
	this.choices = choices;
	this.answer = answer;
};

// check answer
Question.prototype.isCorrectAnswer = function(choice) {
	return choice === this.answer;
};