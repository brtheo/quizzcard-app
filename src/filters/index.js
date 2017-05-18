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
    }
}