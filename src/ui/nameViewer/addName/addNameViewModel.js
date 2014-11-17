(function(wrn){ //pass in namespace

      'use strict';

      //below you place anything private you don't want exposed in the viewModel

      //below we create the viewModel

      //create viewModel namespace in global i.e. namespace.[viewModel Name], to expose to global 
      wrn.addName = {
            viewModel: kendo.observable({
                  //the actual model
                  modelData: wrn.viewerModel,
                  //other properties or functions you want to observe and expose to html
                  show:function(e){
                        this.currentId = Number(e.view.params.id);
                        e.view.element.find('input:text').focus();
                  },
                  addPhoto:function(e){
                        var elm = e;
                        var fileInput = $(e.target).closest('#addNameView').find('input:file');
                        if(fileInput.val() === '' || this.name.replace(' ','') === ''){return false;}
                        var id = this.currentId;
                        var reader = new FileReader();
                        reader.onload = (function(e){

                              if(this.modelData.get(id)){//update
                                    var imgAndName = this.modelData.get(id).imagesAndName;
                                    imgAndName.push({
                                          image:e.target.result,
                                          name:this.name,
                                    });
                                    this.modelData.sync();
                              }else{//add
                                    this.modelData.add({
                                          id:id,
                                          imagesAndName:[{
                                                image:e.target.result,
                                                name:this.name,
                                          }]
                                    });
                                    this.modelData.sync();
                              }
                              //reset form
                              this.set('name','');
                              $(elm.target).closest('#addNameView').find('form')[0].reset();

                        }).bind(this);//change this
                        //reader, read file as data URL
                        reader.readAsDataURL(fileInput[0].files[0]);
                  },
                  viewPhotos:function(){
                        wrn.app.navigate('#viewerView?id='+this.currentId);
                  },
                  name:'',
                  currentId:0
            })
      };
})(wrn); //pass in namespace