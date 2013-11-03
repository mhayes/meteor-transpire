Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function () {

  this.route('home', {
    path: '/'
  });

  this.route('projects', {
    path: '/projects',
    data: function() {
      return {
        projects: Projects.find({userId: Meteor.userId()})
      }
    }
  });

  this.route('project', {
    path: '/projects/:_id',
    data: function() {
      return {
        project: Projects.findOne(this.params._id)
      }
    }
  });
  
});