<?php
	include 'credentials.php'; 		
	
	$db_connection = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
	if (!$db_connection) {
		die('Could not connect: ' . mysql_error());
	}

	$input = json_decode(file_get_contents('php://input'));
	$building = "";

	switch ($input->building) {
	    case "kelley":
	        $building = "Kelley Engineering Center";
	        break;
	    case "linq":
	        $building = "Learning Innovation Center";
	        break;
	    case "library":
	        $building = "Valley Library";
	        break;
	}



	$query = "SELECT u.Username, c.Comment, r.Rating, c.DateMade FROM Users u JOIN Comments c on c.Username = u.Username JOIN Bathrooms b ON c.BathroomID = b.BathroomID JOIN Ratings r ON r.Username = u.Username WHERE b.BuildingName = '$building' AND b.FloorNumber = '$input->floors' GROUP BY u.Username";
	// $query = "SELECT u.Username, c.Comment, r.Rating, c.DateMade FROM Users u JOIN Comments c on c.Username = u.Username JOIN Bathrooms b ON c.BathroomID = b.BathroomID JOIN Ratings r ON r.Username = u.Username WHERE b.BuildingName = '$building' GROUP BY u.Username";

	
	$result = mysqli_query($db_connection, $query);

	$data = array();
	while ($row = mysqli_fetch_array($result)) {
	  $data[] = $row;
	}
    print json_encode($data);

	// print json_encode($input->username);

	mysqli_close($db_connection);
?>