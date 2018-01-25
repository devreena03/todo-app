angular.module("todo").controller('ToDoController', function ($scope, ToDoService, $timeout) {

	$scope.items = [];
	$scope.task = '';
	
	ToDoService.getItems().then(function (response) {
		$scope.items = response.data;
	});

	$scope.success = function (item) {
		item.success = true;
		$timeout(function () {
			item.success = undefined;
		}, 500);
	}

	$scope.add = function (task) {
		ToDoService.add(task).then(function (result) {
			$scope.items.push(result.data);
			$scope.task = '';
			$scope.success(result.data);
		});
	}

	$scope.updateTask = function (item) {
		item.edited = false;
		ToDoService.updateTask(item._id, item.task).then(function () {
			$scope.success(item);
		});
	}

	$scope.updateStatus = function (item) {
		ToDoService.updateStatus(item._id, item.completed);
	}

	$scope.delete = function (item) {
		ToDoService.deleteItem(item._id).then(function () {
			ToDoService.getItems().then(function (response) {
				$scope.items = response.data;
			});
		});
	}

	$scope.enableDeleteCompleted = function () {
		var count = 0;
		for (var item in $scope.items) {
			if ($scope.items[item].completed) 
				count++;
			if (count > 1) 
				return true;
		}
		return false;
	}

	$scope.deleteCompleted = function(){
		ToDoService.deleteCompleted().then(function () {
			ToDoService.getItems().then(function (response) {
				$scope.items = response.data;
			});
		});
	}
});