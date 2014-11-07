(function(wrn){ //pass in namespace

	'use strict';

	//below you place anything private you don't want exposed in the viewModel

	//below we create the viewModel

	//create viewModel namespace in global i.e. namespace.[viewModel Name], to expose to global 
	wrn.addGroup = {
		viewModel: kendo.observable({
			//the actual model
			modelData: wrn.groupModel,
			//other properties or functions you want to observe and expose to html
			createGroup:function(){
				if(this.groupName.replace(' ','') !== ''){
					this.modelData.add({group:this.groupName});
					this.modelData.sync();
				}
			},
			groupName:''
		})
		
	};



})(wrn); //pass in namespace

