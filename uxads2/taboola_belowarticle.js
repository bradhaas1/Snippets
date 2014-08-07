window._taboola = window._taboola || [];

(function(_taboola, uxads, document, $) {

  // Push placement-specific parameters to the Taboola array
  function pushTaboolaPlacementData() {
    _taboola = _taboola || [];
    _taboola.push({
      'container': 'taboola-below-article-text-links',
      'mode': 'hybrid-text-links-2c',
      'placement': 'Below Article Text Links',
      'target_type': 'mix'
    });
    _taboola.push({
      flush: true
    });
  }

  // Push UX Ads initParams data to 
  function pushTaboolaInitParams() {
    var taboolaLoaderSrc = 'http://cdn.taboola.com/libtrc/nbcnews/loader.js',
        taboolaInitParams = {
          'article': 'auto',
          'url': uxads.initParams.canonical
        };

    if (uxads.initParams.hasOwnProperty('referrer')) {
      taboolaInitParams.referrer = uxads.initParams.referrer;
    }

    _taboola.push(taboolaInitParams);

    $.getScript(taboolaLoaderSrc);
    pushTaboolaPlacementData();
    return;
  }

  $(document).ready(function() {
    $('<div>', {
      'id': 'taboola-below-article-text-links'
    }).appendTo($('body'));
    pushTaboolaInitParams();
    return;
  });

  return;
})(_taboola, uxads, document, jQuery);
