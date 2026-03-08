async function initGallery(category) {
  const gallery = document.getElementById("gallery");

  if (!gallery) return;

  try {
    const response = await fetch("/galleries.json", { cache: "no-store" });

    if (!response.ok) {
      gallery.innerHTML = "<p>Galerie konnte nicht geladen werden. Prüfe, ob /galleries.json existiert.</p>";
      return;
    }

    const data = await response.json();

    if (!data[category] || data[category].length === 0) {
      gallery.innerHTML = "<p>Für diese Kategorie sind aktuell noch keine Bilder hinterlegt.</p>";
      return;
    }

    gallery.innerHTML = "";

    data[category].forEach(function (imagePath) {
      const item = document.createElement("div");
      item.className = "gallery-item";

      const img = document.createElement("img");
      img.src = "/" + imagePath;
      img.alt = category + " Bild";
      img.loading = "lazy";

      item.appendChild(img);
      gallery.appendChild(item);
    });

  } catch (error) {
    gallery.innerHTML = "<p>Galerie konnte nicht geladen werden. Prüfe, ob /galleries.json existiert.</p>";
  }
}