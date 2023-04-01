<template>
  <q-layout view="hHh Lpr lff">
    <q-header bordered>
      <q-toolbar>
        <q-toolbar-title
          class="row items-center q-py-md"
          @click="router.push('/reports')"
        >
          <span v-if="screen.gt.xs">
            <q-icon
              color="secondary"
              name="apartment"
              size="lg"
              class="q-mr-sm"
            />
          </span>

          <span class="text-h4 text-bold" style="white-space: nowrap">
            Safe<span class="text-secondary">City</span>
          </span>
        </q-toolbar-title>

        <q-btn label="Log out" outline no-caps size="lg" @click="logOut" />
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
import { signOut } from "@firebase/auth";
import { firebaseAuth } from "@/lib/firebase";

const router = useRouter();
const { setUser } = useAuthStore();
const { screen } = useQuasar();

async function logOut() {
  await signOut(firebaseAuth);
  setUser();
  router.push("/");
}
</script>
