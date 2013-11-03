
Template.project.events = {
  'click #upload-files': function(e) {
    var self = this;
    e.preventDefault();
    filepicker.setKey("A2oE2392gSPKqBICPHEeez");
    filepicker.pickMultiple({
      maxFiles:20
    },function(InkBlobs){
      InkBlobs.forEach(function(InkBlob){
        Projects.update(self.project._id, {$push: {
          screens: {url:InkBlob.url}
        }});
      });
    });
  },
  'click #delete-project': function(e) {
    Projects.remove(this.project._id);
    Router.go('/projects');
  }
};