<template>
	<div class="quizzcard">
  	<md-toolbar>
    	<h2 class="md-title" style="flex: 1" >{{ dicoName | capitalize | no_snake }}</h2>
      <md-button md-theme="tealy" class="md-raised md-primary" @click.native="validate('dialog1')">
        Valider
      </md-button>
    </md-toolbar>

    <main>

      <transition-group tag="div" class="md-layout md-row" name="bounceRight" appear>
				<md-layout v-for="word,i in shuffledDico" :style="$animationDelay(i)" :key="i">
					<button :data-res="word.res" @click="cardClick" ref="reqw" class="req-word btncard" >
						<md-card md-with-hover class="btncard_content">
							<span class="corner"></span>
							<md-card-header>
								<div :class="word.req.length >= 22 ? 'md-title toolong' : 'md-title center'"> {{ word.req }} </div>
							</md-card-header>
						</md-card>
					</button>
				</md-layout>	
      </transition-group>

      <transition-group tag="div" class="md-layout md-row" md-align-start name="bounceRight" appear>
				<md-layout v-for="word,i in shuffledDico2" :style="$animationDelay(i)" :key="i">
					<button :data-req="word.res" @click="cardClick" ref="resw" class="res-word btncard" disabled>
						<md-card md-with-hover class="btncard_content">
							<span class="corner"></span>
							<md-card-header>
								<div :class="word.res.length >= 22 ? 'md-title toolong' : 'md-title center'"> {{ word.res }} </div>
							</md-card-header>
						</md-card>
					</button>
				</md-layout>
      </transition-group>	

    </main>

    <footer>
      
    </footer>

  	<md-dialog  ref="dialog">

      <md-dialog-title>{{ dialog.title | capitalize }}</md-dialog-title>
      <md-dialog-content>{{ dialog.content }}</md-dialog-content>
      <md-dialog-actions>
        <md-button v-if="!gg" class="md-primary" @click.native="$refs.dialog.close">Voir mes erreurs</md-button>
        <md-button class="md-primary" @click.native="reload">Recommencer</md-button>
      </md-dialog-actions>

    </md-dialog>

  </div>
</template>

