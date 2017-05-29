


app.controller('controller',['$scope','$location','$http',function($scope,$location,$http) {

	$scope.starrating = 0;
	$scope.currentuser ="Welcome, Guest!";
	$scope.errormessage ="";
	$scope.buildingtext = "";
	$scope.loginVisible = true;
	$scope.profileVisible = false;
	$scope.bathroomsVisible = false;
	$scope.selectedDropdown = "";
	$scope.bathroomID = "";

	
	$scope.loginUser = function(input) {
		$scope.errormessage="";
		
		var $promise = $http.post('data//php//login_data.php', input);
		$promise.then(function(json) {
			if(typeof input === "undefined") { $scope.errormessage = "Error: Missing fields required"; }
			else {
				if(json.data.Username === input.username && json.data.Password === input.password) {
					var user = {'username': json.data.Username};
					$scope.loadProfileData(user);

					$scope.currentuser = json.data.Username;
					$location.path('/profile');
					$scope.loginVisible = false;
					$scope.isLoggedIn = true;
					$scope.profileVisible = true;
				}
				else { $scope.errormessage = "Error: Invalid Username or Password"; }
			}
		});
	}


	$scope.registerUser = function(input) {
		$scope.errormessage="";
		console.log(input);
		if(typeof input === "undefined") { $scope.errormessage ="Error: Missing fields required"; }
		else {
			if( (input['username']===""||input['password']===""||input['email']===""||input['firstname']===""||input['lastname']==="") ||
			  (typeof input['username']==="undefined"||typeof input['password']==="undefined"||typeof input['email']==="undefined"||
			  	typeof input['firstname']==="undefined"||typeof input['lastname']==="undefined") ) {
				$scope.errormessage ="Error: Missing fields required";
			}
			else {
				$promise = $http.post('data//php//register_data.php', input).then(function(json) {
					console.log(json);
					if(json.data == "Not successful") {
						$scope.errormessage = "Error: Query Failed - Username might already exist";
					}
					else {
						$scope.currentuser = input['username'];
						var user = {'username': input['username']};
						$scope.loadProfileData(user);
						$scope.loginVisible = false;
						$scope.isLoggedIn = true;
						$scope.profileVisible = true;
						$location.path('/profile');
						
					}
				});
			}
		}
	}



	$scope.logoutUser = function() { 
		$scope.loginVisible = true;
		$scope.isLoggedIn = false;
		$scope.profileVisible = false;
		$scope.currentuser="Welcome, Guest!";
		$scope.loadProfileData("");
		$location.path('/');
	}



	$scope.submitComment = function(building, floors, comment) {
		// console.log($scope.currentuser);
		// console.log($scope.bathroomID);
		// console.log(comment);
		// console.log($scope.starrating);
		var input = {'username':$scope.currentuser,'bathroomid':$scope.bathroomID,'comment':comment,'rating':$scope.starrating};
		
		$http.post('data//php//submit_data.php',input).then(function(json) {});
		$scope.loadBathroomData(building,floors); 
	}



	$scope.loadProfileData = function(user) {
		 $http.post('data//php//profile_data.php',user).then(function(json) { 
		 	$scope.profiledata = json.data;
		 });
	}



	$scope.loadBathroomData = function(building, floors) {
		var buildingname = $scope.switchBuildingName(building);
		var input = {'building': buildingname,'floors': floors};
		$http.post('data//php//bathroom_data.php',input).then(function(json) {
		 	$scope.bathroomdata = json.data;
		});
		$scope.loadDropdownData(building);
		$scope.buildingtext = buildingname;
		$scope.bathroomsVisible = true;
		$location.path('/bathrooms');
	}



	$scope.loadDropdownData = function(building) {
		var buildingname = $scope.switchBuildingName(building);
		var input = {'building': buildingname};
		 $http.post('data//php//dropdown_data.php',input).then(function(json) { 
		 	$scope.dropdowndata = json.data;
		 	//console.log(json);
		 });
	}



	$scope.getID = function(id) {
		$scope.bathroomID = id;
	}



	$scope.switchBuildingName = function(building) {
		var buildingname = "";
		switch(building) {
            case "kelley":
		        buildingname = "Kelley Engineering Center";
		        break;
		    case "linq":
		        buildingname = "Learning Innovation Center";
		        break;
		    case "library":
		        buildingname = "Valley Library";
		        break;
        }
       	return buildingname;
	}


	/* *** SIDE NAV HIGHLIGHTING *** */
	$scope.highlight_home = function(){
		$("#homepage").css({"background-color":"#FFFFFF","color":"#373737"});
		$("#buildingpage").css({"background-color":"","color":""});
		$("#bathroompage").css({"background-color":"","color":""});
		$("#profilepage").css({"background-color":"","color":""});
	}
	$scope.highlight_building = function(){
		$("#homepage").css({"background-color":"","color":""});
		$("#buildingpage").css({"background-color":"#FFFFFF","color":"#373737"});
		$("#bathroompage").css({"background-color":"","color":""});
		$("#profilepage").css({"background-color":"","color":""});
	}
	$scope.highlight_bathroom = function(){
		$("#homepage").css({"background-color":"","color":""});
		$("#buildingpage").css({"background-color":"","color":""});
		$("#bathroompage").css({"background-color":"#FFFFFF","color":"#373737"});
		$("#profilepage").css({"background-color":"","color":""});
	}
	$scope.highlight_profile = function(){
		//$scope.loadData();
		$("#homepage").css({"background-color":"","color":""});
		$("#buildingpage").css({"background-color":"","color":""});
		$("#bathroompage").css({"background-color":"","color":""});
		$("#profilepage").css({"background-color":"#FFFFFF","color":"#373737"});
	}
	/* ********************************** */

	/* *** SIDE PANEL LOGIC *** */
	$scope.openButton = function(){
		$("#openbutton").css({"display":"none"});
		$("#hidebutton").css({"display":""});

		$("#sidepaneldiv").removeClass("col-md-2 no-float");
		$("#sidepaneldiv").addClass("col-md-1 no-float");
		$("#sidepaneldiv").css({"width":"55"});

		$("#maincontentdiv").removeClass("col-md-10 no-float");
		$("#maincontentdiv").addClass("col-md-12 no-float");

	}
	$scope.hideButton = function(){
		$("#hidebutton").css({"display":"none"});
		$("#openbutton").css({"display":""});

		$("#sidepaneldiv").removeClass("col-md-1 no-float");
		$("#sidepaneldiv").addClass("col-md-2 no-float");
		$("#sidepaneldiv").css({"width":""});

		$("#maincontentdiv").removeClass("col-md-12 no-float");
		$("#maincontentdiv").addClass("col-md-10 no-float");
	}
	/* ********************************** */

	/* *** BUILDING SELECT LOGIC *** */
	$scope.libraryEnter = function(){ $("#librarytext").css({"font-size":"42px","font-style":"bold","color":"#DC4405"});}
	$scope.libraryExit = function(){ $("#librarytext").css({"font-size":"34px","font-style":"","color":"#373737"});}
	$scope.linqEnter = function(){ $("#linqtext").css({"font-size":"42px","font-style":"bold","color":"#DC4405"});}
	$scope.linqExit = function(){ $("#linqtext").css({"font-size":"34px","font-style":"","color":"#373737"});}
	$scope.austinEnter = function(){ $("#austintext").css({"font-size":"42px","font-style":"bold","color":"#DC4405"});}
	$scope.austinExit = function(){ $("#austintext").css({"font-size":"34px","font-style":"","color":"#373737"});}
	$scope.muEnter = function(){ $("#mutext").css({"font-size":"42px","font-style":"bold","color":"#DC4405"});}
	$scope.muExit = function(){ $("#mutext").css({"font-size":"34px","font-style":"","color":"#373737"});}
	$scope.intoEnter = function(){ $("#intotext").css({"font-size":"42px","font-style":"bold","color":"#DC4405"});}
	$scope.intoExit = function(){ $("#intotext").css({"font-size":"34px","font-style":"","color":"#373737"});}
	/* ********************************** */
}]);



app.factory('serviceSession', ['$http', function($http){
	return {
		set: function(key,value){
			return sessionStorage.setItem(key,value);
		},
		get: function(key){
			return sessionStorage.getItem(key);
		},
		destroy: function(key){
			$http.post('data/php/destroy_session.php');
			return sessionStorage.removeItem(key);
		}
	};
}]);









