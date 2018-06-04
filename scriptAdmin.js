// IMAGE PREVIEW
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('img.img-preview')
                .attr('src', e.target.result)
                .width(250)
                .height(150);
        };
        reader.readAsDataURL(input.files[0]);
    }
}
// GET QUIZ
function getQuiz () {
	$.ajax({
		url: 'quizGet.php',
		method: 'POST',
		dateType: 'json',
	}).done(function (data) {
		var rows ='';

		if (data.result) {
			$.each(data.quizs, function(index, quizs){
			var imagePath = (quizs.image).substring(6);
			
			rows += "<tr id='"+quizs.id+"'>";
			rows += "<td class='image'><img class='thumbnail' src='image/"+imagePath+"'></td>";
			rows += "<td class='question'>"+quizs.question+'</td>';
			
			rows += "<td class='question'>"+quizs.choice1+'</td>';
			rows += "<td class='question'>"+quizs.choice2+'</td>';
			rows += "<td class='question'>"+quizs.choice3+'</td>';
			rows += "<td class='question'>"+quizs.choice4+'</td>';
			
			rows += "<td class='answer'>"+quizs.answer+'</td>';
			rows += '<td>';
			rows += "	<button class='btn btn-primary up'> Update</button>";
			rows += "	<button class='btn btn-danger del'> Delete</button>";
			rows +=	'</td>';
			rows += '</tr>';
		})
			$('#product-table tbody').html(rows);
		}	

	}).fail(function (jqXHR, statusText, errorThrown) {
		console.log('fail: '+ jqXHR.responseText);
		console.log(statusText);
		console.log(errorThrown);
	})
} // get quiz

// DOCUMENT
$(document).ready(function(){
	getQuiz();
	// DATA TABLE
	$('#product-table').DataTable({
		responsive: true,
		autoWidth: false,
	})

	// ADD BUTTON in modal
	$('#add-btn').click(function (e) {
		var productForm = document.querySelector("#add-product-form");

		$.ajax({
			method: 'POST',
			url: 'quizAdd.php',
			dateType: 'json',
			processData: false,
			contentType: false,
			data: new FormData(productForm),

		}).done(function (data) {
			// erase INPUT DATA and HIDE MODAL
			if (data) {
				productForm.reset();
				$('#addModal img').attr('src', "");
				$('#addModal').modal('hide');
				getQuiz();
			} else {
				console.log(data.message);
			}			

		}).fail(function (jqXHR, statusText, errorThrown) {
			console.log('fail: '+ jqXHR.responseText);
			console.log(statusText);
			console.log(errorThrown);
		})
	})
	// UPDATE BUTTON in modal
	$('#up-btn').click(function (e) {
		var productForm = document.querySelector("#up-product-form");

		$.ajax({
			method: 'POST',
			url: 'quizEdit.php',
			dateType: 'json',
			processData: false,
			contentType: false,
			data: new FormData(productForm),

		}).done(function (data) {
			// HIDE MODAL
			if (data) {
				$('#upModal').modal('hide');
				getQuiz();
			} else {
				console.log(data.message);
			}

		}).fail(function (jqXHR, statusText, errorThrown) {
			console.log('fail: '+ jqXHR.responseText);
			console.log(statusText);
			console.log(errorThrown);
		})
	})
	// DELETE BUTTON in modal
	$('#del-btn').click(function (e) {
		var formData = $('#del-product-form').serialize();
		$.ajax({
			method: 'POST',
			url: 'quizDel.php',
			dateType: 'json',
			data: formData,

		}).done(function (data) {
			// HIDE MODAL
			if (data) {
				$('#delModal').modal('hide');
				getQuiz();
			} else {
				console.log(data.message);
			}
			
		}).fail(function (jqXHR, statusText, errorThrown) {
			console.log('fail: '+ jqXHR.responseText);
			console.log(statusText);
			console.log(errorThrown);
		})
	})

	// UPDATE BUTTON in table
	$('#product-table tbody').on('click', '.up', function () {
		// GET DATA
		var id = $(this).parents('tr').attr('id');
		var image = $(this).parents('tr').find('.image .thumbnail').attr('src');
		var question = $(this).parents('tr').find('.question').text();
		var answer = $(this).parents('tr').find('.answer').text();		
		// SET DATA	
		$('#upid').val(id);
		$('#upimage').attr('src', image).width(250).height(150);
		$('#upQuestion').val(question);
		$('#upAnswer').val(answer);	
		// show MODAL
		$('#upModal').modal();
	})
	// DELETE BUTTON in table
	$('#product-table tbody').on('click', '.del', function () {
		var id = $(this).parents('tr').attr('id');
		$('#delid').val(id);
		console.log(id);
		// show MODAL
		$('#delModal').modal();
	})
})