<?php
require_once 'config.php';
include_once 'components/header.php';
?>

<!-- Loading Bar -->
<?php include_once 'components/loading.php'; ?>

<!-- Extra Floating Hearts for this page -->
<div class="floating-hearts" id="hearts-container"></div>

<div id="Content" style="opacity: 1;">
    <div class="kumpulanstiker">
        <img src="https://feeldreams.github.io/bunga.gif" id="sticker1" class="cute-sticker" alt="sticker" />
        <img src="https://media.tenor.com/snFoLI-S9CQAAAAj/milk-and-mocha.gif" id="sticker2" class="cute-sticker" style="display:none;" alt="sticker" />
        <img src="https://feeldreams.github.io/emawh.gif" id="sticker3" class="cute-sticker" style="display:none;" alt="sticker" />
    </div>

    <blockquote id="bq" class="active" style="display: block; border-radius: 40px;">
        <p id="halo-wish" style="font-family: 'Pacifico', cursive; font-size: 1.8rem; color: #ff217d; margin-bottom: 15px;">Halo Kaka Diah Sayang!</p>
        <p id="ucapan-get"></p>
        
        <div id="kolombaru-wish" style="display: flex; justify-content: center; gap: 15px; margin: 20px 0; font-size: 2rem; opacity: 0;">
            <span>🌸</span>
            <span>💖</span>
            <span>🎂</span>
            <span>✨</span>
        </div>

    </blockquote>

    <div id="Tombol" style="display: none; margin-top: 20px;">
        <a id="By" onclick="menuju()" style="background: linear-gradient(to right, #ff9a9e, #ff217d); padding: 12px 35px; border-radius: 50px; color: white; font-weight: bold; cursor: pointer; box-shadow: 0 10px 20px rgba(255, 33, 125, 0.3);">Lihat Kejutan Terakhir 🚀</a>
    </div>
</div>

<style>
    .cute-sticker {
        width: clamp(70px, 22vw, 110px);
        height: clamp(70px, 22vw, 110px);
        margin: 5px;
        animation: bounce 2s infinite;
    }
    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-15px); }
    }
    .heart-pixel {
        position: absolute;
        color: #ff217d;
        font-size: 20px;
        pointer-events: none;
        animation: floatHeart 4s linear infinite;
        opacity: 0;
    }
    @keyframes floatHeart {
        0% { transform: translateY(0) scale(0); opacity: 0; }
        20% { opacity: 0.8; }
        100% { transform: translateY(-100vh) scale(1.5); opacity: 0; }
    }
</style>

<script>
    // Create Floating Hearts
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart-pixel';
        heart.innerHTML = '💖';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '100vh';
        heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
        document.getElementById('hearts-container').appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
    }
    setInterval(createHeart, 400);

    // Initial Confetti
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
    });

    // Sequence of animations
    window.onload = function() {
        new TypeIt("#ucapan-get", {
            strings: [
                "HBD Kaka Diah yang ke-<?php echo $target_age; ?>! 🎉", 
                "Terima kasih sudah menjadi orang hebat... 😊",
                "----------------------------------",
                "Semoga di usia baru ini Kaka makin bahagia, sehat, dan selalu dikelilingi oleh orang-orang baik. Kaka pantas mendapatkan semua hal indah di dunia ini! "
            ],
            speed: 50,
            nextStringDelay: 1000,
            waitUntilVisible: true,
            afterStep: function(instance) {
                // Trigger emoji appearance after the second line
                if (instance.is('completed')) {
                    document.getElementById('Tombol').style.display = 'block';
                }
            },
            afterComplete: function() {
                document.getElementById('sticker2').style.display = 'inline-flex';
                document.getElementById('kolombaru-wish').style.opacity = '1';
                document.getElementById('kolombaru-wish').style.transition = 'all 1s ease';
                document.getElementById('sticker3').style.display = 'inline-flex';
                document.getElementById('Tombol').style.display = 'block';
            }
        }).go();
    };
</script>

<?php include_once 'components/footer.php'; ?>
