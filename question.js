function Question(text, choices, answer, image){
	this.text = text;
	this.choices = choices;
	this.answer = answer;
	this.image = image;
};

// check answer
Question.prototype.isCorrectAnswer = function(choice) {
	return choice === this.answer;
};