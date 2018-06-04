console.log('admin active');
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
// GET PRODUCT
function getProduct () {
	$.ajax({
		url: 'getProduct.php',
		method: 'POST',
		dateType: 'json',
	}).done(function (data) {
		var rows ='';
		
		if (data.result) {
			$.each(data.products, function(index, products){
				var imagePath = (products.image).substring(6);
				
				rows += "<tr id='"+products.id+"'>";
				rows += "<td class='image'><img class='thumbnail' src='../image/"+imagePath+"'></td>"
				rows += "<td class='name'>"+products.name+'</td>';
				rows += "<td class='point'>"+products.point+'</td>';
				rows += "<td class='tag'>"+products.tag_id+'</td>';
				rows += "<td class='description'>"+products.description+'</td>';
				rows += '<td>';
				rows += "<button class='btn btn-primary up'> Update</button> ";
				rows += "<button class='btn btn-danger del'> Delete</button>";
				rows +=	'</td>';
				rows += '</tr>';
			})
			$('#product-table tbody').html(rows);
		}	

	}).fail(function (jqXHR, statusText, errorThrown) {
		console.log('fail: '+ jqXHR.responseText);
		console.log(statusText);
		console.log(errorThrown);	
	}).always(function () {		
	})
} // get product
// GET TAG
function getTag () {
	$.ajax({
		url: 'getTag.php',
		method: 'POST',
		dateType: 'json',
	}).done(function (data) {
		var rows ='';

		if (data.result) {
			$.each(data.tags, function(index, tags){
				rows += "<option value="+tags.tag_id+">"+tags.tag_name+"</option>";
			})
			$('div#sel-tag select').html(rows);
			rows='';

			$.each(data.tags, function(index, tags){
				rows += "<tr>";
				rows += "<td class='tagid'>"+tags.tag_id+'</td>';
				rows += "<td class='tagname'>"+tags.tag_name+'</td>';
				rows += '<td>';
				rows += "<button class='btn btn-primary up'> Update</button> ";
				rows += "<button class='btn btn-danger del'> Delete</button>";
				rows +=	'</td>';
				rows += '</tr>';
			})
			$('#tag-table tbody').html(rows);
		}
	}).fail(function (jqXHR, statusText, errorThrown) {
		console.log('fail: '+ jqXHR.responseText);
		console.log(statusText);
		console.log(errorThrown);	
	}).always(function () {		
	})
} // get tag
// GET PRODUCT
function getContact () {
	$.ajax({
		url: 'getContact.php',
		method: 'POST',
		dateType: 'json',
	}).done(function (data) {
		var rows ='';
		
		if (data.result) {
			$.each(data.contacts, function(index, contacts){
				var imagePath = (contacts.image).substring(6);
				rows += "<tr id='"+contacts.id+"'>";

				rows += "<td class='fname'>"+contacts.fname+'</td>';
				rows += "<td class='lname'>"+contacts.lname+'</td>';
				rows += "<td class='phnum'>"+contacts.phnum+'</td>';
				rows += "<td class='email'>"+contacts.email+'</td>';
				rows += "<td class='country'>"+contacts.country+'</td>';
				rows += "<td class='subject'>"+contacts.subject+'</td>';

				rows += "<td class='image'><img class='thumbnail' src='../image/"+imagePath+"'></td>"
				rows += '<td>';
				rows += "<button class='btn btn-danger del'> Delete</button>";
				rows +=	'</td>';
				rows += '</tr>';
			})
			$('#contact-table tbody').html(rows);
		}	
	}).fail(function (jqXHR, statusText, errorThrown) {
		console.log('fail: '+ jqXHR.responseText);
		console.log(statusText);
		console.log(errorThrown);	
	}).always(function () {		
	})
} // get contact
// GET ACCOUNT
function getAccount () {
	$.ajax({
		url: 'getAccount.php',
		method: 'POST',
		dateType: 'json',
	}).done(function (data) {
		var rows ='';

		if (data.result) {
			$.each(data.accounts, function(index, accounts){
				rows += "<tr>";
				rows += "<td class='accid'>"+accounts.acc_id+'</td>';
				rows += "<td class='accname'>"+accounts.username+'</td>';
				rows += "<td class='accstate'>"+accounts.state+'</td>';
				rows += '<td>';
				rows += "<button class='btn btn-primary up'> Change Status</button> ";
				rows +=	'</td>';
				rows += '</tr>';
			})
			$('#account-table tbody').html(rows);
		}
	}).fail(function (jqXHR, statusText, errorThrown) {
		console.log('fail: '+ jqXHR.responseText);
		console.log(statusText);
		console.log(errorThrown);	
	}).always(function () {		
	})
} // get account

