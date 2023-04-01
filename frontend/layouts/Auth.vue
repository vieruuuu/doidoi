<template>
  <div class="row items-center justify-center bg-primary fullscreen">
    <div class="col-xs-12 col-lg-4">
      <div class="row flex-center text-center q-py-md">
        <div class="row items-center no-pointer-events non-selectable">
          <span>
            <q-icon
              color="secondary"
              name="apartment"
              size="96px"
              class="q-mr-sm"
            />
          </span>

          <span class="text-h1 text-bold text-white"> Safe </span>
          <span class="text-h1 text-bold text-secondary"> City </span>
        </div>

        <div class="col-12" />

        <div class="text-white text-h4">Let's build a safer city!</div>
      </div>
    </div>

    <div class="q-pa-md col-xs-12 col-lg-3">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts"></script>
