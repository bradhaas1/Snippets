window._taboola = window._taboola || [];

(function(_taboola, uxads, document, $) {

  function renderTaboolaDesktopWidget() {
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

  // Convert UX Ads params to Taboola params stored in their array
  function convertTaboolaParams() {
    var taboolaLoaderSrc = 'http://cdn.taboola.com/libtrc/nbcnews/loader.js',
        taboolaInitParams;

    taboolaInitParams = {
      'article': 'auto',
      'url': uxads.initParams.canonical
    };

    if (uxads.initParams.hasOwnProperty('referrer')) {
      taboolaInitParams.referrer = uxads.initParams.referrer;
    }

    _taboola.push(taboolaInitParams);

    $.getScript(taboolaLoaderSrc);
    return renderTaboolaDesktopWidget();
  }

  function initDomEvents() {
    var nodesToInsert = [
      $('<div>', {'id': 'taboola-below-article-text-links'})
    ];

    uxads.$appendNodesToBody(nodesToInsert, function() {
      return convertTaboolaParams();
    });

  }

  $(document).ready(function() {
    return initDomEvents();
  });

  return;
})(_taboola, uxads, document, jQuery);
