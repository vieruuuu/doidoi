<template>
  <div class="row q-col-gutter-md justify-center q-mt-xl q-px-md">
    <div class="col-xs-12 col-lg-10 col-xl-10">
      <div class="text-h4 q-mb-md text-bold">Hello, Andrei</div>
      <div class="text-h5 q-mb-md">Let's build a safer city!</div>
    </div>

    <div class="col-xs-12 col-lg-6 col-xl-6">
      <q-card bordered flat class="q-pa-sm">
        <q-card-section>
          <div class="text-h4 text-center q-my-md">Today's reports</div>
          <div class="q-col-gutter-md row">
            <div
              v-for="i in 6"
              :key="i"
              class="col-xs-12 col-sm-12 col-md-4 col-lg-6"
            >
              <q-card>
                <q-item>
                  <q-item-section avatar>
                    <q-avatar size="55px">
                      <img
                        :src="`https://i.pravatar.cc/300?ignore=${Date.now()}`"
                      />
                    </q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <div class="row justify-between items-center">
                      <div class="col-6">
                        <q-item-label class="text-body1 text-bold">{{
                          rapport.title
                        }}</q-item-label>
                        <q-item-label class="text-body2"
                          >By: {{ rapport.user }}</q-item-label
                        >
                      </div>
                      <div>
                        <q-btn
                          :href="`tel:${rapport.phone}`"
                          icon="call"
                          color="red"
                          outline
                          size="lg"
                          no-caps
                          label="Reach User"
                        />
                      </div>
                    </div>
                  </q-item-section>
                </q-item>

                <q-card-section>
                  <q-img src="https://cdn.quasar.dev/img/mountains.jpg">
                    <div class="bg-transparent">
                      <q-icon
                        v-if="rapport.spam"
                        size="md"
                        class="q-ma-xs"
                        color="red"
                        name="warning"
                      >
                        <q-tooltip class="bg-red text-body1">
                          Marked as Spam!
                        </q-tooltip>
                      </q-icon>
                    </div>
                  </q-img>

                  <q-card-actions class="row justify-around q-col-gutter-md">
                    <div class="col-4">
                      <q-btn
                        outline
                        class="fit"
                        color="green-7"
                        href="https://www.protectiamediului.org/gnm/scrie-garzii-de-mediu-iasi/"
                        target="_blank"
                        icon="nest_eco_leaf"
                      />
                    </div>

                    <div class="col-4">
                      <q-btn
                        outline
                        class="fit"
                        color="blue"
                        href="https://politialocala-iasi.ro/sesizari/"
                        target="_blank"
                        icon="local_police"
                      />
                    </div>

                    <div class="col-4">
                      <q-btn
                        outline
                        class="fit"
                        color="orange"
                        href="https://sesizari1.anpc.ro/"
                        target="_blank"
                        icon="fastfood"
                      />
                    </div>

                    <div class="col-6">
                      <q-btn
                        outline
                        color="red"
                        label="Delete"
                        class="fit"
                        icon="delete"
                      />
                    </div>
                    <div class="col-6">
                      <q-btn
                        outline
                        color="green-14"
                        label="Mark as solved"
                        class="fit"
                        icon="check"
                      />
                    </div>
                  </q-card-actions>
                  <div class="text-h5 text-bold q-mt-sm">Description:</div>
                  <div class="text-subtitle1">
                    {{ rapport.description }}
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-card-section>
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
const rapport = reactive({
  user: "Gheorghe Asachi",
  title: "Om periculos",
  description:
    "Un om sta cu katana n nikolina Un om sta cu katana n nikolina Un om sta cu katana n nikolina ",
  date: "2022/12/01",
  severity: "7",
  category: "Trash",
  phone: "0743 878 989",
  spam: true,
});
</script>
