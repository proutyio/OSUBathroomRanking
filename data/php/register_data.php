<?php


	include 'credentials.php'; 
			
	$db_connection = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
	
	// /* check connection */
	if (!$db_connection) {
		die('Could not connect: ' . mysql_error());
	}

	$input = json_decode(file_get_contents('php://input'));


	$query = "INSERT INTO Users (Username, Password, EmailAddress, FirstName, LastName, SignUpDate) VALUES ('$input->username', '$input->password', '$input->email', '$input->firstname', '$input->lastname', CURRENT_TIMESTAMP)";

	$result = mysqli_query($db_connection, $query);

	if(!$result)
		die('Not successful');
	

	mysqli_close($db_connection);

?>

