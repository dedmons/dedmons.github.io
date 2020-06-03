window.addEventListener('load', (event) => {
  setTimeout(function() {
    if (document.location.hostname != "dedmonson.com") {
      console.log('dont send analytics on non production site');
      return;
    }

  	let data = {};
  	data.userAgent = navigator.userAgent;
  	data.language = navigator.language;
  	data.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  	data.referrer = (document.referrer === "") ? "-" : document.referrer;
  	data.location = document.location.pathname;

    if (PAGE_URL === "/404.html") {
      data.status = 404;
    }  else {
      data.status = 200;
    }

  	let timing = window.performance.timing;
  	data.latency = timing.responseEnd - timing.fetchStart;
  	data.pageLoad = timing.loadEventEnd - timing.responseEnd;

  	console.log('data', data);

    const url = "https://case.dedmonson.com/analytics/log";

    if (window.navigator.sendBeacon) {
      const beacon = window.navigator.sendBeacon(url, JSON.stringify(data));
      if (beacon)
        console.log('sent beacon');
        return;
    }

    const request = new XMLHttpRequest();
    request.open('POST', url, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify(data));
    console.log('sent XMLHttpRequest');
  }, 100);
});
