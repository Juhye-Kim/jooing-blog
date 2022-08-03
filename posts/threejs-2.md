---
title: three.js로 태양계 만들기 - 2편
publish_date: 2022-08-03
background: white
---

# 미리 알아둘 것
> 필요한 사전지식

### OrbitControls
회전, zoom 기능이 포함된 가장 흔하게 쓰는 컨트롤 ([참고 링크](https://threejs.org/docs/index.html?q=control#examples/en/controls/OrbitControls))

controls에는 camera, renderer.domElement을 넣어줘야 하고, camera 컨트롤과 관련된 다양한 설정이 가능하다.
```
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Controls
const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;  // 부드럽게 컨트롤 (controls.update() 필수)
controls.enableZoom = false;  // zoom 가능 여부
controls.maxDistance = 10;  // zoom 거리 한정
controls.minDistance = 3;  
controls.minPolarAngle = Math.PI / 4; // 45도  // 수직방향 회전각도 한정
controls.minPolarAngle = THREE.MathUtils.degToRad(45);
controls.maxPolarAngle = THREE.MathUtils.degToRad(135);
controls.target.set(2, 2, 2);  // 회전 중심 target 설정
controls.autoRotate = true;  // 자동 회전
controls.autoRotateSpeed = 50;  // 자동 회전 속도 조절
```

### Environment
environment map은 scene을 둘러싼 이미지와 같다. Object에 반사 또는 굴절을 추가할 수도 있으며, 조명 정보로도 사용할 수 있다.

environment map을 추가하려면 envMap 속성을 사용해야 한다. 사용해서 적용해주면, Geometry 표면에 environment가 적용된 것을 볼 수 있다.

Cube environment maps는 큐브의 6면에 해당하는 6개의 이미지이다. cubeTexture를 로드하려면, 일반 TextureLoader 대신 CubeTextureLoader를 사용해야 한다. ([참고링크](https://threejs.org/docs/#api/en/scenes/Scene.environment))

<br>
<br>

# Control 추가하기
이제 본격적으로 Control을 추가해보려 한다. OrbitControls에 camera, renderer.domElement를 전달해 만들어주고, update를 호출해주면 줌이나 회전 등의 컨트롤이 가능해진다.
```
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();
```

추가로, 직접 컨트롤하지 않아도 자동으로 화면이 회전되도록 만들어보자.

autoRotate를 true로 설정해 자동 회전이 되도록 하고, autoRotateSpeed 값을 조정해 회전 속도를 조정한다. 그리고 animation loop 내에서 update가 계속해서 호출되게 해준다. ([참고 링크](https://threejs.org/docs/#examples/en/controls/OrbitControls.autoRotate))
```
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Controls 
const controls = new OrbitControls( camera, renderer.domElement );
controls.autoRotate = true;  // 자동 회전
controls.autoRotateSpeed = 5;  // 자동 회전 속도 조절

function animate() {
	requestAnimationFrame( animate );
    controls.update();
	renderer.render( scene, camera );
}

animate();
```

<br><br>

# Background 추가하기
이번에는 우주 배경을 추가해보자. texture는 [여기](https://www.solarsystemscope.com/textures/)에서 다운받을 수 있다. 태양계와 관련된 모든 텍스쳐가 모여있어 아주 유용한 사이트이다. 👍🏻
<br>

<img width="800" alt="스크린샷 2022-08-03 오후 6 25 06" src="https://user-images.githubusercontent.com/63178953/182573956-e233d374-be64-4ff8-9fdb-db43c6517cd0.png">

다운 받은 파일은 <code>src/images/textures</code> 파일에 추가하고 아래처럼 코드를 마저 작성한다.

```
// Scene
const scene = new THREE.Scene();
const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager)
const envMap = textureLoader.load('/images/textures/stars.jpeg');
scene.background = envMap;
```

이제 배경도 우주로 변했고, 마우스로 조작도 가능하다. 다음에는 태양계의 중심인 태양부터 추가해보려고 한다.
