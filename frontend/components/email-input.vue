<template>
  <q-input
    v-model="email"
    outlined
    label="Email"
    type="email"
    lazy-rules
    stack-label
    :rules="[(val: string) => Email.safeParse(val).success]"
    placeholder="name@example.com"
    hide-bottom-space
  >
    <template v-if="showIcon" #prepend>
      <q-icon size="sm" name="email" />
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { Email } from "types/utils";

const props = withDefaults(
  defineProps<{
    modelValue: string;
    showIcon?: boolean;
  }>(),
  { showIcon: true }
);

const emit = defineEmits(["update:modelValue"]);

const email = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("update:modelValue", val.toLowerCase());
  },
});
</script>
