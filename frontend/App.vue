<template>
  <!-- <router-view v-slot="{ Component }">
    <transition
      appear
      mode="out-in"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      :duration="100"
    >
      <component :is="Component" />
    </transition>
  </router-view> -->

  <div>
    <q-btn
      label="test image detection"
      size="lg"
      @click="() => testImageLabel()"
    >
    </q-btn>
  </div>
</template>

<script setup lang="ts">
import { testImageLabel } from "./lib/functions";
</script>
