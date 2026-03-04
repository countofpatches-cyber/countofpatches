async function initGallery(category) {

  const galleryContainer = document.getElementById("gallery");

  try {

    // galleries.json IMMER vom Root laden
    const response = await fetch("/galleries.json", { cache: "no-store" });

    if (!response.ok) {
      galleryContainer.innerHTML = "Galerie konnte nicht geladen werden.";
      return;
    }

    const data = await response.json();

    if (!data[category] || data[category].length === 0) {
      galleryContainer.innerHTML = "Noch keine Bilder vorhanden.";
      return;
    }

    galleryContainer.innerHTML = "";

    data[category].forEach(function(image) {

      const img = document.createElement("img");
      img.src = "/" + image;
      img.alt = category + " patch";
      img.loading = "lazy";

      const item = document.createElement("div");
      item.className = "gallery-item";

      item.appendChild(img);
      galleryContainer.appendChild(item);

    });

  } catch (error) {

    galleryContainer.innerHTML = "Galerie kann nicht geladen werden. Prüfe, ob /galleries.json existiert.";

  }

}