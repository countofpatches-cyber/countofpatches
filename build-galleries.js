const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'works');

const categories = ['thw', 'feuerwehr', 'polizei', 'zoll', 'behoerden'];

const galleries = {};

categories.forEach(cat => {
  const dir = path.join(baseDir, cat);

  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir)
      .filter(file => file.match(/\.(jpg|jpeg|png|webp)$/i))
      .map(file => `works/${cat}/${file}`);

    galleries[cat] = files;
  } else {
    galleries[cat] = [];
  }
});

fs.writeFileSync(
  path.join(__dirname, 'galleries.json'),
  JSON.stringify(galleries, null, 2)
);

console.log("Galleries generated!");