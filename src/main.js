import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { gsap } from "gsap";

// --- كود جافا سكريبت الخاص باللودر فقط ---
const canvas = document.getElementById('loader-canvas');
const ctx = canvas.getContext('2d');
let progress = 0;
let targetProgress = 0;

// ضبط أبعاد الكانفس
canvas.width = 180 * window.devicePixelRatio;
canvas.height = 180 * window.devicePixelRatio;
ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

function draw() {
  ctx.clearRect(0, 0, 180, 180);
  progress += (targetProgress - progress) * 0.05;

  // الدائرة الخلفية
  ctx.beginPath();
  ctx.arc(90, 90, 60, 0, Math.PI * 2);
  ctx.strokeStyle = '#222';
  ctx.lineWidth = 4;
  ctx.stroke();

  // دائرة التحميل (Neon)
  ctx.beginPath();
  ctx.arc(90, 90, 60, -Math.PI/2, (-Math.PI/2) + (Math.PI * 2 * progress));
  ctx.strokeStyle = '#00f2ff';
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.stroke();

  // النسبة المئوية
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.font = '16px sans-serif';
  ctx.fillText(Math.round(progress * 100) + '%', 90, 95);

  if (progress < 0.99) {
    requestAnimationFrame(draw);
  } else {
    // إظهار التعليمات عند انتهاء التحميل
    document.getElementById('instructions-ui').style.opacity = '1';
    document.getElementById('instructions-ui').style.pointerEvents = 'auto';
  }
}
draw();

// محاكاة تحميل (يمكنك ربط targetProgress بـ LoadingManager في ملفك الأساسي)
// لتجربة الكود الآن، سنقوم بزيادة النسبة تلقائياً:
let interval = setInterval(() => {
  targetProgress += 0.1;
  if(targetProgress >= 1) clearInterval(interval);
}, 200);

// كشف نوع الجهاز
if(/Mobi|Android/i.test(navigator.userAgent)) {
  document.getElementById('mobile-msg').classList.remove('hidden');
  document.getElementById('desktop-msg').classList.add('hidden');
}

// زر البداية لإخفاء اللودر
document.getElementById('start-btn').onclick = () => {
  document.getElementById('loader-container').style.opacity = '0';
  setTimeout(() => {
    document.getElementById('loader-container').style.display = 'none';
  }, 600);
};

// ===========================
// Scene / Camera / Renderer
// ===========================
export const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

export const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-3.055, 7.686, 2.889);
camera.rotation.set(-0.769, -0.774, -0.595);

export const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 1.0;
document.body.appendChild(renderer.domElement);

