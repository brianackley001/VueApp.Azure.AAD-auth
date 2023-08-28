<script setup lang="ts">

import { RouterView } from 'vue-router';
import NavBar from './views/NavBar.vue';
</script>

<template>
  <header>
    <div class="wrapper">
      <NavBar />
    </div>
  </header>

  <RouterView />
</template>

