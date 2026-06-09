---
titolo: WKd_01.01 — preview
data: 2026-06-09
taglia: media
immagine: /uploads/wxd_01.01_web.webp
estratto: "We are currently testing the WKd_01.01, a now near-stable version
  that has already made several dérives possible. "
descrizione: "Build your own Walkography device: an open-source, affordable
  wearable that logs physiological and environmental data on a walk — firmware,
  schematics and STL files."
---
We are currently testing the **WKd_01.01**, a now near-stable version that has already made several dérives possible. 

The files needed to build it can't be released yet: this is a first preview, meant to describe the current state of the device, not to reproduce it. 

One useful caveat up front: the configuration shown here is about to change in a couple of respects (see below), so the stable release won't be identical to this one.


The device is built to capture the multimodal texture of a walk: the environment crossed and the body crossing it, together. All the sensors are managed by an ESP32-S3 Supermini:
•	**GPS NEO-8M** — position;
•	**BH1750** — ambient light;
•	**SHT31** — ambient temperature and humidity;
•	**a second SHT31**, housed in a capsule held by a strap under the shirt, almost in contact with the body — "bodily" temperature and humidity;
•	**MAX4466** (or 9814) — ambient noise;
•	**GSR** — skin resistance and conductivity;
•	**MAX30102** — heart rate.


All of them save data every 7 seconds to a CSV on the SD card; except for the GPS, each value is the average of the readings over the last 7 seconds. 

**Two buttons** record, on a separate CSV, the point and how long they are held down: they serve to mark points of interest and moments worth assessing during the dérive, using the length of the press as a way of rating them.

![](/uploads/01.webp)


**What works, on a first test.** 

The GPS locates position with sufficient precision. The temperature and humidity sensors, compared against official instruments, stay within ±1°. The microphone clearly picks out the noisier areas. The light sensor gives equally credible data in "stress" tests, both in slight changes of light and in more intense, sudden ones.
The GSR. It has been calibrated, and in desk tests it reacts even to minor stimuli. During the dérives the reading is certainly influenced by perspiration and body temperature — and it should be said that arousal and thermal sweating pass in part through the same glands, so the two components aren't cleanly separable by our sensors. That said: even at moments when temperature and humidity stayed stable, we observed GSR variations clustering around situations we would expect to be more arousing — busy intersections, sudden shouting, an incoming phone call. We read this as encouraging but preliminary. It's work in progress, not a conclusion.


Right now **the biggest headache** is the MAX30102. 

On the desk, with the SparkFun library, it returns stable, credible readings; in movement, it doesn't. Worn, it initially produced interference with other sensors, above all the GSR: isolating it with film and leaving only the optical sensor exposed made the interference disappear. But even so, worn (on the earlobe, to reduce movement noise), the reading stays unreliable — many values at 0, others null, others implausibly high.


For this reason, in the stable release of the WKd_01, the MAX30102 will be replaced by an **AD8232 ECG** sensor: less comfortable, since the electrodes have to be applied to the chest, but far more reliable in movement. We will nonetheless keep looking for an optical sensor reliable enough both at rest and while walking, so that the device stays as easy and comfortable as possible.

![](/uploads/img20260601084159.webp)


In practice. The device is worn on the **upper arm**. An LED signals when the sensors and the SD module are ready, and when the GPS has locked onto enough satellites to start recording. The ECG version will require freeing up some of the board's pins, and will lead to replacing the LED with a small OLED screen, on the I²C rails.

In the meantime the dérives continue: if we can't make the MAX30102 reliable, simply without the heart-rate data. Each cartography will indicate which version of the device made it.

![](/uploads/captura-de-pantalla-2026-06-09-050059.webp)
