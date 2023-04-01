<template>
  <div class="row q-col-gutter-md justify-center q-mt-xl q-px-md">
    <div class="col-xs-12 col-lg-10">
      <div class="text-h4 q-mb-md text-bold">Hello, Andrei</div>
      <div class="text-h5 q-mb-md">Let's build a safer city!</div>
    </div>

    <div class="col-xs-12 col-lg-6 col-xl-6">
      <q-card bordered flat class="q-pa-sm">
        <q-form ref="formRef" @submit="submit">
          <q-card-section>
            <div class="text-h4 q-mb-md text-center">Submit a report</div>

            <div class="row q-col-gutter-lg">
              <div class="col-12">
                <q-input
                  v-model="report.title"
                  outlined
                  label="Title"
                  :rules="[(val) => Report.shape.title.safeParse(val).success]"
                />
              </div>
              <div class="col-12">
                <q-input
                  v-model="report.description"
                  label="A short description of the incident"
                  outlined
                  type="textarea"
                  :rules="[
                    (val) => Report.shape.description.safeParse(val).success,
                  ]"
                  autogrow
                />
              </div>
              <div class="col-xs-12">
                <q-select
                  v-model="report.category"
                  transition-show="jump-up"
                  :rules="[
                    (val) => Report.shape.category.safeParse(val).success,
                  ]"
                  transition-hide="jump-up"
                  outlined
                  :options="Categories"
                  label="Category"
                />
              </div>
              <div class="col-xs-12">
                <image-uploader
                  ref="imageUploaderRef"
                  v-model="files"
                  label="Picture of the incident"
                  caption="Drag and drop"
                  class="fit"
                />
              </div>
              <div class="col-12 full-height">
                <q-date
                  v-model="date"
                  title="Incident's date"
                  bordered
                  flat
                  class="fit"
                />
              </div>
              <div></div>
              <div class="col-12">
                <div class="text-h6 text-center">
                  Severity of the incident (0 to 10)
                </div>
                <div class="q-px-xl">
                  <q-slider
                    v-model="report.severity"
                    switch-label-side
                    color="secondary"
                    marker-labels
                    :min="0"
                    :max="10"
                    :step="1"
                  />
                </div>
              </div>
            </div>
          </q-card-section>

          <q-card-actions class="q-mt-xl q-px-lg" align="between">
            <q-checkbox
              v-model="report.anonymous"
              label="Send anonymously "
              color="primary"
            />
            <q-btn
              label="submit"
              :loading="loading"
              size="lg"
              type="submit"
              color="secondary"
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </div>

    <div class="col-xs-12 col-lg-4">
      <q-list separator bordered class="full-width">
        <q-item-label header>
          <div class="text-h4 text-black">Recent reports:</div></q-item-label
        >

        <q-item v-for="i in 10" :key="i">
          <div class="full-width">
            <div class="text-h5 text-weight-medium">{{ "rapport.title" }}</div>
            <div class="text-body1">{{ "rapport.description" }}</div>

            <div class="q-mt-sm full-width row q-col-gutter-md justify-end">
              <div class="col-2">
                <q-btn
                  icon="sentiment_very_satisfied"
                  rounded
                  padding="sm"
                  class="fit"
                  color="green"
                  label="100"
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
                  label="10"
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
                  label="400"
                />
              </div>
            </div>
            <!-- <img
                style="max-width: 100px"
                src="https://cdn.quasar.dev/img/mountains.jpg"
              /> -->
          </div>
        </q-item>
      </q-list>
    </div>

    <div class="col-9">
      <div class="q-mt-lg">
        <div class="text-h4 q-mb-xl">My reports:</div>

        <div class="q-col-gutter-md row">
          <div
            v-for="i in 5"
            :key="i"
            class="col-xs-12 col-sm-6 col-md-4 col-lg-3"
          >
            <q-card>
              <img src="https://cdn.quasar.dev/img/mountains.jpg" />

              <q-card-section>
                <div class="text-h6">{{ "rapport.title" }}</div>
                <div class="text-subtitle2">By:{{ "rapport.user" }}</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                {{ "rapport.description" }}
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { uploadFile } from "@/lib/documents";
import { createReport } from "@/lib/functions";
import ImageUploader from "@@/image-uploader.vue";
import { Categories, Report } from "types/reports";
import { parse, format } from "date-fns";

const { user } = useAuthStore();

const initialReportData = (): Report => ({
  id: "",
  anonymous: false,
  category: "litter",
  date: Date.now(),
  description: "",
  image: "",
  reacts: {
    happy: 0,
    neutral: 0,
    sad: 0,
  },
  severity: 0,
  solved: false,
  spam: false,
  title: "",
});

const formRef = ref<{ reset: () => void }>();
const imageUploaderRef = ref<{ reset: () => void }>();

const files = ref<File[]>([]);

const report = ref(initialReportData());

const loading = ref(false);

const currentDate = () => format(new Date(), "yyyy/MM/dd");

const date = ref(currentDate());

watch(
  date,
  (val) => {
    const d = parse(val, "yyyy/MM/dd", new Date());

    report.value.date = d.getTime();
  },
  { immediate: true }
);

async function submit() {
  loading.value = true;

  try {
    const imageUrl = await uploadFile(user.value.id, files.value[0]);

    await createReport({ ...report.value, image: imageUrl });

    somethingsGood("Report registered successfully!");
  } catch (_) {
    somethingsWrong("Something went wrong...");
  }

  report.value = initialReportData();
  files.value = [];
  date.value = currentDate();

  if (imageUploaderRef.value) {
    imageUploaderRef.value.reset();
  }

  if (formRef.value) {
    formRef.value.reset();
  }

  loading.value = false;
}
</script>
