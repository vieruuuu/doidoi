<template>
  <q-list separator bordered class="full-width">
    <q-item-label header>
      <div class="text-h4 text-black">
        {{ viewTopReports ? "Top reports" : "Recent reports" }}:
      </div>
      <div
        class="cursor-pointer text-secondary text-body1"
        @click="viewTopReports = !viewTopReports"
      >
        {{ viewTopReports ? "View recent reports" : "View top reports" }}
      </div>
    </q-item-label>

    <div v-if="viewedReports.length === 0" class="text-h6 text-center q-pb-md">
      No reports available
    </div>

    <template v-else>
      <q-item
        v-for="{ title, description, reacts, id, image } in viewedReports"
        :key="id"
      >
        <div class="full-width row q-col-gutter-md">
          <div>
            <div class="text-h5 text-weight-medium">{{ title }}</div>
            <div class="text-body1">{{ description }}</div>
            <q-img
              class="fit"
              style="max-width: 300px"
              fit="scale-down"
              :src="image"
            />
          </div>

          <div class="q-mt-md full-width row q-col-gutter-md justify-end">
            <div class="col-2">
              <q-btn
                icon="sentiment_very_satisfied"
                rounded
                padding="sm"
                class="fit"
                color="green"
                :label="reacts.happy"
                unelevated
              />
            </div>
            <div class="col-2">
              <q-btn
                icon="sentiment_neutral"
                unelevated
                rounded
                padding="sm"
                class="fit"
                color="orange"
                :label="reacts.neutral"
              />
            </div>
            <div class="col-2">
              <q-btn
                icon="sentiment_very_dissatisfied"
                unelevated
                rounded
                padding="sm"
                class="fit"
                color="negative"
                :label="reacts.sad"
              />
            </div>
          </div>
        </div> </q-item
    ></template>
  </q-list>
</template>

<script setup lang="ts">
const { recentReports, topReports } = useReportsStore();

const viewTopReports = ref(false);

const viewedReports = computed(() =>
  viewTopReports.value ? topReports.value : recentReports.value
);
</script>
