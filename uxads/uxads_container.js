var uxads = (function(uxads, $) {
  uxads.ads = uxads.ads || [];
  uxads.containerInit = uxads.containerInit ||
    function($container, emberCanonical, initParams) {

    // Unpack iframe
    function unpackFrame(initParams) {
      var containerClass,
          containerAttr;

      containerClass = 'uxads-container uxads-container-' +
        initParams.product + '-' + initParams.placement;
      containerAttr = {
        'class': containerClass,
        'id': 'uxads-container-' + uxads.ads.length,
        'src': 'http://mps.nbcnews.com/request/component/nbcnews?name=uxads_contents.html&' + $.param(initParams)
      };

      $container.attr(containerAttr).removeAttr('style');

      uxads.ads.push({
        'container': $container,
        'initParams': initParams
      });

      return;
    }

    // Augment initParams including canonical
    function augmentParams(initParams, emberCanonical) {
      var isEmberBound;

      // Detect if Ember bound canonical URL to template
      isEmberBound = (emberCanonical.indexOf('{{') === -1 &&
        emberCanonical.indexOf('}}') === -1);

      newCanonical = isEmberBound ? emberCanonical : window.location.href;
      initParams.canonical = initParams.canonical || newCanonical;

      return unpackFrame(initParams);
    }

    // Validate initParams
    function validateParams(initParams, emberCanonical) {
      var requiredKeys = ['placement', 'product'],
          keysToValidate = [],
          hasKeys;

      // Build an array of keys in init params to validate
      $.each(initParams, function(key, value) {
        keysToValidate.push(key);
      });

      // Abort initialization if any expected key not located
      for (var i = 0; i < requiredKeys.length; i++) {
        hasKeys = $.inArray(requiredKeys[i], keysToValidate) > -1;
        if (!hasKeys) {
          console.error('UX Ads library: missing key "' + requiredKeys[i] +
            '" in initialization parameters');
          return;
        }
      }

      return augmentParams(initParams, emberCanonical);
    }

    validateParams(initParams, emberCanonical);
  };

  return uxads;
}(uxads || {}, jQuery));
