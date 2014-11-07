(function(wrn){

	'use strict';

	wrn.groupModel = new kendo.data.DataSource({
		offlineStorage: 'groupModel'
	});

	wrn.groupModel.online(false);

})(wrn);

