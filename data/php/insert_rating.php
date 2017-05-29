<?php
	include 'credentials.php'; 		
	
	$db_connection = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
	if (!$db_connection) {
		die('Could not connect: ' . mysql_error());
	}

	$input = json_decode(file_get_contents('php://input'));

	$query = "INSERT INTO Ratings (Username, BathroomID, Rating, DateMade) VALUES ('$input->username', '$input->bathroomid', '$input->rating', CURRENT_TIMESTAMP)";
	$result = mysqli_query($db_connection, $query);

	mysql_free_result($result);
	mysqli_close($db_connection);
?>