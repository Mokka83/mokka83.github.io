const background = document.querySelector('.matrix-background');
// Extended character set including Latin, Japanese, numbers, and symbols
const matrixChars = 
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +  // Latin uppercase
    '0123456789' +                   // Numbers
    '!@#$%^&*()_+-=[]{}|;:,.<>?~' + // Symbols
    'ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃ' + // Japanese katakana
    'αβγδεζηθικλμνξοπρστυφχψω';     // Greek letters

const CHAR_HEIGHT = 20;
const MAX_STREAMS = 2; // Limit to 2 streams
const TRAIL_LENGTH = 8; // Number of characters in the trail
const CONTENT_PADDING = 100; // Pixels to keep away from the center

class MatrixStream {
    constructor(x) {
        this.element = document.createElement('div');
        this.element.className = 'matrix-stream';
        this.element.style.left = x + 'px';
        this.y = -CHAR_HEIGHT;
        this.chars = [];
        background.appendChild(this.element);
    }

    addChar() {
        const char = document.createElement('div');
        char.className = 'matrix-char';
        char.style.top = this.y + 'px';
        char.textContent = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        this.element.appendChild(char);
        this.chars.push(char);

        // Remove old characters
        if (this.chars.length > TRAIL_LENGTH) {
            const oldChar = this.chars.shift();
            setTimeout(() => {
                oldChar.remove();
            }, 2000); // Match the CSS animation duration
        }
    }

    move() {
        this.y += CHAR_HEIGHT;
        this.addChar();
        return this.y < window.innerHeight;
    }

    remove() {
        this.element.remove();
    }
}

class MatrixRain {
    constructor() {
        this.streams = new Set();
        this.createStream();
    }

    getRandomX() {
        const centerX = window.innerWidth / 2;
        const contentWidth = 900; // Matching your max-width from CSS
        const contentStart = centerX - (contentWidth / 2);
        const contentEnd = centerX + (contentWidth / 2);

        // 80% chance to spawn on the sides
        if (Math.random() < 0.8) {
            // Choose left or right side
            if (Math.random() < 0.5) {
                // Left side
                return Math.floor(Math.random() * (contentStart - CONTENT_PADDING));
            } else {
                // Right side
                return Math.floor(contentEnd + Math.random() * (window.innerWidth - contentEnd - CONTENT_PADDING));
            }
        } else {
            // 20% chance to spawn anywhere
            return Math.floor(Math.random() * (window.innerWidth - 14));
        }
    }

    createStream() {
        if (this.streams.size >= MAX_STREAMS) return;

        const x = this.getRandomX();
        const stream = new MatrixStream(x);
        this.streams.add(stream);

        const moveStream = () => {
            if (!stream.move()) {
                stream.remove();
                this.streams.delete(stream);
                // Create a new stream after a delay
                setTimeout(() => this.createStream(), Math.random() * 1000);
                return;
            }
            setTimeout(moveStream, 150);
        };

        moveStream();

        // Start another stream if we have room
        if (this.streams.size < MAX_STREAMS) {
            setTimeout(() => this.createStream(), Math.random() * 1500);
        }
    }
}

// Start the animation
window.addEventListener('load', () => {
    new MatrixRain();
});


