<template>
  <q-card bordered flat>
    <q-card-section>
      <div class="text-h6 text-center row flex-center q-col-gutter-md">
        <div><q-spinner-pie color="primary" size="2em" class="" /></div>
        <div>Hold on ,We're logging you in!</div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
const { userLogged } = useAuthStore();
const router = useRouter();

watch(
  userLogged,
  (val) => {
    if (val) {
      router.push("/reports");
    }
  },
  { immediate: true }
);
</script>
