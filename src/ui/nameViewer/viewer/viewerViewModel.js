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
                  init:function(e){
                        this.scroller = e.view.element.find('#scrollview').data('kendoMobileScrollView');
                  },
                  show:function(e){
                        this.currentId = e.view.params.id;

                        if(this.modelData.get(this.currentId) === undefined){
                              this.set('noPhotosNames',false);
                              this.set('yesPhotosNames',true);
                              return false;
                        }else{
                             this.set('noPhotosNames',true);
                              this.set('yesPhotosNames',false);
                        }
                        this.scroller.setDataSource(this.modelData.get(this.currentId).imagesAndName);
                        kendo.bind(e.view.element.find('#scrollview'),wrn.viewer.viewModel);
                  },
                  hide:function(e){
                        this.scroller.setDataSource([]);
                        kendo.unbind(e.view.element.find('#scrollview'));
                  },
                  removePhotoName:function(e){

                        var id = $(e.currentTarget).data('id');
                        var scroller = $(e.currentTarget).closest('#scrollview');
                        var index1 = _.findIndex(this.modelData.get(this.currentId).imagesAndName, function(obj){
                              return obj.id === id;
                        });
                        this.modelData.get(this.currentId).imagesAndName.splice(index1,1);

                        if(this.modelData.get(this.currentId).imagesAndName.length === 0){
                              this.modelData.remove(this.modelData.get(this.currentId));
                        }

                        this.modelData.sync();
                        kendo.bind(scroller,wrn.viewer.viewModel);
                        wrn.removeDestroyed('viewerModel');

                        if(this.modelData.get(this.currentId) === undefined){
                              this.set('noPhotosNames',false);
                              this.set('yesPhotosNames',true);
                              scroller.closest('#viewerView').find('.editPhotos').text('edit');
                              this.set('notEditMode',true);
                              kendo.unbind(scroller);
                        }else{
                             this.set('noPhotosNames',true);
                             this.set('yesPhotosNames',false);
                        }

                  },
                  noPhotosNames:true,
                  addImageUi:function(){
                        wrn.app.navigate('#addNameView?id='+this.currentId);
                  },
                  editModeToggle:function(e){
                        var btn = $(e.target);
                        if(this.notEditMode === false){//go into edit mode
                              btn.text('edit');
                              this.set('notEditMode',true);
                        }else{//stop edit mode
                              btn.text('done');
                              this.set('notEditMode',false);
                        }
                  },
                  notEditMode:true,
                  yesPhotosNames:false,
                  currentId:'',
                  scroller:null
            })
      };

})(wrn); //pass in namespace