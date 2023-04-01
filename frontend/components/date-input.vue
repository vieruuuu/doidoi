<template>
  <q-input
    v-model="date"
    outlined
    mask="##/##/####"
    fill-mask
    hint="dd/MM/yyyy"
    :debounce="200"
    :rules="[(val) => Min1String.safeParse(val).success]"
    :disable="disable"
  >
    <template #append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy
          v-if="!disable"
          ref="popupRef"
          cover
          transition-show="scale"
          transition-hide="scale"
        >
          <q-date
            v-model="date"
            no-unset
            mask="DD/MM/YYYY"
            minimal
            :options="dateAvailable"
            @update:model-value="closePopup"
          />
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { Min1String } from "types/utils";

const props = defineProps<{
  modelValue: string;
  disable?: boolean;
  dateAvailable?: (date: string) => boolean;
}>();

const emit = defineEmits(["update:modelValue"]);

const popupRef = ref<HTMLElement & { hide: () => void }>();

function closePopup() {
  if (popupRef.value) {
    popupRef.value.hide();
  }
}

const date = computed({
  set: (val) => emit("update:modelValue", val),
  get: () => props.modelValue,
});
</script>
