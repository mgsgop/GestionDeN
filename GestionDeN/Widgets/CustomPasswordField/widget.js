WAF.define('CustomPasswordField', ['waf-core/widget'], function(widget) {

    var CustomPasswordField = widget.create('CustomPasswordField', 'CustomTextField', {
        init: function() {
            this.node.setAttribute("type", "password");
        }
    });

    return CustomPasswordField;

});

/* For more information, refer to http://doc.wakanda.org/Wakanda0.DevBranch/help/Title/en/page3871.html */
