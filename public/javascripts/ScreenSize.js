//screen 1920
(function($) {

    var $window = $(window),
        $col = $('.item-list'),
        $mainAdvertis = $('.mainAdvertis'),
        $textBox = $('.TextBox'),
        $adsRightSide = $('.IndexAds');
        //console.log($window);
    function resize() {
        if ($window.width() == 1920) {
        	$col.removeClass('col-md-offset-0');
        	$col.css('margin','0 auto');
        	$col.css('padding-left','0px');
        	$col.css('width','1400px');
            $mainAdvertis.css('width','1200px');
            $textBox.css('width','1200px');
            $adsRightSide.css('left','1600px');
            return $col.addClass('col-md-offset-1');
        }else{
        	$col.removeClass('col-md-offset-1');
            return $col.addClass('col-md-offset-0');
        }
    }
    $window
        .resize(resize)
        .trigger('resize');
})(jQuery);