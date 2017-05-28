<?php


	include 'credentials.php'; 
			
	$db_connection = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
	
	// /* check connection */
	if (!$db_connection) {
		die('Could not connect: ' . mysql_error());
	}
	// if (mysqli_connect_errno()) {
	//     printf("Connect failed: %s\n", mysqli_connect_error());
	//     exit();
	// }

	$data = json_decode(file_get_contents('php://input'));

	//print $data;

	// if($username=="" || $password=="") {
	// 	die( "Error: Missing fields are required!" );
	// }


	$query = "SELECT Username, Password FROM Users WHERE Username = '$data->username'";
	$result = mysqli_query($db_connection, $query);


	
	echo json_encode(mysqli_fetch_assoc($result));


	mysqli_close($db_connection);

?>

