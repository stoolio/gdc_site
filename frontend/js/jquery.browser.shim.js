$.browser = (function (pub) {
    var matched, browserObj;
    uaMatch = function(ua) {
        ua = ua.toLowerCase();
        //This fixes an ie7 bug that causes crashes from incorrect version identification
        if(/*@cc_on/*@if(@_jscript_version<=5.6)1@else@*/0/*@end@*/) {
            ua = "msie 6.0";
        }
        var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
            /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
            /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
            /(msie) ([\w.]+)/.exec( ua ) ||
            ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
            [];

        return {
            browserObj: match[ 1 ] || "",
            version: match[ 2 ] || "0"
        };
    };

    matched = uaMatch(navigator.userAgent);
    browserObj = {};

    if ( matched.browserObj ) {
        browserObj[ matched.browserObj ] = true;
        browserObj.version = matched.version;
    }
    // Chrome is Webkit, but Webkit is also Safari.
    if (browserObj.chrome) {
        browserObj.webkit = true;
    } else if (browserObj.webkit) {
        browserObj.safari = true;
    }

    pub = browserObj;
    return pub;
}($.browser || {}));
