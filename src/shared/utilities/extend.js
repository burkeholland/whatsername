wrn = {
	extend:jQuery.extend,
	makeId:function(){
		'use strict';
		var n = 0;
		var possible = "0123456789";
		for (var i = 0; i < 15; i++){
			n += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return Number(n);
	},
	removeDestroyed:function(obj){
		'use strict';
		//create object
		var localStorageObj = JSON.parse(localStorage[obj]);
		//remove destroyed objects
		_.remove(localStorageObj,function(obj){
			return obj.__state__ === 'destroy';
		});
		//set localStorage
		localStorage.setItem(obj,JSON.stringify(localStorageObj));
	}
};