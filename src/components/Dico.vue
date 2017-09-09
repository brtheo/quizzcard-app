<template>
    <div class="dico">
        <md-table>

            <md-table-header>
                <md-table-row>
                    <md-table-head>Question</md-table-head>
                    <md-table-head>Réponse</md-table-head>
                    <!--<md-table-head>
                        <md-switch md-theme="tealy" v-model="showID" id="show-id" class="md-primary">id</md-switch>
                    </md-table-head>-->
                </md-table-row>
            </md-table-header>

            <transition-group name="bounceRight" appear tag="tbody" class="md-table-body dico-body"> 
                <md-table-row v-for="(dico, i) in currentDico" :style="$animationDelay(i)" :key="i" >
                    <md-table-cell class="animated-cell">
                        {{dico.req | troncate_long}}
                        <md-tooltip class="blue-grey" md-direction="right">{{dico.req}}</md-tooltip>
                    </md-table-cell>
                    <md-table-cell class="animated-cell">
                        {{dico.res | troncate_long}}
                        <md-tooltip class="blue-grey" md-direction="right">{{dico.res}}</md-tooltip>
                    </md-table-cell>
                    <!--<md-table-cell class="animated-cell">
                        <p class="dico-uuid" :class="{show: showID}">{{dico.uuid}}</p>
                    </md-table-cell>-->
                </md-table-row>
            </transition-group>

        </md-table>   
    </div>
</template>

<script>
    import DicoStore from '../store/DicoStore'
    import AnimationDelay from '../mixins/AnimationDelay'

    export default {
        mixins: [AnimationDelay],
        props: {
            diconame: String /** Nom du dictionnaire courant **/
        },
        data () {
            return {
                showID: false, /** Definie si l'id de l'entrée doit être affichée **/
                currentDico: DicoStore.getDicoByName(this.diconame), /** Dictionnaire courant **/
            }
        }
    }
</script>

<style lang="scss">
    @import '../scss/sass-material-colors';
    tr {
        border-color: transparent !important;
    }
    .animated-cell {
        p {margin: 0 !important}
        &:before {
            content:'';
            transform: translateY(-9px);
            height: 1px;
            width: 100%;
            background: mdc('grey','300');
            position: absolute;
        }  
    }
    
    .md-switch {
        margin-top: 7px !important;
    }
    .dico-uuid {opacity: 0}
    .dico-uuid.show {opacity: 1}
</style>