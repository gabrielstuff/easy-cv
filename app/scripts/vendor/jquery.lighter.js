/*
 *  Project: Lighter
 *  Description: A Basic, yet simple highlight menu on scroll
 *  Author: Soixante circuits
 *  License: MIT
 */

//safety semi-colon 
;(function ($, window, document, undefined) {

    var pluginName = "lighter";
    var defaults = {
        color: "red"
    };

    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.activePan = {};
        this.activeTargetClassName = "lighter-active";
        this.activeMenuClassName = "lighter-menu-active";
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            var elArray = [],
            self = this;
            $(document).scroll(function(){
                elArray = self.watchDistance();
                elArray.sort(function compare(a,b) {
                  if (a.distance < b.distance)
                     return -1;
                  if (a.distance > b.distance)
                    return 1;
                  return 0;
                });
                if(self.activePan != elArray[0]){
                    self.activePan = elArray[0]; 
                    self.setNewPan();
                }  
            });
        },
        watchDistance: function(){
            var base = this.element,
            elArray = [];

            $(base).find("a").each(function(index, el){
                var object = {
                    "a_reference":$(el),
                    "targetDiv":$(el.hash),
                    "distance":Math.abs($(el.hash).position().top - $(window).scrollTop())
                }
                elArray.push(object);
            });
            return elArray;          
        },
        setActive: function(el){
            $("."+this.activeTargetClassName).removeClass(this.activeTargetClassName);
            $("."+this.activeMenuClassName).removeClass(this.activeMenuClassName);
            el.targetDiv.addClass(this.activeTargetClassName);
            el.a_reference.addClass(this.activeMenuClassName);
        },
        setNewPan: function(){
            this.setActive(this.activePan);
        }
    };

    // A really lightweight plugin wrapper around the constructor, preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);