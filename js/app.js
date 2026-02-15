// 1. CREO GLI OGGETTI
const schedario = new Schedario();
const gioco = new GiocoMemoria(schedario);

// Prova a caricare i progressi
const progressiCaricati = gioco.caricaProgressi();

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

// 4. Se hai caricato progressi, aggiorna anche le statistiche visive
if (progressiCaricati) {
    punteggioDiv.textContent = "Punteggio: " + gioco.punteggio;
    const secondiTotali = (gioco.tempoTotale / 1000).toFixed(1);
    tempoTotaleDiv.textContent = "Tempo totale: " + secondiTotali + "s";
    const numeriRimasti = 110 - gioco.numeriDisponibili.length;
    listaNumeriDiv.textContent = numeriRimasti + "/110";

    if (gioco.totRisposte > 0) {
        const percRisposte = (gioco.punteggio / gioco.totRisposte) * 100;
        percRispDiv.textContent = percRisposte.toFixed(0) + "%";
    }
    streakCorrenteDiv.textContent = "Streak: " + gioco.streakCorrente + " 🔥";
    bestStreakDiv.textContent = "Record: " + gioco.bestStreak + " 🏆";
}

// 5. GENERO IL PRIMO NUMERO
let numero = gioco.generaNumeroCasuale();
document.getElementById('numeroDisplay').textContent = numero;

// Aggiorna il contatore dopo aver generato il numero
const numeriRimasti = 110 - gioco.numeriDisponibili.length;
listaNumeriDiv.textContent = numeriRimasti + "/110";

// 6. ASCOLTO IL CLICK DEL BOTTONE
btnVerifica.addEventListener('click', function() {
    // Aggiorno quanti numeri mancano
    listaNumeriDiv.textContent = 110 - gioco.numeriDisponibili.length + "/110";

    if (btnVerifica.textContent === "Continua") {
        // Genera nuovo numero e nascondi immagine
        numero = gioco.generaNumeroCasuale();
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

btnReset.addEventListener('click', function() {
    if(confirm('Vuoi davvero ricominciare da capo? Perderai tutti i progressi!')) {
        localStorage.removeItem('memoryTrainerDati');
        location.reload();  // Ricarica la pagina
    }
});