// Khennous Moad 1SIOB- Mission 11


window.addEventListener("DOMContentLoaded", () => {
    var d = new Date();
    document.getElementById("dateFacture").textContent =
        d.toLocaleDateString("fr-FR");
});


function ajouterLigne() {
    var newL = document.getElementById("modeleLigne").cloneNode(true);
    var lastL = document.getElementById("lastLigne");

   
    newL.querySelector(".desc").value = "";
    newL.querySelector(".qte").value = "0";
    newL.querySelector(".prix").value = "0";
    newL.querySelector(".totalLigne").value = "0";

  
    var pere = document.getElementById("table_colonnes").getElementsByTagName("tbody")[0];
    pere.insertBefore(newL, lastL);
}


function remplir() {
    var tabDesc = [
        "portable",
        "bureau",
        "écran 17 pouces",
        "clé USB 16Go",
        "souris",
        "imprimante",
        "caméra",
        "ecouteurs",
        "disque dur",
    ];

    var listePrix = document.getElementsByClassName("prix");
    var listeQte  = document.getElementsByClassName("qte");
    var listeDesc = document.getElementsByClassName("desc");

    for (let i = 0; i < listePrix.length; i++) {
        var randDesc = tabDesc[Math.floor(Math.random() * tabDesc.length)];
        var randQte  = Math.floor(Math.random() * 10) + 1;   
        var randPrix = Math.floor(Math.random() * 100) + 1; 
        listeDesc[i].value = randDesc;
        listeQte[i].value  = randQte;
        listePrix[i].value = randPrix;
    }
}


function calculate() {
    var listePrix  = document.getElementsByClassName("prix");
    var listeQte   = document.getElementsByClassName("qte");
    var listeTtl   = document.getElementsByClassName("totalLigne");

    var sousTotal = 0;

    for (let i = 0; i < listePrix.length; i++) {
        var qte  = parseFloat(listeQte[i].value) || 0;
        var prix = parseFloat(listePrix[i].value) || 0;
        var totalLigne = qte * prix;

        listeTtl[i].value = totalLigne.toFixed(2);
        sousTotal += totalLigne;
    }

    document.getElementById("sousTotal").value = sousTotal.toFixed(2);

    var remise = parseFloat(document.getElementById("remise").value) || 0;
    var tauxImposition = parseFloat(document.getElementById("tauxImposition").value) || 0;
    var fraisExpedition = parseFloat(document.getElementById("fraisExpedition").value) || 0;

    var montantRemise = sousTotal * (remise / 100);
    var sousTotalRemise = sousTotal - montantRemise;
    document.getElementById("sousTotalRemise").value = sousTotalRemise.toFixed(2);

    var taxeTotale = sousTotal * (tauxImposition / 100);
    document.getElementById("taxeTotale").value = taxeTotale.toFixed(2);

    var solde = sousTotalRemise + taxeTotale + fraisExpedition;
    document.getElementById("solde").value = solde.toFixed(2);
}
