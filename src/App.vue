<template>
  <div id="app">
    <router-view></router-view>
    <md-bottom-bar class="sticktobottom" md-theme="tealy">
      <md-bottom-bar-item md-icon="collections_bookmark" :href="link('/')" md-active>Dictionaires</md-bottom-bar-item>
      <md-bottom-bar-item md-icon="library_add" :href="link('/add-dico')">Ajouter</md-bottom-bar-item>
      <md-bottom-bar-item md-icon="play_for_work" :href="link('/quizzcard')" class="resize-icon-med">Jouer</md-bottom-bar-item>
    </md-bottom-bar>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
    }
  },
  methods: {
    link (l) {
      let locArr = window.location.toString().split('#')
      return `${locArr[0]}#${l}`
    }
  }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Roboto');
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
  @import 'scss/sass-material-colors';

  body{overflow: hidden}
  #app {
    font-family: 'Roboto', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: mdc('grey','900');
  }
    main {
      height: 85vh;
      max-height: 85vh;
      width: 100%;
      max-width: 100%;
      overflow-x: hidden;
    }
    
  .noselect {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently */
  }
  .resize-icon {
    i {
        width: 36px;
        min-width: 36px;
        height: 36px;
        min-height: 36px;
        font-size: 36px;
    }
  }
  .resize-icon-med {
    i {
        width: 30px;
        min-width: 30px;
        height: 30px;
        min-height: 30px;
        font-size: 30px;
    }
  }

  .md-tooltip {
    color: white;
    font-size: 14px !important;
    border-radius: 20px !important;
    background: mdc('red','600') !important;
    &.decale {transform: translateX(-80%) !important;}
    &.limy {background: mdc('lime') !important;}
    &.blue-grey {background: mdc('blue-grey') !important; transform: translate3d(-200px, 5px, 0) !important; }
  }
  .sticktobottom {
    position: absolute !important;
    bottom: 0;
    z-index:999;
  }
  p {
    margin: 0 !important;
    padding: 0 !important;
  }
</style>
