


app.controller('controller',['$scope','$location','$http',function($scope,$location,$http) {

	$scope.starrating = 0;
	$scope.currentuser ="Welcome, Guest!";
	$scope.errormessage ="";
	$scope.loginVisible = true;
	$scope.profileVisible = false;
	$scope.bathroomsVisible = false;


	$scope.changeView = function(view){ $location.path(view); }

	
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
					$scope.profileVisible = true;
				}
				else { $scope.errormessage = "Invalid Username or Password"; }
			}
		});
	}

	

	$scope.logoutUser = function() { 
		$scope.loginVisible = true;
		$scope.profileVisible = false;
		$scope.currentuser="Welcome, Guest!";
		$scope.loadProfileData("");
		$location.path('/');
	}


	$scope.loadProfileData = function(user) {
		 $http.post('data//php//profile_data.php',user).then(function(json) { 
		 	$scope.profiledata = json.data;
		 });
	}


	$scope.loadBathroomData = function(building, floors) {
		//console.log("this");
		//console.log(bathroom);
		
		var arr = [];

		for(var i=1; i<=floors; i++) {
			var input = {'building': building,'floors': i};
		  	
		  	$http.post('data//php//bathroom_data.php',input).then(function(json) {
		 		// $scope.bathroomdata = json.data;
		 		arr.push(json.data);
		 		console.log(json);
			});
		}
		$scope.bathroomdata = arr;
		// $http.post('data//php//bathroom_data.php',input).then(function(json) {
		//  	$scope.bathroomdata = json.data;
		//  	console.log(json);
		// });
		$scope.bathroomsVisible = true;
		$location.path('/bathrooms');
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









