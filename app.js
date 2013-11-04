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
      var project = Projects.findOne(this.params._id),
          screens;
      if (project) {
        screens = $.map(project.screens, function(s,idx){
          return {url: s.url, position: idx, _id: project._id}
        });
      }
      return {
        project: Projects.findOne(this.params._id),
        screens: screens
      }
    }
  });

  this.route('screen', {
    path: '/projects/:_id/:position',
    data: function() {
      var position = parseInt(this.params.position),
          project = Projects.findOne(this.params._id),
          screen;
      if (project) {
        screens = project.screens;
        screen = screens[position];
      }
      return {
        project: project,
        screen: screen,
        prev_screen: {_id: project._id, position: position-1},
        next_screen: {_id: project._id, position: position+1},
        position: this.params.position
      }
    }
  });
  
});