// Khennous Moad 1SIO-B // 
function testqcm(){
    
    let score = 0

    if (document.getElementById("q1_r4").checked == true) {
        score = score + 1;
    }

    if (document.getElementById("q2_r1").checked == true) {
        score = score + 1;
    }

    if (document.getElementById("q3_r2").checked == true) {
        score = score + 1;
    }
    if (document.getElementById("q4_r3").checked == true) {
        score = score + 1;
    }
    if (document.getElementById("q5_r3").checked == true) {
        score = score + 1;
    }
    if (document.getElementById("q6_r4").checked == true) {
        score = score + 1;
    }
    if (document.getElementById("q7_r1").checked == true) {
        score = score + 1;
    }
    if (document.getElementById("q8_r3").checked == true) {
        score = score + 1;
    }
    
    if (document.getElementById("q9_r2").checked == true) {
        score = score + 1;
    }
    
    var q101 = document.getElementById("q10_r1").checked
    var q102 = document.getElementById("q10_r2").checked
    var q103 = document.getElementById("q10_r3").checked
    var q104 = document.getElementById("q10_r4").checked
    
    if (q101 == true && q102 == true && q103 == true && q104 == true) {
        score = score + 1;
    }

    alert("Ton score est de : " + score + "/10");
}

function btn_efface(){
    document.querySelectorAll('input[type="checkbox"]').forEach( c => c.checked = false);
}

function btn_corrige(){
    window.open("fiche_corrige.html")
}