// DOCUMENT
$(document).ready(function(){
	getProduct();
	getTag();
	getContact();
	getAccount();
	// DATA TABLE
	$('#product-table').DataTable({
		responsive: true,
		autoWidth: false,
	})

	// MODAL ADD PRODUCT BUTTON
	$('#add-btn').click(function (e) {
		var productForm = document.querySelector("#add-product-form");

		$.ajax({
			method: 'POST',
			url: 'addProduct.php',
			dateType: 'json',
			processData: false,
			contentType: false,
			data: new FormData(productForm),

		}).done(function (data) {
			// erase INPUT DATA and HIDE MODAL
			productForm.reset();
			$('#addModal img').attr('src', "");
			$('#addModal').modal('hide');
			getProduct();

		}).fail(function (jqXHR, statusText, errorThrown) {
			console.log('fail: '+ jqXHR.responseText);
			console.log(statusText);
			console.log(errorThrown);
		})
	})
	// MODAL UPDATE PRODUCT BUTTON
	$('#up-btn').click(function (e) {
		var productForm = document.querySelector("#up-product-form");
		$.ajax({
			method: 'POST',
			url: 'editProduct.php',
			dateType: 'json',
			processData: false,
			contentType: false,
			data: new FormData(productForm),

		}).done(function (data) {
			// HIDE MODAL
			$('#upModal').modal('hide');
			getProduct();

		}).fail(function (jqXHR, statusText, errorThrown) {
			console.log('fail: '+ jqXHR.responseText);
			console.log(statusText);
			console.log(errorThrown);
		})
	})
	// MODAL DELETE PRODUCT BUTTON
	$('#del-btn').click(function (e) {
		var formData = $('#del-product-form').serialize();
		$.ajax({
			method: 'POST',
			url: 'delProduct.php',
			dateType: 'json',
			data: formData,
		}).done(function (data) {
			// HIDE MODAL
			$('#delModal').modal('hide');
			getProduct();
		}).fail(function (jqXHR, statusText, errorThrown) {
			console.log('fail: '+ jqXHR.responseText);
			console.log(statusText);
			console.log(errorThrown);
		})
	})

	// MODAL ADD TAG BUTTON
	$('#addtag-btn').click(function (e) {
		var tagForm = $("#add-tag-form").serialize();

		$.ajax({
			method: 'POST',
			url: 'addTag.php',
			dateType: 'json',
			data: tagForm,

		}).done(function (data) {
			// erase INPUT DATA and HIDE MODAL
			$('#addtagModal input').val('');
			$('#addtagModal').modal('hide');
			getTag();

		}).fail(function (jqXHR, statusText, errorThrown) {
			console.log('fail: '+ jqXHR.responseText);
			console.log(statusText);
			console.log(errorThrown);
		})
	})
	// MODAL UPDATE TAG BUTTON
	$('#uptag-btn').click(function (e) {
		var tagForm = $("#up-tag-form").serialize();
		$.ajax({
			method: 'POST',
			url: 'editTag.php',
			dateType: 'json',
			data: tagForm,

		}).done(function (data) {
			// erase INPUT DATA and HIDE MODAL
			$('#uptagModal input').val('');
			$('#uptagModal').modal('hide');
			getTag();

		}).fail(function (jqXHR, statusText, errorThrown) {
			console.log('fail: '+ jqXHR.responseText);
			console.log(statusText);
			console.log(errorThrown);
		})
	})
	// MODAL DELETE TAG BUTTON
	$('#deltag-btn').click(function (e) {
		var tagForm = $('#del-tag-form').serialize();
		$.ajax({
			method: 'POST',
			url: 'delTag.php',
			dateType: 'json',
			data: tagForm,

		}).done(function (data) {
			// HIDE MODAL
			$('#deltagModal').modal('hide');
			getTag();

		}).fail(function (jqXHR, statusText, errorThrown) {
			console.log('fail: '+ jqXHR.responseText);
			console.log(statusText);
			console.log(errorThrown);
		})
	})

	// MODAL CHANGE STATUS BUTTON
	$('#state-btn').click(function (e) {
		var stateForm = $("#state-form").serialize();
		$.ajax({
			method: 'POST',
			url: 'editAccount.php',
			dateType: 'json',
			data: stateForm,

		}).done(function (data) {
			// erase INPUT DATA and HIDE MODAL
			$('#stateModal input').val('');
			$('#stateModal').modal('hide');
			getAccount();

		}).fail(function (jqXHR, statusText, errorThrown) {
			console.log('fail: '+ jqXHR.responseText);
			console.log(statusText);
			console.log(errorThrown);
		})
	})

	// MODAL CONTACT DELETE BUTTON
	$('#contact-btn').click(function (e) {
		var dataForm = $("#contact-form").serialize();
		$.ajax({
			method: 'POST',
			url: 'delContact.php',
			dateType: 'json',
			data: dataForm,

		}).done(function (data) {
			// erase INPUT DATA and HIDE MODAL
			$('#contactModal input').val('');
			$('#contactModal').modal('hide');
			getContact();

		}).fail(function (jqXHR, statusText, errorThrown) {
			console.log('fail: '+ jqXHR.responseText);
			console.log(statusText);
			console.log(errorThrown);
		})
	})

	// PRODUCT TABLE UPDATE BUTTON
	$('#product-table tbody').on('click', '.up', function () {
		// GET DATA
		var id = $(this).parents('tr').attr('id');
		var image = $(this).parents('tr').find('.image img.thumbnail').attr('src');
		var name = $(this).parents('tr').find('.name').text();
		var point = $(this).parents('tr').find('.point').text();
		var tag = $(this).parents('tr').find('.tag').text();
		var description = $(this).parents('tr').find('.description').text();		
		// SET DATA	
		$('#upid').val(id);
		$('#upimage').attr('src', image).width(250).height(150);
		$('#upname').val(name);
		$('#uppoint').val(point);
		$('#uptag').val(tag);
		$('#updescription').val(description);		
		// UPDATE MODAL
		$('#upModal').modal();
	})
	// PRODUCT TABLE DELETE BUTTON
	$('#product-table tbody').on('click', '.del', function () {
		var id = $(this).parents('tr').attr('id');
		$('#delid').val(id);
		// SHOW MODAL
		$('#delModal').modal();
	})

	// TAG TABLE UPDATE BUTTON
	$('#tag-table tbody').on('click', '.up', function () {
		// GET DATA
		var id = $(this).parents('tr').find('.tagid').text();
		var name = $(this).parents('tr').find('.tagname').text();
		// SET DATA
		$('#uptagid').val(id);
		$('#uptagname').val(name);		
		// UPDATE MODAL
		$('#uptagModal').modal();
	})
	// TAG TABLE DELETE BUTTON
	$('#tag-table tbody').on('click', '.del', function () {
		var id = $(this).parents('tr').find('.tagid').text();
		$('#deltagid').val(id);
		// SHOW MODAL
		$('#deltagModal').modal();
	})

	// ACCOUNT TABLE CHANGE BUTTON
	$('#account-table tbody').on('click', '.up', function () {
		// GET DATA
		var id = $(this).parents('tr').find('.accid').text();
		var name = $(this).parents('tr').find('.accname').text();
		var state = $(this).parents('tr').find('.accstate').text();
		// SET DATA
		$('#accid').val(id);
		$('#accname').val(name);
		$('#accstate').val(state);		
		// UPDATE MODAL
		$('#stateModal').modal();
	})

	// CONTACT TABLE DELETE BUTTON
	$('#contact-table tbody').on('click', '.del', function () {
		var id = $(this).parents('tr').attr('id');
		$('#contact-id').val(id);
		// SHOW MODAL
		$('#contactModal').modal();
	})

})