<?php
	include 'credentials.php'; 		
	
	$db_connection = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
	if (!$db_connection) {
		die('Could not connect: ' . mysql_error());
	}

	$input = json_decode(file_get_contents('php://input'));

	
	$query = "SELECT Username, EmailAddress, FirstName, LastName, LastName, SignUpDate FROM Users WHERE Username = '$input->username'";

	
	$result = mysqli_query($db_connection, $query);

	
	if($result) { 
		$data = array();
		while ($row = mysqli_fetch_array($result)) {
		  $data[] = $row;
		}
	    print json_encode($data);
	}
	
	mysqli_close($db_connection);
?>