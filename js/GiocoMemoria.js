class GiocoMemoria {
    constructor(schedario) {
        // Proprietà
        this.schedario = schedario;
        this.punteggio = 0;
        this.numeriDisponibili = [];
        this.numeroCorrente = null;

        // Proprietà per timer
        this.iniziotimer = null;
        this.tempoTotale = 0;
        this.tempoTrascorso = 0;   

        // Proprietà per statistiche
        this.totRisposte = 0;
        this.streakCorrente = 0;
        this.bestStreak = 0;


        // Aggiungi le cifre singole: "0", "1", "2"... "9"
        for (let i = 0; i <= 9; i++) {
            this.numeriDisponibili.push(i.toString());
        }
        
        // Aggiungi le cifre doppie: "00", "01", "02"... "99"
        for (let i = 0; i <= 99; i++) {
            this.numeriDisponibili.push(i.toString().padStart(2, '0'));
        }
        
        // Mescolo l'array (algoritmo Fisher-Yates)
        this.mescolaArray(this.numeriDisponibili);
    }

    mescolaArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Scambio
        }
    }

    generaNumeroCasuale() {
        // Se l'array è vuoto, ho finito
        if (this.numeriDisponibili.length === 0) {
            return null;
        }
        
        this.inizioTimer = Date.now();

        // Prendo l'ultimo numero e lo rimuovo dall'array
        this.numeroCorrente = this.numeriDisponibili.pop();
        return this.numeroCorrente;
    }

    verificaRisposta(rispostaUtente) {
        const fineTimer = Date.now();
        this.tempoTrascorso = fineTimer - this.inizioTimer;
        this.tempoTotale += this.tempoTrascorso;

        this.totRisposte++;

        // 1. Ottieni la risposta corretta dallo schedario
        const rispostaCorretta = this.schedario.getImmagine(this.numeroCorrente);
        
        // 2. Confronta le due risposte
        if (rispostaUtente === rispostaCorretta) {
            // 3. Se corretta, aumenta il punteggio
            this.punteggio++;
            // 3.1. Se corretta, aumento StreakCorrente
            this.streakCorrente++;
            // 3.2. Controllo se streakCorrente è maggiore di bestSteak
            if(this.streakCorrente > this.bestStreak){
                this.bestStreak = this.streakCorrente;
            }

            // 4. Ritorna un oggetto con il risultato
            return {
                corretta: true,
                rispostaCorretta: rispostaCorretta,
                immagine: this.schedario.getPercorsoImmagine(this.numeroCorrente),
                tempoTrascorso: this.tempoTrascorso
            };
        } else {
            // Se sbagliata
            // 1. Azzero streakCorrente
            this.streakCorrente = 0;

            return {
                corretta: false,
                rispostaCorretta: rispostaCorretta,
                immagine: this.schedario.getPercorsoImmagine(this.numeroCorrente),
                tempoTrascorso: this.tempoTrascorso
            };
        }
        
        
    }

    salvaProgressi() {
        // Cosa dobbiamo salvare?
        // 1. Punteggio
        // 2. Tempo totale
        // 3. Numeri disponibili (quelli non ancora fatti)
        
        const dati = {
            punteggio: this.punteggio,
            tempoTotale: this.tempoTotale,
            numeriDisponibili: this.numeriDisponibili,
            totRisposte: this.totRisposte,
            streakCorrente: this.streakCorrente,
            bestStreak: this.bestStreak
        };
        
        // Converti in stringa e salva
        localStorage.setItem('memoryTrainerDati', JSON.stringify(dati));
    }

    caricaProgressi() {
        // Prendi i dati salvati
        const datiSalvati = localStorage.getItem('memoryTrainerDati');
        
        // Se non ci sono dati salvati, esci
        if (!datiSalvati) {
            return false;  // Nessun salvataggio trovato
        }
        
        // Converti da stringa a oggetto
        const dati = JSON.parse(datiSalvati);
        
        // Ripristina i valori
        this.punteggio = dati.punteggio;
        this.tempoTotale = dati.tempoTotale;
        this.numeriDisponibili = dati.numeriDisponibili;
        this.totRisposte = dati.totRisposte;
        this.streakCorrente = dati.streakCorrente;
        this.bestStreak = dati.bestStreak;
        
        return true;  // Caricamento riuscito
    }
}