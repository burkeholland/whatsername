(function(wrn){ //pass in namespace

	'use strict';

	// variables used inside of the model, but not accessible in the view
	var txtAddGroup;

	//below you place anything private you don't want exposed in the viewModel

	//below we create the viewModel

	//create viewModel namespace in global i.e. namespace.[viewModel Name], to expose to global 
	wrn.addGroup = {
		viewModel: kendo.observable({
			//the actual model
			modelData: wrn.groupModel,
			//other properties or functions you want to observe and expose to html
			createGroup:function(e){
				if(this.groupName.replace(' ','') !== ''){
					this.modelData.add({group:this.groupName,id:wrn.makeId()});
					this.modelData.sync();
					this.set('groupName','');
					txtAddGroup.focus();
				}
			},
			init: function(e) {
				// capture all needed element references on view init and store them for later use
				txtAddGroup = e.view.content.find('input:text');
			},
			afterShow:function(e){
				txtAddGroup.focus();
			},
			groupName:''
		})

	};

})(wrn); //pass in namespace

