(async function () {
  const gallery = document.getElementById("gallery");
  const key = document.body.getAttribute("data-gallery");

  if (!gallery || !key) {
    return;
  }

  function showError(message) {
    gallery.innerHTML = `<div class="error-box">${message}</div>`;
  }

  try {
    const response = await fetch("/galleries.json?v=" + Date.now(), { cache: "no-store" });

    if (!response.ok) {
      showError("galleries.json konnte nicht geladen werden.");
      return;
    }

    const data = await response.json();
    const images = data[key];

    if (!Array.isArray(images) || images.length === 0) {
      showError(`Für ${key} sind keine Bilder in galleries.json hinterlegt.`);
      return;
    }

    gallery.innerHTML = "";

    images.forEach((imagePath) => {
      const item = document.createElement("div");
      item.className = "gallery-item";

      const img = document.createElement("img");
      img.src = "/" + imagePath + "?v=" + Date.now();
      img.alt = key + " Bild";
      img.loading = "lazy";

      img.onerror = function () {
        item.innerHTML = `<div class="error-box">Bild konnte nicht geladen werden:<br>/${imagePath}</div>`;
      };

      item.appendChild(img);
      gallery.appendChild(item);
    });
  } catch (error) {
    showError("Fehler beim Laden der Galerie: " + error.message);
  }
})();