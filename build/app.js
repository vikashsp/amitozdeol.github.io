!function(e){var n={};function o(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=n,o.d=function(e,n,t){o.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,n){if(1&n&&(e=o(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(o.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)o.d(t,r,function(n){return e[n]}.bind(null,r));return t},o.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(n,"a",n),n},o.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},o.p="",o(o.s=0)}([function(module,exports){eval("var $ = function $(elem) {\n  return document.querySelector(elem);\n};\n\nvar $$ = function $$(elem) {\n  return document.querySelectorAll(elem);\n}; //This is the \"Offline copy of pages\" service worker\n//Add this below content to your HTML page, or add the js file to your page at the very top to register service worker\n\n\nif (navigator.serviceWorker.controller) {\n  console.log('[PWA Builder] active service worker found, no need to register');\n} else {\n  //Register the ServiceWorker\n  navigator.serviceWorker.register('pwabuilder-sw.js', {\n    scope: './'\n  }).then(function (reg) {\n    console.log('Service worker has been registered for scope:' + reg.scope);\n  });\n}\n\nwindow.addEventListener('load', lazyloading, false);\n\nfunction lazyloading() {\n  var lazyloadImages;\n\n  if (\"IntersectionObserver\" in window) {\n    lazyloadImages = $$(\".lazy\");\n    var imageObserver = new IntersectionObserver(function (entries, observer) {\n      entries.forEach(function (entry) {\n        if (entry.isIntersecting) {\n          var image = entry.target;\n          image.src = image.dataset.src;\n          image.classList.remove(\"lazy\");\n          imageObserver.unobserve(image);\n        }\n      });\n    });\n    lazyloadImages.forEach(function (image) {\n      imageObserver.observe(image);\n    });\n  } else {\n    var lazyload = function lazyload() {\n      if (lazyloadThrottleTimeout) {\n        clearTimeout(lazyloadThrottleTimeout);\n      }\n\n      lazyloadThrottleTimeout = setTimeout(function () {\n        var scrollTop = window.pageYOffset;\n        lazyloadImages.forEach(function (img) {\n          if (img.offsetTop < window.innerHeight + scrollTop) {\n            img.src = img.dataset.src;\n            img.classList.remove('lazy');\n          }\n        });\n\n        if (lazyloadImages.length == 0) {\n          document.removeEventListener(\"scroll\", lazyload);\n          window.removeEventListener(\"resize\", lazyload);\n          window.removeEventListener(\"orientationChange\", lazyload);\n        }\n      }, 20);\n    };\n\n    var lazyloadThrottleTimeout;\n    lazyloadImages = $$(\".lazy\");\n    document.addEventListener(\"scroll\", lazyload);\n    window.addEventListener(\"resize\", lazyload);\n    window.addEventListener(\"orientationChange\", lazyload);\n  }\n} // Remove no-js class\n\n\n$('html').classList.remove('no-js'); // Animate to section when nav is clicked\n\n$$('#menu a[href^=\"#\"]').forEach(function (anchor) {\n  anchor.addEventListener('click', function (e) {\n    e.preventDefault();\n    window.scrollTo({\n      top: $(this.getAttribute('href')).getBoundingClientRect().top,\n      behavior: 'smooth'\n    });\n\n    if ($('header').classList.contains('active')) {\n      $$('header, body').forEach(function (e) {\n        return e.classList.remove('active');\n      });\n    }\n  });\n}); // Scroll to top\n\n$('#to-top').addEventListener('click', function (e) {\n  window.scrollTo({\n    top: 0,\n    behavior: 'smooth'\n  });\n}); // Scroll to first element\n\n$('#lead-down span').addEventListener('click', function (e) {\n  window.scrollTo({\n    top: $(\"#about\").getBoundingClientRect().top,\n    behavior: 'smooth'\n  });\n}); // Open mobile menu\n\n$('#mobile-menu-open').addEventListener('click', function (e) {\n  $$('header, body').forEach(function (e) {\n    return e.classList.add('active');\n  });\n});\n\n//# sourceURL=webpack:///./js/scripts.js?")}]);