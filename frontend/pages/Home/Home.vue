<template>
  <citizen v-if="user.type === 'citizen'" />
  <operator v-else />
</template>

<script setup lang="ts">
import Citizen from "./Citizen.vue";
import Operator from "./Operator.vue";

const { user } = useAuthStore();
</script>
