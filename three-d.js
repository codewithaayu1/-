// 3D Background with Three.js
let scene, camera, renderer;
let particles = [];

function init3D() {
    // Scene setup
    const container = document.getElementById('canvas-container');
    
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f0f1e);

    // Camera setup
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 100;

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Create particles
    createParticles();

    // Create floating objects
    createFloatingHearts();

    // Handle window resize
    window.addEventListener('resize', onWindowResize);

    // Start animation
    animate();
}

function createParticles() {
    const geometry = new THREE.BufferGeometry();
    const count = 200;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 400;
        positions[i + 1] = (Math.random() - 0.5) * 400;
        positions[i + 2] = (Math.random() - 0.5) * 400;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
        color: 0xff1744,
        size: 0.7,
        transparent: true,
        opacity: 0.6
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);
    particles.push(points);
}

function createFloatingHearts() {
    // Create a simple heart shape using geometry
    const heartShape = new THREE.Shape();
    
    // Draw heart shape
    const x = 0, y = 0;
    heartShape.moveTo(x + 5, y + 5);
    heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
    heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
    heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
    heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
    heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
    heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);

    const geometry = new THREE.ShapeGeometry(heartShape);
    const material = new THREE.MeshPhongMaterial({ color: 0xff5252 });
    
    for (let i = 0; i < 5; i++) {
        const heart = new THREE.Mesh(geometry, material);
        heart.position.set(
            (Math.random() - 0.5) * 300,
            (Math.random() - 0.5) * 300,
            (Math.random() - 0.5) * 300
        );
        heart.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );
        heart.scale.set(0.5, 0.5, 0.5);
        scene.add(heart);
        particles.push(heart);
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    // Animate particles
    particles.forEach((particle, index) => {
        if (particle.isPoints) {
            particle.rotation.x += 0.0001;
            particle.rotation.y += 0.0001;
        } else {
            particle.rotation.x += 0.003;
            particle.rotation.y += 0.003;
            particle.rotation.z += 0.002;
            
            particle.position.x += Math.sin(Date.now() * 0.0001 + index) * 0.05;
            particle.position.y += Math.cos(Date.now() * 0.0001 + index) * 0.05;
        }
    });

    renderer.render(scene, camera);
}

// Initialize when page loads
window.addEventListener('DOMContentLoaded', init3D);
