/**
 * Site maintenance gate — redirects all pages to the construction homepage.
 *
 * To disable: set MAINTENANCE to false below, then redeploy.
 * To preview the full site while maintenance is on, run in browser console:
 *   sessionStorage.setItem('site_preview', '1')
 * Then visit /index-full.html or any other page.
 */
(function () {
  var MAINTENANCE = true;
  if (!MAINTENANCE) return;

  var path = window.location.pathname.replace(/\/$/, '') || '/';
  var allowed = [
    '/',
    '/index.html',
    '/google-site-verification.html',
    '/googlee0d4ea2fab0beb3c.html'
  ];

  if (allowed.indexOf(path) !== -1) return;
  if (sessionStorage.getItem('site_preview') === '1') return;

  window.location.replace('/');
})();
