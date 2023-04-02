<template>
  <q-btn
    icon="arrow_circle_down"
    unelevated
    rounded
    padding="sm"
    class="fit"
    color="negative"
    :label="label"
    :loading="loading"
    @click="upvoteReport"
  />
</template>

<script setup lang="ts">
import { updateReport } from "@/lib/functions";

const props = defineProps<{
  reportId: string;
  label: string | number;
}>();

const loading = ref(false);

const { fetchReports } = useReportsStore();
const { user } = useAuthStore();

async function upvoteReport() {
  loading.value = true;

  await updateReport({ reportId: props.reportId, action: "downvote" });

  await fetchReports(user.value.id);

  loading.value = false;
}
</script>
