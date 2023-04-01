<template>
  <q-card bordered flat>
    <q-card-section>
      <div class="col-12 text-h6 text-center">
        Acum te loghezi asteapta putin !!!
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
