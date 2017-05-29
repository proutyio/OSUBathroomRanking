<?php
	include 'credentials.php'; 		
	
	$db_connection = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
	if (!$db_connection) {
		die('Could not connect: ' . mysql_error());
	}

	$input = json_decode(file_get_contents('php://input'));

	$data = array();

	for ($x = 1; $x <= $input->floors; $x++) {
		// $query = "SELECT u.Username, c.Comment, r.Rating, c.DateMade FROM Users u JOIN Comments c on c.Username = u.Username JOIN Bathrooms b ON c.BathroomID = b.BathroomID JOIN Ratings r ON r.Username = u.Username WHERE b.BuildingName = '$input->building' AND b.FloorNumber = '$x' GROUP BY u.Username";
		$query = "SELECT u.Username, c.Comment, c.DateMade, r.Rating, b.BathroomID FROM Users u JOIN Comments c ON c.Username = u.Username JOIN Bathrooms b ON c.BathroomID = b.BathroomID JOIN Ratings r ON r.BathroomID = b.BathroomID WHERE b.BuildingName = '$input->building' AND b.FloorNumber = '$x'  GROUP BY b.BathroomID Order By DateMade";
		$result = mysqli_query($db_connection, $query);

		$temp = array();
		while ($row = mysqli_fetch_array($result)) {
		  $temp[] = $row;
		}
		$data[] = $temp;

		unset($temp);
		mysqli_free_result($result);
	    
	}


    print json_encode($data);

    mysql_free_result($result);
	mysqli_close($db_connection);
?>