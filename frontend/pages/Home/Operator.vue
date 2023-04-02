<template>
  <div class="row q-col-gutter-md justify-center q-mt-xl q-px-md">
    <div class="col-xs-12 col-lg-10 col-xl-10">
      <div class="text-h4 q-mb-md text-bold">Hello, {{ user.firstName }}</div>
      <div class="text-h5 q-mb-md">Let's build a safer city!</div>
    </div>
    <div class="col-xs-12 col-lg-10 col-xl-10">
      <q-card flat bordered>
        <q-card-section>
          <div class="row q-col-gutter-md flex-center">
            <div class="text-h4 col-xs-12 col-md-10 text-bold q-my-md">
              Statistics:
            </div>
            <div class="col-xs-12 col-md-3">
              <q-card flat bordered>
                <q-card-section>
                  <div class="text-h4 text-center">Users</div>
                  <div class="text-h5 text-bold text-center">23</div>
                </q-card-section>
              </q-card>
            </div>
            <div class="col-xs-12 col-md-4">
              <q-card flat bordered>
                <q-card-section>
                  <div class="text-h4 text-center">Unsolved reports</div>
                  <div class="text-h5 text-bold text-center">23/50</div>
                </q-card-section>
              </q-card>
            </div>
            <div class="col-xs-12 col-md-3">
              <q-card bordered>
                <q-card-section>
                  <div class="text-h4 text-center">Spam reports</div>
                  <div class="text-h5 text-bold text-center">23/50</div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-xs-12 col-lg-6 col-xl-6">
      <q-card bordered flat class="q-pa-sm">
        <q-card-section>
          <div class="text-h4 text-center q-my-md">Today's reports</div>
          <div class="q-col-gutter-md row">
            <div
              v-for="{
                id,
                title,
                user: reportUser,
                spam,
                description,
                image,
              } in unsolvedReports"
              :key="id"
              class="col-xs-12 col-sm-12 col-md-4 col-lg-6"
            >
              <q-card>
                <q-card-section v-if="reportUser">
                  <div class="row justify-between items-center q-col-gutter-md">
                    <div class="row flex-center q-col-gutter-md">
                      <div>
                        <q-avatar round size="55px">
                          <q-img
                            spinner-size="xs"
                            :src="`https://i.pravatar.cc/300?ignore=${Date.now()}`"
                          />
                        </q-avatar>
                      </div>

                      <div class="text-body1 text-center">
                        {{ reportUser.firstName + " " + reportUser.lastName }}
                      </div>
                    </div>

                    <div
                      class="col-xs-12 col-sm-shrink col-md-12 col-lg-shrink"
                    >
                      <q-btn
                        :href="`tel:${reportUser.phone}`"
                        icon="call"
                        color="red"
                        outline
                        class="fit"
                        size="md"
                        no-caps
                        label="Reach User"
                      />
                    </div>
                  </div>
                </q-card-section>

                <q-card-section>
                  <q-img fit="cover" :ratio="16 / 9" :src="image">
                    <div v-if="spam" class="bg-transparent">
                      <q-icon
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
                  <div class="text-h5 text-bold q-mt-sm">
                    {{ title }}
                  </div>
                  <div class="text-body1">
                    {{ description }}
                  </div>
                </q-card-section>

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
                      label="Mark solved"
                      class="fit"
                      icon="check"
                    />
                  </div>
                </q-card-actions>
              </q-card>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div class="col-xs-12 col-lg-4">
      <recent-reports />
    </div>

    <div class="col-xs-12 col-lg-10 col-xl-10">
      <div class="q-mt-lg q-mb-xl">
        <div class="text-h4 q-mb-xl">Solved reports:</div>

        <div class="q-col-gutter-md row">
          <div
            v-for="{
              id,
              title,
              user: reportUser,
              description,
              image,
            } in solvedReports"
            :key="id"
            class="col-xs-12 col-sm-6 col-md-4 col-lg-3"
          >
            <q-card>
              <img :src="image" />

              <q-card-section>
                <div class="text-h6">{{ title }}</div>
                <div v-if="reportUser" class="text-body2">
                  By: {{ reportUser.firstName }}{{ reportUser.lastName }}
                </div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                {{ description }}
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RecentReports from "@@/recent-reports.vue";

const { user } = useAuthStore();
const { unsolvedReports, solvedReports } = useReportsStore();
</script>
