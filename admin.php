<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Products</title>
	<!-- Bootstrap CSS -->
	<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
	<!-- DataTable CSS -->
	<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
	<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs/dt-1.10.16/r-2.2.0/datatables.min.css"/>
	<!-- My CSS -->
	<link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
	<div class="wraper">
		<a href="#" class="btn btn-success pull-right" data-toggle="modal" data-target="#myModal"><i class="fa fa-plus-square" aria-hidden="true"></i> Add</a><br><br>
		
		<table border='1' align='center' class="table table-striped" id="product-table">
			<thead>
				<tr>
					<th>Question</th>
					<th>Answer</th>
					<th>Image</th>
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
					<h4 class="modal-title"><i class="fa fa-plus-square" aria-hidden="true"></i> Add Product</h4>
				</div>
				<div class="modal-body">
					<form method='POST' action="<?php echo $_SERVER['PHP_SELF'] ?>" id='add-product-form'>
						<input type="hidden" name="id" id="id">
						<div class="form-group">
							<label for="name">Product Name</label>
							<input type="text" class="form-control view-input" name="product_name" id="name">
						</div>
						<div class="form-group">
							<label for="code">Product Code</label>
							<input type="text" class="form-control view-input" name="product_code" id="code">
						</div>
						<div class="form-group">
							<label for="category">Category</label>
							<input type="text" class="form-control view-input" name="category" id="category">
						</div>
						<div class="form-group">
							<label for="description">Description</label>
							<textarea type="text" class="form-control view-input" name="description" id="description" rows="5"></textarea>
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
					<h4 class="modal-title"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit Product</h4>
				</div>
				<div class="modal-body">
					<form method='POST' action="<?php echo $_SERVER['PHP_SELF'] ?>" id='edit-product-form'>
						<input type="hidden" name="id" id="upid">
						<div class="form-group">
							<label for="name">Product Name</label>
							<input type="text" class="form-control view-input" name="product_name" id="upname">
						</div>
						<div class="form-group">
							<label for="code">Product Code</label>
							<input type="text" class="form-control view-input" name="product_code" id="upcode">
						</div>
						<div class="form-group">
							<label for="category">Category</label>
							<input type="text" class="form-control view-input" name="category" id="upcategory">
						</div>
						<div class="form-group">
							<label for="description">Description</label>
							<textarea type="text" class="form-control view-input" name="description" id="updescription" rows="5"></textarea>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="submit" class="btn btn-info" id='edit-btn' data-dismiss="modal">Edit</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>
	<!-- edit modal -->

	<!-- DELETE MODAL -->
	<div id="deleteModal" class="modal fade" role="dialog">
		<div class="modal-dialog">
			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">&times;</button>
					<h4 class="modal-title"><i class="fa fa-trash" aria-hidden="true"></i> Delete Product</h4>
				</div>
				<div class="modal-body">
					<form method='POST' action="<?php echo $_SERVER['PHP_SELF'] ?>" id='delete-product-form'>
						<input type="hidden" name="id" id="deleteid">
						<div class="form-group">
							<label for="name">Do you want to DELETE this?</label>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="submit" class="btn btn-info" id='delete-btn' data-dismiss="modal">Yes</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">No</button>
				</div>
			</div>
		</div>
	</div>
	<!-- delete -->

	<!-- JQuery -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
 	<script type="text/javascript" src="https://cdn.datatables.net/v/bs/dt-1.10.16/r-2.2.0/datatables.min.js"></script>
	<!-- My Script -->
	<script type="text/javascript" src="script.js"></script>
</body>
</html>