<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="Company Directory for fictional company">
  <meta name="author" content="Davide Branciamore">

  <title>Company Directory</title>

  <link href="libs/css/bootstrap.min.css" rel="stylesheet">
  <link href="node_modules/@fortawesome/fontawesome-free/css/all.min.css" rel="stylesheet">
  <link href="libs/css/style.css" rel="stylesheet">


</head>
<!-- Content Section -->
<div class="container">
  <div class="row">
    <div class="col-md-12">
      <h2>PHP and MySQL CRUD Operations</h2>
      <div class="pull-right">
        <button class="btn btn-success" data-toggle="modal" data-target="#add_new_record_modal">Add New Record</button>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
      <h4>Records:</h4>
      <div class="records_content"></div>
    </div>
  </div>
</div>

<!-- Bootstrap Modal - To Add New Record -->
<!-- Modal -->
<div class="modal fade" id="add_new_record_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">×</span></button>
        <h4 class="modal-title" id="myModalLabel">Add New Record</h4>
      </div>
      <div class="modal-body">

        <div class="form-group">
          <label for="first_name">First Name</label>
          <input type="text" id="first_name" placeholder="First Name" class="form-control" />
        </div>

        <div class="form-group">
          <label for="last_name">Last Name</label>
          <input type="text" id="last_name" placeholder="Last Name" class="form-control" />
        </div>

        <div class="form-group">
          <label for="email">Email Address</label>
          <input type="text" id="email" placeholder="Email Address" class="form-control" />
        </div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary" onclick="addRecord()">Add Record</button>
      </div>
    </div>
  </div>
</div>


<script src="libs/js/bootstrap.bundle.js"></script>
<script src="libs/js/jquery.min.js"></script>
<script src="libs/js/script.js"></script>
</body>

</html>