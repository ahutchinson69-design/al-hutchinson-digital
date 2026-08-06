/**
 * Al Hutchinson — portfolio intro
 *
 * Sequence:
 *   1. The signature writes itself on, left to right, with a glowing pen tip
 *      riding the leading edge of the stroke.
 *   2. A single highlight sweeps along the ink once it has settled.
 *   3. The disciplines line, call to action and scroll hint fade in.
 *   4. Click, scroll, swipe or Enter hands off to the portfolio.
 *
 * How the write-on works
 *   The artwork is real calligraphy keyed to transparency. An animated
 *   `clip-path` with a slanted leading edge sweeps across it, so the ink
 *   appears from left to right along the natural lean of the script.
 *   `/intro/media/signature-meta.json` carries a precomputed centre-line of
 *   the lettering (one point per ~1.2% of width, measured from the artwork's
 *   own alpha channel), which is what lets the pen tip follow the actual
 *   letters instead of a straight line.
 *
 *   Asset URLs are root-absolute because this page is served at both /intro
 *   and /intro/index.html; relative paths break at the first of those.
 *
 * Performance
 *   One requestAnimationFrame loop drives the whole reveal. The pen tip moves
 *   via `transform` only. The particle canvas is capped, sized to a maximum of
 *   2x DPR, and stops completely in a background tab.
 *
 * Accessibility
 *   Everything here is decorative — the accessible name is in the <h1>, which
 *   is in the markup before any script runs. `prefers-reduced-motion` skips
 *   straight to the finished state.
 */

