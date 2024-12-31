document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('signature-pad');
    const context = canvas.getContext('2d');
    let painting = false;

    function startPosition(e) {
        painting = true;
        draw(e);
    }

    function endPosition() {
        painting = false;
        context.beginPath();
    }

    function draw(e) {
        if (!painting) return;

        // Handle touch events
        if (e.type.includes('touch')) {
            e.preventDefault();
            const touch = e.touches[0];
            context.lineTo(touch.clientX - canvas.offsetLeft, touch.clientY - canvas.offsetTop);
        } else {
            context.lineTo(e.offsetX, e.offsetY);
        }

        context.lineWidth = 4;
        context.lineCap = 'round';
        context.strokeStyle = 'black';

        context.stroke();
        context.beginPath();
        if (e.type.includes('touch')) {
            const touch = e.touches[0];
            context.moveTo(touch.clientX - canvas.offsetLeft, touch.clientY - canvas.offsetTop);
        } else {
            context.moveTo(e.offsetX, e.offsetY);
        }
    }

    // Mouse events
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', endPosition);
    canvas.addEventListener('mousemove', draw);

    // Touch events
    canvas.addEventListener('touchstart', startPosition);
    canvas.addEventListener('touchend', endPosition);
    canvas.addEventListener('touchmove', draw);

    document.getElementById('save-signature').addEventListener('click', function () {
        const name = document.getElementById('name').value.trim();
        const dataUrl = canvas.toDataURL('image/png');

        if (name === '') {
            alert('Silakan isi nama sebelum menyimpan tanda tangan.');
            return;
        }

        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = name + '.png'; // Menggunakan nama sebagai nama file
        link.click();
    });

    document.getElementById('clear-signature').addEventListener('click', function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
    });

    // Mode Gelap/Terang
    const toggleTheme = document.getElementById('toggle-theme');
    const body = document.body;

    // Cek preferensi tema dari localStorage
    if (localStorage.getItem('dark-mode') === 'enabled') {
        body.classList.add('dark-mode');
        toggleTheme.checked = true;
    }

    // Tambahkan event listener pada saklar
    toggleTheme.addEventListener('change', () => {
        if (toggleTheme.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('dark-mode', 'enabled');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('dark-mode', 'disabled');
        }
    });
});
