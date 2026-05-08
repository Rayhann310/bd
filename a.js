function initengahan() {
    const kadoIn = document.getElementById("kadoIn");
    const ket = document.getElementById("ket");
    const Content = document.getElementById("Content");
    const bodyblur = document.getElementById("bodyblur");
    
    kadoIn.classList.add('sembunyi');
    ket.classList.add('sembunyi');
    Content.style.opacity = "1";
    bodyblur.style.opacity = "0.5";
}

async function mulainama() {
    const bodyblur = document.getElementById("bodyblur");
    const fotostiker = document.getElementById("fotostiker");
    
    bodyblur.style.opacity = "0";
    fotostiker.style.display = "inline-flex";
    setTimeout(ftmuncul, 200);
    setTimeout(kethalo, 500);
}

function ftmuncul() {
    const fotostiker = document.getElementById("fotostiker");
    const deffotostiker = fotostiker.src;
    const fotostiker1 = document.getElementById("fotostiker1");
    const fotostiker2 = document.getElementById("fotostiker2");
    const fotostiker3 = document.getElementById("fotostiker3");
    const fotostiker4 = document.getElementById("fotostiker4");

    if (window.ftganti == 0) { fotostiker.src = deffotostiker; }
    if (window.ftganti == 1) { fotostiker.src = fotostiker1.src; }
    if (window.ftganti == 2) { fotostiker.src = fotostiker2.src; }
    if (window.ftganti == 3) { fotostiker.src = fotostiker3.src; }
    if (window.ftganti == 4) { fotostiker.src = fotostiker4.src; }
    
    fotostiker.style.display = "inline-flex";
    fotostiker.style.opacity = "1";
    fotostiker.style.transform = "scale(1)";
}

function fthilang() {
    const fotostiker = document.getElementById("fotostiker");
    fotostiker.style.opacity = "0";
    fotostiker.style.transform = "scale(0.1)";
}

function bqmuncul() {
    const bq = document.getElementById("bq");
    bq.classList.add('active');
    mulaiketik1();
    window.fungsi = 1;
}

function kethalo() {
    new TypeIt("#halo", {
        strings: ["" + vketikhalo],
        startDelay: 50,
        speed: 40,
        waitUntilVisible: true,
        afterComplete: function () {
            document.getElementById("halo").innerHTML = vketikhalo;
            setTimeout(bqmuncul, 200);
        },
    }).go();
}

function tombol() {
    const Tombol = document.getElementById("Tombol");
    Tombol.classList.add('visible');
    window.fungsi = 1;
    
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.8 }
    });
}

document.getElementById("By").onclick = function() {
    if (window.fungsi == 1) { pertanyaan(); }
    if (window.fungsi == 2) { menuju(); }
}

async function menuju() {
    await swals.fire({
        title: 'Yay! 🎉',
        text: 'Ready for the next surprise?',
        icon: 'success',
        confirmButtonText: 'Let\'s Go! 💖'
    });
    window.location = "./love/index.html";
}

const kalimat = document.getElementById("kalimat");
let vketik1 = kalimat.innerHTML;
kalimat.innerHTML = "";

function mulaiketik1() {
    new TypeIt("#kalimat", {
        strings: ["" + vketik1],
        startDelay: 400,
        speed: 30,
        cursor: false,
        waitUntilVisible: true,
        lifelike: true,
        afterComplete: function() {
            aktiopsL();
        },
    }).go();
}

window.opsLclick = 0;
window.opsLcheck = 0;
const opsL = document.getElementById("opsL");
const defopsL = opsL.innerHTML;

document.getElementById("bq").onclick = function() {
    if (window.opsLclick == 1) {
        if (window.opsLcheck == 1) { setTimeout(aktipesan1, 400); }
        otomatis();
        opsL.classList.add('sembunyi');
        window.opsLclick = 0;
    }
}

