(function($){

  var options = {
    template: '<div class="note"><div class="overlay"></div><div class="top-right-delete"></div><div class="bottom-right-handle"></div></div>',
    container: '<div class="markitup-container"></div>'
  };

  $.fn.markitup = function(overrides) {
    $.extend(options, overrides);

    // translate pixel offsets to percentage offsets
    var abs_to_percentage = function(offset, container){
      return ((offset/container)*100) + "%";
    };

    var $img = this.wrap(options.container),
        $container = $img.parent(),
        container_offset, 
        container_w, 
        container_h,
        $note;

    $container.on("movestart.markitup", function(event){
      container_offset = $container.offset();
      container_w = $container.width();
      container_h = $container.height();
      $note = $(options.template);
      $container.append($note);

      var left = abs_to_percentage(event.startX-container_offset.left, container_w),
          top = abs_to_percentage(event.startY-container_offset.top, container_h);

      $note.css({
        left:left,
        top:top
      });

      $note.data("annotatable-relative-x", left);
      $note.data("annotatable-relative-y", top);
    });

    $container.on("move.markitup", function(event){
      $note.css({
        width:abs_to_percentage(event.distX, container_w),
        height:abs_to_percentage(event.distY, container_h)
      });
    });

    $container.on("moveend.markitup", function(event){
      var width = abs_to_percentage(event.distX, container_w),
          height = abs_to_percentage(event.distY, container_h);
      $note.css({
        width:width,
        height:height
      });
      $note.data("annotatable-relative-w", width);
      $note.data("annotatable-relative-h", height);
    });

    $(document).on("mousedown.markitup", ".note", function(event){
      event.stopPropagation();
    });

    $(document).on("mousedown.markitup", ".note .bottom-right-handle", function(event){
      // console.info("movestart on note");
    });

    $(document).on("click.markitup", ".note .top-right-delete", function(event){
      $(event.currentTarget).trigger("delete.markitup");
      $(event.currentTarget).closest(".note").remove();
    });

    return $img;
  };

})(jQuery);

