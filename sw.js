self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open("fox-store")
      .then((cache) =>
        cache.addAll([
          "/RX8/",
          "/RX8/index.html",
          "/RX8/index.js",
          "/RX8/style.css",
          "/RX8/main.js",
          "/RX8/cage.JPG",
          "/RX8/innerRace.JPG",
          "/RX8/outerRace.JPG",
          "/RX8/Cheveron_process copy-frei.png",
          "/RX8/download.png",
          "/RX8/environment.env",
          "/RX8/gkn-au-stacked.svg",
          "/RX8/DO3-2.glb",
          "/RX8/Helvetica Neue STD/Helvetica Neue LT Std/HelveticaNeueLTStd-Lt.otf",
          "/RX8/Helvetica Neue STD/Helvetica Neue LT Std/HelveticaNeueLTStd-Bd.otf",
        ])
      )
  );
});

self.addEventListener("fetch", (e) => {
  console.log(e.request.url);
  e.respondWith(caches.match(e.request).then((response) => response || fetch(e.request)));
});
