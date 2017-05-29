<?php
	include 'credentials.php'; 		
	
	$db_connection = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
	if (!$db_connection) {
		die('Could not connect: ' . mysql_error());
	}

	$input = json_decode(file_get_contents('php://input'));

	
	$queryA = "INSERT INTO Comments (Username, BathroomID, Comment, DateMade) VALUES ('$input->username', '$input->bathroomid', '$input->comment', CURRENT_TIMESTAMP)";
	mysqli_query($db_connection, $queryA);

	$queryB = "INSERT INTO Ratings (Username, BathroomID, Rating, DateMade) VALUES ('$input->username', '$input->bathroomid', '$input->rating', CURRENT_TIMESTAMP)";
	mysqli_query($db_connection, $queryB);

	
	// $data = array();
	// while ($row = mysqli_fetch_array($result)) {
	//   $data[] = $row;
	// }
 //    print json_encode($data);
	//mysql_free_result($result);
	mysqli_close($db_connection);
?>