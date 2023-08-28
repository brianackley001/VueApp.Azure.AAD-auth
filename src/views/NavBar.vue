<!-- eslint-disable vue/no-parsing-error -->
<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
// reactive state
const showNav = ref(true);

</script>

<template>
  <main>
    <!-- START NAV -->
    <nav class="navbar">
      <div class="container">
        <div class="navbar-brand">
          <!-- <a class="navbar-item" href="../">
            <img src="../../public/images/bulma.png" alt="Logo">
          </a> -->
          <span class="navbar-burger" v-on:click="showNav = !showNav" v-bind:class="{ 'is-active': showNav }">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div id="navbarMenu" class="navbar-menu" v-bind:class="{ 'is-active': showNav }">
          <div class="navbar-end">
            <RouterLink to="/" class="navbar-item">Home</RouterLink>
            <RouterLink to="/about" class="navbar-item">About</RouterLink>
            <a class="navbar-item">Features</a>
            <a class="navbar-item">Team</a>
            <a class="navbar-item">Archives</a>
            <a class="navbar-item">Help</a>
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">Account</a>
              <div class="navbar-dropdown">
                <a class="navbar-item">Dashboard</a>
                <a class="navbar-item">Profile</a>
                <a class="navbar-item">Settings</a>
                <hr class="navbar-divider">
                <div class="navbar-item">Logout</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <!-- END NAV -->
  </main>
</template>