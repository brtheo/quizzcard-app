<template>
    <div class="all-dico">

        <md-toolbar>
            <h2 class="md-title" style="flex: 1">Mes dictionnaires</h2>
            <router-link to="/">
                <md-button id="validate" class="md-icon-button md-warn resize-icon-med">
                    <md-icon>library_add</md-icon>
                    <md-tooltip class="decale" md-direction="bottom">Nouveau dictionnaire</md-tooltip>
                </md-button>
            </router-link>         
        </md-toolbar>

        <main>
            <md-progress v-if="playLoad" md-indeterminate md-theme="tealy" class="play-load"></md-progress>  

            <transition-group tag="div" class="md-layout" name="bounceRight" appear>
                <md-layout md-flex-medium="100" md-flex-large="33" md-flex-xlarge="25" :style="$animationDelay(i)" v-for="name,i in allDicoName" :key="i">
                    <md-table-card style="flex:1" class="dico-container">

                        <md-toolbar>
                            <md-icon class="sub-corner noselect" >book</md-icon>
                            <h1 class="md-title" >{{ name | capitalize | no_snake }}</h1>

                            <md-button class="md-icon-button md-primary" md-theme="tealy" @click.native="loadDico">
                                <md-icon>cached</md-icon>
                                <md-tooltip class="limy" md-direction="bottom">Charger</md-tooltip>
                            </md-button>

                            <md-button class="md-icon-button md-primary resize-icon-med" md-theme="tealy" @click.native="playDico">
                                <md-icon>play_for_work</md-icon>
                                <md-tooltip class="limy" md-direction="bottom">Jouer</md-tooltip>
                            </md-button>
                            
                            <md-button class="md-icon-button md-primary indown" md-theme="tealy" @click.native="downloadDico">
                                <md-icon>file_download</md-icon>
                                <md-tooltip class="limy" md-direction="bottom">Télécharger</md-tooltip>
                            </md-button>

                        </md-toolbar>

                        <div v-if="preloaded[name]">
                            <dico v-if="preloaded[name].preload" :diconame="preloaded[name].name"></dico>
                            <md-progress v-else md-indeterminate md-theme="tealy" class="dico-load"></md-progress>
                        </div>

                    </md-table-card>
                </md-layout>
            </transition-group>
            
            <md-layout md-align-medium="start" md-align-large="center" md-align-xlarge="center" >
                <md-layout md-flex-medium="100" md-flex-large="70" md-flex-xlarge="50">
                    <md-card class="upload-container inup resize-icon">
                        <input class="input-file" id="upload" @dragenter="dragEnter" @dragleave="dragLeave" type="file" accept=".json" @change="uploadDico" multiple>
                        <label for="upload" class="input-file-trigger">
                            <md-icon>file_upload</md-icon>
                            <p>glisser-déposer un dictionnaire ou cliquer (.json)</p>
                        </label>
                    </md-card>
                </md-layout>
            </md-layout>

            <transition-group tag="div" name="fadeDown" class="uploaded" appear>
                <div v-for="a,i in toasts" class="upload-done"  :key="i" v-if="uploadDone" :style="$animationDelay(i*3)">
                    <md-icon>{{a.icon}}</md-icon>
                    {{a.message | capitalize}}
                </div>
            </transition-group>

        </main>

    </div>
</template>

