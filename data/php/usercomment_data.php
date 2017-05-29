
<?php
	include 'credentials.php'; 		
	
	$db_connection = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
	if (!$db_connection) {
		die('Could not connect: ' . mysql_error());
	}

	$input = json_decode(file_get_contents('php://input'));

	
	$query = "SELECT u.Username, u.FirstName, u.LastName, u.EmailAddress, c.Comment, c.DateMade, r.Rating, c.BathroomID, b.BuildingName,b.FloorNumber FROM Users as u JOIN Comments as c ON u.Username = c.Username JOIN Bathrooms as b ON c.BathroomID = b.BathroomID JOIN Ratings as r on b.BathroomID = r.BathroomID WHERE u.Username = '$input->username' GROUP BY b.BathroomID";

	$result = mysqli_query($db_connection, $query);

	if($result) {
		$data = array();
		while ($row = mysqli_fetch_array($result)) {
		  $data[] = $row;
		}
	    print json_encode($data);
	}
	else
		die('Not successful'); 


	mysql_free_result($result);
	mysqli_close($db_connection);
?>
