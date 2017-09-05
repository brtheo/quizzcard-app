/**
 * 
 * Classe ayant un state commun avec tout les composants Vue de l'application
 * 
 * @class DicoStore
 */
class DicoStore {
    /**
     * Constructeur de {@link DicoStore}
     * 
     * @property {object} state à partagé avec les composants
     * 
     */
    constructor () {
        this.state = {
            /** Nom du dictionnaire courant **/
            "chosedDico": "default",
            /** Créer un objet qui contiendra les dictionnaires **/
            "dico": {
                /**
                 * @key {string} nom du dictionnaire
                 * @value {array} chaque entrée du dictionnaire
                 */
                "default": [
                    {
                        "res": "1+1",
                        "req": "11"
                    },
                    {
                        "res": "bonjour",
                        "req": "hello"
                    },
                    {
                        "res": "Question of Life, the Universe, and Everything",
                        "req": "42"
                    },
                    {
                        "res": "sqrt(PI)",
                        "req": "1.7724538509055159"
                    }
                ]
            }
        }
    }
    /**
     * Retourne le dictionnaire courrant définie par {@link DicoStore.state.chosedDico}
     * 
     * @returns {array} Le dictionnaire 
     * 
     */
    getDico () {
        return this.state.dico[this.state.chosedDico]
    }
    /**
     * 
     * Retourne le nom du dictionnaire courant définie par {@link DicoStore.state.chosedDico}
     * 
     * @returns {string} Le nom du dictionnaire
     * 
     */
    getDicoName () {
        return this.state.chosedDico
    }
    /**
     * 
     * Retourne le dictionnaire correspondant au nom passé en paramètre
     * 
     * @param {string} name 
     * @returns {array} Le dictionnaire
     * 
     */
    getDicoByName (name) {
        return this.state.dico[name]
    }
    /**
     * 
     * Retourne le dictionnaire correspondant au nom passé en paramètre sous forme 
     * de string JSON, en remplaçant %name% par le nom passé en paramètre
     * 
     * @param {string} name 
     * @returns  {string}
     * 
     */
    getDicoToString(name) {
        return JSON.stringify({'%name%':this.state.dico[name]}).replace('%name%',name)
    }
}
    /**
     * 
     * Exporte une nouvelle instance de {@link DicoStore}
     * 
     */
export default new DicoStore()