function aktiopsL() {
    opsL.innerHTML = defopsL;
    opsL.classList.remove('sembunyi');
    opsL.style.opacity = "0.8";
    window.opsLclick = 1;
    window.opsLcheck += 1;
}

function otomatis() {
    const kalimat = document.getElementById("kalimat");
    kalimat.style.opacity = "0";
    setTimeout(() => {
        kalimat.style.opacity = "1";
    }, 400);
}

function aktipesan1() {
    const kalimat = document.getElementById("kalimat");
    const pesan1 = document.getElementById("pesan1");
    const kolombaru = document.getElementById("kolombaru");
    
    kalimat.innerHTML = pesan1.innerHTML;
    kolombaru.style.opacity = "1";
    kolombaru.style.transform = "scale(1)";
}

function aktipesan2() {
    const kalimat = document.getElementById("kalimat");
    const pesan2 = document.getElementById("pesan2");
    const pesan3 = document.getElementById("pesan3");
    const kolombaru = document.getElementById("kolombaru");
    
    kolombaru.style.display = "none";
    kalimat.innerHTML = "";
    
    new TypeIt("#kalimat", {
        strings: [pesan2.innerHTML, pesan3.innerHTML],
        startDelay: 20,
        speed: 30,
        cursor: true,
        breakLines: false,
        waitUntilVisible: true,
        lifelike: true,
        afterComplete: function() {
            kalimat.innerHTML = pesan3.innerHTML;
            setTimeout(aktipesan4, 700);
        },
    }).go();
}

function aktipesan4() {
    const pesan4 = document.getElementById("pesan4");
    let vketik4 = pesan4.innerHTML;
    pesan4.innerHTML = "";
    pesan4.classList.remove('sembunyi');
    
    fthilang();
    window.ftganti = 2;
    setTimeout(ftmuncul, 300);
    
    new TypeIt("#pesan4", {
        strings: [vketik4],
        startDelay: 1,
        speed: 50,
        cursor: true,
        waitUntilVisible: true,
        afterComplete: function() {
            pesan4.innerHTML = vketik4;
            setTimeout(aktipesan5, 700);
        },
    }).go();
}

function aktipesan5() {
    const pesan5 = document.getElementById("pesan5");
    let vketik5 = pesan5.innerHTML;
    pesan5.innerHTML = "";
    pesan5.classList.remove('sembunyi');
    
    fthilang();
    window.ftganti = 3;
    setTimeout(ftmuncul, 300);
    
    new TypeIt("#pesan5", {
        strings: [vketik5],
        startDelay: 1,
        speed: 50,
        cursor: true,
        waitUntilVisible: true,
        afterComplete: function() {
            pesan5.innerHTML = vketik5 + " 😊";
            setTimeout(aktipesan6, 700);
        },
    }).go();
}

function aktipesan6() {
    const pesan6 = document.getElementById("pesan6");
    let vketik6 = pesan6.innerHTML;
    pesan6.innerHTML = "";
    pesan6.classList.remove('sembunyi');
    
    fthilang();
    window.ftganti = 4;
    setTimeout(ftmuncul, 300);
    
    new TypeIt("#pesan6", {
        strings: [vketik6],
        startDelay: 1,
        speed: 50,
        cursor: true,
        waitUntilVisible: true,
        afterComplete: function() {
            pesan6.innerHTML = vketik6;
            setTimeout(tombol, 400);
        },
    }).go();
}

window.slov = 0;
const lvs = ["lv1", "lv2", "lv3", "lv4"];
lvs.forEach(id => {
    document.getElementById(id).onclick = function() {
        this.style.opacity = "0";
        this.style.pointerEvents = "none";
        window.slov += 1;
        
        confetti({
            particleCount: 30,
            spread: 50,
            origin: { y: 0.7 }
        });
        
        if (window.slov == 4) {
            fthilang();
            window.ftganti = 1;
            setTimeout(ftmuncul, 300);
            otomatis();
            setTimeout(aktipesan2, 400);
        }
    }
});

