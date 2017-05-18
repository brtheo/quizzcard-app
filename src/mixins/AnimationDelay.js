export default {
    methods: {
        
        /**
         * Retourne un style css particulier en fonction de l'index passé en paramètre, pour influer sur le delai d'apparition de l'item
         * @param {number} i 
         * @return {string}
         */
        $animationDelay (i) {
            return `animation-delay: ${(parseInt(i)+1)*0.05}s`
        }
    },

    /**
     * @event {no-delay} Réinitialise le delai 
     */
    mounted () {
        this.$on('$no-delay', _ => {
            this.$animationDelay = _ => `animation-delay: 0s`
        })
    }
}
