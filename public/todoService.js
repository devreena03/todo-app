angular.module("todo").service("ToDoService", function($http){
	
	 this.add = function(item){
		 return $http.post('/add/'+item);
	 }
	 
	 this.updateTask = function(id, task){
		 return $http.put("/task/"+id+"/"+task);
	 }

	this.updateStatus = function(id, completed){
		 return $http.put("/status/"+id+"/"+completed);
	 }
	 
	 this.deleteItem = function(id){
		 return $http.delete('/remove/'+id);
	 }

	 this.deleteCompleted = function(){
		 return $http.delete('/completed');
	 }
	 
	 this.getItems = function(){
		return $http.get('/items');
	 }
});

