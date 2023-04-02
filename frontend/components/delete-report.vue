<template>
  <q-btn
    outline
    color="red"
    label="Delete"
    class="fit"
    icon="delete"
    :loading="loading"
    @click="deleteReport"
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

async function deleteReport() {
  loading.value = true;

  await updateReport({ reportId: props.reportId, action: "delete" });

  await fetchReports(user.value.id);

  loading.value = false;
}
</script>
