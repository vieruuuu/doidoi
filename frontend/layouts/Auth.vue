<template>
  <div class="row items-center justify-center bg-primary fullscreen">
    <div class="col-xs-12 col-lg-4">
      <div class="row flex-center text-center q-py-md">
        <div class="row flex-center no-pointer-events non-selectable">
          <span class="col-xs-12 col-sm-shrink">
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

        <div class="text-white text-h4">Together we're safer!</div>
      </div>
    </div>

    <div class="q-pa-md col-xs-12 col-lg-3">
      <loading-login v-if="true" />

      <router-view v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import LoadingLogin from "@/pages/LoadingLogin.vue";

const { userSaved, userLogged } = useAuthStore();
</script>
