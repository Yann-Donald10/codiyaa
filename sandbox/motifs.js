// sandbox/motifs.js
// Objectif: bande motif en bas, répétée horizontalement, stable au re-render.

(function () {
  function svgEl(name) {
    return document.createElementNS("http://www.w3.org/2000/svg", name);
  }

  function ensureDefs(parentSvg) {
    let defs = parentSvg.querySelector("defs");
    if (!defs) {
      defs = svgEl("defs");
      parentSvg.insertBefore(defs, parentSvg.firstChild);
    }
    return defs;
  }

  function ensurePattern(defs, id, imgHref, tileW, tileH) {
    if (defs.querySelector(`#${id}`)) return;

    const pat = svgEl("pattern");
    pat.setAttribute("id", id);
    pat.setAttribute("patternUnits", "userSpaceOnUse");
    pat.setAttribute("width", String(tileW));
    pat.setAttribute("height", String(tileH));

    const img = svgEl("image");
    // Important: href (SVG2). xlink:href (vieux) au cas où.
    img.setAttribute("href", imgHref);
    img.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", imgHref);
    img.setAttribute("width", String(tileW));
    img.setAttribute("height", String(tileH));
    img.setAttribute("preserveAspectRatio", "none");

    pat.appendChild(img);
    defs.appendChild(pat);
  }

  function ensureClipPath(defs, clipId, pathId) {
    let cp = defs.querySelector(`#${clipId}`);
    if (!cp) {
      cp = svgEl("clipPath");
      cp.setAttribute("id", clipId);
      const use = svgEl("use");
      use.setAttribute("href", `#${pathId}`);
      use.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", `#${pathId}`);
      cp.appendChild(use);
      defs.appendChild(cp);
    } else {
      // sécurité: si le use n'existe pas / a sauté
      const use = cp.querySelector("use");
      if (use) {
        use.setAttribute("href", `#${pathId}`);
        use.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", `#${pathId}`);
      }
    }
  }

  function applyBand(block, opts) {
    if (!block || !block.svgGroup_ || !block.svgPath_) return;

    const parentSvg = block.workspace.getParentSvg();
    const defs = ensureDefs(parentSvg);

    // 1) Patterns (1 fois)
    ensurePattern(defs, "codiyaa_pat_events", "./assets/images/pattern_4.png", opts.tileW, opts.tileH);
    ensurePattern(defs, "codiyaa_pat_movement", "./assets/images/pattern_1.png", opts.tileW, opts.tileH);
    ensurePattern(defs, "codiyaa_pat_operations", "./assets/images/pattern_2.png", opts.tileW, opts.tileH);
    ensurePattern(defs, "codiyaa_pat_sound", "./assets/images/pattern_3.png", opts.tileW, opts.tileH);

    // 2) Identifier le pattern de CE block (défini par extension)
    const key = block.codiyaaPatternKey;
    if (!key) return;

    const patId =
      key === "events" ? "codiyaa_pat_events" :
      key === "movement" ? "codiyaa_pat_movement" :
      key === "operations" ? "codiyaa_pat_operations" :
      key === "sound" ? "codiyaa_pat_sound" :
      null;

    if (!patId) return;

    // 3) Clip sur le contour du block
    // Donne un id stable au path principal
    const path = block.svgPath_;
    let pathId = path.getAttribute("id");
    if (!pathId) {
      pathId = `codiyaa_path_${block.id}`;
      path.setAttribute("id", pathId);
    }
    const clipId = `codiyaa_clip_${block.id}`;
    ensureClipPath(defs, clipId, pathId);

    // 4) Taille du block
    const hw = block.getHeightWidth ? block.getHeightWidth() : null;
    if (!hw) return;
    const w = hw.width;
    const h = hw.height;

    // 5) Bande motif (rect clippé)
    let band = block.svgGroup_.querySelector("rect.codiyaa-band");
    if (!band) {
      band = svgEl("rect");
      band.classList.add("codiyaa-band");
      band.setAttribute("pointer-events", "none");
      block.svgGroup_.appendChild(band);
    }

    // position bas fixe
    const bandH = opts.bandH;
    band.setAttribute("x", "0");
    band.setAttribute("y", String(Math.max(0, h - bandH)));
    band.setAttribute("width", String(w));
    band.setAttribute("height", String(bandH));
    band.setAttribute("fill", `url(#${patId})`);
    band.setAttribute("clip-path", `url(#${clipId})`);

    // 6) Optionnel: légère opacité si besoin (laisse à 1 par défaut)
    band.setAttribute("opacity", String(opts.opacity));
  }

  // API globale appelée depuis main.js
  window.initCodiyaaMotifs = function initCodiyaaMotifs(Blockly, userOpts = {}) {
    const opts = {
      bandH: 20,     // bande fixe (tu ajusteras)
      tileW: 140,    // largeur d'une tuile (peut être ≈ largeur de ton PNG)
      tileH: 40,     // hauteur tuile (peut être hauteur de ton PNG)
      opacity: 1,
      ...userOpts,
    };

    // Extensions : elles ne dessinent rien, elles taguent juste le block.
    Blockly.Extensions.register("codiyaa_pattern_events", function () {
      this.codiyaaPatternKey = "events";
    });
    Blockly.Extensions.register("codiyaa_pattern_movement", function () {
      this.codiyaaPatternKey = "movement";
    });
    Blockly.Extensions.register("codiyaa_pattern_operations", function () {
      this.codiyaaPatternKey = "operations";
    });
    Blockly.Extensions.register("codiyaa_pattern_sound", function () {
      this.codiyaaPatternKey = "sound";
    });

    // Hook render: à CHAQUE render, on (re)pose la bande.
    const proto = Blockly.BlockSvg && Blockly.BlockSvg.prototype;
    if (!proto || proto.__codiyaaPatched) return;
    proto.__codiyaaPatched = true;

    const originalRender = proto.render;
    proto.render = function (...args) {
      const res = originalRender.apply(this, args);
      try {
        applyBand(this, opts);
      } catch (e) {
        // silencieux: on évite de casser Blockly si un block est transient
      }
      return res;
    };
  };
})();