// ===========================
// Camera Shots
// ===========================
const cameraShots = [
  {
    pos: { x: -3.055, y: 7.686, z: 2.889 },
    rot: { x: -0.769, y: -0.774, z: -0.595 },
    duration: 2.2,
    delay: 0.0,
    ease: "sine.inOut"
  },
  {
    pos: { x: 0.235, y: 5.993, z: 1.686 },
    rot: { x: 3.102, y: -0.002, z: 3.142 },
    duration: 1.8,
    delay: 0.1,
    ease: "power2.inOut"
  },
  {
    pos: { x: 0.236, y: 2.753, z: 1.936 },
    rot: { x: -3.122, y: -0.002, z: -3.142 },
    duration: 1.6,
    delay: 0.0,
    ease: "power1.inOut"
  },
  {
    pos: { x: 0.199, y: 4.664, z: -0.495 },
    rot: { x: 1.616, y: -1.371, z: 1.617 },
    duration: 2.0,
    delay: 0.15,
    ease: "sine.inOut"
  },
  {
    pos: { x: 2.356, y: 6.474, z: 1.224 },
    rot: { x: 3.142, y: -1.562, z: 3.142 },
    duration: 1.7,
    delay: 0.0,
    ease: "power2.out"
  },
  {
    pos: { x: 2.653, y: 6.074, z: 1.627 },
    rot: { x: 3.142, y: -1.562, z: 3.142 },
    duration: 1.4,
    delay: 0.0,
    ease: "power1.out"
  },
  {
    pos: { x: 3.336, y: 7.424, z: -2.668 },
    rot: { x: 3.142, y: -1.562, z: 3.142 },
    duration: 2.4,
    delay: 0.2,
    ease: "expo.inOut"
  },
  {
    pos: { x: 2.109, y: 3.233, z: -2.679 },
    rot: { x: 1.589, y: -1.111, z: 1.592 },
    duration: 1.8,
    delay: 0.0,
    ease: "sine.inOut"
  },
  {
    pos: { x: 2.670, y: 3.947, z: 1.526 },
    rot: { x: -1.393, y: -1.510, z: -1.393 },
    duration: 1.6,
    delay: 0.1,
    ease: "power2.inOut"
  },
  {
    pos: { x: 2.599, y: 2.426, z: 1.689 },
    rot: { x: 2.002, y: -1.549, z: 2.002 },
    duration: 1.9,
    delay: 0.0,
    ease: "sine.inOut"
  },
  {
    pos: { x: -1.831, y: 6.074, z: 0.435 },
    rot: { x: 1.605, y: 1.311, z: -1.607 },
    duration: 2.1,
    delay: 0.15,
    ease: "power2.inOut"
  },
  {
    pos: { x: -2.205, y: 3.426, z: 0.239 },
    rot: { x: -1.594, y: 1.191, z: 1.596 },
    duration: 1.7,
    delay: 0.0,
    ease: "power1.inOut"
  },
  {
    pos: { x: -1.752, y: 4.334, z: 0.285 },
    rot: { x: 1.393, y: 1.510, z: -1.393 },
    duration: 1.8,
    delay: 0.1,
    ease: "sine.inOut"
  },
  {
    pos: { x: -1.606, y: 7.092, z: -2.671 },
    rot: { x: 0.020, y: 0.020, z: 0.000 },
    duration: 2.6,
    delay: 0.25,
    ease: "expo.inOut"
  },
  {
    pos: { x: -1.613, y: 5.600, z: -3.071 },
    rot: { x: -0.140, y: -0.020, z: -0.003 },
    duration: 1.9,
    delay: 0.0,
    ease: "sine.out"
  },
  {
    pos: { x: -1.616, y: 2.861, z: -2.925 },
    rot: { x: 0.020, y: -0.020, z: 0.000 },
    duration: 1.6,
    delay: 0.0,
    ease: "power1.out"
  },
  {
    pos: { x: 2.488, y: 6.427, z: -3.063 },
    rot: { x: 0.000, y: -0.020, z: 0.000 },
    duration: 2.8,
    delay: 0.3,
    ease: "expo.inOut"
  }
];

document.getElementById("next").onclick = () => {
  goToShot(currentShot + 1);
};

document.getElementById("prev").onclick = () => {
  goToShot(currentShot - 1);
};

// ===========================
// Lights
// ===========================
scene.add(new THREE.AmbientLight(0xffffff, 1));

const whiteLight = new THREE.DirectionalLight(0xffffff, 2.0);
whiteLight.position.set(5, 10, 5);
scene.add(whiteLight);

// ===========================
// Cinematic Colored Lights (Improved)
// ===========================
const redLight = new THREE.SpotLight(
  0xff0000,
  50,
  120,
  Math.PI / 2.5,
  0.5,
  1
);
redLight.position.set(5, 6, 2);
redLight.target.position.set(0, 2, 0);
scene.add(redLight);
scene.add(redLight.target);

const blueLight = new THREE.SpotLight(
  0x0000ff,
  50,
  120,
  Math.PI / 2.5,
  0.5,
  1
);
blueLight.position.set(-5, 6, 2);
blueLight.target.position.set(0, 2, 0);
scene.add(blueLight);
scene.add(blueLight.target);

// ===========================
// Links & Hover Colors
// ===========================
const links = {
  facebook: "https://web.facebook.com/waleedxcrazy/",
  whatsapp: "https://wa.me/249128517891",
  mail: 'mailto:waleed0961140719@gmail.com?subject=Contact%20from%20Portfolio',
  telegram: "https://t.me/Waleed_1_x_249",
};

