<template>
    <div class="add_dico">
        <md-toolbar>

            <md-button class="md-fab md-raised md-accent fab-down" @click.native="add">
                <md-icon>add</md-icon>
            </md-button>

            <md-input-container>
                 <label>Nom du dictionnaire</label>
                <md-input v-model="dicoName" :value="dicoName"></md-input>
            </md-input-container>

            <md-input-container >
                <label>Nombre de lignes</label>
                <md-input :value="n" v-on:keyup.native="changeLines"></md-input>
            </md-input-container>

            <md-button id="validate" class="md-icon-button md-warn" @click.native="addThisDico">
                <md-icon>{{ dynamicIcon.icon }}</md-icon>
                <md-tooltip md-direction="bottom">{{ dynamicIcon.tooltip | capitalize }}</md-tooltip>
            </md-button>

            <router-link to="all-dico">
                <md-button class="md-icon-button  md-warn" >
                    <md-icon>collections_bookmark</md-icon>
                    <md-tooltip md-direction="bottom">Voir mes dictionnaires</md-tooltip>
                </md-button>
            </router-link>

            <router-link to="quizzcard">
                <md-button class="md-icon-button  md-warn resize-icon" :disabled="notYetAdded">
                    <md-icon >play_for_work</md-icon>
                    <md-tooltip class="decale" md-direction="bottom">Utiliser ce dictionnaire</md-tooltip>
                </md-button>  
            </router-link>

        </md-toolbar>

        <main>
            <form novalidate @submit.stop.prevent>
            <transition-group tag="form" name="bounceRight" appear novalidate @submit.stop.prevent>
                <div class="group" v-for="(nb, i) in n" :key="i" :style="$animationDelay(i)">
                    <md-input-container v-uni-data-uuid="'ic'+i" ref="rqrs" md-theme="tealy">
                        <label>{{i+1}} - Question</label>
                        <md-input></md-input>
                    </md-input-container>
                    <md-input-container v-uni-data-uuid="'ic'+i" ref="rqrs" md-theme="limy">
                        <label>{{i+1}} - Réponse</label>
                        <md-input></md-input>
                    </md-input-container>
                </div>
                </transition-group>
            </form>

        </main>
        <md-dialog ref="dialog">
            <md-dialog-title>{{ dialog.title }}</md-dialog-title>
            <md-dialog-content>{{ dialog.content }}</md-dialog-content>
            <md-dialog-actions>
                <md-button class="md-accent" @click.native="$refs.dialog.close()">Ok</md-button>
            </md-dialog-actions>
        </md-dialog>
    </div>
</template>

<script>
    import DicoStore from '../store/DicoStore'
    import AnimationDelay from '../mixins/AnimationDelay'

    export default {
        mixins: [AnimationDelay],
        name: "AddDico",
        data () {
            return {
                dicoName: 'Mon nouveau dictionnaire', /** Nom par défaut de nouveau dictionnaire **/
                notYetAdded: true, /** Définie l'état de l'ajout **/
                n: 5, /** Nombre d'entrée -ligne- question/réponse **/
                dynamicIcon: {icon: 'library_add', tooltip: 'Ajouter ce dictionnaire'}, 
                dialog: {title:'Veuillez remplir au moins une question/réponse',content:''},
                state: DicoStore.state /** State commun **/
            }
        },
        methods: {
            /**
              * @event {keyup} Change dynamiquement le nombre de ligne sans perte 
              * @param {object} element HTML
              * @returns  {void} 
              */
            changeLines (e) {
                /** S'il y a bien une valeur **/
                if(e.target.value.length !== 0) {
                    let n = parseInt(e.target.value)
                    this.n = this.n+(n-this.n)
                    this.$emit('$no-delay')
                }
            },
            /**
              * @event {click} Augmente le nombre de ligne
              * @returns  {void} 
              */
            add () {
                this.n++
                this.$emit('$no-delay')
            },
            /**
              * @event {click} Ajoute le dictionnaire tout juste créer au state commun
              * @returns  {void} 
              */
            addThisDico () { 
                let ig = this.$refs.rqrs.map( VueComp => VueComp.$el ) /** Tableau contenant toute les entrée **/
                let dico = [] /** Dico qui sera ajouté **/
                let processedName = this.$options.filters.snake_case(this.dicoName) /** Nom en snake_case **/

                /** Si la première entrée n'est pas remplis **/
                if(ig[0].children[1].value === "" || ig[1].children[1].value === "") 
                    this.$refs.dialog.open()       
                else {   
                    for(let i in ig) {
                        i = parseInt(i) 
                        /** Si pas le dernier élement **/
                        if(i+1 < ig.length) {
                            /** Si id d'un élement est égale au prochain **/
                            if (ig[i].dataset.uuid === ig[i+1].dataset.uuid) {
                                ig = ig.filter( e => e.children[1].value !== "") /** Retire les entrées vide **/

                                /** Ajout du dictionaire créer **/
                                dico.push({uuid: ig[i].dataset.uuid, req: ig[i].children[1].value, res: ig[i+1].children[1].value})
                                this.notYetAdded = false /** Etat de l'ajout confirmé **/
                                this.state.dico[processedName] = dico /** Ajout du dico créer au state commun **/
                                this.state.chosedDico = processedName /** Changement du nom du dictionnaire courant dans le state commun **/
                                this.dynamicIcon = {icon: 'border_color', tooltip: 'éditer'} 
                                this.dialog = {title: 'Dictionnaire ajouté',content: 'Vous pouvez continuer à l\'éditer'}
                                this.$refs.dialog.open()
                            }
                        }
                    }
                }
            }
        }
    }
</script>

<style lang="scss">
    @import '../scss/sass-material-colors';

    .add_dico {
        main {
            overflow-y: scroll;
            padding-top: 20px;
            overflow-x: hidden;
            .group {
                margin: 0 8px;
                display: flex;
                flex-flow: row wrap;
            }
        }
    }
    .md-button:not(:disabled){
        .md-icon {color: white;}
    }
    .md-button:disabled {
        .md-icon{color: mdc('grey','300')}
    }

    .md-toolbar {
        display: flex;
        flex-flow: row wrap;
    }
    .md-input-container {
        padding: 0 8px;
        width: 15% !important;
        flex: 1 0 15%;
    }
    .fab-down {
        position: absolute;
        transform: translateY(35px)
    }
</style>