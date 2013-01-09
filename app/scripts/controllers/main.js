'use strict';

easyCvApp.controller('MainCtrl', function($scope, $http) {
  $scope.cv = {};
  $scope.gogo = function (){
    $("html, body").animate({
      scrollTop: $("#"+Helper.slugify(this.section.title)).offset().top + "px"
    }, {
      duration: 500,
      easing: "swing"
    });
    return false;
  };
  $http.get('data/cv.json')
       .then(function(res){
          $scope.cv = res.data.cv;
          $scope.cv.gravatar = function(){
            var img = new Image,
            hash = md5($scope.cv.email),
            canvas = document.createElement("canvas"),
            ctx = canvas.getContext("2d"),
            src = 'http://www.gravatar.com/avatar/'+hash+'?s=200';
            
            img.crossOrigin = "Anonymous";
            img.setAttribute("data-colorcount","4");

            img.onload = function() {
                var $img = $(img);
                // Dominant Color
                var dominantColor = getDominantColor(img);
                // Palette
                var colorCount = $img.attr('data-colorcount') ? $img.data('colorcount') : 10;
                var medianPalette = createPalette(img, colorCount);
                console.log(medianPalette);
                console.log("***********");
                console.log(dominantColor);
                var rgba = "rgba("+dominantColor[0]+","+dominantColor[1]+","+dominantColor[2]+",1)",
                    css = "i.dominant{color:"+rgba+";}.main h2.dominant{border-color:"+rgba+";}"
                $.each(medianPalette, function(index, color){
                  rgba = "rgba("+color[0]+","+color[1]+","+color[2]+",1)",
                  css += ".color"+Number(index+1)+"{background-color:"+rgba+";}";
                });
                Helper.injectCSS(css);
            }

            img.src = src;
            // make sure the load event fires for cached images too
            if ( img.complete || img.complete === undefined ) {
                img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
                img.src = src;
            }
            return '<img src="http://www.gravatar.com/avatar/'+hash+'?s=200" />'
          };

          $scope.birth = function(){
              var day = moment($scope.cv.birthdate, "MM/DD/YYYY"),
              year = day.fromNow(true);
              return year+" old";
          };

          $scope.contactdisplay = function(contact){
            var val="";
             switch (contact.type) {
                case "mobile-phone":
                  val = "tel:"+contact.value;
                  break;
                case "envelope":
                  val = "mailto:"+contact.value;
                  break;
                case "external-link":
                default:
                  val = contact.value;
             }
             return "<a href='"+val+"'><i class='dominant icon-"+contact.type+"'></i></a>";
          };

          $scope.title = function(el){
            var msg = "";
            if((el.hasOwnProperty("yearend"))&&(el.yearend != "")){
              msg = "<span class='date'>"+el.yearbegin+" - "+el.yearend+"</span>";
            } else if( (el.hasOwnProperty("yearbegin"))&&(el.yearbegin != "") ){
              msg = "<span class='date'>"+el.yearbegin+" - now </span>";
            }
            if((el.hasOwnProperty("position"))&&(el.position != "")){
              var separator = (msg !="") ? " : ":"";
              msg += separator+el.position;
            }
            if((el.hasOwnProperty("at"))&&(el.at != "")){
              var separator = (msg !="") ? ", ":"";
              msg += separator+el.at;
            }
            return msg;
          };

          $scope.recommand = function(el){
            if(el.hasOwnProperty("recommand") && el.recommand.length > 0){
              return true;
            } else {
              return false;
            }
          }

          $scope.slugtitle = function(title){
            return Helper.slugify(title);
          };
        });
});