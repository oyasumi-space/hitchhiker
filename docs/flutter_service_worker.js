'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "29dc47e81f791e52d6a9316d1907f329",
"assets/assets/fonts/HuiFontP29.ttf": "65456421fb0ba2f5a52945f774d9f960",
"assets/assets/fonts/OMORI_GAME2.ttf": "0574b64c74380bd82d699fe95824ed65",
"assets/assets/images/blackkeys/a.png": "3cd021565c22fbc0b1d35961b8f8a3c0",
"assets/assets/images/blackkeys/b.png": "95d06725cb41a445e1dc81538ad02dc4",
"assets/assets/images/blackkeys/c.png": "9c903e6a2c4fa30c4211d6167f854ba9",
"assets/assets/images/blackkeys/d.png": "e022a453fc53306a20b141acacdaf229",
"assets/assets/images/blackkeys/e.png": "0540d8b5a7cd443ca4573846b9c21ea0",
"assets/assets/images/blackkeys/f.png": "729ced81ba18c7935bbe1a58d6bc9888",
"assets/assets/images/blackkeys/g.png": "56440a67c974b4f467fd90b674218374",
"assets/assets/images/blackkeys/h.png": "05b99e7a734d6d641f170858ef4052bc",
"assets/assets/images/blackkeys/i.png": "647642dc0e22e51360a4c755c1f54e8f",
"assets/assets/images/blackkeys/j.png": "5c291ca0542651a926a77e8dec5f8b13",
"assets/assets/images/blackkeys/k.png": "74c76fa52e5f5ee185b30d9f3a7eb752",
"assets/assets/images/blackkeys/l.png": "b2e67afa544f416e7b2fa41d12588953",
"assets/assets/images/blackkeys/m.png": "4f23129d6802fc3670d2bf91de9fcaeb",
"assets/assets/images/blackkeys/n.png": "b3297bff50d3700c009609dff28f2078",
"assets/assets/images/blackkeys/o.png": "feb93b52adb69d1612cce5c546922866",
"assets/assets/images/blackkeys/p.png": "504a8d1cbd1eaeb2a904611059640249",
"assets/assets/images/blackkeys/q.png": "7dc2cc43722c63918fead9f5189b90cd",
"assets/assets/images/blackkeys/r.png": "8a67f5e0d7bd8187b1cd6762c6481730",
"assets/assets/images/blackkeys/s.png": "6665b57ed39f948207e1f93b77381d63",
"assets/assets/images/blackkeys/t.png": "abf789a4a3ba9f665861b839e6273e46",
"assets/assets/images/blackkeys/u.png": "23d786b4c26826993a533274b40b8267",
"assets/assets/images/blackkeys/v.png": "460aeab9b27e7bea62eaa74a3b1f6d24",
"assets/assets/images/blackkeys/w.png": "2c1fef0880e5cbe577ec09049031f6da",
"assets/assets/images/blackkeys/x.png": "b000a8f7576d41ee3d0347c9ff976adc",
"assets/assets/images/blackkeys/y.png": "86510636d90bedc937f47f08c994e8d6",
"assets/assets/images/blackkeys/z.png": "3a720d7775abb160f2592abeacc9b9bf",
"assets/assets/images/bs.png": "0f2f3c4271d6e652085bf9154638b64d",
"assets/FontManifest.json": "32c2c36f770f1a9c97ba75b440d91b5b",
"assets/NOTICES": "d419444031598d464a6243cbd95c1e20",
"CNAME": "c53811cfdc36289d892acb232a207a68",
"index.html": "0fff6c1f06b7a3367f873a24c9beb16a",
"/": "0fff6c1f06b7a3367f873a24c9beb16a",
"main.dart.js": "c96d4166025c7ffcfa862de70044b4fa",
"version.json": "66fd02054560bf58d91703df76bb7105"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
