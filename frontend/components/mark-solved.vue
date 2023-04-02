<template>
  <q-btn
    outline
    color="green-14"
    label="Mark solved"
    class="fit"
    icon="check"
    :loading="loading"
    @click="markSolved"
  />
</template>

<script setup lang="ts">
import { updateReport } from "@/lib/functions";

const props = defineProps<{
  reportId: string;
}>();

const loading = ref(false);

const { fetchReports } = useReportsStore();
const { user } = useAuthStore();

async function markSolved() {
  loading.value = true;

  await updateReport({ reportId: props.reportId, action: "mark-solved" });

  await fetchReports(user.value.id);

  loading.value = false;
}
</script>
