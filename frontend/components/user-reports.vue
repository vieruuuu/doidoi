<template>
  <div>
    <div class="q-col-gutter-md row">
      <div
        v-for="{ id, title, image, description, reacts } in recentReports"
        :key="id"
        class="col-xs-12 col-sm-6 col-md-4 col-lg-3"
      >
        <q-card>
          <q-img :src="image" :ratio="16 / 9" />

          <q-card-section>
            <div class="row items-center">
              <div v-if="reacts.happy > 40" class="bg-transparent">
                <q-icon
                  size="md"
                  class="q-ma-xs"
                  color="orange-8"
                  name="local_fire_department"
                >
                  <q-tooltip class="bg-orange-8 text-body1">
                    Your report is on fire!!
                  </q-tooltip>
                </q-icon>
              </div>
              <div class="text-h5">{{ title }}</div>
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <div class="text-h6 text-bold">Description:</div>
            <div>{{ description }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { recentReports } = useReportsStore();
</script>
