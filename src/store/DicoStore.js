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
            "chosedDico": "def2",
            /** Créer un objet qui contiendra les dictionnaires **/
            "dico": {
                /**
                 * @key {string} nom du dictionnaire
                 * @value {array} chaque entrée du dictionnaire
                 */
                "default": [
                    {
                        "res": "manger",
                        "req": "\uba39\ub2e4"
                    },
                    {
                        "res": "boire",
                        "req": "\ub9c8\uc2dc\ub2e4"
                    },
                    {
                        "res": "manger",
                        "req": "\uba39\ub2e4"
                    },
                    {
                        "res": "boire",
                        "req": "\ub9c8\uc2dc\ub2e4"
                    },
                    {
                        "res": "manger",
                        "req": "\uba39\ub2e4"
                    },
                    {
                        "res": "boire",
                        "req": "\ub9c8\uc2dc\ub2e4"
                    },
                    {
                        "res": "manger",
                        "req": "\uba39\ub2e4"
                    },
                    {
                        "res": "lire",
                        "req": "\uc77d\ub2e4"
                    },
                    {
                        "res": "apprendre",
                        "req": "\uacf5\ubd80\ud558\ub2e4"
                    },
                    {
                        "res": "manger",
                        "req": "\uba39\ub2e4"
                    },
                    {
                        "res": "boire",
                        "req": "\ub9c8\uc2dc\ub2e4"
                    },
                    {
                        "res": "lire",
                        "req": "\uc77d\ub2e4"
                    },
                    {
                        "res": "apprendre",
                        "req": "\uacf5\ubd80\ud558\ub2e4"
                    },
                    {
                        "res": "manger",
                        "req": "\uba39\ub2e4"
                    },
                    {
                        "res": "boire",
                        "req": "\ub9c8\uc2dc\ub2e4"
                    },
                    {
                        "res": "lire",
                        "req": "\uc77d\ub2e4"
                    },
                    {
                        "res": "apprendre",
                        "req": "\uacf5\ubd80\ud558\ub2e4"
                    },
                    {
                        "res": "manger",
                        "req": "\uba39\ub2e4"
                    },
                    {
                        "res": "boire",
                        "req": "\ub9c8\uc2dc\ub2e4"
                    },
                    {
                        "res": "lire",
                        "req": "\uc77d\ub2e4"
                    },
                    {
                        "res": "apprendre",
                        "req": "\uacf5\ubd80\ud558\ub2e4"
                    },
                    {
                        "res": "boire",
                        "req": "\ub9c8\uc2dc\ub2e4"
                    },
                    {
                        "res": "lire",
                        "req": "\uc77d\ub2e4"
                    },
                    {
                        "res": "apprendre",
                        "req": "\uacf5\ubd80\ud558\ub2e4"
                    },
                    {
                        "res": "apprendre",
                        "req": "\uacf5\ubd80\ud558\ub2e4"
                    },
                    {
                        "res": "apprendre",
                        "req": "\uacf5\ubd80\ud558\ub2e4"
                    },
                    {
                        "res": "apprendre",
                        "req": "\uacf5\ubd80\ud558\ub2e4"
                    },
                    {
                        "res": "apprendre",
                        "req": "\uacf5\ubd80\ud558\ub2e4"
                    },
                    {
                        "res": "apprendre",
                        "req": "\uacf5\ubd80\ud558\ub2e4"
                    },
                    {
                        "res": "apprendre",
                        "req": "\uacf5\ubd80\ud558\ub2e4"
                    }
                ],
                "def2": [
                    {
                        "res": "manger",
                        "req": "\uba39\ub2e4"
                    },
                    {
                        "res": "boire",
                        "req": "\ub9c8\uc2dc\ub2e4"
                    },
                    {
                        "res": "lire",
                        "req": "\uc77d\ub2e4"
                    },
                    {
                        "res": "apprendre",
                        "req": "\uacf5\ubd80\ud558\ub2e4"
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
