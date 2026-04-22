// Récupère l'élément d'affichage de la calculatrice
const ecran = document.getElementById("ecran");

// Ajoute la valeur du bouton cliqué à l'écran
function ajouterEcran(input){
    ecran.value += input;
}

// Efface le contenu de l'écran
function effacerEcran(input){
    ecran.value = "";
}

// Calcule l'expression affichée sur l'écran
function calculer(input){
    try{
        // Utilise eval pour evaluer le calcul afficher sur l'ecran
        ecran.value = eval(ecran.value);
    }
    catch(error){
        // Affiche "Erreur" si le calcul est impossible
        ecran.value = 'Erreur'
    }
}