class Schedario {
    constructor() {
        // Qui dentro mettiamo le conversioni
        this.conversioni = {
            // da 0 a-9
            "0": { nome: "zen", immagine: "https://placehold.co/300x300/000000/FFF" },
            "1": { nome: "tè", immagine: "https://placehold.co/300x300/111111/FFF" },
            "2": { nome: "neo", immagine: "https://placehold.co/300x300/222222/FFF" },
            "3": { nome: "amo", immagine: "https://placehold.co/300x300/333333/FFF" },
            "4": { nome: "re", immagine: "https://placehold.co/300x300/444444/FFF" },
            "5": { nome: "ali", immagine: "https://placehold.co/300x300/555555/FFF" },
            "6": { nome: "cia", immagine: "https://placehold.co/300x300/666666/FFF" },
            "7": { nome: "ago", immagine: "https://placehold.co/300x300/777777/FFF" },
            "8": { nome: "uva", immagine: "memory-trainer/images/uva.png" },
            "9": { nome: "ape", immagine: "https://placehold.co/300x300/999999/FFF" },
            // Decine 00-09
            "00": { nome: "sasso", immagine: "https://placehold.co/300x300/000000/FFF" },
            "01": { nome: "sedia", immagine: "https://placehold.co/300x300/000000/FFF" },
            "02": { nome: "zaino", immagine: "memory-trainer/images/zaino.png" },
            "03": { nome: "seme", immagine: "https://placehold.co/300x300/000000/FFF" },
            "04": { nome: "zorro", immagine: "https://placehold.co/300x300/000000/FFF" },
            "05": { nome: "sole", immagine: "https://placehold.co/300x300/000000/FFF" },
            "06": { nome: "socio", immagine: "https://placehold.co/300x300/000000/FFF" },
            "07": { nome: "sacco", immagine: "https://placehold.co/300x300/000000/FFF" },
            "08": { nome: "sofà", immagine: "https://placehold.co/300x300/000000/FFF" },
            "09": { nome: "zoppo", immagine: "https://placehold.co/300x300/000000/FFF" },

            // Decine 10-19
            "10": { nome: "tasso", immagine: "https://placehold.co/300x300/111111/FFF" },
            "11": { nome: "tette", immagine: "memory-trainer/images/tette.png" },
            "12": { nome: "tonno", immagine: "https://placehold.co/300x300/111111/FFF" },
            "13": { nome: "dama", immagine: "https://placehold.co/300x300/111111/FFF" },
            "14": { nome: "toro", immagine: "https://placehold.co/300x300/111111/FFF" },
            "15": { nome: "telo", immagine: "https://placehold.co/300x300/111111/FFF" },
            "16": { nome: "doccia", immagine: "https://placehold.co/300x300/111111/FFF" },
            "17": { nome: "tacco", immagine: "https://placehold.co/300x300/111111/FFF" },
            "18": { nome: "duff", immagine: "https://placehold.co/300x300/111111/FFF" },
            "19": { nome: "toppa", immagine: "https://placehold.co/300x300/111111/FFF" },

            // Decine 20-29
            "20": { nome: "naso", immagine: "https://placehold.co/300x300/222222/FFF" },
            "21": { nome: "nido", immagine: "https://placehold.co/300x300/222222/FFF" },
            "22": { nome: "nano", immagine: "https://placehold.co/300x300/222222/FFF" },
            "23": { nome: "nemo", immagine: "https://placehold.co/300x300/222222/FFF" },
            "24": { nome: "nero", immagine: "https://placehold.co/300x300/222222/FFF" },
            "25": { nome: "nilo", immagine: "https://placehold.co/300x300/222222/FFF" },
            "26": { nome: "nachos", immagine: "https://placehold.co/300x300/222222/FFF" },
            "27": { nome: "gnocco", immagine: "https://placehold.co/300x300/222222/FFF" },
            "28": { nome: "nave", immagine: "https://placehold.co/300x300/222222/FFF" },
            "29": { nome: "nappa", immagine: "https://placehold.co/300x300/222222/FFF" },

            // Decine 30-39
            "30": { nome: "mosè", immagine: "https://placehold.co/300x300/333333/FFF" },
            "31": { nome: "matto", immagine: "https://placehold.co/300x300/333333/FFF" },
            "32": { nome: "mano", immagine: "https://placehold.co/300x300/333333/FFF" },
            "33": { nome: "mamma", immagine: "https://placehold.co/300x300/333333/FFF" },
            "34": { nome: "mara", immagine: "https://placehold.co/300x300/333333/FFF" },
            "35": { nome: "mela", immagine: "memory-trainer/images/mela.png" },
            "36": { nome: "magia", immagine: "https://placehold.co/300x300/333333/FFF" },
            "37": { nome: "mago", immagine: "https://placehold.co/300x300/333333/FFF" },
            "38": { nome: "mafia", immagine: "https://placehold.co/300x300/333333/FFF" },
            "39": { nome: "mappa", immagine: "https://placehold.co/300x300/333333/FFF" },

            // Decine 40-49
            "40": { nome: "rosa", immagine: "https://placehold.co/300x300/444444/FFF" },
            "41": { nome: "radio", immagine: "https://placehold.co/300x300/444444/FFF" },
            "42": { nome: "rana", immagine: "https://placehold.co/300x300/444444/FFF" },
            "43": { nome: "roma", immagine: "https://placehold.co/300x300/444444/FFF" },
            "44": { nome: "horror", immagine: "https://placehold.co/300x300/444444/FFF" },
            "45": { nome: "rollo", immagine: "https://placehold.co/300x300/444444/FFF" },
            "46": { nome: "reggia", immagine: "https://placehold.co/300x300/444444/FFF" },
            "47": { nome: "rocca", immagine: "https://placehold.co/300x300/444444/FFF" },
            "48": { nome: "riva", immagine: "https://placehold.co/300x300/444444/FFF" },
            "49": { nome: "rapa", immagine: "https://placehold.co/300x300/444444/FFF" },

            // Decine 50-59
            "50": { nome: "liscio", immagine: "https://placehold.co/300x300/555555/FFF" },
            "51": { nome: "lotta", immagine: "https://placehold.co/300x300/555555/FFF" },
            "52": { nome: "lana", immagine: "https://placehold.co/300x300/555555/FFF" },
            "53": { nome: "lama", immagine: "https://placehold.co/300x300/555555/FFF" },
            "54": { nome: "lira", immagine: "https://placehold.co/300x300/555555/FFF" },
            "55": { nome: "lollo", immagine: "https://placehold.co/300x300/555555/FFF" },
            "56": { nome: "laccio", immagine: "https://placehold.co/300x300/555555/FFF" },
            "57": { nome: "lacca", immagine: "https://placehold.co/300x300/555555/FFF" },
            "58": { nome: "lava", immagine: "https://placehold.co/300x300/555555/FFF" },
            "59": { nome: "lupo", immagine: "https://placehold.co/300x300/555555/FFF" },

            // Decine 60-69
            "60": { nome: "gesù", immagine: "https://placehold.co/300x300/666666/FFF" },
            "61": { nome: "città", immagine: "https://placehold.co/300x300/666666/FFF" },
            "62": { nome: "cina", immagine: "https://placehold.co/300x300/666666/FFF" },
            "63": { nome: "gemma", immagine: "https://placehold.co/300x300/666666/FFF" },
            "64": { nome: "jerry (scotti)", immagine: "https://placehold.co/300x300/666666/FFF" },
            "65": { nome: "cella", immagine: "https://placehold.co/300x300/666666/FFF" },
            "66": { nome: "ciccia", immagine: "https://placehold.co/300x300/666666/FFF" },
            "67": { nome: "cicca", immagine: "https://placehold.co/300x300/666666/FFF" },
            "68": { nome: "ciuffo", immagine: "https://placehold.co/300x300/666666/FFF" },
            "69": { nome: "jeep", immagine: "https://placehold.co/300x300/666666/FFF" },

            // Decine 70-79
            "70": { nome: "cazzo", immagine: "memory-trainer/images/cazzo.png" },
            "71": { nome: "gatto", immagine: "https://placehold.co/300x300/777777/FFF" },
            "72": { nome: "cane", immagine: "https://placehold.co/300x300/777777/FFF" },
            "73": { nome: "game", immagine: "https://placehold.co/300x300/777777/FFF" },
            "74": { nome: "coro", immagine: "https://placehold.co/300x300/777777/FFF" },
            "75": { nome: "calo", immagine: "https://placehold.co/300x300/777777/FFF" },
            "76": { nome: "gaggi", immagine: "https://placehold.co/300x300/777777/FFF" },
            "77": { nome: "cacca", immagine: "https://placehold.co/300x300/777777/FFF" },
            "78": { nome: "gufo", immagine: "https://placehold.co/300x300/777777/FFF" },
            "79": { nome: "coppa", immagine: "https://placehold.co/300x300/777777/FFF" },

            // Decine 80-89
            "80": { nome: "vaso", immagine: "https://placehold.co/300x300/888888/FFF" },
            "81": { nome: "water", immagine: "https://placehold.co/300x300/888888/FFF" },
            "82": { nome: "vino", immagine: "https://placehold.co/300x300/888888/FFF" },
            "83": { nome: "fiamma", immagine: "https://placehold.co/300x300/888888/FFF" },
            "84": { nome: "faro", immagine: "https://placehold.co/300x300/888888/FFF" },
            "85": { nome: "falò", immagine: "https://placehold.co/300x300/888888/FFF" },
            "86": { nome: "faccia", immagine: "memory-trainer/images/viso.png" },
            "87": { nome: "vacca", immagine: "https://placehold.co/300x300/888888/FFF" },
            "88": { nome: "fava", immagine: "https://placehold.co/300x300/888888/FFF" },
            "89": { nome: "fap", immagine: "https://placehold.co/300x300/888888/FFF" },

            // Decine 90-99
            "90": { nome: "pasol", immagine: "https://placehold.co/300x300/999999/FFF" },
            "91": { nome: "piede", immagine: "https://placehold.co/300x300/999999/FFF" },
            "92": { nome: "pane", immagine: "https://placehold.co/300x300/999999/FFF" },
            "93": { nome: "bam", immagine: "https://placehold.co/300x300/999999/FFF" },
            "94": { nome: "pari", immagine: "https://placehold.co/300x300/999999/FFF" },
            "95": { nome: "palo", immagine: "https://placehold.co/300x300/999999/FFF" },
            "96": { nome: "bacio", immagine: "https://placehold.co/300x300/999999/FFF" },
            "97": { nome: "pacco", immagine: "https://placehold.co/300x300/999999/FFF" },
            "98": { nome: "puffo", immagine: "https://placehold.co/300x300/999999/FFF" },
            "99": { nome: "pipì", immagine: "https://placehold.co/300x300/999999/FFF" }

            // ... eccetera
        };
    }
    
    // Metodo per ottenere l'immagine dato un numero
    getImmagine(numero) {
        return this.conversioni[numero].nome;
    }

    //metodo per ottenere il percorso dell'immagine dato un numero
    getPercorsoImmagine(numero) {
        return this.conversioni[numero].immagine;
    }
}