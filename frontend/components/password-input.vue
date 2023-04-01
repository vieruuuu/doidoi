<template>
  <q-input
    v-model="password"
    outlined
    :label="label || (confirmType ? 'Confirm password' : 'Password')"
    lazy-rules
    :rules="passwordRules"
    hide-bottom-space
    :type="isPasswordField ? 'password' : 'text'"
  >
    <template #prepend>
      <q-icon name="lock" />
    </template>

    <template #append>
      <q-icon
        :name="isPasswordField ? 'visibility_off' : 'visibility'"
        class="cursor-pointer"
        @click="isPasswordField = !isPasswordField"
      />
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { Password } from "types/utils";

const props = defineProps<{
  modelValue: string;
  confirmType?: boolean;
  checkWith?: string;
  label?: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const password = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
  },
});

const isPasswordField = ref(true);

const passwordRules = [
  (val: unknown) => {
    if (!Password.safeParse(val).success) {
      return false;
    }

    if (props.confirmType) {
      return props.checkWith === val || "Passwords don't match";
    }

    return true;
  },
];

let unWatch: () => void | undefined;

// daca parola se schimba doar da empty la form
if (props.confirmType) {
  unWatch = watch(
    () => props.checkWith,
    () => {
      if (props.checkWith !== password.value) {
        password.value = "";
      }
    }
  );
}

onUnmounted(() => {
  if (unWatch) {
    unWatch();
  }
});
</script>
