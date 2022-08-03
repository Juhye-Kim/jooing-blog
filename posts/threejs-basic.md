---
title: three.js 기초 of 기초
publish_date: 2022-08-02
background: white
---

js 기본 코드에 사용된 기초 of 기초 지식! 이것만 보고 넘어가자.

## Scene 구성 요소
- Scene = 장면
- Mesh = 장면에 보이는 오브젝트
  - Geometry(모양) + Material(재질)로 구성됨
- Camera = 카메라
  - Near, Far
  - Field of View(시야각)
- Light = 빛, 조명
  - 재질에 따라, 필요할 때 사용하면 됨
- Renderer = 카메라가 보여주는 장면

### 축
- x = 좌 / 우
- y = 위(+) / 아래(-)
- z = 앞(+) / 뒤(-)

### FOV (Field Of View, 시야각)
- near, far를 숫자범위로 설정하면 그 범위 내에 있는 요소들만 보이게 된다.
- mesh가 보이려면? near~far 범위에 존재 + fov(시야각) 안에 들어와야 함

### Camera
- Perspective Camera: 원근감 반영
- Orthographic Camera: 원근감 미반영
  - 거리 상관없이 크기 유지 (ex. 롤)