<script>
  import shuffle from "lodash/shuffle"
  import randomMC from "random-material-color"
  import DicoStore from "../store/DicoStore"
  import mdcolorPalette from "../../utils/mdcolor-palette"
  import AnimationDelay from '../mixins/AnimationDelay'

  export default {
    name: 'quizzcard',
    mixins: [AnimationDelay],
    data () {
      return {
        dialog: {title: null, content: null}, /** Dialog box **/
        gg: false, /** Definie la victoire à 100% ou non **/
        clickRes: 0, /** Nombre de clique sur une carte **/
        currentColor: "", /** Couleur de la précédente carte cliqué **/
        currentRes: "", /** Réponse de la précédente carte cliqué **/
        usedColor: ['#9E9E9E','#E53935'], /** Lots de couleurs à ne pas utilisé dans la génération aléatoire de couleur de carte **/
        responses: {}, /** Réponses actuelles **/
        dicoName: DicoStore.getDicoName(), /** Nom du dictionnaire courant **/
        dico: DicoStore.getDico(), /** Dictionnaire courant **/
        note: [ /** Tableau indicatif score - message **/
          { n: 100, m: 'bravo !'},
          { n: 75, m: 'tu y es presque'},
          { n: 50, m: 'ça peut aller'},
          { n: 30, m: 'ce n\' est pas bien du tout !'}      
        ],
      }
    },
    computed: {
      /**
        * 
        * Retourne un mélange aléatoire du dictionnaire courant 
        * 
        * @returns  {array}
        * 
        */
      shuffledDico () {
        return shuffle(this.dico)
      },
      /**
        * 
        * Retourne un nouveau mélange aléatoire
        * 
        * @returns  {array}
        * 
        */
      shuffledDico2 () {
        return shuffle(this.shuffledDico)
      }
    },
    methods: {
       /**
        * 
        * Applique des modifications à l'élément passé en paramètre
        *
        * @param {object} élément HTML
        */
      $DOMmods (e) {
        e.style.borderColor = `transparent ${this.currentColor} transparent transparent` 
        e.style.color = this.currentColor
        e.classList.add('checkmark')
      },
      /**
        * 
        * Applique des modifications à l'élément passé en paramètre
        *
        * @param {object} élément HTML
        */
      $DOMmods2 (e) {
        e.style.borderColor = "transparent #ff6e6e transparent transparent"
        e.classList.remove('checkmark')
        e.classList.add('crossmark')
      },
      /**
        * 
        * Réinitialise les éléments du DOM modifiés
        *
        */
      $DOMreset () {
        this.switchy('req')
        this.$Corner().forEach( $e => {
          $e.style.borderColor = "transparent transparent transparent transparent"
          $e.classList.remove('checkmark')
          $e.classList.remove('crossmark')
        })
      },
      /**
        * 
        * Retourne l'élément HTML '.corner' situé deux niveaux plus bas que l'élément passé en paramètre
        * ou retourne tout les '.corner'
        * 
        * @param {object} élément HTML
        * @returns {object} élément '.corner' 
        * @returns {array} tableau d'éléments '.corner' 
        *
        */
      $Corner (e) {
        if(e) return e.childNodes[0].childNodes[0]
        else return document.querySelectorAll('.corner')
      },
      /**
        * 
        * Réinitialise les données 
        *
        */
      _DataReset () {   
        this.dialog = {title: null, content: null}
        this.gg = false
        this.clickRes = 0
        this.currentColor = ''
        this.currentRes = ''
        this.usedColor = ['#9E9E9E']
        this.responses = {}
      },
      /**
        * 
        * Définie si les réponses ou les questions seront cliquable ou rien du tout
        *
        * @param {string} type du switch
        */
      switchy (type) {
        switch(type) {
          case 'res':
            this.$refs.resw.forEach( $e => $e.disabled = false)
            this.$refs.reqw.forEach( $e => $e.disabled = true)
            break
          case 'req':
            this.$refs.reqw.forEach( $e => $e.disabled = false)
            this.$refs.resw.forEach( $e => $e.disabled = true)
            break
          case 'ALL YOUR BASE ARE BELONG TO US': 
            this.$refs.reqw.forEach( $e => $e.disabled = true)
            this.$refs.resw.forEach( $e => $e.disabled = true)
            break
        }
      },
      /**
        * 
        * Déclenché par l'évènement 'click' sur une carte question ou réponse
        *
        * @param {object} évènement 'click'
        */
      cardClick (e) {
        let $e = e.currentTarget /** Element HTML correspondant à la cible de l'événement **/
        let $corner = this.$Corner($e) /** Element '.corner' de la cible **/
        this.clickRes++

        switch(this.clickRes) {
          case 0: 
            break
          case 1:
            /** Génère une couleur material design aléatoire en ométtant les couleurs ignorées **/
            this.currentColor = randomMC.getColor({palette: mdcolorPalette,ignoreColors: this.usedColor})

            this.usedColor.push(this.currentColor) /** Ajoute la couleur généré dans les couleurs utilisées pour éviter les doublons **/

            this.$DOMmods($corner) /** Applique des modifications sur '.corner' **/
            this.switchy('res') /** Passage aux réponses **/

            this.currentRes = $e.dataset.res /** Definie la réponse courante par la réponse de la cible **/

            /** Si la réponse courante n'a pas encore étée définie, création de celle ci **/
            if(!this.responses.hasOwnProperty(this.currentRes)) {
              this.responses[this.currentRes] = {}
              this.responses[this.currentRes].res = $e.dataset.res
            }
            /** Sinon ré-attribution de la valeur de la réponse **/
            else
              this.responses[this.currentRes].res = $e.dataset.res
            
            break
          case 2:
            this.$DOMmods($corner) /** Applique des modifications sur '.corner' **/
            this.switchy('req') /** Passage aux questions **/

            this.responses[this.currentRes].req = $e.dataset.req /** Attribution de la valeur la question **/

            this.currentRes = "" /** Réinitialisation de la réponse courante  **/

            this.clickRes = 0 /** Réinitialisation du nombre de clique  **/
            break
          default:
            this.clickRes = 0 /** Réinitialisation du nombre de clique, pour être sûr  **/
            break
        }
      },
      /**
        * 
        * Déclenché par l'évènement 'click' sur le bouton de validation du questionnaire
        *
        * @return {void}
        */
      validate () {
        this.$refs.dialog.open() /** Ouverture de la dialog box **/
        let pons = Object.keys(this.responses).map( o => this.responses[o]) /** Passage d'un objet à un tableau **/
        let c = 0 /** Compte des bonnes réponses **/
        let p = 0 /** Pourcentage de bonnes réponses **/

        /** Verification : si la taille du tableau des réponses est différente de la taille du dictionnaire courant **/
        if(pons.length != this.dico.length) this.dialog.title = "Veuillez répondre a toutes les questions"
        /** Tout est bon, on fait le traitement **/
        else {
          pons.forEach( o => {
            /** Bonne réponse **/
            if(o.req === o.res) c++
            /** Mauvaise réponse **/
            else {
              /** Applique des modifications sur les éléments '.corner' des cartes questions et réponses pour signifier la mauvaise réponse **/
              this.$refs.reqw.forEach( $e => { let $corner = this.$Corner($e); if($e.dataset.res === o.res) { this.$DOMmods2($corner)} })
              this.$refs.resw.forEach( $e => { let $corner = this.$Corner($e); if($e.dataset.req === o.req) { this.$DOMmods2($corner)} })
            }
          })

          p = ((c*100)/pons.length).toFixed(2) /** Calcul pourcentage **/
          this.gg = p.includes('100') ? true : this.gg /** Si 100% de bonne réponses, this.gg devient vrai **/

          /** Définition du message à afficher en fonction de sa note **/
          for(let o of this.note) {
            if(p <= o.n) this.dialog.title = o.m
            else break
          }

          this.dialog.content = `Vous avez ${p}% de bonne réponses` /** Affiche le pourcentage de bonne réponse **/
          this.switchy('ALL YOUR BASE ARE BELONG TO US') /** Une fois validé, tout le questionnaire devient inutilisable **/
        }
      },
      /**
        * 
        * Déclenché par l'évènement 'click' sur le bouton 'retry' de la dialogbox
        * 
        */
      reload () {
        this.$DOMreset()
        this._DataReset()
        this.$refs.dialog.close()
      }
    }
  }
