// Generuje zrodla/geo.json: kontury 240 krajów (Natural Earth 1:50m z pakietu world-atlas),
// uproszczone do ~25% punktów i od razu rzutowane (Natural Earth I) na płótno 2000×1000,
// z dwuliterowym kodem ISO kraju (do plików odznak).
// Uruchom:  npm install  &&  node gen.mjs
import fs from 'fs';
import * as topo from 'topojson-client';
import * as simp from 'topojson-simplify';
import { geoNaturalEarth1, geoPath } from 'd3-geo';
import iso from 'i18n-iso-countries';

const QUANTILE = 0.25; // ile punktów zostawić (0.15 = mniej szczegółów, 0.5 = więcej)
const world = JSON.parse(fs.readFileSync('node_modules/world-atlas/countries-50m.json'));
const pre = simp.presimplify(world);
const s = simp.simplify(pre, simp.quantile(pre, QUANTILE));
const fc = topo.feature(s, s.objects.countries);
fc.features = fc.features.filter(f => f.properties.name !== 'Antarctica');

const W = 2000, H = 1000;
const proj = geoNaturalEarth1().fitExtent([[20, 20], [W - 20, H - 20]], fc);
const path = geoPath(proj).digits(1);
// third field: ISO 3166-1 alpha-2 code (lowercase) used for badge files odznaki/{code}-{tier}.png
const a2 = f => (f.properties.name === 'Kosovo' ? 'xk' : (f.id && iso.numericToAlpha2(f.id) || '').toLowerCase());
const c = fc.features.map(f => [f.properties.name, path(f), a2(f)].filter((v, i) => i < 2 || v)).filter(x => x[1]);
const b = path.bounds(fc);
const geo = { k: +proj.scale().toFixed(6), t: proj.translate().map(v => +v.toFixed(4)), b: b.map(p => p.map(v => +v.toFixed(2))), c };
fs.writeFileSync('geo.json', JSON.stringify(geo));
console.log('geo.json:', (fs.statSync('geo.json').size / 1024).toFixed(0), 'KB,', c.length, 'krajów');
