<template>
  <div id="app" @click="hideMenu">
     <div class="menuBlock" @click="menuBlock">
     </div>
     <router-view></router-view>
  </div>
</template>

<script>
// Import styles project
import './assets/style/color.css';
import './assets/style/fonts.css';
 
export default {
  name: 'app',
  methods: {
      
      hideMenu() {
          this.$emit('hideNotif');
          this.$emit('hideApps');
          this.$emit('hideLogout');
      },
      menuBlock() {
          var menu = document.querySelector('.sidebar');
          var opM = document.querySelector('.menuBlock'); 
          menu.style.transition = ".5s";
          menu.style.left = "-320px";
          opM.style.display = "none";
      },
  },
}
</script>

<style>
         * {
  color: var(--main-project-color);
  font-family: Lato;
  margin: 0;
  padding: 0;
}

body {
  background: var(--main-user-page-color);
}

.menuBlock {
   width: 100%;
   height: 100%;
   position: fixed;
   top: 0;
   background: rgba(0, 0, 0, 0.5);
   z-index: 999;
   display: none;
}
</style>
