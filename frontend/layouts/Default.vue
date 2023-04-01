<template>
  <q-layout view="hHh Lpr lff">
    <q-header bordered>
      <q-toolbar>
        <q-toolbar-title class="row" @click="router.push('/')">
          doidoi
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page>
        <router-view v-slot="{ Component }">
          <transition
            v-if="true"
            appear
            mode="out-in"
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
            :duration="100"
          >
            <component :is="Component" />
          </transition>

          <div v-else-if="!userSaved">
            <h1>NU AI CONT CREEAZA PLS SAU LOGHEZA TE</h1>

            <q-btn label="aici" no-caps to="/login" />
          </div>

          <div v-else>
            <h1>ACUM TE LOGHEZI BIPBIP</h1>

            <q-spinner size="xl" />
          </div>
        </router-view>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
const router = useRouter();
const { userLogged, userSaved } = useAuthStore();
</script>
