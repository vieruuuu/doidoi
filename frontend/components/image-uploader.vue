<template>
  <q-uploader
    multiple
    batch
    color="transparent"
    flat
    class="fit"
    :max-files="20"
    @added="addImage"
    @removed="removeImage"
  >
    <template #header> <q-uploader-add-trigger /> </template>
    <template #list="scope">
      <div
        v-show="scope.files.length === 0"
        class="q-px-sm"
        @click="scope.pickFiles"
      >
        <q-field
          borderless
          :model-value="images.length"
          :rules="[
            (val) => {
              if (notRequired) {
                return true;
              }

              if (val > 0) {
                return true;
              } else {
                toggleAnimation();
                return false;
              }
            },
          ]"
          hide-bottom-space
        />
      </div>

      <div
        v-if="scope.files.length === 0"
        class="row flex-center q-pb-xl"
        @click="scope.pickFiles"
      >
        <div class="col-12 text-center">
          <q-icon
            class="animated"
            :class="{
              'text-negative headShake': animationInUse,
            }"
            size="xl"
            name="add_a_photo"
          />
        </div>

        <div class="col-12 text-h6 text-center">{{ label }}</div>
        <div class="col-12 text-body1 text-center">{{ caption }}</div>
      </div>
      <div v-else class="row q-col-gutter-md">
        <div v-for="file in scope.files" :key="file.__key" class="col-3">
          <q-img
            v-if="file.__img"
            :src="file.__img.src"
            no-native-menu
            no-spinner
            no-transition
          >
            <div
              class="absolute"
              style="
                background-color: transparent !important;
                top: 8;
                right: 8px;
              "
            >
              <q-btn
                color="primary"
                round
                unelevated
                icon="close"
                @click="scope.removeFile(file)"
              />
            </div>
          </q-img>
        </div>
      </div>
    </template>
  </q-uploader>
</template>

<script setup lang="ts">
import { QUploader } from "quasar";

const props = defineProps<{
  modelValue: QUploader["files"];
  label: string;
  caption: string;
  notRequired?: boolean;
}>();

const emit = defineEmits(["update:modelValue"]);

const images = computed({
  set: (val) => emit("update:modelValue", val),
  get: () => props.modelValue,
});

function addImage(files: QUploader["files"]) {
  images.value = [...images.value, ...files];
}

function removeImage(files: QUploader["files"]) {
  const deletedKeys = files.map((val) => val.__key);

  images.value = images.value.filter(
    (file) => !deletedKeys.includes(file.__key)
  );
}

const animationInUse = ref(false);

const toggleAnimation = () => {
  animationInUse.value = true;

  setTimeout(() => (animationInUse.value = false), 100);
};
</script>

<style lang="scss" scoped>
.q-uploader {
  max-height: 100% !important;
}
</style>
