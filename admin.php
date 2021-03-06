<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Quizs Manage</title>
	<!-- Bootstrap CSS -->
	<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
	<!-- DataTable CSS -->
	<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
	<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs/dt-1.10.16/r-2.2.0/datatables.min.css"/>
	<!-- My CSS -->
	<link rel="stylesheet" type="text/css" href="styleAdmin.css">
</head>
<body>
	<div class="wraper">
		<a href="#" class="btn btn-success pull-right" data-toggle="modal" data-target="#myModal"><i class="fa fa-plus-square" aria-hidden="true"></i> Add</a><br><br>
		
		<table border='1' align='center' class="table table-striped" id="product-table">
			<thead>
				<tr>
					<th>Image</th>
					<th>Question</th>
					<th>Choice 1</th>
					<th>Choice 2</th>
					<th>Answer</th>
					<th>Options</th>
				</tr>
			</thead>
			<tbody>
				
			</tbody>
		</table>
	</div>

	<!-- ADD MODAL -->
	<div id="myModal" class="modal fade" role="dialog">
		<div class="modal-dialog">
			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">&times;</button>
					<h4 class="modal-title"><i class="fa fa-plus-square" aria-hidden="true"></i> Add Quiz</h4>
				</div>
				<div class="modal-body">
					<form method='POST' action="<?php echo $_SERVER['PHP_SELF'] ?>" id='add-product-form'>
						<input type="hidden" name="id" id="id">
						<div class="form-group">
							<label for="question">Question</label>
							<input type="text" class="form-control view-input" name="question" id="question">
						</div>
						<div class="form-group">
							<label for="choice1">Choice 1</label>
							<input type="text" class="form-control view-input" name="choice1" id="choice1">
						</div>
						<div class="form-group">
							<label for="choice2">Choice 2</label>
							<input type="text" class="form-control view-input" name="choice2" id="choice2">
						</div>
						<div class="form-group">
							<label for="code">Answer</label>
							<input type="text" class="form-control view-input" name="answer" id="answer">
						</div>
						<div class="form-group">
							<label for="image">Image</label>
							<input type="file" name="imageFile" id="addFile" onchange="readURL(this);" value="">
							<img src="#" id="addimage" class="thumbnail img-preview">
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-info" id='add-btn' data-dismiss="modal">Add</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>
	<!-- add modal -->

	<!-- EDIT MODAL -->
	<div id="upModal" class="modal fade" role="dialog">
		<div class="modal-dialog">
			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">&times;</button>
					<h4 class="modal-title"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit Quiz</h4>
				</div>
				<div class="modal-body">
					<form method='POST' action="<?php echo $_SERVER['PHP_SELF'] ?>" id='up-product-form'>
						<input type="hidden" name="id" id="upid">
						<div class="form-group">
							<label for="question">Question</label>
							<input type="text" class="form-control view-input" name="question" id="upQuestion">
						</div>
						<div class="form-group">
							<label for="choice1">Choice 1</label>
							<input type="text" class="form-control view-input" name="choice1" id="upchoice1">
						</div>
						<div class="form-group">
							<label for="choice2">Choice 2</label>
							<input type="text" class="form-control view-input" name="choice2" id="upchoice2">
						</div>
						<div class="form-group">
							<label for="answer">Answer</label>
							<input type="text" class="form-control view-input" name="answer" id="upAnswer">
						</div>
						<div class="form-group">
							<label for="image">Image</label>
							<input type="file" name="imageFile" id="addFile" onchange="readURL(this);" value="">
							<img src="" id="upimage" class="thumbnail img-preview">
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="submit" class="btn btn-info" id='up-btn' data-dismiss="modal">Edit</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>
	<!-- edit modal -->

	<!-- DELETE MODAL -->
	<div id="delModal" class="modal fade" role="dialog">
		<div class="modal-dialog">
			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">&times;</button>
					<h4 class="modal-title"><i class="fa fa-trash" aria-hidden="true"></i> Delete Quiz</h4>
				</div>
				<div class="modal-body">
					<form method='POST' action="<?php echo $_SERVER['PHP_SELF'] ?>" id='del-product-form'>
						<input type="hidden" name="id" id="delid">
						<div class="form-group">
							<label for="quiz">Do you want to DELETE this Quiz?</label>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="submit" class="btn btn-info" id='del-btn' data-dismiss="modal">Yes</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">No</button>
				</div>
			</div>
		</div>
	</div>
	<!-- delete modal -->

	<!-- JQuery -->
	<script src="jquery-3.2.1.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
 	<script type="text/javascript" src="https://cdn.datatables.net/v/bs/dt-1.10.16/r-2.2.0/datatables.min.js"></script>
	<!-- My Script -->
	<script type="text/javascript" src="scriptAdmin.js"></script>
</body>
</html>