</script>

<style lang="scss">
  @import '../scss/sass-material-colors';

  .quizzcard {
    main {
      display: flex;
      align-items: stretch;
      align-content: center;
      flex-direction: row;
      margin-top: 10px;

      .btncard {
        cursor: pointer;
        font-family: "Roboto";
        background: white;
        border: 0px;
        color: mdc('grey','900');
      }
      .btncard:disabled  {
        cursor: not-allowed;
        .btncard_content {
          color: mdc('grey');
          background: mdc('grey','300');
          box-shadow: none;
          cursor: not-allowed;
          &:hover {
            box-shadow: none;
          }
          .corner {
            border-color: transparent;
            &:before {
              background: mdc('grey','300');  
              box-shadow: 0 0 1px 0px mdc('grey','300') inset, 0 0 1px 0px mdc('grey','300');
            }
          } 
        }
      }
			.btncard {
				font-size: 20px !important;
				height: 75px;
				width: 300px;
				&_content {
					height: 75px;
          .md-card-header:last-child {margin-bottom: 0px !important;}
          .md-card-header {padding: 0px !important;}
					.corner{
						transition: border-color 0.2s;
						position: absolute;
						right: 0;
						width: 0;
						height: 0;
						border-style: solid;
						border-width: 0 45px 45px 0;
						border-color: transparent transparent transparent transparent;
						color: white;
					}
          .toolong {
            line-height: none;
            font-size: 20px;
          }
					.center {
            line-height: 3;
					}
				}
			}
  	}
		footer {
			text-align : center;
		}
  }

  

.checkmark:before, .crossmark:before {
    position: absolute;
    transform: translate(5px, 10px);
    background: white;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    box-shadow: 0 0 1px 0px white inset, 0 0 1px 0px white;
		font-family: 'Material Icons';
}
.checkmark:before {
  content: 'done';
}
.crossmark:before {
  content: 'clear';
  color: mdc('red','600') !important;
}



</style>
