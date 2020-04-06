window.addEventListener('load', (event) => {
  console.log('page is fully loaded');

  setTimeout(function() {
  	let data = {};
  	data.userAgent = navigator.userAgent;
  	data.language = navigator.language;
  	data.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  	data.referrer = document.referrer;
  	data.location = document.location.pathname;

  	let timing = window.performance.timing;
  	data.latency = timing.responseEnd - timing.fetchStart;
  	data.pageLoad = timing.loadEventEnd - timing.responseEnd;

  	console.log('data', data);
  }, 2000);
});
