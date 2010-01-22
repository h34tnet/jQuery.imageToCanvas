/*
 * jQuery.imageToCanvas
 * ====================
 *
 * A jQuery plugin that turns an DOM image element into an HTML5 canvas while preserving the image data.
 *
 * http://github.com/schnalle/jQuery.imageToCanvas
 */

(function($) {
    $.fn.imageToCanvas = function () {
        // filter out elements that aren't images
        var images = this.filter('IMG');
        
        // global attributes 
        var copyAttr = 'accesskey class contenteditable contextmenu dir draggable hidden id itemid itemprop itemref itemscope itemtype lang spellcheck style tabindex title'.split(' ');
    
        images.each(function () {
            var $img = $(this),
                img  = this;
            var canvas  = document.createElement('canvas'), 
                $canvas = $(canvas),
                ctx     = canvas.getContext('2d');
            
            var width  = $img.width(),
                height = $img.height();

            // reset css values so we can get the real image width/height
            $img.css({'width' : null, 'height': null});
            var cclass = $img.attr('class');
            $img.removeClass();
            
            var owidth = $img.width(),
                oheight = $img.height();
                
            for (var i=0; i<copyAttr.length; i++) {
                var imgAttr = $img.attr(copyAttr[i]);
                if (imgAttr)
                    $canvas.attr(copyAttr[i], imgAttr);
            }

            $canvas.attr('class',  cclass);
            $canvas.attr('width',  width);
            $canvas.attr('height', height);
            $canvas.css('width',  width);
            $canvas.css('height', height);
            
            // copy image to canvas
            ctx.drawImage(this, 0, 0, owidth, oheight, 0, 0, width, height);
            
            $img.replaceWith($canvas);
        });
        
        return $;
    }
})(jQuery);


