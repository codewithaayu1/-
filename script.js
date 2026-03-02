// 1. Three.js Setup for 3D Background
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('bg-animation').appendChild(renderer.domElement);

// Create a glowing cube (3D Object)
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ 
    color: 0xff0055, 
    wireframe: true 
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Particles Background
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 700;
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 20;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    color: 0xff0055
});
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    
    particlesMesh.rotation.y += 0.001;
    
    renderer.render(scene, camera);
}
animate();

// 2. Button Logic
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const message = document.getElementById('message');
const ui = document.querySelector('.ui-container');

yesBtn.addEventListener('click', () => {
    // Show Love Message
    ui.style.display = 'none';
    message.style.display = 'block';
    
    // Change 3D cube to green
    cube.material.color.set(0x00ff00);
});

noBtn.addEventListener('click', () => {
    // Simple animation to make button run away (Optional)
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;
    noBtn.style.transform = `translate(${x}px, ${y}px)`;
});
