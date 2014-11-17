(function(wrn){ //pass in namespace

      'use strict';

      //below you place anything private you don't want exposed in the viewModel

      //below we create the viewModel

      //create viewModel namespace in global i.e. namespace.[viewModel Name], to expose to global 
      wrn.viewer = {
            viewModel: kendo.observable({
                  //the actual model
                  modelData: wrn.viewerModel,
                  //other properties or functions you want to observe and expose to html
                  show:function(e){
                        this.currentId = e.view.params.id;

                        if(this.modelData.get(this.currentId) === undefined){return false;}

                        e.view.element.find('#scrollview').kendoMobileScrollView({
                              dataSource: this.modelData.get(this.currentId).imagesAndName,
                              template: kendo.template($("#scrollerTemplate").html())
                        });
                  },
                  hide:function(e){
                        if(e.view.element.find('#scrollview').data("kendoMobileScrollView") !== undefined){
                              e.view.element.find('#scrollview').data("kendoMobileScrollView").destroy();
                              e.view.element.find('#scrollview').empty();
                        }
                  },
                  addImageUi:function(){
                        wrn.app.navigate('#addNameView?id='+this.currentId);
                  },
                  currentId:''
            })
      };

})(wrn); //pass in namespace