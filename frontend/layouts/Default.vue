<template>
  <q-layout view="hHh Lpr lff">
    <q-header bordered>
      <q-toolbar>
        <q-toolbar-title @click="router.push('/reports')">
          <div class="row items-center q-py-md">
            <span>
              <q-icon
                color="secondary"
                name="apartment"
                size="lg"
                class="q-mr-sm"
              />
            </span>

            <span class="text-h4 text-bold"> Safe </span>
            <span class="text-h4 text-bold text-secondary"> City </span>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page>
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
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
const router = useRouter();
const { userLogged, userSaved } = useAuthStore();
</script>
