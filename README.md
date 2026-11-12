# ba-ui

웹 화면을 블루 아카이브 게임 UI처럼 만드는 Claude Code 스킬입니다. 디자인 규칙(SKILL.md)과 CSS 템플릿, 견본, 글꼴, 페이지 바탕 무늬가 들어 있습니다.
싯딤OS(블루 아카이브 총력전 택틱 도구)를 만들면서 정리한 규칙을 떼어 낸 것입니다.

## 설치

Claude Code 스킬 폴더에 이 저장소를 `ba-ui` 이름으로 받습니다.

- 모든 프로젝트에서: `git clone https://github.com/HuijuKim/ba-ui-skill ~/.claude/skills/ba-ui`
- 한 프로젝트에서만: `git clone https://github.com/HuijuKim/ba-ui-skill <프로젝트>/.claude/skills/ba-ui`

"블루아카 느낌으로", "게임 UI처럼" 같은 요청을 하면 Claude가 스킬을 불러 씁니다. `/ba-ui`로 직접 부를 수도 있습니다.

## 들어 있는 것

- SKILL.md: 원칙, 색과 모양 토큰, 부품 목록, 사선을 쓰는 곳, 글꼴과 바탕, 프레임워크에 얹을 때 주의할 점, 하지 말 것
- ba-ui.css: 토큰(CSS 변수, 밝은 화면과 어두운 화면)과 부품 클래스(`.ba-btn`, `.ba-tabs`, `.ba-popup`, `.ba-excard`, `.ba-page-bg` 등)
- demo.html: 부품을 모아 놓은 견본. 브라우저로 열면 됩니다. `<html data-theme="dark">`로 바꾸면 어두운 화면
- fonts/: 경기천년제목 Medium, Bold 웹폰트
- bg/triangles.svg: 페이지 바탕 삼각형 격자. `node tools/triangle-bg.mjs`로 다시 만듭니다

## 그림과 글꼴

- 게임 그림은 들어 있지 않습니다. 모양은 모두 CSS와 직접 그린 SVG입니다.
- demo.html은 학생 초상화와 성급 별 그림을 SchaleDB의 공개 주소에서 불러옵니다(견본에서만). Blue Archive 관련 모든 권리는 NEXON Games, NEXON Korea, Yostar에 있습니다.
- 경기천년제목은 경기도가 무료로 배포하는 서체입니다(경기도청 누리집의 경기도 서체 안내, 웹폰트 묶음에 든 woff를 그대로 넣었습니다).
  누구나 무료로 쓰고 프로그램에 실어 배포할 수 있으며, 서체 파일 자체를 팔거나 유료로 넘기는 것은 허용되지 않습니다.
