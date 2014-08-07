var uxads = (function(uxads, document) {
  var $;

  // URL from string (href) parser
  uxads.getHrefFromString = function(href) {
    var node = document.createElement('a');
    node.href = href;
    return node;
  };

  // Generates a title based on the initialization parameters
  function updateTitle(initParams) {
    var newTitle = document.title + ' -',
        newTitleComponents = [
          initParams.hostname,
          initParams.product,
          initParams.placement
        ];

    $.each(newTitleComponents, function(index, value) {
      newTitle += ' ' + value;
    });
    document.title = newTitle;
    return;
  }

  // Chooses the ad experience based on initialization parameters
  function selectAdExperience(initParams) {
    var adModuleSrc;

    if (initParams.hostname === 'www.nbcnews.com' || 'sys10-epsilon.nbcnews.com' &&
        initParams.product === 'taboola' &&
        initParams.placement === 'belowarticle') {
      adModuleSrc = 'http://mps.nbcnews.com/request/component/nbcnews?name=taboola_belowarticle.js';
    }

    if (adModuleSrc) {
      updateTitle(initParams);
      $.getScript(adModuleSrc);
      return;
    }

    console.error('UX Ads library: Unable to find matching ad experience ' +
      'based on parameters:');
    console.error(initParams);
    return;
  }

  // Validate initParams
  function validateParams(initParams) {
    var testHosts = [
          'localhost',
          'stage.mps.nbcnews.com',
          'sys10-epsilon.nbcnews.com'
        ], isTestEnv;

    // Ensure canonical
    if (!initParams.canonical) {
      console.error('UX Ads: No query string key "canonical". ' +
        'Unable to initialize frame contents.');
      console.error(initParams);
      return;
    }

    // Warn if test environment
    initParams.hostname = uxads.getHrefFromString(initParams.canonical).hostname;
    isTestEnv = $.inArray(initParams.hostname, testHosts) >= 0;
    if (isTestEnv) {
      console.warn('UX Ads: Test environment "' + initParams.hostname +
        '" detected. Consider providing static canonical URL ' +
        'in initialization parameters.');
    }

    uxads.initParams = initParams;
    selectAdExperience(initParams);
    return;
  }

  // Deserialize initParams from query string
  function deserializeParams() {
    var pageQueryString = uxads.getHrefFromString(window.location.href).search,
        initParams;

    if (!pageQueryString.length) {
      console.error('UX Ads: No query string detected. ' +
        'Unable to initialize frame contents.');
      return;
    }

    initParams = $.deparam(pageQueryString.substring(1));
    validateParams(initParams);
    return;
  }

  // Handles events after jQuery initialized
  function jqueryLoaded() {
    // shortcuts jQuery as local variable for performance
    $ = window.jQuery;
    return $.getScript('http://mps.nbcnews.com/request/component/nbcnews?name=uxads_jquery_deparam.js', deserializeParams);
  }

  // Asynchronous jQuery loader
  function jqueryInit(callback) {
    var jquerySrc = '//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js',
        jqueryScript;
    jqueryScript = document.createElement('script');
    jqueryScript.src = jquerySrc;
    jqueryScript.addEventListener('load', callback);
    document.getElementsByTagName('head')[0].appendChild(jqueryScript);
    return;
  }

  jqueryInit(jqueryLoaded);

  return uxads;
}(uxads || {}, document));