<script>
    import DicoStore from '../store/DicoStore'
    import Dico from './Dico.vue'
    import AnimationDelay from '../mixins/AnimationDelay'
    import fileSaver from 'browser-filesaver/fileSaver.js'
    import rename from 'rename-keys'

    const saveAs = fileSaver.saveAs

    export default {
        components: { Dico},
        mixins: [AnimationDelay],
        data () {
            return {
                state: DicoStore.state, /** State commun avec tout les composants **/
                preloaded: {}, /** Composant courant 'Dico' pré-chargé **/
                playLoad: false, /** Détermine l'affichage de la barre de chargement avant de jouer **/
                uploadDone: false, /** Détermine si l'upload est fini **/
                toasts: [], /** Tableau de notif du fichier uploadé**/
            }
        },
        watch: {
            /**
              * Surveille des changements sur la valeur this.uploadDone 
              * pour la réinitialiser au bout de 1.5 secondes et vider le grille-pain
              * @param {boolean} valeur de this.uploadDone
              * @return  {void}
              */
            uploadDone(b) {
                if(b) setTimeout( _ => {this.uploadDone = false; this.toasts = []}, 1500)
            }
        },
        computed: {
            allDicoName: {
                /**
                  * Getter de la propriété allDicoName qui renvoi un tableau de tout les noms de dictionnaire 
                  * @returns  {array} 
                  */
                get () {return Object.keys(this.state.dico)},
                /**
                  * Setter de la propriété allDicoName qui ajoute au tableau de nom la valeur passé en paramètre
                  * @param {string} nom de dictionnaire
                  */
                set (v) {this.allDicoName.push(v)}
            }
        },
        methods: {
            /**
              * Retourne le contenu de l'élément HTML title (Nom du dictionnaire) en snake_case
              * @param {object}  élément HTML
              * @returns  {string} nom de dictionnaire
              */
            $Name (e) {
                let $title = e.parentNode.querySelector('.md-title').textContent
                return this.$options.filters.snake_case($title)
            },
            /**
              * @event {dragenter} Ajoute une classe css pour émuler le comportement ':hover' au survol avec fichier
              * @param {object}  élément HTML
              * @returns  {void} 
              */
            dragEnter (e) {
                e.currentTarget.parentNode.classList.add('js-upload-container-hover')
            },
            /**
              * @event {dragleave} Retire la classe css 
              * @param {object}  élément HTML
              * @returns  {void} 
              */
            dragLeave (e) {
                e.currentTarget.parentNode.classList.remove('js-upload-container-hover')
            },
            /**
              * @event {click} Charge le composant Dico.vue correspondant au nom du dictionnaire
              * @param {object}  élément HTML
              * @returns  {void} 
              */
            loadDico (e) {
                let $e = e.currentTarget /** Element HTML cible **/    
                let c = 2 /** Compteur pour timer **/
                let to = null /** Timer **/
                let to_fn = _ => { /** Fonction du timer **/
                    /** Début du timer, s'arrete après c * 450 micro-secondes soit 900 ms **/
                    if(c !== 0) { c--; to = setTimeout( to_fn, 450);} 
                    /** Fin du timer, le composant Dico.vue est bien chargé, réinitialisation du timer, mise à jour de la vue global **/
                    else {this.preloaded[this.$Name($e)].preload = true; clearTimeout(to); this.$forceUpdate();} 
                }

                $e.classList.add('inload')
                /** Attribution des valeurs par défaut au composant Dico.vue préchargé **/
                this.preloaded[this.$Name($e)] = {preload: false, name: this.$Name($e)}

                to_fn() /** Timer de 900 ms **/
                this.$forceUpdate() /** Mise à jour de la vue global **/
            },
            /**
              * @event {click} Change le nom du dictionnaire courant dans le state commun et charge la vue Quizzcard
              * @param {object}  élément HTML
              * @returns  {void} 
              */
            playDico (e) {
                let $e = e.currentTarget /** Cible de l'évenement **/
                this.state.chosedDico = this.$Name($e) /** Change le nom du dictionnaire courant du state commun par le du dico cliqué **/
                $e.classList.add('inplay') 
                this.playLoad = true /** Affichage de la barre de chargement **/
                setTimeout( _ => this.$router.push('/quizzcard'), 450 ) /** Après un chargement de 450 ms, la vue Quizzcard est chargé **/
            },
            /**
              * @event {click} Télécharge le dictionnaire au format JSON
              * @param {object}  élément HTML
              * @returns  {void} 
              */
            downloadDico (e) {
                let $e = e.currentTarget /** Cible du click **/
                /** Ecriture d'un nouveau 'Binary Large Object' -fichier- avec la string JSON du dictionnaire courant **/
                let blob = new Blob( [ DicoStore.getDicoToString(this.$Name($e)) ], {type: 'application/json;charset="utf-8"'} )
                saveAs(blob, `${this.$Name($e)}.json`) /** Enregistrement local du dicotionnaire au format JSON **/
            },
            /**
              * @event {click} Upload d'un ou plusieurs dictionnaire au format JSON et ajout a la vue courante
              * @param {object}  élément HTML
              * @returns  {void} 
              */
            uploadDico (e) {
                let files = e.target.files /** Cible du click **/
                this.uploadDone = true /** Upload éffectué **/
                
                /** Pour tout les fichiers **/
                for(let f of files) { 
                    let reader = new FileReader() /** Objet pour lire un fichier **/
                    reader.onload = e => this.readFile(e,f) /** Fonction de lecture **/
                    reader.readAsText(f) /** Fin de la lecture **/
                }
                e.value = ''
            },
            /**
              * Lecture d'un dictionnaire au format JSON 
              * @param {object}  evenement de lecture
              * @param {object}  fichier à lire
              * @returns  {void} 
              */
            readFile (e,f) {
                let dico = JSON.parse(e.target.result) /** Objet contenant le dico lu  **/
                let diconame = Object.keys(dico)[0] /** Nom du dico **/
                let fname = this.$options.filters.no_ext(f.name) /** Nom du fichier sans l'extension .json **/               
                fname = this.$options.filters.snake_case(fname) /** Nom du fichier en snake_case **/   

                /** Si le nom du dictionnaire (donnée json) est différente du nom du fichier, 
                  * remplace la donnée json par le nom du fichier et ré-attribution de diconame
                  */
                if(diconame !== f.name) {dico = rename(dico, key => key = fname); diconame = Object.keys(dico)[0]}

                /** Si le dico uploadé est différent des dico déjà existant **/
                if(!this.allDicoName.filter( str => str === diconame).length) {
                    this.allDicoName = fname /** Ajout du nom du dictionnaire dans la vue courante pour permettre de le pré-chargé **/
                    this.toasts.push({message:`${fname} - ajouté`, icon: 'add'})
                }
                else this.toasts.push({message: `${fname} - mis à jour`, icon: 'update'})

                this.state.dico = Object.assign(this.state.dico, dico) /** Fusion de l'objet dico du state commun avec le dico uploadé **/
            }
        }
    }
