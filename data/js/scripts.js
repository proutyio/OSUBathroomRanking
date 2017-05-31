


app.controller('controller',['$scope','$location','$http',function($scope,$location,$http) {

	$scope.currentuser ="Welcome, Guest!";
	$scope.buildingtext = "";
	$scope.selectedDropdown = "";
	$scope.bathroomID = "";
	
	$scope.loginVisible = true;
	$scope.profileVisible = false;
	$scope.linqVisible = false;
	$scope.libraryVisible = false;
	$scope.austinVisible = false;
	$scope.muVisible = false;
	$scope.kelleyVisible = false;
	$scope.johnsonVisible = false;
	$scope.intoVisible = false;
	$scope.linusVisible = false;
	

	
	$scope.loginUser = function(input) {
		$scope.loginmessage="";
		var $promise = $http.post('data//php//login_data.php', input);
		$promise.then(function(json) {
			if(typeof input === "undefined") { $scope.loginmessage = "Error: Missing fields required"; }
			else {
				if(json.data.Username === input.username && json.data.Password === input.password) {
					var user = {'username': json.data.Username};
					$scope.loadProfileData(user);
					$scope.currentuser = json.data.Username;
					if($location.url() == '/') { $location.path('/profile'); }
					$scope.clearForms();
					$scope.loginVisible = false;
					$scope.isLoggedIn = true;
					$scope.profileVisible = true;
				}
				else { $scope.loginmessage = "Error: Invalid Username or Password"; }
			}
		});
	}


	$scope.registerUser = function(input) {
		$scope.registermessage="";
		if(typeof input === "undefined") { $scope.registermessage ="Error: Missing fields required"; }
		else {
			if( (input['username']===""||input['password']===""||input['email']===""||input['firstname']===""||input['lastname']==="") ||
			  (typeof input['username']==="undefined"||typeof input['password']==="undefined"||typeof input['email']==="undefined"||
			  	typeof input['firstname']==="undefined"||typeof input['lastname']==="undefined") ) {
				$scope.registermessage ="Error: Missing fields required";
			}
			else {
				var $promise = $http.post('data//php//register_data.php', input).then(function(json) {
					if(json.data == "Not successful") { $scope.registermessage = "Error: Query Failed - Username might already exist"; }
					else {
						$scope.currentuser = input['username'];
						var user = {'username': input['username']};
						$scope.loadProfileData(user);
						$scope.loginVisible = false;
						$scope.isLoggedIn = true;
						$scope.profileVisible = true;
						$scope.clearForms();
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


	$scope.submitComment = function(comment, rating) {
		$scope.errormessage = "";
		if(typeof comment === "undefined" || comment === "") { $scope.errormessage = "please enter your comment"; } 
		else if(typeof rating === "undefined" || rating === "" || rating === 0) { $scope.errormessage = "please select a rating"; }
		else if(typeof $scope.bathroomID === "undefined" || $scope.bathroomID === ""){ $scope.errormessage = "please select a bathroom id"; } 
		else {
			var input = {'username':$scope.currentuser,'bathroomid':$scope.bathroomID,'comment':comment,'rating':rating};
			var $promise = $http.post('data//php//check_bathroomid.php', input).then(function(json) {
				if(json.data == "Not successful") { $scope.errormessage = "error: query failed"; }
				else {
					var check = 0;
					for(var x=0; x<json.data.length; x++) {
						if(json.data[x][0] === $scope.bathroomID) {
							check = 1;
							break;
						}
					}
					if(check == 1){ $scope.errormessage = "sorry, you can only comment once on a bathroom"; }
					else {
						$http.post('data//php//insert_comment.php',input).then(function(json) {
							$http.post('data//php//insert_rating.php',input).then(function(json) {
								$scope.loadBathroomData($scope.currentbuilding,$scope.currentbuildingfloors); 
							});
						});
					}
				}
			});
		}
	}


	$scope.loadProfileData = function(user) {
		$http.post('data//php//userdetails_data.php',user).then(function(json) { 
		 	$scope.userdetailsdata = json.data;
		 });
		 $http.post('data//php//usercomment_data.php',user).then(function(json) { 
		 	if(json.data.length != 0) {
		 		$scope.usercommentdata = json.data;
		 		$scope.hasComments = true;
			}else { $scope.hasComments = false; }
		 });
	}


	$scope.loadBathroomData = function(building, floors) {
		$scope.currentbuilding = building;
		$scope.currentbuildingfloors = floors;
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
		 });
	}


	$scope.getID = function(id) { $scope.bathroomID = id; }


	$scope.switchBuildingName = function(building) {
		$scope.clearBathrooms();
		var buildingname = "";
		switch(building) {
            case "kelley":
		        buildingname = "Kelley Engineering Center";
		        $scope.kelleyVisible = true;
		        break;
		    case "linq":
		        buildingname = "Learning Innovation Center";
		        $scope.linqVisible = true;
		        break;
		    case "library":
		        buildingname = "Valley Library";
		        $scope.libraryVisible = true;
		        break;
		    case "austin":
		        buildingname = "Austin Hall";
		        $scope.austinVisible = true;
		        break;
		    case "mu":
		        buildingname = "Memorial Union";
		        $scope.muVisible = true;
		        break;
		    case "johnson":
		        buildingname = "Johnson Hall";
		        $scope.johnsonVisible = true;
		        break;
		    case "into":
		        buildingname = "INTO";
		        $scope.intoVisible = true;
		        break;
		    case "linus":
		        buildingname = "Linus Pauling Science Center";
		        $scope.linusVisible = true;
		        break;
        }
       	return buildingname;
	}


	$scope.clearBathrooms = function() {
		$scope.linqVisible = false;
		$scope.libraryVisible = false;
		$scope.austinVisible = false;
		$scope.muVisible = false;
		$scope.kelleyVisible = false;
		$scope.johnsonVisible = false;
		$scope.linusVisible = false;
		$scope.intoVisible = false;
	}


	$scope.clearForms = function() {
		$('#signinusername').val('');
		$('#signinpassword').val('');
		$('#regusername').val('');
		$('#regpassword').val('');
		$('#regemail').val('');
		$('#regfirstname').val('');
		$('#reglastname').val('');
	}


	$scope.clickProfile = function() {
		var user = {'username': $scope.currentuser};
		$scope.loadProfileData(user);
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
	$scope.kelleyEnter = function(){ $("#kelleytext").css({"font-size":"42px","font-style":"bold","color":"#DC4405"});}
	$scope.kelleyExit = function(){ $("#kelleytext").css({"font-size":"34px","font-style":"","color":"#373737"});}
	$scope.johnsonEnter = function(){ $("#johnsontext").css({"font-size":"42px","font-style":"bold","color":"#DC4405"});}
	$scope.johnsonExit = function(){ $("#johnsontext").css({"font-size":"34px","font-style":"","color":"#373737"});}
	$scope.linusEnter = function(){ $("#linustext").css({"font-size":"42px","font-style":"bold","color":"#DC4405"});}
	$scope.linusExit = function(){ $("#linustext").css({"font-size":"34px","font-style":"","color":"#373737"});}
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