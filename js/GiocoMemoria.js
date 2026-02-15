class GiocoMemoria {
    constructor(schedario) {
        // Proprietà
        this.schedario = schedario;
        this.punteggio = 0;
        this.numeriDisponibili = [];
        this.numeroCorrente = null;

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
        
        // Prendo l'ultimo numero e lo rimuovo dall'array
        this.numeroCorrente = this.numeriDisponibili.pop();
        return this.numeroCorrente;
    }

    verificaRisposta(rispostaUtente) {
        // 1. Ottieni la risposta corretta dallo schedario
        const rispostaCorretta = this.schedario.getImmagine(this.numeroCorrente);
        
        // 2. Confronta le due risposte
        if (rispostaUtente === rispostaCorretta) {
            // 3. Se corretta, aumenta il punteggio
            this.punteggio++;
            // 4. Ritorna un oggetto con il risultato
            return {
                corretta: true,
                rispostaCorretta: rispostaCorretta
            };
        } else {
            // Se sbagliata
            return {
                corretta: false,
                rispostaCorretta: rispostaCorretta
            };
        }
    }
}