<template>
  <div class="row q-col-gutter-md justify-center q-mt-xl q-px-md">
    <div class="col-xs-12 col-lg-6 col-xl-10">
      <div class="text-h4 q-mb-md text-bold">Hello, Andrei</div>
      <div class="text-h5 q-mb-md">Let's build a safer city!</div>
    </div>

    <div class="col-xs-12 col-lg-6 col-xl-6">
      <q-card bordered flat class="q-pa-sm">
        <q-form @submit="() => testImageLabel()">
          <q-card-section>
            <div class="text-h4 q-mb-md text-center">Submit a rapport</div>

            <div class="row q-col-gutter-lg">
              <div class="col-12">
                <q-input v-model="title" outlined label="Title" />
              </div>
              <div class="col-12">
                <q-input
                  v-model="text"
                  label="A short description of the incident"
                  outlined
                  type="textarea"
                  autogrow
                />
              </div>
              <div class="col-xs-12 col-lg-6">
                <q-select
                  v-model="model"
                  transition-show="jump-up"
                  transition-hide="jump-up"
                  outlined
                  :options="options"
                  label="Category"
                  clearable
                />
              </div>
              <div class="col-xs-12 col-lg-6">
                <q-uploader
                  label="Picture of the incident"
                  flat
                  bordered
                  class="fit"
                  url="http://localhost:4444/upload"
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
                    v-model="sev"
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
              v-model="isAnon"
              label="Send anonymously "
              color="primary"
            />
            <q-btn label="submit" size="lg" type="submit" color="secondary" />
          </q-card-actions>
        </q-form>
      </q-card>
    </div>

    <div class="col-xs-12 col-lg-4">
      <q-list separator bordered class="full-width">
        <q-item-label header>
          <div class="text-h4 text-black">Recent reports:</div></q-item-label
        >

        <q-item v-for="i in 10" :key="i" v-ripple clickable>
          <q-item-section>
            <div class="text-h6">Title</div>
            <div class="text-body1">Descrption</div>
          </q-item-section>
          <q-item-section thumbnail>
            <img src="https://cdn.quasar.dev/img/mountains.jpg" />
          </q-item-section>
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
                <div class="text-h6">{{ rapport.title }}</div>
                <div class="text-subtitle2">By:{{ rapport.user }}</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                {{ rapport.description }}
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { testImageLabel } from "@/lib/functions";

const rapport = reactive({
  user: "Gheorghe Asachi",
  title: "Om periculos",
  description:
    "Un om sta cu katana n nikolinaUn om sta cu katana n nikolinaUn om sta cu katana n nikolina ",
  date: "2022/12/01",
  severity: "7",
  category: "Trash",
});

const title = ref("");
const text = ref("");
const date = ref("");
const sev = ref<number>(0);
const model = ref(null);
const isAnon = ref(false);
const options = ["Trash", "Parking", "Lost stuff", "Lost pets", "thefts"];
</script>
