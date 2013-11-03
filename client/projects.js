Template.projects.events = {
  'keydown [name=project-name]': function(e) {
    var ENTER_KEY = 13;
    if (e.which === ENTER_KEY) {
      var name = $(e.currentTarget);
      var project_id = Projects.insert({
        name: name.val(), userId: Meteor.userId()
      });
      Router.go('project', {_id: project_id});
    }
  },
  'click #new-project': function(e) {
    $('.reveal-modal-bg').fadeIn();
    $('#new-project-modal').css('visibility', 'visible').fadeIn();
    $('[name=project-name]').select();
  },
  'click .reveal-modal-bg': function(e) {
    $('.reveal-modal-bg').fadeOut();
    $('#new-project-modal').fadeOut().css('visibility', 'hidden');
    $('[name=project-name]').val('');
  }
};