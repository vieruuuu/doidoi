<template>
  <router-view v-slot="{ Component }">
    <transition
      appear
      mode="out-in"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      :duration="100"
    >
      <component :is="Component" />
    </transition>
  </router-view>
</template>
