(function e(t,a,i){function s(n,l){if(!a[n]){if(!t[n]){var o=typeof require=="function"&&require;if(!l&&o)return o(n,!0);if(r)return r(n,!0);var h=new Error("Cannot find module '"+n+"'");throw h.code="MODULE_NOT_FOUND",h}var d=a[n]={exports:{}};t[n][0].call(d.exports,function(e){var a=t[n][1][e];return s(a?a:e)},d,d.exports,e,t,a,i)}return a[n].exports}var r=typeof require=="function"&&require;for(var n=0;n<i.length;n++)s(i[n]);return s})({"./src/Intermediate_Globe.ts":[function(e,t,a){var i=e("awayjs-core/lib/data/BitmapData");var s=e("awayjs-core/lib/data/BitmapDataChannel");var r=e("awayjs-core/lib/data/BlendMode");var n=e("awayjs-core/lib/events/LoaderEvent");var l=e("awayjs-core/lib/geom/ColorTransform");var o=e("awayjs-core/lib/geom/Vector3D");var h=e("awayjs-core/lib/geom/Point");var d=e("awayjs-core/lib/library/AssetLibrary");var c=e("awayjs-core/lib/library/AssetLoaderContext");var u=e("awayjs-core/lib/net/URLRequest");var p=e("awayjs-core/lib/textures/BitmapTexture");var f=e("awayjs-core/lib/utils/RequestAnimationFrame");var w=e("awayjs-display/lib/containers/DisplayObjectContainer");var m=e("awayjs-display/lib/containers/Scene");var b=e("awayjs-display/lib/containers/View");var y=e("awayjs-display/lib/controllers/HoverController");var g=e("awayjs-display/lib/base/OrientationMode");var j=e("awayjs-display/lib/base/AlignmentMode");var v=e("awayjs-display/lib/entities/Camera");var M=e("awayjs-display/lib/entities/Billboard");var C=e("awayjs-display/lib/entities/PointLight");var D=e("awayjs-display/lib/entities/Skybox");var x=e("awayjs-display/lib/materials/lightpickers/StaticLightPicker");var k=e("awayjs-display/lib/prefabs/PrimitiveSpherePrefab");var P=e("awayjs-display/lib/utils/Cast");var _=e("awayjs-renderergl/lib/DefaultRenderer");var A=e("awayjs-methodmaterials/lib/MethodMaterial");var L=e("awayjs-methodmaterials/lib/pool/MethodRendererPool");var S=e("awayjs-methodmaterials/lib/methods/DiffuseCompositeMethod");var R=e("awayjs-methodmaterials/lib/methods/SpecularCompositeMethod");var E=e("awayjs-methodmaterials/lib/methods/SpecularFresnelMethod");var O=e("awayjs-methodmaterials/lib/methods/SpecularPhongMethod");var T=function(){function e(){this.flares=new Array(12);this._time=0;this.move=false;this.mouseLockX=0;this.mouseLockY=0;this.init()}e.prototype.init=function(){this.initEngine();this.initLights();this.initMaterials();this.initObjects();this.initListeners()};e.prototype.initEngine=function(){this.scene=new m;this.camera=new v;this.camera.projection.far=1e5;this.view=new b(new _(L));this.view.scene=this.scene;this.view.camera=this.camera;this.cameraController=new y(this.camera,null,0,0,600,-90,90);this.cameraController.autoUpdate=false;this.cameraController.yFactor=1};e.prototype.initLights=function(){this.light=new C;this.light.x=1e4;this.light.ambient=1;this.light.diffuse=2;this.lightPicker=new x([this.light])};e.prototype.initMaterials=function(){var e=new E(true,new O);e.fresnelPower=1;e.normalReflectance=.1;this.sunMaterial=new A;this.sunMaterial.blendMode=r.ADD;this.groundMaterial=new A;this.groundMaterial.specularMethod=e;this.groundMaterial.lightPicker=this.lightPicker;this.groundMaterial.gloss=5;this.groundMaterial.specular=1;this.groundMaterial.ambient=1;this.groundMaterial.diffuseMethod.multiply=false;this.cloudMaterial=new A;this.cloudMaterial.alphaBlending=true;this.cloudMaterial.lightPicker=this.lightPicker;this.cloudMaterial.ambientColor=1777736;this.cloudMaterial.specular=0;this.cloudMaterial.ambient=1;this.atmosphereDiffuseMethod=new S(this.modulateDiffuseMethod);this.atmosphereSpecularMethod=new R(this.modulateSpecularMethod,new O);this.atmosphereMaterial=new A;this.atmosphereMaterial.diffuseMethod=this.atmosphereDiffuseMethod;this.atmosphereMaterial.specularMethod=this.atmosphereSpecularMethod;this.atmosphereMaterial.blendMode=r.ADD;this.atmosphereMaterial.lightPicker=this.lightPicker;this.atmosphereMaterial.specular=.5;this.atmosphereMaterial.gloss=5;this.atmosphereMaterial.ambientColor=0;this.atmosphereMaterial.diffuseColor=1470924;this.atmosphereMaterial.ambient=1};e.prototype.modulateDiffuseMethod=function(e,t,a,i,s){var r=s.viewDirFragment;var n=s.normalFragment;var l="dp3 "+a+".w, "+r+".xyz, "+n+".xyz\n"+"mul "+a+".w, "+a+".w, "+a+".w\n";return l};e.prototype.modulateSpecularMethod=function(e,t,a,i,s){var r=s.viewDirFragment;var n=s.normalFragment;var l=i.getFreeFragmentSingleTemp();i.addFragmentTempUsages(l,1);var o="dp3 "+l+", "+r+".xyz, "+n+".xyz\n"+"neg "+l+", "+l+"\n"+"mul "+a+".w, "+a+".w, "+l+"\n";i.removeFragmentTempUsage(l);return o};e.prototype.initObjects=function(){this.orbitContainer=new w;this.orbitContainer.addChild(this.light);this.scene.addChild(this.orbitContainer);this.sun=new M(this.sunMaterial);this.sun.width=3e3;this.sun.height=3e3;this.sun.pivot=new o(1500,1500,0);this.sun.orientationMode=g.CAMERA_PLANE;this.sun.alignmentMode=j.PIVOT_POINT;this.sun.x=1e4;this.orbitContainer.addChild(this.sun);this.earth=new k(200,200,100).getNewObject();this.earth.material=this.groundMaterial;this.clouds=new k(202,200,100).getNewObject();this.clouds.material=this.cloudMaterial;this.atmosphere=new k(210,200,100).getNewObject();this.atmosphere.material=this.atmosphereMaterial;this.atmosphere.scaleX=-1;this.tiltContainer=new w;this.tiltContainer.rotationX=-23;this.tiltContainer.addChild(this.earth);this.tiltContainer.addChild(this.clouds);this.tiltContainer.addChild(this.atmosphere);this.scene.addChild(this.tiltContainer);this.cameraController.lookAtObject=this.tiltContainer};e.prototype.initListeners=function(){var e=this;window.onresize=function(t){return e.onResize(t)};document.onmousedown=function(t){return e.onMouseDown(t)};document.onmouseup=function(t){return e.onMouseUp(t)};document.onmousemove=function(t){return e.onMouseMove(t)};document.onmousewheel=function(t){return e.onMouseWheel(t)};this.onResize();this._timer=new f(this.onEnterFrame,this);this._timer.start();d.addEventListener(n.RESOURCE_COMPLETE,function(t){return e.onResourceComplete(t)});var t=new c;t.dependencyBaseUrl="assets/skybox/";d.load(new u("assets/skybox/space_texture.cube"),t);d.load(new u("assets/globe/cloud_combined_2048.jpg"));d.load(new u("assets/globe/earth_specular_2048.jpg"));d.load(new u("assets/globe/EarthNormal.png"));d.load(new u("assets/globe/land_lights_16384.jpg"));d.load(new u("assets/globe/land_ocean_ice_2048_match.jpg"));d.load(new u("assets/lensflare/flare2.jpg"));d.load(new u("assets/lensflare/flare3.jpg"));d.load(new u("assets/lensflare/flare4.jpg"));d.load(new u("assets/lensflare/flare6.jpg"));d.load(new u("assets/lensflare/flare7.jpg"));d.load(new u("assets/lensflare/flare8.jpg"));d.load(new u("assets/lensflare/flare10.jpg"));d.load(new u("assets/lensflare/flare11.jpg"));d.load(new u("assets/lensflare/flare12.jpg"))};e.prototype.onEnterFrame=function(e){this._time+=e;this.earth.rotationY+=.2;this.clouds.rotationY+=.21;this.orbitContainer.rotationY+=.02;this.cameraController.update();this.updateFlares();this.view.render()};e.prototype.updateFlares=function(){var e=this.flareVisible;var t=this.view.project(this.sun.scenePosition);var a=t.x-window.innerWidth/2;var i=t.y-window.innerHeight/2;var s=this.view.project(this.earth.scenePosition);var r=190*window.innerHeight/s.z;var n;this.flareVisible=t.x>0&&t.x<window.innerWidth&&t.y>0&&t.y<window.innerHeight&&t.z>0&&Math.sqrt(a*a+i*i)>r;if(this.flareVisible!=e){for(var l=0;l<this.flares.length;l++){n=this.flares[l];if(n)n.billboard.visible=this.flareVisible}}if(this.flareVisible){var o=new h(a,i);for(var l=0;l<this.flares.length;l++){n=this.flares[l];if(n)n.billboard.transform.position=this.view.unproject(t.x-o.x*n.position,t.y-o.y*n.position,100-l)}}};e.prototype.onResourceComplete=function(e){switch(e.url){case"assets/skybox/space_texture.cube":this.cubeTexture=e.assets[0];this.skyBox=new D(this.cubeTexture);this.scene.addChild(this.skyBox);break;case"assets/globe/cloud_combined_2048.jpg":var t=new i(2048,1024,true,4294967295);t.copyChannel(P.bitmapData(e.assets[0]),t.rect,new h,s.RED,s.ALPHA);this.cloudMaterial.texture=new p(t);break;case"assets/globe/earth_specular_2048.jpg":var a=P.bitmapData(e.assets[0]);a.colorTransform(a.rect,new l(1,1,1,1,64,64,64));this.groundMaterial.specularMap=new p(a);break;case"assets/globe/EarthNormal.png":this.groundMaterial.normalMap=e.assets[0];break;case"assets/globe/land_lights_16384.jpg":this.groundMaterial.texture=e.assets[0];break;case"assets/globe/land_ocean_ice_2048_match.jpg":this.groundMaterial.diffuseTexture=e.assets[0];break;case"assets/lensflare/flare2.jpg":this.flares[6]=new F(P.bitmapData(e.assets[0]),1.25,1.1,48.45,this.scene);break;case"assets/lensflare/flare3.jpg":this.flares[7]=new F(P.bitmapData(e.assets[0]),1.75,1.37,7.65,this.scene);break;case"assets/lensflare/flare4.jpg":this.flares[8]=new F(P.bitmapData(e.assets[0]),2.75,1.85,12.75,this.scene);break;case"assets/lensflare/flare6.jpg":this.flares[5]=new F(P.bitmapData(e.assets[0]),1,.68,20.4,this.scene);this.flares[10]=new F(P.bitmapData(e.assets[0]),4,2.5,10.4,this.scene);break;case"assets/lensflare/flare7.jpg":this.flares[2]=new F(P.bitmapData(e.assets[0]),2,0,25.5,this.scene);this.flares[3]=new F(P.bitmapData(e.assets[0]),4,0,17.85,this.scene);this.flares[11]=new F(P.bitmapData(e.assets[0]),10,2.66,50,this.scene);break;case"assets/lensflare/flare8.jpg":this.flares[9]=new F(P.bitmapData(e.assets[0]),.5,2.21,33.15,this.scene);break;case"assets/lensflare/flare10.jpg":this.sunMaterial.texture=e.assets[0];this.flares[0]=new F(P.bitmapData(e.assets[0]),3.2,-.01,100,this.scene);break;case"assets/lensflare/flare11.jpg":this.flares[1]=new F(P.bitmapData(e.assets[0]),6,0,30.6,this.scene);break;case"assets/lensflare/flare12.jpg":this.flares[4]=new F(P.bitmapData(e.assets[0]),.4,.32,22.95,this.scene);break}};e.prototype.onMouseDown=function(e){this.lastPanAngle=this.cameraController.panAngle;this.lastTiltAngle=this.cameraController.tiltAngle;this.lastMouseX=e.clientX;this.lastMouseY=e.clientY;this.move=true};e.prototype.onMouseUp=function(e){this.move=false};e.prototype.onMouseMove=function(e){if(this.move){this.cameraController.panAngle=.3*(e.clientX-this.lastMouseX)+this.lastPanAngle;this.cameraController.tiltAngle=.3*(e.clientY-this.lastMouseY)+this.lastTiltAngle}};e.prototype.onMouseWheel=function(e){this.cameraController.distance-=e.wheelDelta;if(this.cameraController.distance<400)this.cameraController.distance=400;else if(this.cameraController.distance>1e4)this.cameraController.distance=1e4};e.prototype.onResize=function(e){if(e===void 0){e=null}this.view.y=0;this.view.x=0;this.view.width=window.innerWidth;this.view.height=window.innerHeight};return e}();var F=function(){function e(e,t,a,r,n){this.flareSize=14.4;var l=new i(e.width,e.height,true,4294967295);l.copyChannel(e,e.rect,new h,s.RED,s.ALPHA);var d=new A(new p(l));d.alpha=r/100;d.alphaBlending=true;this.billboard=new M(d);this.billboard.width=t*this.flareSize;this.billboard.height=t*this.flareSize;this.billboard.pivot=new o(t*this.flareSize/2,t*this.flareSize/2,0);this.billboard.orientationMode=g.CAMERA_PLANE;this.billboard.alignmentMode=j.PIVOT_POINT;this.billboard.visible=false;this.size=t;this.position=a;this.opacity=r;n.addChild(this.billboard)}return e}();window.onload=function(){new T}},{"awayjs-core/lib/data/BitmapData":undefined,"awayjs-core/lib/data/BitmapDataChannel":undefined,"awayjs-core/lib/data/BlendMode":undefined,"awayjs-core/lib/events/LoaderEvent":undefined,"awayjs-core/lib/geom/ColorTransform":undefined,"awayjs-core/lib/geom/Point":undefined,"awayjs-core/lib/geom/Vector3D":undefined,"awayjs-core/lib/library/AssetLibrary":undefined,"awayjs-core/lib/library/AssetLoaderContext":undefined,"awayjs-core/lib/net/URLRequest":undefined,"awayjs-core/lib/textures/BitmapTexture":undefined,"awayjs-core/lib/utils/RequestAnimationFrame":undefined,"awayjs-display/lib/base/AlignmentMode":undefined,"awayjs-display/lib/base/OrientationMode":undefined,"awayjs-display/lib/containers/DisplayObjectContainer":undefined,"awayjs-display/lib/containers/Scene":undefined,"awayjs-display/lib/containers/View":undefined,"awayjs-display/lib/controllers/HoverController":undefined,"awayjs-display/lib/entities/Billboard":undefined,"awayjs-display/lib/entities/Camera":undefined,"awayjs-display/lib/entities/PointLight":undefined,"awayjs-display/lib/entities/Skybox":undefined,"awayjs-display/lib/materials/lightpickers/StaticLightPicker":undefined,"awayjs-display/lib/prefabs/PrimitiveSpherePrefab":undefined,"awayjs-display/lib/utils/Cast":undefined,"awayjs-methodmaterials/lib/MethodMaterial":undefined,"awayjs-methodmaterials/lib/methods/DiffuseCompositeMethod":undefined,"awayjs-methodmaterials/lib/methods/SpecularCompositeMethod":undefined,"awayjs-methodmaterials/lib/methods/SpecularFresnelMethod":undefined,"awayjs-methodmaterials/lib/methods/SpecularPhongMethod":undefined,"awayjs-methodmaterials/lib/pool/MethodRendererPool":undefined,"awayjs-renderergl/lib/DefaultRenderer":undefined}]},{},["./src/Intermediate_Globe.ts"]);

//# sourceMappingURL=Intermediate_Globe.js.map