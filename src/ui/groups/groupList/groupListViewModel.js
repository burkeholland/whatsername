(function(wrn){ //pass in namespace

	'use strict';

	//below you place anything private you don't want exposed in the viewModel

	//below we create the viewModel

	//create viewModel namespace in global i.e. namespace.[viewModel Name], to expose to global 
	wrn.groupList = {
		viewModel: kendo.observable({
			//the actual model
			modelData: wrn.groupModel,
			//other properties or functions you want to observe and expose to html
			init:function(){
				//this.modelData.add({group:'test'});
				//this.modelData.sync();
			},
			show: function(){
				console.log(this.modelData.offlineData());
			}
		}),

		listItemTemplate:'#= group#'
	};

})(wrn); //pass in namespace

