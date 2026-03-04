async function initGallery(category, options = {}) {
  const galleryEl = document.getElementById("gallery");
  const emptyEl = document.getElementById("empty");

  try {
    const res = await fetch("galleries.json", { cache: "no-store" });
    if (!res.ok) throw new Error("galleries.json nicht gefunden");

    const data = await res.json();
    const items = (data[category] || []);

    if (!items.length) {
      emptyEl.style.display = "block";
      return;
    }

    // Render
    for (const it of items) {
      const div = document.createElement("div");
      div.className = "item";
      const caption = it.title || (it.src.split("/").pop() || "");
      div.innerHTML = `
        <img class="thumb" src="${it.src}" alt="${it.alt || caption}">
        <div class="cap">${caption}</div>
      `;

      div.querySelector("img").addEventListener("click", () => openLightbox(it.src, it.alt || caption));
      galleryEl.appendChild(div);
    }

  } catch (e) {
    emptyEl.style.display = "block";
    emptyEl.innerHTML = `Galerie kann nicht geladen werden.<br>
      Prüfe, ob <code>galleries.json</code> nach dem Deploy existiert.`;
  }

  // Lightbox
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightboxImg");
  const closeBtn = document.getElementById("closeBtn");

  function openLightbox(src, alt) {
    lbImg.src = src;
    lbImg.alt = alt || "Vorschau";
    lb.classList.add("open");
  }
  function closeLightbox() {
    lb.classList.remove("open");
    lbImg.src = "";
  }

  closeBtn.addEventListener("click", closeLightbox);
  lb.addEventListener("click", (ev) => { if (ev.target === lb) closeLightbox(); });
  document.addEventListener("keydown", (ev) => { if (ev.key === "Escape") closeLightbox(); });
}