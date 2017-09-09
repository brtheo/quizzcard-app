import capitalize from "lodash/capitalize"

export default {

    /**
     * Retourne la string avec la premiere lettre en capitale
     * @param {string} Value
     * @return {string}
     */
    capitalize (v) {
        if(!v) return ''
        v = v.toString()
        return capitalize(v)
    },

    /**
     * Retourne la string en enlevant le snake_case
     * @param {string} Value 
     * @return {string}
     */
    no_snake (v) {
        if(!v) return ''
        v = v.toString()
        return v.replace(/_/g,' ')
    },

    /**
     * Retourne la string en snake_case
     * @param {string} Value
     * @return {string}
     */
    snake_case (v) {
        if(!v) return ''
        v = v.toString()
        return v.replace(/ /g,'_').toLowerCase()
    },

    /**
     * Retourne la string sans l'extension de fichier
     * @param {string} Value 
     * @return {string}
     */
    no_ext (v) {
        if(!v) return ''
        v = v.toString()
        return v.split('.')[0]
    },

    /**
     * Retourne la string tronquer avec ... en fin
     * @param {string} Value 
     * @return {string}
     */
    troncate_long (v) {
        if(!v) return ''
        v = v.toString()
        if(v.length >= 25)
            return v.substr(0,25) +'...'
        else return v
    }
}