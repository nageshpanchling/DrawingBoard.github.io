const canvas = document.getElementById("canvas");
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
const sizeEl = document.getElementById("size");
const colorEl = document.getElementById("color");
const clearEl = document.getElementById("clear");
const eraserBtn = document.getElementById("eraser");
const increaseEraserBtn = document.getElementById("increaseEraser"); // Select the Increase Eraser Size button
const decreaseEraserBtn = document.getElementById("decreaseEraser"); // Select the Decrease Eraser Size button
const ctx = canvas.getContext("2d");

let size = 10;
let isPressed = false;
let color = "black";
let isErasing = false;
let x = undefined;
let y = undefined;

canvas.addEventListener("mousedown", (e) => {
    isPressed = true;
    x = e.offsetX;
    y = e.offsetY;

    // Check if the eraser mode is active
    if (isErasing) {
      ctx.clearRect(x - size / 2, y - size / 2, size, size);
    }
});

canvas.addEventListener("mouseup", () => {
    isPressed = false;
    x = undefined;
    y = undefined;
});

canvas.addEventListener("mousemove", (e) => {
    if (isPressed && !isErasing) {
        const x2 = e.offsetX;
        const y2 = e.offsetY;

        drawCircle(x2, y2);
        drawLine(x, y, x2, y2);
        x = x2;
        y = y2;
    } else if (isPressed && isErasing) {
        const x2 = e.offsetX;
        const y2 = e.offsetY;

        ctx.clearRect(x2 - size / 2, y2 - size / 2, size, size);
        x = x2;
        y = y2;
    }
});

eraserBtn.addEventListener("click", () => {
    isErasing = !isErasing; // Toggle eraser mode

    // Toggle the button text between "Eraser" and "Draw"
    if (isErasing) {
        eraserBtn.textContent = "Draw";
    } else {
        eraserBtn.textContent = "Eraser";
    }
});

function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = size * 2;
    ctx.stroke();
}

increaseBtn.addEventListener("click", () => {
    size += 5;

    if (size > 50) {
        size = 50;
    }

    updateSizeOnScreen();
});

decreaseBtn.addEventListener("click", () => {
    size -= 5;

    if (size < 5) {
        size = 5;
    }

    updateSizeOnScreen();
});

colorEl.addEventListener("change", (e) => {
    color = e.target.value;
});

clearEl.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Event listener for Increase Eraser Size button
increaseEraserBtn.addEventListener("click", () => {
    size += 5;

    if (size > 50) {
        size = 50;
    }

    updateSizeOnScreen();
});

// Event listener for Decrease Eraser Size button
decreaseEraserBtn.addEventListener("click", () => {
    size -= 5;

    if (size < 5) {
        size = 5;
    }

    updateSizeOnScreen();
});

function updateSizeOnScreen() {
    sizeEl.innerText = size;
}