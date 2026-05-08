    <!-- Audio -->
    <audio src="./y2mate (mp3cut.net).mp3" id="linkmp3" class="sembunyi"></audio>

    <!-- Background Layers -->
    <div class="floating-elements" id="balloons"></div>
    <div id="bodyblur">
        <img src="" id="wallpaper" />
    </div>

    <!-- Configuration Export to JS -->
    <script>
        window.targetName = "<?php echo $target_name; ?>";
        window.targetAge = "<?php echo $target_age; ?>";
        window.baseAssetsUrl = "<?php echo $base_url; ?>";
    </script>

    <!-- Main Logic -->
    <script src="<?php echo $base_url; ?>/js/main.js"></script>
    
    <script>
        // Initialize balloons
        const balloonContainer = document.getElementById('balloons');
        const colors = ['#ff9a9e', '#fad0c4', '#ff217d', '#3333ff', '#ff00cc'];
        
        for (let i = 0; i < 15; i++) {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';
            balloon.style.setProperty('--left', Math.random() * 100 + 'vw');
            balloon.style.animationDelay = Math.random() * 10 + 's';
            balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            balloonContainer.appendChild(balloon);
        }

        const swalst = Swal.mixin({
            timer: 2300,
            allowOutsideClick: false,
            showConfirmButton: false,
            timerProgressBar: true,
            imageHeight: 90,
        });

        let audio = new Audio(document.getElementById('linkmp3').src);
        let fungsiAwal = 0;
        
        // Initial display
        setTimeout(() => {
            document.getElementById('Content').style.opacity = '1';
        }, 500);

        const swals = Swal.mixin({
            allowOutsideClick: false,
            cancelButtonColor: "#FF0040",
            imageHeight: 80,
        });

        document.getElementById("kadoIn").onclick = function () {
            if (fungsiAwal == 0) {
                audio.play();
                fungsiAwal = 1;
                confetti({
                    particleCount: 200,
                    spread: 90,
                    origin: { y: 0.6 }
                });
                
                this.style.transition = "all .8s ease";
                this.style.transform = "scale(0)";
                this.style.opacity = "0";
                
                setTimeout(() => {
                    this.classList.add('sembunyi');
                    document.getElementById('ket').classList.add('sembunyi');
                    
                    // Show Loading and Redirect to Wish Page
                    const loadingContainer = document.getElementById("loading-container");
                    const loadingBar = document.getElementById("loading-bar");
                    loadingContainer.classList.remove('sembunyi');
                    
                    let progress = 0;
                    const interval = setInterval(() => {
                        progress += 5;
                        if (progress >= 100) {
                            progress = 100;
                            clearInterval(interval);
                            setTimeout(() => {
                                window.location = "wish.php";
                            }, 500);
                        }
                        loadingBar.style.width = progress + "%";
                    }, 50);
                }, 800);
            }
        };

        async function pertanyaan() {
            var { isConfirmed: prtanya } = await swals.fire({
                title: window.targetName + ", siap lanjut ke kejutan berikutnya?",
                text: "Masih banyak hal seru menunggumu! 🚀",
                imageUrl: document.getElementById('fotostiker5').src,
                showCancelButton: true,
                confirmButtonText: "Iya, siap! 💖",
                cancelButtonText: "Bentar dulu",
            });
            
            if (prtanya) {
                confetti({
                    particleCount: 200,
                    spread: 100,
                    origin: { y: 0.6 }
                });
                menuju();
            }
        }
    </script>
</body>
</html>
