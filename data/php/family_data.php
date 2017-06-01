<?php
	include 'credentials.php'; 		
	
	$db_connection = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
	if (!$db_connection) {
		die('Could not connect: ' . mysql_error());
	}

	$input = json_decode(file_get_contents('php://input'));

	$data = array();

	for ($x = 1; $x <= $input->floors; $x++) {

		$query = "SELECT c.Username, c.BathroomID, c.Comment, c.DateMade, r.Rating FROM Comments c JOIN Bathrooms b ON b.BathroomID = c.BathroomID JOIN Ratings r ON r.Username = c.Username AND c.BathroomID = r.BathroomID WHERE b.BuildingName = '$input->building' AND b.FloorNumber = '$x' AND b.Family = 1 ORDER BY c.DateMade";
		
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