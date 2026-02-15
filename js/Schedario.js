class Schedario {
    constructor() {
        // Qui dentro mettiamo le conversioni
        this.conversioni = {
            "0": "zen",
            "1": "teo",
            "2": "neo",
            "3": "amo",
            "4": "re",
            "5": "ali",
            "6": "accio",
            "7": "ago",
            "8": "uva",
            "9": "ape"
            // ... eccetera
        };
    }
    
    // Metodo per ottenere l'immagine dato un numero
    getImmagine(numero) {
        return this.conversioni[numero];
    }
}