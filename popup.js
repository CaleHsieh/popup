/**
 * TODO: js of the popup
 * Author: Cale
 * Time: 2015.03.09
 */

$(function(){
    popup_event('.popup');
});


/**
 * TODO: popup event
 * Author: Cale
 * Time: 2015.03.05
 */
function popup_event(dom){
    // console.profile();

    $(dom).click(function(){
        /*TODO:initial format*/
        $('#popup-wrap').unwrap().children().hide().unwrap();
        $('#popup-mask, #popup-close, #popup-overlay, label.error, #pop-tips').remove();
        $('input.error').removeClass('error');

        $this = $(this);
        $attr = $this.attr('popup-attr');

        if( $this.hasClass('iframe') ){
            $style = '';
            if($this.attr('popup-style') !== undefined){
                $style = 'margin-left:-50%;' + $this.attr('popup-style');
            }

            var $iframe = document.createElement("iframe");
            $iframe.id = 'popup-iframe';
            $iframe.name = 'popup-iframe';
            $iframe.scrolling = 'no';
            $iframe.src = $attr;
            $iframe.setAttribute('class', 'popup-iframe');
            $iframe.setAttribute('allowTransparency', 'true');
            $iframe.setAttribute('frameborder', 0);
            $iframe.setAttribute('class', 'popup-iframe');
            $iframe.setAttribute('style', $style);

            if($iframe.attachEvent){
                $iframe.attachEvent("onload", function(){
                    document.getElementById('popup-overlay').style.display = 'none';
                });
            }else{
                $iframe.onload = function(){
                    document.getElementById('popup-overlay').style.display = 'none';
                };
            }

            document.body.appendChild($iframe);

            $html = $('#popup-iframe').after('<div id="popup-overlay" class="popup-overlay"><img src="'+qdimg_wbiao_cn+'unit/loading_3.gif"></div>'); /*TODO:conversion*/

        }else{
            // $html = $('<div />').append( $($attr).clone().show() ).html();
            $html = $($attr).show();
        }

        $html.wrap('<div id="popup-window" class="popup-window"><div id="popup-wrap" class="popup-wrap"></div><div id="popup-mask" class="popup-mask"></div></div>');

        $win = $('#popup-window');
        $wrap = $('#popup-wrap');
        $wrap.append('<div id="popup-close" class="popup-close">&times;</div>');
        $win.fadeIn('fast').find('#popup-close').bind('click', function(){ 
            if( $this.hasClass('iframe') ){
                $win.remove(); /*TODO:remove and reload, iframe need to get data in time.*/
            }else{
                /*TODO:initial format*/
                $wrap.unwrap().children().hide().unwrap(); 
                $('#popup-mask, #popup-close, #popup-overlay, label.error, #pop-tips').remove();
                $('input.error').removeClass('error');
            }
        }).end();

        if( $wrap.find('input:button').length>0 ){
            $('body').unbind('keypress').bind('keypress', function(event){ 
                if( event.keyCode==13 ){  //回车键的键值为13
                    $wrap.find('input:button').trigger('click');
                }
            });
        }

        if($wrap.length==0) popup_event();

        return false;
    });

    /*
        Example:
        <a class="popup iframe" popup-attr="http://www.wbiao.cn" popup-style="width:1000px;height:500px;">wbiao</a>
    */

   // console.profileEnd();

}