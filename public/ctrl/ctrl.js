
//Author: Max Sheikhizadeh
//AngularJS Controller 

var contactApp = angular.module('contactApp', []);
contactApp.controller('myController', ['$scope', '$http', function($scope, $http) {

var updateOuter = function() {
  $http.get('/contactlist').success(function(response) {
    console.log("I got the data I requested");
    $scope.contactlist = response;
    $scope.contact = "";
  });
};

updateOuter();
//clear contact field
$scope.deselect = function() {
  $scope.contact = "";
}
//add contact
$scope.addContact = function() {
  $http.post('/contactlist', $scope.contact).success(function(response) {
    console.log("The response of adding contact" + response);
    updateOuter();
  });
};

//remove contact
$scope.remove = function(id) {
  console.log("Removed ID is: " + id);
  $http.delete('/contactlist/' + id).success(function(response) {
    updateOuter();
  });
};

//update contact
$scope.update = function() {
  console.log($scope.contact._id);
  $http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response) {
    updateOuter();
  })
};

//edit contact
$scope.edit = function(id) {
  console.log("Edit id: " + id);
  $http.get('/contactlist/' + id).success(function(response) {
    $scope.contact = response;
  });
}; 

}]);﻿