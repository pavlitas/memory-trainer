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

const schermataDiGiocoDiv = document.getElementsByClassName('schermataDiGioco')[0];
const schermataDiSetupDiv = document.getElementsByClassName('schermataDiSetup')[0];



// Prova a caricare i progressi
const progressiSalvati = localStorage.getItem('memoryTrainerDati');

// 4. Se hai caricato progressi, aggiorna anche le statistiche visive
if (progressiSalvati) {
    // Ci sono salvataggi
    const dati = JSON.parse(progressiSalvati);

    // Crea il gioco con il range salvato
    gioco = new GiocoMemoria(schedario, dati.rangeDa, dati.rangeA);

    // Carica i progressi
    gioco.caricaProgressi();

    // GENERO IL PRIMO NUMERO
    numero = gioco.generaNumeroCasuale();
    document.getElementById('numeroDisplay').textContent = numero;

    schermataDiSetupDiv.classList.remove('active');
    schermataDiGiocoDiv.classList.add('active');

    punteggioDiv.textContent = "Punteggio: " + gioco.punteggio;
    
    const secondiTotali = (gioco.tempoTotale / 1000).toFixed(1);
    tempoTotaleDiv.textContent = "Tempo totale: " + secondiTotali + "s";

    const numeriRimasti = gioco.numeriDisponibili.length;
    const numeriCompletati = gioco.totNumeri - numeriRimasti;
    listaNumeriDiv.textContent = numeriCompletati + "/" + gioco.totNumeri;

    if (gioco.totRisposte > 0) {
        const percRisposte = (gioco.punteggio / gioco.totRisposte) * 100;
        percRispDiv.textContent = percRisposte.toFixed(0) + "%";
    }
    streakCorrenteDiv.textContent = "Streak: " + gioco.streakCorrente + " 🔥";
    bestStreakDiv.textContent = "Record: " + gioco.bestStreak + " 🏆";

} else {
    // Nessun salvataggio, mostra setup
    schermataDiSetupDiv.classList.add('active');
}

// 6. ASCOLTO IL CLICK DEL BOTTONE
btnVerifica.addEventListener('click', function() {
    // Aggiorno quanti numeri mancano
    const numeriRimasti = gioco.numeriDisponibili.length;
    const numeriCompletati = gioco.totNumeri - numeriRimasti;
    listaNumeriDiv.textContent = numeriCompletati + "/" + gioco.totNumeri;

    if (btnVerifica.textContent === "Continua") {
        // Genera nuovo numero e nascondi immagine
        let numero = gioco.generaNumeroCasuale();
        document.getElementById('numeroDisplay').textContent = numero;
        imgRispostaDiv.style.display = "none";
        tempoTrascorsoDiv.textContent = "";
        feedbackDiv.className = "";
        feedbackDiv.textContent = "";

        // Rimetti il bottone a "Verifica"
        btnVerifica.textContent = "Verifica";
        inputRisposta.value = "";
        inputRisposta.focus();
    } else {
        // Prendo quello che l'utente ha scritto
        const risposta = inputRisposta.value;
        
        // Verifico la risposta
        const risultato = gioco.verificaRisposta(risposta.toLowerCase());
        
        // Mostro il feedback
        if (risultato.corretta) {
            const feedbackDiv = document.getElementById('feedback');
            feedbackDiv.textContent = "✅ Corretto!";
            feedbackDiv.className = "correct"; // ← aggiungi questa riga
        } else {
            const feedbackDiv = document.getElementById('feedback');
            feedbackDiv.textContent = "❌ Sbagliato! Era: " + risultato.rispostaCorretta;
            feedbackDiv.className = "wrong"; // ← aggiungi questa riga
        }
        // Mostro l'immagine
        imgRispostaDiv.src = risultato.immagine;
        imgRispostaDiv.style.display = "block";

        // Mostro il tempo 
        const secondi = risultato.tempoTrascorso / 1000;
        tempoTrascorsoDiv.textContent = secondi.toFixed(2) + "s";
        
        // Aggiorno il punteggio
        document.getElementById('punteggio').textContent = "Punteggio: " + gioco.punteggio;

        // Aggiorno il tempo totale
        const secondiTotali = (gioco.tempoTotale / 1000).toFixed(1);
        document.getElementById('tempoTotale').textContent = "Tempo totale: " + secondiTotali + "s";

        // Mostro percentuale risposte corrette
        if (gioco.totRisposte > 0) {
            const percRisposte = (gioco.punteggio / gioco.totRisposte) * 100;
            percRispDiv.textContent = percRisposte.toFixed(1) + "%";
        }
        
        // Mostro best Streak
        bestStreakDiv.textContent = "Record: " + gioco.bestStreak + " 🏆";

        // Mostro streak corrente
        streakCorrenteDiv.textContent = "Streak: " + gioco.streakCorrente + " 🔥"


        // Genero un nuovo numero
        //numero = gioco.generaNumeroCasuale();
        //document.getElementById('numeroDisplay').textContent = numero;

        // NASCONDI L'IMMAGINE per la nuova domanda
        //imgRispostaDiv.style.display = "none";

        // Pulisco l'input
        inputRisposta.value = "";

        btnVerifica.textContent = "Continua";

        // Salvo i progressi
        gioco.salvaProgressi();
    }
    
});

btnStart.addEventListener('click', function() {
    const rangeDa = document.getElementById('rangeDa').value || "0";
    const rangeA = document.getElementById('rangeA').value || "99";

    gioco = new GiocoMemoria(schedario, rangeDa, rangeA);

    schermataDiSetupDiv.classList.remove('active');
    schermataDiGiocoDiv.classList.add('active');

    // GENERO IL PRIMO NUMERO
    let numero = gioco.generaNumeroCasuale();
    document.getElementById('numeroDisplay').textContent = numero;

    const numeriRimasti = gioco.numeriDisponibili.length;
    const numeriCompletati = gioco.totNumeri - numeriRimasti;
    listaNumeriDiv.textContent = numeriCompletati + "/" + gioco.totNumeri;
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