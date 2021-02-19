<?php

	$executionStartTime = microtime(true);

	include("config.php");

	header('Content-Type: application/json; charset=UTF-8');

	$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

	if (mysqli_connect_errno()) {
		
		$output['status']['code'] = "300";
		$output['status']['name'] = "failure";
		$output['status']['description'] = "database unavailable";
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output);

		exit;

	}	

	//$query = 'SELECT id FROM personnel p WHERE departmentID = ' . $_POST['departmentID'];
    $query = 'SELECT id FROM `personnel` WHERE departmentID = 1';
           
	$result = $conn->query($query);

	if (!$result) {

		$output['status']['code'] = "400";
		$output['status']['name'] = "executed";
		$output['status']['description'] = "query failed";	
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output); 

		exit;

	}
   
	$data = [];

 while ($row = mysqli_fetch_assoc($result)) {

	 array_push($data, $row);

 }


	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data'] = $data;
  
	$entries = count($data);
	//echo $entries;
  
	if ($entries == 0) {
	 // $query = 'DELETE FROM department WHERE id = ' . $_POST['departmentID'];
	   $query = 'DELETE FROM department WHERE id = 1';
	  $result = $conn->query($query);

	} else {
	  $output['status']['code'] = "400";
	  $output['status']['name'] = "executed";
	  $output['status']['description'] = "Department has ".$entries." employees. Unable to delete.";	
	  $output['data'] = [];
  
	  mysqli_close($conn);
  
	  echo json_encode($output); 
  
	  exit;
	}
	mysqli_close($conn);
  
	echo json_encode($output); 

?>