</script>

<style lang="scss">
    @import '../scss/sass-material-colors';

    .all-dico {
        .uploaded {
            position: absolute;
            bottom: 10px;
            display: flex;
            align-content: center;
            flex-direction: row;
            font-size: 20px;
            color: white;
            .upload-done {
                margin-right: 15px;
                background: mdc('grey','800');
                padding: 15px;
                border-radius: 30px;
                i{ white: !important}
            }
        }
        main {    
            overflow-y: auto;
            .md-table-card, .upload-container, .uploaded  {
                margin: 15px;
                .md-icon {
                    color: mdc('grey','700');
                }
                .sub-corner {
                    color: mdc('grey','400');
                    transform: translate3d(-15px, 0px, 0);
                    font-size: 40px;
                }
            }
            .md-layout {
                align-items: flex-start;
            }
            .js-upload-container-hover {
                border: mdc('grey','300') 5px dashed;
                box-shadow: none;
                label {
                    i,p {color: mdc('grey','300') !important;}
                    i {transform: translateY(-7px);}
                }
                
            }
            .upload-container {
                width: 100%;
                height: 100px;
                border-radius: 5px;
                position: relative;
                transition: border 0.3s, box-shadow 0.5s;
                &:hover {
                    border: mdc('grey','300') 5px dashed;
                    box-shadow: none;
                    label {
                        i,p {color: mdc('grey','300') !important;}
                    }
                }
                .input-file {
                    position: absolute;
                    height: 100%;
                    opacity: 0;
                    width: 100%;
                    color: transparent;       
                    z-index: 500;        
                }
                label {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate3d(-50%,-50%,0);
                    font-size: 20px;
                    width: 100%;
                    text-align: center;
                    transition: color 0.2s
                }
                .input-file, label {cursor: pointer;}
            }
        }
    }
    .play-load, .dico-load {
        position: absolute !important;
    }
    .dico-load {
        top:  60px ;
    }
    .inup {
        i{transition: transform 0.5s;}
        &:hover {i{transform: translateY(-7px);}}  
    }
    .indown {
        i{transition: transform 0.5s;}
        &:hover {i{transform: translateY(7px);}}    
    }
    .inplay {
        i {
            animation: sweetPlay 1s ;
        }
    }
    .inload {
        animation: sweetLoad 1s forwards;
    }
    @keyframes sweetLoad {
        from { transform: none; opacity: 1}
        to { transform: rotate(-180deg); opacity:0;}
    }
    @keyframes sweetPlay {
        0% { transform: none;}
        50% { transform: translateY(7px);}
        100% {transform: none;}
    }
</style>