(function () {
  "use strict";

  // ---------------------------------------------------------------------
  // Configuration
  // ---------------------------------------------------------------------

  var WRITE_MS = 2700; // time to write the signature
  var HOLD_MS = 260; // beat before the shimmer
  var LEAVE_MS = 600; // dissolve before navigating away

  // The write-on edge sweeps from just off the left of the artwork to just
  // past its right. SLANT is how far the top of the edge leads the bottom,
  // in percent of width — matched to the lean of the lettering.
  var CUT_FROM = -8;
  var CUT_TO = 112;
  var CUT_SLANT = 9;

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  // Gesture exits stay inert until the intro has played. See initHandoff().
  var armed = false;

  // ---------------------------------------------------------------------
  // Elements
  // ---------------------------------------------------------------------

  // With scripting available the reveal is driven from here; drop the
  // no-js fallback that would otherwise show the finished signature.
  document.documentElement.classList.remove("no-js");

  var signature = document.getElementById("signature");
  var sigInk = document.getElementById("sigInk");
  var sigShine = document.getElementById("sigShine");
  var sigTip = document.getElementById("sigTip");
  var disciplines = document.getElementById("disciplines");
  var cta = document.getElementById("cta");
  var scrollHint = document.getElementById("scrollHint");
  var canvas = document.getElementById("particles");

  /** Centre-line of the lettering: [xFraction, yFraction] pairs. */
  var track = null;

  // ---------------------------------------------------------------------
  // Reveal
  // ---------------------------------------------------------------------

  /**
   * Opens the write-on edge to `p` (0 closed, 1 fully revealed).
   * `clip-path` is written outright rather than through custom properties —
   * one less layer of indirection between the frame loop and the pixels.
   */
  function setReveal(p) {
    if (!sigInk) return;
    var edge = CUT_FROM + (CUT_TO - CUT_FROM) * p;
    var top = edge + CUT_SLANT / 2;
    var bottom = edge - CUT_SLANT / 2;

    sigInk.style.clipPath =
      "polygon(-8% -10%, " +
      top.toFixed(2) +
      "% -10%, " +
      bottom.toFixed(2) +
      "% 110%, -8% 110%)";
  }

  /** Looks up the vertical position of the lettering at a given x fraction. */
  function trackY(x) {
    if (!track || track.length === 0) return 0.5;
    if (x <= track[0][0]) return track[0][1];

    for (var i = 1; i < track.length; i++) {
      if (track[i][0] >= x) {
        var prev = track[i - 1];
        var next = track[i];
        var span = next[0] - prev[0];
        var t = span > 0 ? (x - prev[0]) / span : 0;
        return prev[1] + (next[1] - prev[1]) * t;
      }
    }
    return track[track.length - 1][1];
  }

  /** Positions the glowing tip at the current point of the stroke. */
  function moveTip(p) {
    if (!sigTip || !signature) return;

    var rect = signature.getBoundingClientRect();
    if (rect.width === 0) return;

    // Sit on the leading edge itself — the same value the clip-path uses —
    // so the glow always covers the cut rather than trailing behind it.
    var edge = (CUT_FROM + (CUT_TO - CUT_FROM) * p) / 100;
    var x = Math.min(Math.max(edge, 0), 1);
    var y = trackY(x);

    sigTip.style.transform =
      "translate3d(" + x * rect.width + "px," + y * rect.height + "px,0)";
  }

  function showFinishedSignature() {
    setReveal(1);
    if (sigTip) sigTip.style.opacity = "0";
  }

  function writeSignature(onComplete) {
    var start = null;
    var done = false;
    setReveal(0);
    if (sigTip) sigTip.style.opacity = "1";

    function complete() {
      if (done) return;
      done = true;
      showFinishedSignature();
      onComplete();
    }

    function frame(now) {
      if (done) return;
      if (start === null) start = now;
      var p = Math.min((now - start) / WRITE_MS, 1);

      // Ease the ends so the pen starts and stops like a hand, not a machine.
      var eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;

      setReveal(eased);
      moveTip(eased);

      if (p < 1) {
        requestAnimationFrame(frame);
      } else {
        complete();
      }
    }

    requestAnimationFrame(frame);
  }

  function shimmer() {
    if (sigShine) sigShine.classList.add("is-sweeping");
  }

  function revealContent() {
    [disciplines, cta, scrollHint].forEach(function (el, i) {
      if (!el) return;
      window.setTimeout(
        function () {
          el.classList.add("is-visible");
        },
        prefersReducedMotion ? 0 : i * 180,
      );
    });
  }

  // ---------------------------------------------------------------------
  // Particles
  // ---------------------------------------------------------------------

  function initParticles() {
    if (!canvas || prefersReducedMotion) return;

    var ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    var particles = [];
    var width = 0;
    var height = 0;
    var running = true;
    var rafId = null;

    function spawn(seeded) {
      return {
        x: Math.random() * width,
        y: seeded ? Math.random() * height : height + 12,
        r: 0.5 + Math.random() * 1.7,
        vy: -(0.06 + Math.random() * 0.16),
        vx: (Math.random() - 0.5) * 0.09,
        alpha: 0.06 + Math.random() * 0.34,
        phase: Math.random() * Math.PI * 2,
        warm: Math.random() > 0.72,
      };
    }

    function resize() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      var target = Math.min(Math.round((width * height) / 26000), 70);
      particles = [];
      for (var i = 0; i < target; i++) particles.push(spawn(true));
    }

    function draw(now) {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.y += p.vy;
        p.x += p.vx + Math.sin(now / 2600 + p.phase) * 0.16;

        if (p.y < -12 || p.x < -20 || p.x > width + 20) {
          particles[i] = spawn(false);
          continue;
        }

        var twinkle = 0.72 + Math.sin(now / 1400 + p.phase) * 0.28;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.warm
          ? "rgba(230, 212, 168, " + p.alpha * twinkle + ")"
          : "rgba(205, 222, 248, " + p.alpha * twinkle + ")";
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    }

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        running = false;
        if (rafId) cancelAnimationFrame(rafId);
      } else if (!running) {
        running = true;
        rafId = requestAnimationFrame(draw);
      }
    });

    var resizeTimer = null;
    window.addEventListener("resize", function () {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 160);
    });

    resize();
    rafId = requestAnimationFrame(draw);
  }

  // ---------------------------------------------------------------------
  // Handing off to the portfolio
  // ---------------------------------------------------------------------

  function initHandoff() {
    var target = cta && cta.getAttribute("href") ? cta.getAttribute("href") : "/";
    var leaving = false;

    /**
     * Scroll, swipe and arrow keys stay disarmed until the signature has
     * finished. Without this a single stray scroll on load skips the intro
     * entirely. The button always works, so nobody is ever made to wait.
     */
    function leave(event, viaGesture) {
      if (leaving) return;
      if (viaGesture && !armed) return;
      leaving = true;
      if (event && event.preventDefault) event.preventDefault();

      try {
        sessionStorage.setItem("ah-intro-seen", "1");
      } catch {
        /* Private browsing can refuse storage; the intro simply replays. */
      }

      if (prefersReducedMotion) {
        window.location.href = target;
        return;
      }

      document.body.classList.add("is-leaving");
      window.setTimeout(function () {
        window.location.href = target;
      }, LEAVE_MS);
    }

    if (cta) {
      cta.addEventListener("click", function (event) {
        leave(event, false);
      });
    }

    window.addEventListener(
      "wheel",
      function (event) {
        if (event.deltaY <= 12) return;
        leave(event, true);
      },
      { passive: true },
    );

    var touchStartY = null;
    window.addEventListener(
      "touchstart",
      function (event) {
        touchStartY = event.touches[0].clientY;
      },
      { passive: true },
    );

    window.addEventListener(
      "touchmove",
      function (event) {
        if (touchStartY === null) return;
        if (touchStartY - event.touches[0].clientY > 56) {
          touchStartY = null;
          leave(null, true);
        }
      },
      { passive: true },
    );

    window.addEventListener("keydown", function (event) {
      var keys = ["Enter", " ", "Spacebar", "PageDown", "ArrowDown"];
      if (keys.indexOf(event.key) === -1) return;
      if (document.activeElement === cta && event.key !== "PageDown") return;
      leave(event, true);
    });
  }

  // ---------------------------------------------------------------------
  // Boot
  // ---------------------------------------------------------------------

  function finish() {
    revealContent();
    armed = true;
  }

  /**
   * Safety net.
   *
   * requestAnimationFrame does not fire in a background tab and some
   * environments throttle it to a standstill, so the reveal could otherwise
   * sit closed — leaving the page's entire reason for existing invisible, and
   * the call to action along with it. If the intro has not finished by the
   * time it comfortably should have, present the finished signature outright.
   *
   * This runs on a plain timer, which keeps firing where frames do not.
   */
  function armSafetyNet() {
    window.setTimeout(
      function () {
        if (armed) return;
        showFinishedSignature();
        finish();
      },
      WRITE_MS * 2 + 4000,
    );
  }

  function play() {
    if (prefersReducedMotion) {
      showFinishedSignature();
      finish();
      return;
    }

    // A beat of stillness before the first stroke lands.
    window.setTimeout(function () {
      writeSignature(function () {
        window.setTimeout(shimmer, HOLD_MS);
        window.setTimeout(finish, HOLD_MS + 260);
      });
    }, 420);
  }

  /**
   * Holds the intro until the page is actually being looked at. A tab opened
   * in the background gets no animation frames, so playing straight away
   * would mean the visitor arrives to a signature that has already finished
   * — or worse, one frozen part-way through.
   */
  function playWhenVisible() {
    if (!document.hidden) {
      play();
      return;
    }

    var onVisible = function () {
      if (document.hidden) return;
      document.removeEventListener("visibilitychange", onVisible);
      play();
    };
    document.addEventListener("visibilitychange", onVisible);
  }

  function start() {
    initParticles();
    initHandoff();

    if (!signature || !sigInk) {
      finish();
      return;
    }

    setReveal(0);

    // Wait for both the artwork and its centre-line before writing, so the
    // pen tip never rides a line it does not yet have.
    var pending = 2;
    var failed = false;

    function ready() {
      if (--pending > 0) return;
      if (failed && !track) {
        // Without the track the tip would be wrong; reveal without it.
        if (sigTip) sigTip.style.display = "none";
      }
      armSafetyNet();
      playWhenVisible();
    }

    fetch("/intro/media/signature-meta.json")
      .then(function (r) {
        return r.ok ? r.json() : null;
      })
      .then(function (meta) {
        if (meta && meta.track) track = meta.track;
      })
      .catch(function () {
        failed = true;
      })
      .then(ready);

    if (sigInk.complete) {
      ready();
    } else {
      sigInk.addEventListener("load", ready);
      sigInk.addEventListener("error", function () {
        failed = true;
        ready();
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
