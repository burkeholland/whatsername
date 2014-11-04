(function(wrn){

	'use strict';

	//create controller namespace in global namespace > define viewModel, expose to global 
	wrn.groupList = {viewModel: kendo.observable({
		//the actual model
		model: {
			baz:"qux"
		},
		//other properties or functions you want to observe and expose to html
		goo: function(e){
			console.log(e);
		},
		show: function(e){
			console.log(e);
		}

	})};

})(wrn);

