// récupérer les élements du DOM
const cases = [...document.querySelectorAll('.case')]; // les crochets place les élements de la NodeList dans un tableau
const player = document.querySelector('#player');
const score1 = document.querySelector('#score1');
const score2 = document.querySelector('#score2');
const scoreNull = document.querySelector('#scoreNull');
const modalContainer = document.querySelector('.modal-container');
const modalTitle = document.querySelector('.modalTitle');
const closeModal = document.querySelector('.close-modal');
const restartButton = document.querySelector("#restartBtn")

const state = {
// valeurs par défaut
currentPlayer: 1,
scoreP1 : 0,
scoreP2: 0,
matchNull: 0,
c1: 0,
c2: 0,
c3: 0,
c4: 0,
c5: 0,
c6: 0,
c7: 0,
c8: 0,
c9: 0,

};

/**
 * Remettre à 0 une fois la manche gagné
 */
const resetState = () => {
currentPlayer = 1;
state.c1 = 0;
state.c2 = 0;
state.c3 = 0;
state.c4 = 0; 
state.c5 = 0; 
state.c6 = 0; 
state.c7 = 0; 
state.c8 = 0; 
state.c9 = 0; 
};

const resetAllGrid = () => {
    resetState()
    state.scoreP1 = 0;
    state.scoreP2 = 0;
    state.matchNull = 0;
    cases.forEach((c) => (c.textContent = ""));
}

/**
 * vérifie les possibilités de victoires et de matchs nul
 * @return true si victoire
 * @return null si match nul
 * @return false si perdu
 */
const checkVictory = () => {
//vérifier toutes les possibilités de victoires

if ( 
    (state.c1 == state.c2 && state.c2 == state.c3 && state.c1 > 0) ||
    (state.c1 == state.c4 && state.c4 == state.c7 && state.c1 > 0) ||
    (state.c1 == state.c5 && state.c5 == state.c9 && state.c1 > 0) ||
    (state.c2 == state.c5 && state.c5 == state.c8 && state.c2 > 0) ||
    (state.c3 == state.c6 && state.c6 == state.c9 && state.c3 > 0) ||
    (state.c3 == state.c5 && state.c5 == state.c7 && state.c7 > 0) ||
    (state.c4 == state.c5 && state.c5 == state.c6 && state.c4 > 0) ||
    (state.c7 == state.c8 && state.c8 == state.c9 && state.c7 > 0) 
    ){
        return true;
    //match nul verifier l'ensemble des cases si = 0
    } else if (
        state.c1 !== 0 &&
        state.c2 !== 0 &&
        state.c3 !== 0 &&
        state.c4 !== 0 &&
        state.c5 !== 0 &&
        state.c6 !== 0 &&
        state.c7 !== 0 &&
        state.c8 !== 0 &&
        state.c9 !== 0 
    ) {
        return null;
    } else {
        return false; 
    }
};

const toggleModal = () => {
    modalContainer.classList.toggle("active");
    
};

/**
 * fonction event relié à un addEventListener 
 * permet de savoir quelle case est jouée par quel player
 */
const playCase = (event) => {

// récupérer la case cliqué
const idCase = event.target.id;

//vérifier que la case n'a pas déjà été joué
if (state[idCase] !== 0)
return;

//si coup joué = une victoire
//savoir quel joueur à jouer la case
state[idCase] = state.currentPlayer;

const isVictory = checkVictory(); 

if (isVictory === true){
    //alert("le gagnant est le joueur" + state.currentPlayer)
    toggleModal()
    modalTitle.textContent = "Le Joueur " + state.currentPlayer + " a gagné la manche"
    if (state.currentPlayer == 1) {
        state.scoreP1++;
        score1.textContent = state.scoreP1;
    } else {
        state.scoreP2++;
        score2.textContent = state.scoreP2;
    }
    resetState();

    cases.forEach((c) => (c.textContent = ""));

} else if (isVictory === null){
    toggleModal()
    modalTitle.textContent = "Egalité ! "
    state.matchNull++;
    scoreNull.textContent = state.matchNull;
    resetState();
    cases.forEach((c) => (c.textContent = ""));
    
} else if (isVictory === false) {
    if (state.currentPlayer == 1) {
        state.currentPlayer = 2;
        imageWandElement = document.createElement("img");
        imageWandElement.src ="images/wand.png";
        event.target.appendChild(imageWandElement);
        player.textContent = "2";
    } else {
        state.currentPlayer = 1;
        imagePotionElement = document.createElement("img");
        imagePotionElement.src ="images/love-potions.png";
        event.target.appendChild( imagePotionElement);
        player.textContent = "1";
    }
}

};

//* ADD EVENT LISTENER
// comme cases est un tableau, il faut ajouter un foreach pour parcourir le tableau.
// on va utiliser la fonction fléchée
cases.forEach((element) => {
element.addEventListener("click", playCase)
});

closeModal.addEventListener("click", toggleModal );

restartButton.addEventListener("click", resetAllGrid);


