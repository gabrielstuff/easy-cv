var Helper = {
 slugify : function(text) {
  text = text.replace(/[^-a-zA-Z0-9,&\s]+/ig, '');
  text = text.replace(/-/gi, "_");
  text = text.replace(/\s/gi, "-");
  return text;
 },
 injectCSS: function(css) {
    if ('\v' == 'v') /* ie only */ {
      document.createStyleSheet().cssText = css;
    }
    else {
      var style = document.createElement('STYLE');
      style.type = 'text/css';
      style.innerHTML = css;
      document.getElementsByTagName('HEAD')[0].appendChild(style);
    }
  }
}