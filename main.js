var canvas = document.getElementById("renderCanvas");

var startRenderLoop = function (engine, canvas) {
  engine.runRenderLoop(function () {
    if (sceneToRender && sceneToRender.activeCamera) {
      sceneToRender.render();
    }
  });
};

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function () {
  return new BABYLON.Engine(canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true,
    disableWebGL2Support: false,
  });
};
const createScene = () => {
  const scene = new BABYLON.Scene(engine);
  // scene.debugLayer.show();

  const camera = new BABYLON.ArcRotateCamera(
    "camera",
    -Math.PI / 2,
    Math.PI / 2.5,
    3,
    BABYLON.Vector3(0.04, 0, 0)
  );
  camera.target = new BABYLON.Vector3(0.04, 0, 0);
  camera.attachControl(canvas, true);
  camera.wheelDeltaPercentage = 0.01;
  camera.position = new BABYLON.Vector3(0.43246934946106763, 0.8207297361144514, 5.930629857779956);
  scene.activeCamera.panningSensibility = 3000;
  camera.pinchPrecision = 100;
  camera.minZ = 0;

  camera.lowerRadiusLimit = 4;
  camera.upperRadiusLimit = 20;

  const meshAlpha = new BABYLON.Animation(
    "meshAlpha",
    "visibility",
    60,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
  );

  let keyFramesMA = [];

  const cameraStartP = new BABYLON.Animation(
    "cameraStart",
    "position",
    60,
    BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
  );

  let keyFramesP = [];

  const cameraPA = new BABYLON.Animation(
    "cameraStart",
    "position",
    60,
    BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
  );

  let keyFramesPA = [];

  const cameraStartT = new BABYLON.Animation(
    "cameraStart",
    "target",
    60,
    BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
  );

  let keyFramesT = [];

  scene.onBeforeRenderObservable.add(() => {
    keyFramesMA = [];

    keyFramesMA.push({
      frame: 0,
      value: 1,
    });
    keyFramesMA.push({
      frame: 60,
      value: 0,
    });
    meshAlpha.setKeys(keyFramesMA);
    camera.animations.push(meshAlpha);

    keyFramesT = [];

    keyFramesT.push({
      frame: 0,
      value: new BABYLON.Vector3(camera.target.x, camera.target.y, camera.target.z),
    });
    keyFramesT.push({
      frame: 60,
      value: new BABYLON.Vector3(0.04, 0, 0),
    });
    cameraStartT.setKeys(keyFramesT);
    camera.animations.push(cameraStartT);

    keyFramesP = [];

    keyFramesP.push({
      frame: 0,
      value: new BABYLON.Vector3(camera.position.x, camera.position.y, camera.position.z),
    });
    keyFramesP.push({
      frame: 180,
      value: new BABYLON.Vector3(0.43246934946106763, 0.8207297361144514, 5.930629857779956),
    });
    cameraStartP.setKeys(keyFramesP);
    camera.animations.push(cameraStartP);

    keyFramesPA = [];

    keyFramesPA.push({
      frame: 0,
      value: new BABYLON.Vector3(camera.position.x, camera.position.y, camera.position.z),
    });
    keyFramesPA.push({
      frame: 180,
      value: new BABYLON.Vector3(0.9538220533640867, 1.7978254809750671, 13.586775550485717),
    });
    cameraPA.setKeys(keyFramesPA);
    camera.animations.push(cameraPA);
  });

  // const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0));
  // light.intensity = 2.5;

  const hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("environment.env", scene);

  scene.environmentIntensity = 1;

  scene.environmentTexture = hdrTexture;
  // var yellowMat = new BABYLON.StandardMaterial("yMat", scene);
  // yellowMat.diffuseColor = new BABYLON.Color3.FromHexString("#373a3c");
  scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
  let opened = false;

  let advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

  // var rect1 = new BABYLON.GUI.Rectangle();

  // rect1.width = 0.2;
  // rect1.height = 0.2;
  // rect1.cornerRadius = 20;
  // rect1.color = "#cfcfcf";
  // rect1.thickness = 4;
  // rect1.background = "#4f4f4e";
  // rect1.alpha = 0;
  // advancedTexture.addControl(rect1);

  // rect1.linkOffsetY = -250;
  // rect1.linkOffsetX = 350;

  // rect1.addControl(label);

  // var label = new BABYLON.GUI.TextBlock();
  // label.text = "Part bla bla bla";
  // rect1.addControl(label);

  let image = document.getElementById("image");

  let target1 = new BABYLON.GUI.Rectangle();
  target1.width = "60px";
  target1.cornerRadius = 40;
  target1.height = "60px";
  // target.color = "#cfcfcf";
  target1.thickness = 0;
  target1.background = "#1a2b42";
  target1.alpha = 1;

  advancedTexture.addControl(target1);

  let target11 = new BABYLON.GUI.Rectangle();
  target11.width = "40px";
  target11.cornerRadius = 40;
  target11.height = "40px";
  // target.color = "#cfcfcf";
  target11.thickness = 0;
  target11.background = "#154073";
  target11.alpha = 1;

  target11._localDraw = (function () {
    let image = new Image();
    image.src = "Cheveron_process copy-frei.png";
    // image.addEventListener("load", () => {
    //   stackPanel._markAsDirty();
    // });
    return function (context) {
      context.drawImage(
        image,
        this._currentMeasure.left,
        this._currentMeasure.top,
        this._currentMeasure.width,
        this._currentMeasure.height
      );
    };
  })();

  target1.addControl(target11);

  let text1 = new BABYLON.GUI.TextBlock();
  text1.text = "";
  text1.color = "black";
  text1.fontSize = "30px";
  text1.fontWeight = 500;

  target1.addControl(text1);

  let desBox = document.getElementById("desBox");
  let desBoxText = document.getElementById("desTextBox");

  // target1.onPointerEnterObservable.add(() => {
  //     target1.width = "180px";
  //     text1.text = " Gear Set";
  // });
  // target1.onPointerOutObservable.add(() => {
  //     target1.width = "60px";
  //     text1.text = "";
  // });

  target1.onPointerClickObservable.add(() => {
    desBoxText.innerHTML =
      " <h2>Outer Race</h2><ul><li>Outer Race, tracks and sphere finished by forging, leading to minimum manufacturing effort and optimized endurance performance</li></ul>";
    // desBox.style.visibility = "visible";
    // console.log(desBox.style.left);
    image.src = "outerRace.JPG";

    // canvasZone.style.width = "100%";
    desBox.style.zIndex = 101;
  });
  let target2 = new BABYLON.GUI.Rectangle();
  target2.width = "60px";
  target2.cornerRadius = 40;
  target2.height = "60px";
  // target.color = "#cfcfcf";
  target2.thickness = 0;
  target2.background = "#1a2b42";
  target2.alpha = 1;

  advancedTexture.addControl(target2);

  let target22 = new BABYLON.GUI.Rectangle();
  target22.width = "40px";
  target22.cornerRadius = 40;
  target22.height = "40px";
  // target.color = "#cfcfcf";
  target22.thickness = 0;
  target22.background = "#154073";
  target22.alpha = 1;

  target22._localDraw = (function () {
    let image = new Image();
    image.src = "Cheveron_process copy-frei.png";
    // image.addEventListener("load", () => {
    //   stackPanel._markAsDirty();
    // });
    return function (context) {
      context.drawImage(
        image,
        this._currentMeasure.left,
        this._currentMeasure.top,
        this._currentMeasure.width,
        this._currentMeasure.height
      );
    };
  })();

  target2.addControl(target22);

  let text2 = new BABYLON.GUI.TextBlock();
  text2.text = "";
  text2.color = "black";
  text2.fontSize = "30px";
  text2.fontWeight = 500;

  target2.addControl(text2);

  target2.onPointerClickObservable.add(() => {
    desBoxText.innerHTML =
      " <h2>Inner Race</h2><ul><li>Inner race assembled with a grading for excellent backlash, aligned to 4.0 assembly technology</li></ul>";
    // desBox.style.visibility = "visible";
    // console.log(desBox.style.left);
    image.src = "innerRace.JPG";

    // canvasZone.style.width = "100%";
    desBox.style.zIndex = 101;
  });

  let target3 = new BABYLON.GUI.Rectangle();
  target3.width = "60px";
  target3.cornerRadius = 40;
  target3.height = "60px";
  // target.color = "#cfcfcf";
  target3.thickness = 0;
  target3.background = "#1a2b42";
  target3.alpha = 1;

  advancedTexture.addControl(target3);

  let target33 = new BABYLON.GUI.Rectangle();
  target33.width = "40px";
  target33.cornerRadius = 40;
  target33.height = "40px";
  // target.color = "#cfcfcf";
  target33.thickness = 0;
  target33.background = "#154073";
  target33.alpha = 1;

  target33._localDraw = (function () {
    let image = new Image();
    image.src = "Cheveron_process copy-frei.png";
    // image.addEventListener("load", () => {
    //   stackPanel._markAsDirty();
    // });
    return function (context) {
      context.drawImage(
        image,
        this._currentMeasure.left,
        this._currentMeasure.top,
        this._currentMeasure.width,
        this._currentMeasure.height
      );
    };
  })();

  target3.addControl(target33);

  let text3 = new BABYLON.GUI.TextBlock();
  text3.text = "";
  text3.color = "black";
  text3.fontSize = "30px";
  text3.fontWeight = 500;

  target3.addControl(text2);

  // target2.onPointerEnterObservable.add(() => {
  //     target2.width = "180px";
  //     text2.text = " Housing";
  // });
  // target2.onPointerOutObservable.add(() => {
  //     target2.width = "60px";
  //     text2.text = "";
  // });

  target3.onPointerClickObservable.add(() => {
    desBoxText.innerHTML =
      " <h2>Cage</h2><ul><li>Cage spheres soft finished, optimum process for Countertrack™ rear outboard joint</li></ul>";
    // desBox.style.visibility = "visible";
    // console.log(desBox.style.left);
    image.src = "cage.JPG";

    // canvasZone.style.width = "100%";
    desBox.style.zIndex = 101;
  });

  // rect1.linkOffsetY = -50;

  let animationGroup;
  let meshe;
  target1.alpha = 0;
  target2.alpha = 0;
  target3.alpha = 0;

  document.getElementById("cameraBtn").addEventListener("click", function () {
    if (opened) {
      desBox.style.zIndex = 0;
      //   target1.alpha = 0;
      //   target2.alpha = 0;
      // animationGroups[0].stop();
      if (animationGroupS.isStarted) {
        let masterFrame = animationGroupS.animatables[0].masterFrame;
        scene.beginDirectAnimation(camera, [cameraStartP], 1, 120, false);

        animationGroupS.stop();

        animationGroupS.start(false, 1, masterFrame, 1);
      } else {
        scene.beginDirectAnimation(camera, [cameraStartP], 1, 120, false);

        animationGroupS.stop();

        animationGroupS.start(false, 1, animationGroupS.to, 1);
      }

      // animationGroups[0].play();

      opened = false;
      // scene.beginDirectAnimation(camera, [cameraPA, cameraStartT], 1, 60, false);
    } else {
      // scene.beginDirectAnimation(camera, [cameraStartP, cameraStartT], 1, 60, false);
    }

    // camera.target = new BABYLON.Vector3(0, 0, 0);
    // console.log(camera._currentTarget);
  });

  document.getElementById("openBtn").addEventListener("click", function () {
    // animationGroupA.stop();
    for (let i = 0; i < animationGroup.length; i++) {
      if (animationGroup[i].name.indexOf("Rotation") != -1) {
        animationGroup[i].stop();
      }
    }
    for (let i = 0; i < meshe.length; i++) {
      if (meshe[i].name == "7410480471_CATPART__A_1") {
        if (meshe[i].visibility == 0) {
          scene.beginDirectAnimation(meshe[i], [meshAlpha], 60, 1, false);
        }
      }
    }

    if (opened) {
      // desBox.style.zIndex = 0;
      // //   target1.alpha = 0;
      // //   target2.alpha = 0;
      // // animationGroups[0].stop();
      // if (animationGroupS.isStarted) {
      //   let masterFrame = animationGroupS.animatables[0].masterFrame;
      //   scene.beginDirectAnimation(camera, [cameraStartP], 1, 120, false);
      //   animationGroupS.stop();
      //   animationGroupS.start(false, 1, masterFrame, 1);
      // } else {
      //   scene.beginDirectAnimation(camera, [cameraStartP], 1, 120, false);
      //   animationGroupS.stop();
      //   animationGroupS.start(false, 1, animationGroupS.to, 1);
      // }
      // // animationGroups[0].play();
      // opened = false;
    } else {
      //   target1.alpha = 1;
      //   target2.alpha = 1;
      // animationGroups[0].play();

      if (animationGroupS.isStarted) {
        let masterFrame = animationGroupS.animatables[0].masterFrame;
        scene.beginDirectAnimation(camera, [cameraPA], 1, 120, false);

        animationGroupS.stop();

        animationGroupS.start(false, 1, masterFrame, animationGroupS.to);
      } else {
        scene.beginDirectAnimation(camera, [cameraPA], 1, 120, false);

        animationGroupS.stop();

        animationGroupS.start(false, 1, 1, animationGroupS.to);
      }
      opened = true;
    }
    // if (
    //   pointerInfo.pickInfo.pickedMesh.id == "Object_210" ||
    //   pointerInfo.pickInfo.pickedMesh.id == "Object_207" ||
    //   pointerInfo.pickInfo.pickedMesh.id == "Object_204"
    // ) {
    //   horn.play();
    // }
  });

  // document.getElementById("playBtn").addEventListener("click", function () {
  //   if (!opened) {
  //     for (let i = 0; i < meshe.length; i++) {
  //       if (meshe[i].name == "7410480471_CATPART__A_1") {
  //         if (meshe[i].visibility != 0) {
  //           scene.beginDirectAnimation(meshe[i], [meshAlpha], 1, 60, false);
  //         } else {
  //           scene.beginDirectAnimation(meshe[i], [meshAlpha], 60, 1, false);
  //         }
  //       }
  //     }

  //     for (let i = 0; i < animationGroup.length; i++) {
  //       if (
  //         animationGroup[i].name.indexOf("Rotation") != -1 &&
  //         animationGroup[i].name.indexOf("RotationTycanGear5") == -1 &&
  //         animationGroup[i].name.indexOf("RotationTycanGear7") == -1 &&
  //         animationGroup[i].name.indexOf("RotationTycanGear8") == -1
  //       ) {
  //         if (animationGroup[i].isStarted) {
  //           animationGroup[i].stop();
  //         } else {
  //           animationGroup[i].start(true, 1, 1, animationGroup[i].to);
  //         }
  //       }
  //     }
  //   }
  // });

  let animationGroupS = new BABYLON.AnimationGroup("GroupS");
  // let animationGroupA = new BABYLON.AnimationGroup("GroupA");
  let sphereTarget1 = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene);
  sphereTarget1.visibility = 0;
  let sphereTarget2 = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene);
  sphereTarget2.visibility = 0;
  let sphereTarget3 = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene);
  sphereTarget3.visibility = 0;

  BABYLON.SceneLoader.ImportMesh(
    "",
    "",
    "RX8-2.glb",
    scene,
    (meshes, particleSystem, skeleton, animationGroups) => {
      meshes[0].scaling = new BABYLON.Vector3(27, 27, 27);
      // meshes[0].position = new BABYLON.Vector3(0, -0.1, 0);
      // meshes[0].rotation = new BABYLON.Vector3(0.2, 0.5, 0);

      animationGroup = animationGroups;
      // for (let i = 0; i < meshes.length; i++) {
      //   meshes[i].visibility = 0;
      // }

      meshe = meshes;
      for (let i = 0; i < meshes.length; i++) {
        // console.log(meshes[i].material);
        // if (meshes[i].material != null) {
        //   meshes[i].material._roughness = 0.1;
        // }

        if (meshes[i].name == "3101076263") {
          sphereTarget1.parent = meshes[i];
          sphereTarget1.position.y = 0.02;

          target1.linkWithMesh(sphereTarget1);
        }

        if (meshes[i].name == "3100992525") {
          sphereTarget2.parent = meshes[i];

          target2.linkWithMesh(sphereTarget2);
          // target2.linkOffsetY = -150;
        }

        if (meshes[i].name == "3100990767") {
          sphereTarget3.parent = meshes[i];

          target3.linkWithMesh(sphereTarget3);
          // target2.linkOffsetY = -150;
        }
      }

      // let { min, max } = meshes[0].getHierarchyBoundingVectors();

      // meshes[0].setBoundingInfo(new BABYLON.BoundingInfo(min, max));

      // meshes[0].showBoundingBox = true;
      for (let i = 0; i < animationGroups.length; i++) {
        if (animationGroups[i].name.indexOf("Rotation") != -1) {
          // animationGroups[i].start(true, 1, 1, animationGroups[i].to);
          // animationGroupA.addTargetedAnimation(
          //   animationGroups[i].targetedAnimations[0].animation,
          //   animationGroups[i].targetedAnimations[0].target
          // );
          // animationGroupA.normalize(0, 120);
          // animationGroupA.start(true, 1, 1, animationGroupA.to);
        } else {
          animationGroupS.addTargetedAnimation(
            animationGroups[i].targetedAnimations[0].animation,
            animationGroups[i].targetedAnimations[0].target
          );
        }
      }
      // animationGroupA.normalize(0, 120);
      animationGroupS.normalize(0, 250);

      // animationGroupA.stop();
      // animationGroupS.stop();
      animationGroups[0].stop();

      // line.linkWithMesh(meshes[1]);

      // animationGroup = animationGroups[0];

      // rect1.linkWithMesh(meshes[1]);

      // line.linkWithMesh(sphere);
      // rect1.linkWithMesh(sphere);

      // for (let i = 0; i < meshes.length; i++) {
      //   meshes[i].material = yellowMat;
      // }

      scene.onBeforeRenderObservable.add(() => {
        if (opened) {
          if (target1.alpha < 1) {
            target1.alpha += 0.05;
            target2.alpha += 0.05;
            target3.alpha += 0.05;
          }
        } else if (target1.alpha > 0) {
          target1.alpha -= 0.05;
          target2.alpha -= 0.05;
          target3.alpha -= 0.05;
          if (target1.alpha < 0.01) {
            target1.alpha = 0;
            target2.alpha = 0;
            target3.alpha = 0;
          }
        }
      });

      scene.onPointerObservable.add((pointerInfo) => {
        // switch (pointerInfo.type) {
        //   case BABYLON.PointerEventTypes.POINTERPICK:
        //     if (pointerInfo.pickInfo.hit) {
        //       console.log(pointerInfo.pickInfo.pickedMesh.id);
        //     }
        //     break;
        //   // case BABYLON.PointerEventTypes.POINTERDOWN:
        //   //     rotate = false;
        //   //     console.log("sad");
        //   //     break;
        //   // case BABYLON.PointerEventTypes.POINTERUP:
        //   //     rotate = true;
        //   //     console.log("posle");
        //   //     break;
        // }
        // for (let i = 0; i < meshes.length; i++) {
        //   if (meshes[i].name.indexOf("Mesh_1_primitive") != -1) {
        //     console.log(meshes[i].material.alpha);
        //     if (meshes[i].material.alpha > 0) {
        //       meshes[i].material.alpha = meshes[i].material.alpha - 0.01;
        //     }
        //   }
        // }
        // if (!animationGroups[1].isStarted && !opened && !animationGroupS.isStarted) {
        //   for (let i = 0; i < animationGroups.length; i++) {
        //     if (animationGroups[i].name.indexOf("Rotation") != -1) {
        //       animationGroups[i].start(true, 1, 1, animationGroups[i].to);
        //     }
        //   }
        // }
        // if (!animationGroupA.isStarted && !opened && !animationGroupS.isStarted) {
        //   // for (let i = 0; i < animationGroups.length; i++) {
        //   //   if (animationGroups[i].name.indexOf("Rotation") != -1) {
        //   console.log("kuj djavo");
        //   animationGroupA.start(true, 1, 1, animationGroupA.to);
        //   //   }
        //   // }
        // }
        // Only trigger on pointer move
        // if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERMOVE) {
        //   // Check if animation is not playing at all
        //   if (!animationGroupA.isPlaying && !opened && !animationGroupS.isStarted) {
        //     console.log("Starting looped rotation animation");
        //     // Set loop to true and speedRatio to control animation speed if needed
        //     animationGroupA.start(true, 1, 0, animationGroupA.to);
        //   }
        // }
        // if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERPICK) {
        // document.getElementById("playBtn").addEventListener("click", function () {
        //   console.log("ovde");
        //   if (opened) {
        //     console.log("11");
        //     console.log(opened);
        //     // animationGroups[0].stop();
        //     if (animationGroups[0].isStarted) {
        //       let masterFrame = animationGroups[0].animatables[0].masterFrame;
        //       animationGroups[0].stop();
        //       scene.beginDirectAnimation(camera, [cameraStartP, cameraStartT], 0, 60, false);
        //       animationGroups[0].start(false, 1, masterFrame, 1);
        //     } else {
        //       animationGroups[0].stop();
        //       scene.beginDirectAnimation(camera, [cameraStartP, cameraStartT], 0, 60, false);
        //       animationGroups[0].start(false, 1, animationGroups[0].to, 1);
        //     }
        //     // animationGroups[0].play();
        //     opened = false;
        //   } else {
        //     console.log("21");
        //     console.log(opened);
        //     // animationGroups[0].play();
        //     if (animationGroups[0].isStarted) {
        //       let masterFrame = animationGroups[0].animatables[0].masterFrame;
        //       animationGroups[0].stop();
        //       scene.beginDirectAnimation(camera, [cameraPA], 0, 60, false);
        //       animationGroups[0].start(false, 1, masterFrame, animationGroups[0].to);
        //     } else {
        //       animationGroups[0].stop();
        //       scene.beginDirectAnimation(camera, [cameraPA], 0, 60, false);
        //       animationGroups[0].start(false, 1, 1, animationGroups[0].to);
        //     }
        //     opened = true;
        //   }
        //   // if (
        //   //   pointerInfo.pickInfo.pickedMesh.id == "Object_210" ||
        //   //   pointerInfo.pickInfo.pickedMesh.id == "Object_207" ||
        //   //   pointerInfo.pickInfo.pickedMesh.id == "Object_204"
        //   // ) {
        //   //   horn.play();
        //   // }
        // });
        // }
      });
    }
  );
  let ssaoRatio = {
    ssaoRatio: 0.5,
    blurRatio: 1,
  }; // Ratio of the SSAO post-process, in a lower resolution

  let ssao = new BABYLON.SSAO2RenderingPipeline("ssao2", scene, ssaoRatio, [camera]);
  ssao.totalStrength = 1.6;
  ssao.base = 0;
  ssao.radius = 1;
  ssao.epsilon = 0.01;
  ssao.samples = 25;
  console.log(ssao);
  scene.prePassRenderer.samples = 25;

  let defaultRendering = new BABYLON.DefaultRenderingPipeline("defRend", true, scene);

  defaultRendering.fxaaEnabled = true;
  defaultRendering.samples = 8;

  console.log(defaultRendering);

  // // Attach camera to the SSAO render pipeline
  // scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline("ssao", camera);

  return scene;
};
window.initFunction = async function () {
  var asyncEngineCreation = async function () {
    try {
      return createDefaultEngine();
    } catch (e) {
      console.log(
        "the available createEngine function failed. Creating the default engine instead"
      );
      return createDefaultEngine();
    }
  };

  window.engine = await asyncEngineCreation();
  if (!engine) throw "engine should not be null.";
  startRenderLoop(engine, canvas);
  window.scene = createScene();
};
initFunction().then(() => {
  sceneToRender = scene;
});

// Resize
window.addEventListener("resize", function () {
  engine.resize();
});
