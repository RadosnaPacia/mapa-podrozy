// Składa aplikację z src.html + geo.json w dwie wersje:
//   ../index.html     – wersja lokalna (czyta ../dane/dane.js i zdjęcia z ../zdjecia/) i zarazem wersja w internecie
//                       (GitHub Pages: bez dane/, z konfiguracja.js → dane i zdjęcia z OneDrive)
//   dist/claude.html  – wersja publikowana jako artefakt w Claude (baza + zdjęcia w Claude)
// Uruchom:  node build.mjs   (nie wymaga instalowania pakietów)
import fs from 'fs';
const geo = fs.readFileSync('geo.json', 'utf8');
const src = fs.readFileSync('src.html', 'utf8');
if (!src.includes('/*GEO*/null')) throw new Error('Brak znacznika /*GEO*/null w src.html');
const app = src.replace('/*GEO*/null', geo);
fs.mkdirSync('dist', { recursive: true });
fs.writeFileSync('dist/claude.html', app);
const marker = '<script>\n(() => {';
if (!app.includes(marker)) throw new Error('Nie znalazłem głównego skryptu');
fs.writeFileSync('../index.html', app.replace(marker, '<script src="konfiguracja.js"></script>\n<script src="dane/dane.js"></script>\n' + marker));
console.log('Gotowe: ../index.html (lokalna) i dist/claude.html (Claude)');
