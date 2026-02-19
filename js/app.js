// 1. CREO GLI OGGETTI
const schedario = new Schedario();
let gioco;

// 3. PRENDO GLI ELEMENTI HTML
const btnVerifica = document.getElementById('btnVerifica');
const inputRisposta = document.getElementById('rispostaInput');
const feedbackDiv = document.getElementById('feedback');
const punteggioDiv = document.getElementById('punteggio');
const imgRispostaDiv = document.getElementById('immagineRisposta');
const tempoTrascorsoDiv = document.getElementById('tempoTrascorso');
const tempoTotaleDiv = document.getElementById('tempoTotale');
const listaNumeriDiv = document.getElementById('listaNumeri');
const btnReset = document.getElementById('btnReset');
const percRispDiv = document.getElementById('percRisp');
const bestStreakDiv = document.getElementById('bestStreak');
const streakCorrenteDiv = document.getElementById('streakCorrente');
const btnStart = document.getElementById('btnStart');
const btnCambiaRange = document.getElementById('btnCambiaRange');
const numeroDisplayDiv = document.getElementById('numeroDisplay');

const schermataDiGiocoDiv = document.getElementsByClassName('schermataDiGioco')[0];
const schermataDiSetupDiv = document.getElementsByClassName('schermataDiSetup')[0];

let numeriRimasti;
let numeriCompletati;


// Prova a caricare i progressi
const datiSalvati = localStorage.getItem('memoryTrainerDati');

// 4. Se hai caricato progressi, aggiorna anche le statistiche visive
    if (datiSalvati) {
        // Ci sono salvataggi
        const dati = JSON.parse(datiSalvati);

        // Crea il gioco con il range salvato
        gioco = new GiocoMemoria(schedario, dati.rangeDa, dati.rangeA, datiSalvati);

        // Carica i progressi
        gioco.caricaProgressi();

        // GENERO IL PRIMO NUMERO
        gioco.generaNumeroCasuale();
        //numeroDisplayDiv.textContent = numero;
        schermataDiSetupDiv.classList.remove('active');
        schermataDiGiocoDiv.classList.add('active');

        aggiornaUI();

    } else {
        // Nessun salvataggio, mostra setup
        schermataDiSetupDiv.classList.add('active');
    }

// 6. ASCOLTO IL CLICK DEL BOTTONE
btnVerifica.addEventListener('click', function() {
    if (btnVerifica.textContent === "Continua") {
        // Genera nuovo numero e nascondi immagine
        gioco.generaNumeroCasuale();
        aggiornaUI();
        imgRispostaDiv.style.display = "none";
        tempoTrascorsoDiv.textContent = "";
        feedbackDiv.className = "";
        feedbackDiv.textContent = "";
        inputRisposta.value = "";
        inputRisposta.focus();
        // Rimetti il bottone a "Verifica"
        btnVerifica.textContent = "Verifica";
        
    } else if (btnVerifica.textContent === "Verifica") {
        // Prendo quello che l'utente ha scritto
        const risposta = inputRisposta.value;
        
        // Verifico la risposta
        const risultato = gioco.verificaRisposta(risposta.toLowerCase());
        
        // Mostro il feedback
        if (risultato.corretta) {
            //const feedbackDiv = document.getElementById('feedback');
            feedbackDiv.textContent = "✅ Corretto!";
            feedbackDiv.className = "correct"; // ← aggiungi questa riga
        } else {
            //const feedbackDiv = document.getElementById('feedback');
            feedbackDiv.textContent = "❌ Sbagliato! Era: " + risultato.rispostaCorretta;
            feedbackDiv.className = "wrong"; // ← aggiungi questa riga
        }
        // Mostro l'immagine
        imgRispostaDiv.src = risultato.immagine;
        imgRispostaDiv.style.display = "block";

        aggiornaUI();

        // Pulisco l'input
        inputRisposta.value = "";
        btnVerifica.textContent = "Continua";
        
        // Controllo se il mazzo è terminato
        if(numeriRimasti <= 0) {
            listaNumeriDiv.textContent ="Hai terminato il mazzo!";
            btnVerifica.textContent = "Fine";
        }
        // Salvo i progressi
        gioco.salvaProgressi();

    } else if (btnVerifica.textContent === "Fine") {
        // L'utente ha fatto il massimo del punteggio
        if(gioco.totNumeri === gioco.punteggio) {
            alert("hai fatto il massimo del punteggio!");
            localStorage.removeItem('memoryTrainerDati');
            location.reload();  // Ricarica la pagina
            
        } else {
            alert("non hai vinto");
            localStorage.removeItem('memoryTrainerDati');
            location.reload();  // Ricarica la pagina
        }
    }
    
});

btnStart.addEventListener('click', function() {
    const rangeDa = document.getElementById('rangeDa').value || "0";
    const rangeA = document.getElementById('rangeA').value || "99";

    gioco = new GiocoMemoria(schedario, rangeDa, rangeA, null);

    schermataDiSetupDiv.classList.remove('active');
    schermataDiGiocoDiv.classList.add('active');

    // GENERO IL PRIMO NUMERO
    gioco.generaNumeroCasuale();
    aggiornaUI();
});

btnCambiaRange.addEventListener('click', function() {
    if(confirm('Vuoi cambiare il range? Perderai tutti i progressi della sessione corrente!')) {
        localStorage.removeItem('memoryTrainerDati');
        location.reload();
    }
});

btnReset.addEventListener('click', function() {
    if(confirm('Vuoi davvero ricominciare da capo? Perderai tutti i progressi!')) {
        localStorage.removeItem('memoryTrainerDati');
        location.reload();  // Ricarica la pagina
    }
});

// Funzione che aggiorna user interface
function aggiornaUI() {
    numeroDisplayDiv.textContent = gioco.numeroCorrente;
    punteggioDiv.textContent = "Punteggio: " + gioco.punteggio;

    const secondiTotali = (gioco.tempoTotale / 1000).toFixed(1);
    tempoTotaleDiv.textContent = "Tempo totale: " + secondiTotali + "s";

    numeriRimasti = gioco.numeriDisponibili.length;
    numeriCompletati = gioco.totNumeri - numeriRimasti;
    if(numeriRimasti > 0) {
        listaNumeriDiv.textContent = numeriCompletati + "/" + gioco.totNumeri;
    }
    streakCorrenteDiv.textContent = "Streak: " + gioco.streakCorrente + " 🔥";
    bestStreakDiv.textContent = "Record: " + gioco.bestStreak + " 🏆";

    if (gioco.totRisposte > 0) {
        const percRisposte = (gioco.punteggio / gioco.totRisposte) * 100;
        percRispDiv.textContent = percRisposte.toFixed(0) + "%";
    }
}