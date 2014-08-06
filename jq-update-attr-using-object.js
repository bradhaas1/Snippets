containerAttr = {
	'class': containerClass,
	'id': 'uxads-container-' + uxads.ads.length,
	'src': 'http://mps.nbcnews.com/request/component/nbcnews?name=uxads_contents.html&' + $.param(initParams)
};

$container.attr(containerAttr).removeAttr('style');