const fs = require('fs');
const path = require('path');

const tables = [
  { name: 'game_info', columns: [{ name: 'id', type: 'INT', pk: true }, { name: 'title', type: 'VARCHAR(255)' }, { name: 'developer', type: 'VARCHAR(255)' }, { name: 'publisher', type: 'VARCHAR(255)' }, { name: 'genre', type: 'VARCHAR(100)' }, { name: 'release_year', type: 'INT' }, { name: 'platforms', type: 'VARCHAR(255)' }, { name: 'description', type: 'TEXT' }, { name: 'hero_image', type: 'VARCHAR(255)' }] },
  { name: 'news', columns: [{ name: 'id', type: 'INT', pk: true }, { name: 'category', type: 'VARCHAR(100)' }, { name: 'title', type: 'VARCHAR(255)' }, { name: 'short_description', type: 'TEXT' }, { name: 'content', type: 'TEXT' }, { name: 'image_url', type: 'VARCHAR(255)' }, { name: 'created_at', type: 'DATETIME' }] },
  { name: 'gallery', columns: [{ name: 'id', type: 'INT', pk: true }, { name: 'title', type: 'VARCHAR(255)' }, { name: 'description', type: 'TEXT' }, { name: 'image_url', type: 'VARCHAR(255)' }, { name: 'created_at', type: 'DATETIME' }] },
  { name: 'characters', columns: [{ name: 'id', type: 'INT', pk: true }, { name: 'name', type: 'VARCHAR(255)' }, { name: 'role', type: 'VARCHAR(100)' }, { name: 'faction', type: 'VARCHAR(100)' }, { name: 'description', type: 'TEXT' }, { name: 'image_url', type: 'VARCHAR(255)' }] },
  { name: 'users', columns: [{ name: 'id', type: 'INT', pk: true }, { name: 'username', type: 'VARCHAR(100)', unique: true }, { name: 'password', type: 'VARCHAR(255)' }] }
];

function generateSVG() {
  const width = 1200;
  const height = 750;
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <style>
    .bg { fill: #0f0f11; }
    .title { font-family: 'Georgia', serif; font-size: 24px; font-weight: bold; fill: #d4af37; text-anchor: middle; }
    .table-header { fill: #8b0000; stroke: #d4af37; stroke-width: 1.5; }
    .table-body { fill: #1a1a1e; stroke: #d4af37; stroke-width: 1; }
    .header-text { font-family: 'Cinzel', 'Georgia', serif; font-size: 13px; font-weight: bold; fill: #ffffff; text-anchor: middle; }
    .col-pk { font-family: monospace; font-size: 11px; fill: #d4af37; font-weight: bold; }
    .col-text { font-family: monospace; font-size: 11px; fill: #e8e2ce; }
    .col-type { font-family: monospace; font-size: 10px; fill: #888888; }
  </style>
  <rect class="bg" width="100%" height="100%"/>
  <text x="${width / 2}" y="45" class="title">ASSASSIN'S CREED II — DATABASE ER DIAGRAM</text>
`;
  const layout = [{ x: 50, y: 80, w: 260 }, { x: 350, y: 80, w: 260 }, { x: 650, y: 80, w: 260 }, { x: 200, y: 450, w: 260 }, { x: 550, y: 450, w: 260 }];
  tables.forEach((table, i) => {
    const pos = layout[i];
    const rowHeight = 22;
    const headerHeight = 32;
    const bodyHeight = table.columns.length * rowHeight + 10;
    svg += `  <rect x="${pos.x}" y="${pos.y}" width="${pos.w}" height="${headerHeight}" class="table-header" rx="3"/>
`;
    svg += `  <text x="${pos.x + pos.w / 2}" y="${pos.y + 20}" class="header-text">${table.name.toUpperCase()}</text>
`;
    svg += `  <rect x="${pos.x}" y="${pos.y + headerHeight}" width="${pos.w}" height="${bodyHeight}" class="table-body" rx="2"/>
`;
    table.columns.forEach((col, j) => {
      const cy = pos.y + headerHeight + 20 + (j * rowHeight);
      const textClass = col.pk ? 'col-pk' : 'col-text';
      const prefix = col.pk ? '[PK] ' : (col.unique ? '[UQ] ' : '     ');
      svg += `  <text x="${pos.x + 12}" y="${cy}" class="${textClass}">${prefix}${col.name}</text>
`;
      svg += `  <text x="${pos.x + pos.w - 12}" y="${cy}" class="col-type" text-anchor="end">${col.type}</text>
`;
    });
  });
  svg += `</svg>`;
  return svg;
}

const outputPath = path.join(__dirname, '..', 'database', 'er_diagram.svg');
fs.writeFileSync(outputPath, generateSVG(), 'utf8');
console.log("ER Diagram SVG generated.");