const hoverColors = {
  facebook: 0x1877f2,
  whatsapp: 0x25d366,
  mail: 0xff0033,
  telegram: 0x0088cc,
};

const clickableNames = new Set([...Object.keys(links), ...Object.keys(hoverColors)]);

// ===========================
// LoadingManager (مرتبط باللودر الكانفس)
// ===========================
const manager = new THREE.LoadingManager();

manager.onProgress = (url, loaded, total) => {
  // يحدث targetProgress أثناء تحميل الأصول عن طريق THREE.LoadingManager
  targetProgress = loaded / total;
};

manager.onLoad = () => {
  targetProgress = 1;

  // إظهار التعليمات أو إخفاء اللودر التلقائي ممكن هنا
  document.getElementById('instructions-ui').style.opacity = '1';
  document.getElementById('instructions-ui').style.pointerEvents = 'auto';
};

// ===========================
// Loader / interactiveObjects / techMeshes
// ===========================
const loader = new GLTFLoader(manager);

const interactiveObjects = []; // للسوشيال + التفاعل
const techMeshes = [];         // للتقنيات (الدوران)

loader.load(
  "https://res.cloudinary.com/dax8e6mrx/image/upload/v1767543868/room_raxuhs.glb",
  (gltf) => {
    gltf.scene.traverse(o => {
      /* ===========================
         1) interactiveObjects (القديمة)
         =========================== */
      let cur = o;
      let isInteractive = false;

      while (cur) {
        if (cur.name && clickableNames.has(cur.name)) {
          isInteractive = true;
          break;
        }
        cur = cur.parent;
      }

      if (isInteractive) {
        interactiveObjects.push(o);
      }

      /* ===========================
         2) techMeshes (الجديدة)
         =========================== */
      if (
        o.name === "blender" ||
        o.name === "js" ||
        o.name === "laravel" ||
        o.name === "three_js"
      ) {
        
        techMeshes.push(o);

       
      }
    });

    // نضيف الغرفة مرة واحدة فقط
    scene.add(gltf.scene);
  },
  undefined,
  (err) => {
    console.error("GLTF load error:", err);
  }
);
function rotateTechMeshes() {
  techMeshes.forEach(obj => {
    obj.rotateY(0.02); // أو rotateZ حسب الاتجاه
  });
}

// ===========================
// Raycaster / Hover Effect
// ===========================
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let hoveredRoot = null;

// مخزن لحفظ الألوان الأصلية للمواد عشان نرجعها لما نشيل الماوس
const originalMaterials = new Map();

function getClickableRoot(object) {
  let cur = object;
  while (cur) {
    if (cur.name && clickableNames.has(cur.name)) return cur;
    cur = cur.parent;
  }
  return null;
}

function clearHover() {
  if (!hoveredRoot) return;

  // إرجاع الألوان الأصلية لكل المشات (Meshes) داخل العنصر
  hoveredRoot.traverse((o) => {
    if (o.isMesh && originalMaterials.has(o)) {
      const orig = originalMaterials.get(o);
      o.material.emissive.setHex(orig.emissive);
      o.material.emissiveIntensity = orig.intensity;
    }
  });

  hoveredRoot = null;
  document.body.style.cursor = "default";
}

