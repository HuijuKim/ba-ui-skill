// 페이지 바탕의 삼각형 무늬(bg/triangles.svg)를 만든다. 사용: node tools/triangle-bg.mjs
// 게임 메뉴 화면의 하늘색 바탕을 다시 그린 것이다(그림은 쓰지 않는다). 게임 바탕에서 잰 규칙:
// - 삼각형은 정삼각형이 아니라 납작하다. 빗변이 45도(꼭지각 90도)라 밑변이 높이의 두 배다.
// - 가로 줄 간격(삼각형 높이)이 화면 높이의 약 17%. 크기가 조금 다른 격자 둘이 어긋나게 겹쳐 면이 잘게 나뉜다.
// - 칸마다 흰 면과 조금 진한 하늘 면이 섞여 결이 보이지만 대비는 아주 낮다. 틈과 테두리는 없다.
// 바탕 그라데이션(위 하늘에서 아래 회보라)은 ba-ui.css(.ba-page-bg)가 그리고 이 그림은 그 위에 얹는 반투명 면만 있다. 같은 씨앗이면 같은 그림이 나온다.
import { mkdirSync, writeFileSync } from 'node:fs';

const W = 1600;
const H = 1000;

let seed = 20261112;
function rand() {
  // mulberry32
  seed = (seed + 0x6d2b79f5) | 0;
  let t = seed;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

const f = (n) => Math.round(n * 10) / 10;
const out = [];

/** 높이 row, 밑변 2*row(빗변 45도)인 삼각형 격자. pick이 [색, 투명도]를 주면 그 칸을 칠하고 null이면 비운다 */
function lattice(row, ox, oy, pick) {
  const half = row; // 밑변의 반 = 높이(45도)
  for (let r = -1; r * row + oy < H; r++) {
    for (let c = -2; c * half + ox < W + 2 * half; c++) {
      const p = pick(r * row + oy + row / 2);
      if (!p) continue;
      const up = (r + c) % 2 === 0;
      const x = c * half + ox;
      const y = r * row + oy;
      const d = up
        ? `M${f(x)} ${f(y + row)}L${f(x + half)} ${f(y)}L${f(x + 2 * half)} ${f(y + row)}Z`
        : `M${f(x)} ${f(y)}L${f(x + 2 * half)} ${f(y)}L${f(x + half)} ${f(y + row)}Z`;
      out.push(`<path d="${d}" fill="${p[0]}" fill-opacity="${p[1].toFixed(3)}"/>`);
    }
  }
}

const SKY = '#4fbfe8';
// 1. 주 격자(높이 172 = 화면 높이의 17%): 흰 면과 하늘 면을 섞는다. 아래로 갈수록 옅다(바탕도 아래가 회백)
lattice(172, -40, 52, (y) => {
  const fade = 1 - (y / H) * 0.5;
  const k = rand();
  if (k < 0.4) return ['#ffffff', (0.05 + rand() * 0.14) * fade];
  if (k < 0.7) return [SKY, (0.025 + rand() * 0.06) * fade];
  return null;
});

// 2. 조금 작은 격자(높이 152)를 어긋나게 겹쳐 면을 잘게 나눈다
lattice(152, 70, 0, (y) => {
  if (rand() > 0.45) return null;
  const fade = 1 - (y / H) * 0.55;
  return rand() < 0.6 ? ['#ffffff', (0.04 + rand() * 0.1) * fade] : [SKY, (0.02 + rand() * 0.04) * fade];
});

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMin slice">${out.join('')}</svg>\n`;
const dir = new URL('../bg/', import.meta.url);
mkdirSync(dir, { recursive: true });
writeFileSync(new URL('triangles.svg', dir), svg);
console.log(`triangles.svg: 삼각형 ${out.length}개, ${svg.length} bytes`);
