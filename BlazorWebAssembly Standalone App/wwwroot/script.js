const scene = document.getElementById('scene');
const pixels = [];
const pixelData = [];
const pixelSize = 25;

const matrix = [
    "111111  11000011",
    "111111  11000011",
    "000011  11000110",
    "000011  11001100",
    "000011  11011000",
    "011111  11110000",
    "011111  11110000",
    "000011  11011000",
    "000011  11001100",
    "000011  11000110",
    "111111  11000011",
    "111111  11000011",
];

const cols = 16;
const rows = 13;

const centerX = 200;
const centerY = 100;

for (let i = 0; i < 94; i++) {
    const pixel = document.createElement('div');
    pixel.className = 'pixel';
    scene.appendChild(pixel);
    pixels.push(pixel);

    pixelData.push({
        angle: Math.random() * Math.PI * 2,
        distance: 150 + Math.random() * 100,
        speed: 0.01 + Math.random() * 0.02
    });
}

function randomPosition(pixel, data) {
    const x = centerX + Math.cos(data.angle) * data.distance;
    const y = centerY + Math.sin(data.angle) * data.distance;

    pixel.style.left = `${x}px`;
    pixel.style.top = `${y}px`;
}

function arrangeTo3K() {
    let activePixel = 0;

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (matrix[y] && matrix[y][x] === "1") {
                if (activePixel < pixels.length) {
                    pixels[activePixel].style.left = `${x * pixelSize + 50}px`;
                    pixels[activePixel].style.top = `${y * pixelSize + 20}px`;
                    activePixel++;
                }
            }
        }
    }

    for (let i = activePixel; i < pixels.length; i++) {
        randomPosition(pixels[i], pixelData[i]);
    }
}

let isMoving = true;
let toggle = true;

function animate() {
    if (isMoving) {
        for (let i = 0; i < pixels.length; i++) {
            pixelData[i].angle += pixelData[i].speed;
            randomPosition(pixels[i], pixelData[i]);
        }
    }
    requestAnimationFrame(animate);
}

setInterval(() => {
    toggle = !toggle;
    if (toggle) {
        isMoving = false;
        arrangeTo3K();
    } else {
        isMoving = true;
    }
}, 5000);

animate();