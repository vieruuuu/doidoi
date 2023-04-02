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
        v-for="{
          title,
          description,
          reacts,
          id,
          image,
          usersReacted,
        } in viewedReports"
        :key="id"
      >
        <div class="full-width row q-col-gutter-md">
          <div>
            <div class="text-h5 text-weight-medium">{{ title }}</div>
            <div class="text-body1">{{ description }}</div>
          </div>
          <div class="row flex-center full-width">
            <q-img fit="cover" :src="image" width="350px" :ratio="16 / 10" />
          </div>

          <div class="q-mb-md full-width row q-col-gutter-md justify-end">
            <div class="col-sm-2 col-lg-3 col-xs-6">
              <upvote-report
                :report-id="id"
                :label="reacts.happy"
                :disable="usersReacted.includes(user.id)"
              />
            </div>
            <div class="col-sm-2 col-lg-3 col-xs-6">
              <downvote-report
                :report-id="id"
                :label="reacts.sad"
                :disable="usersReacted.includes(user.id)"
              />
            </div>
          </div>
        </div> </q-item
    ></template>
  </q-list>
</template>

<script setup lang="ts">
import UpvoteReport from "./upvote-report.vue";
import DownvoteReport from "./downvote-report.vue";

const { recentReports, topReports } = useReportsStore();
const { user } = useAuthStore();

const viewTopReports = ref(false);

const viewedReports = computed(() =>
  viewTopReports.value ? topReports.value : recentReports.value
);
</script>
