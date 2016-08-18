//Use Strict Mode
(function($) {
  "use strict";

//Remove loading-wrapper class before window load
setTimeout(function(){
  $('.loading-wrapper').removeClass('loading-wrapper-hide');
  return false;
}, 10);

//Begin - Window Load
$(window).load(function(){

  //Page Loader 
  setTimeout(function(){
    $('#loader-name').addClass('loader-up');
    $('#loader-job').addClass('loader-up');
    $('#loader-animation').addClass('loader-up');
    return false;
  }, 500); 
  setTimeout(function(){
    $('#page-loader').addClass('loader-out');
    $('#intro-item1').addClass('active');
    return false;    
  }, 1100);  
  $('#page-loader').delay(1600).fadeOut(10);  
  setTimeout(function(){
    $('#page-loader').hide();
    return false;    
  }, 1700);

  //back to top
  function backToTop() {
    $('html, body').animate({
      scrollTop: 0
    }, 800);
  }

  //Isotope
  var $isotopeContainer = $('#isotope-filter'),
  $isotopeOptionContainer = $('#options'),
  $options = $isotopeOptionContainer.find('a[href^="#"]').not('a[href="#"]'),
  isOptionLinkClicked = false;

  $isotopeContainer.imagesLoaded( function() {
    $isotopeContainer.isotope({
      itemSelector : '.element',
      resizable: false,
      //filter: '*',
      transitionDuration: '0.8s',
      layoutMode: 'packery',
      packery: {
        
      }
    });
  });

  function isotopeGO() {
      var isotopeItem = $(this),
      href = isotopeItem.attr('href');
        
      if ( isotopeItem.hasClass('selected') ) {
        return;
      } else {
        $options.removeClass('selected');
        isotopeItem.addClass('selected');
      }

      jQuery.bbq.pushState( '#' + href );
      isOptionLinkClicked = true;
      return false;
  }

  $options.on('click', function () {       
      isotopeGO();
  });

  $('.isotope-link').on('click', function () { 
      backToTop();
      isotopeGO();       
  });

  $(window).on( 'hashchange', function( event ){
    var isotopeFilter = window.location.hash.replace( /^#/, '');
    
    if( isotopeFilter == false )
      isotopeFilter = 'home';
      
    $isotopeContainer.imagesLoaded( function() {
      $isotopeContainer.isotope({
        filter: '.' + isotopeFilter
      });
    });
    
    if ( isOptionLinkClicked == false ){
      $options.removeClass('selected');
      $isotopeOptionContainer.find('a[href="#'+ isotopeFilter +'"]').addClass('selected');      
    }    
    
    isOptionLinkClicked = false;

  }).trigger('hashchange');

  //Masonry Layout on Blog
  var $isotopeContainerBlog = $('#blog-posts-masonry')

  $isotopeContainerBlog.imagesLoaded( function() {
    $isotopeContainerBlog.isotope({
      itemSelector : '.blog-item',
      resizable: false,
      //filter: '*',
      transitionDuration: '0.8s',
      layoutMode: 'packery'
    });
  });  

});

//Begin - Document Ready
$(document).ready(function(){


// Double Tap to Go - Mobile Friendly SubMenus
$('.navbar-nav li:has(ul)').doubleTapToGo();

// Maps iframe Overlay
var map = $('#map');
map.on('click', function () {
    $('#map iframe').css("pointer-events", "auto");
    return false;
});

map.on('mouseleave', function () {
    $('#map iframe').css("pointer-events", "none");
    return false;
});

//Form Validator and Ajax Sender
$("#contactForm").validate({
  submitHandler: function(form) {
    $.ajax({
      type: "POST",
      url: "php/contact-form.php",
      data: {
        "name": $("#contactForm #name").val(),
        "email": $("#contactForm #email").val(),
        "subject": $("#contactForm #subject").val(),
        "message": $("#contactForm #message").val()
      },
      dataType: "json",
      success: function (data) {
        if (data.response == "success") {
          $('#contactWait').hide();
          $("#contactSuccess").fadeIn(300).addClass('modal-show');
          $("#contactError").addClass("hidden");  
          $("#contactForm #name, #contactForm #email, #contactForm #subject, #contactForm #message")
            .val("")
            .blur();         
        } else {
          $('#contactWait').hide();
          $("#contactError").fadeIn(300).addClass('modal-show');
          $("#contactSuccess").addClass("hidden");
        }
      },
      beforeSend: function() {
        $('#contactWait').fadeIn(200);
      }
    });
  }
});


//Modal for Contact Form
$('.modal-wrap').click(function(){
  $('.modal-wrap').fadeOut(300);
}); 

//Modal for Forms
function hideModal() {
  $('.modal-wrap').fadeOut(300);
  return false;
}

$('.modal-wrap').on('click', function () {
  hideModal();
});   

$('.modal-bg').on('click', function () {
  hideModal();
}); 

//bootstrap tooltips
$('[data-toggle="tooltip"]').tooltip();

 //Nivo Lightbox
  $('a.nivobox').nivoLightbox({ effect: 'fade' });

//End - Document Ready
});

//End - Use Strict mode
})(jQuery);