window.addEventListener("mousemove", (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObjects(interactiveObjects, true);

  if (hits.length > 0) {
    const root = getClickableRoot(hits[0].object);
    if (root) {
      if (root !== hoveredRoot) {
        clearHover(); // تنظيف العنصر القديم
        hoveredRoot = root;

        const glowColor = hoverColors[root.name] || 0xffffff;

        // تفعيل الإضاءة الذاتية (Emissive) لكل أجزاء المجسم
        root.traverse((o) => {
          if (o.isMesh) {
            // حفظ الحالة الأصلية لو مش محفوظة
            if (!originalMaterials.has(o)) {
              originalMaterials.set(o, {
                emissive: o.material.emissive.getHex(),
                intensity: o.material.emissiveIntensity
              });
            }
            // تطبيق التوهج القوي
            o.material.emissive.setHex(glowColor);
            o.material.emissiveIntensity = 5.0; // قوة الإضاءة (تقدر تزيدها)
          }
        });

        document.body.style.cursor = "pointer";
      }
      return;
    }
  }

  clearHover();
});
window.addEventListener("click", () => {
  if (!hoveredRoot) return;
  const link = links[hoveredRoot.name];
  if (link) {
    if (link.startsWith("mail")) {
      window.location.href = link;
    }
    else if (typeof link === "string") { 
      window.open(link, "_blank");
    }
    else if (typeof link === "function") {
      link();
    }
  }
});

// ===========================
// Right-click camera debug only
// ===========================
window.addEventListener("contextmenu", (event) => {
  event.preventDefault();

  console.log("=== CAMERA DEBUG ===");

  console.log("Position:", {
    x: camera.position.x.toFixed(3),
    y: camera.position.y.toFixed(3),
    z: camera.position.z.toFixed(3),
  });

  console.log("Rotation (rad):", {
    x: camera.rotation.x.toFixed(3),
    y: camera.rotation.y.toFixed(3),
    z: camera.rotation.z.toFixed(3),
  });

  console.log("====================");
});

// ===========================
// Controls (WASD Q/E + arrows)
// ===========================
const keys = {};
window.addEventListener("keydown", e => keys[e.code] = true);
window.addEventListener("keyup", e => keys[e.code] = false);
const euler = new THREE.Euler(0, 0, 0, "YXZ");

function updateControls() {
  const move = 0.05;
  const rot = 0.02;

  // حركة محلية
  if (keys.KeyW) camera.translateZ(-move);
  if (keys.KeyS) camera.translateZ(move);
  if (keys.KeyA) camera.translateX(-move);
  if (keys.KeyD) camera.translateX(move);
  if (keys.KeyQ) camera.position.y += move;
  if (keys.KeyE) camera.position.y -= move;

  // دوران محلي (Local)
  euler.setFromQuaternion(camera.quaternion);

  if (keys.ArrowLeft)  euler.y += rot;   // yaw local
  if (keys.ArrowRight) euler.y -= rot;
  if (keys.ArrowUp)    euler.x += rot;   // pitch local
  if (keys.ArrowDown)  euler.x += rot;

  // clamp للـ pitch
  const MAX = Math.PI / 2 - 0.01;
  euler.x = Math.max(-MAX, Math.min(MAX, euler.x));

  camera.quaternion.setFromEuler(euler);
}

// ===========================
// gsap  Animation loop
// ===========================
let currentShot = 0;
let isAnimating = false;

function goToShot(index) {
  if (isAnimating) return;
  if (index < 0 || index >= cameraShots.length) return;

  isAnimating = true;
  currentShot = index;

  const shot = cameraShots[index];

  const d = shot.duration ?? 1.8; // مدة أطول = إحساس واقعي
  const e = shot.ease ?? "sine.inOut"; // أنعم Ease للكاميرات

  gsap.timeline({
    onComplete: () => {
      isAnimating = false;
    }
  })
  // الحركة + الدوران سوا
  .to(camera.position, {
    ...shot.pos,
    duration: d,
    ease: e
  }, 0)
  .to(camera.rotation, {
    ...shot.rot,
    duration: d,
    ease: e
  }, 0);
}

window.addEventListener("keydown", (e) => {
  // أرقام 1–9
  if (e.code.startsWith("Digit")) {
    const index = Number(e.code.replace("Digit", "")) - 1;
    goToShot(index);
  }
});

// ===========================
// Animation loop
// ===========================
function animate() {
  requestAnimationFrame(animate);
  updateControls();
  rotateTechMeshes();
  renderer.render(scene, camera);
}
animate();

// ===========================
// Resize
// ===========================
window.addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(innerWidth, innerHeight);
});

// ===========================
// End of main + loader
// ===========================
