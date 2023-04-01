<template>
  <q-form @submit="login">
    <q-card bordered flat>
      <q-card-section>
        <div class="col-12 text-h6 text-center">Login</div>
      </q-card-section>

      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <email-input v-model="email" />
          </div>

          <div class="col-12">
            <password-input v-model="password" />
          </div>
          <router-link
            class="col-12 text-secondary text-bold text-body2"
            to="/register"
            >Don't have and account?</router-link
          >
        </div>
      </q-card-section>

      <q-card-actions align="center">
        <q-btn
          no-caps
          size="lg"
          label="Login"
          color="primary"
          outline
          type="submit"
          :loading="loading"
        />
      </q-card-actions>
    </q-card>
  </q-form>
</template>

<script setup lang="ts">
import {
  browserLocalPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import type { User } from "types/users";

import { firebaseAuth } from "@/lib/firebase";
import EmailInput from "@@/email-input.vue";
import PasswordInput from "@@/password-input.vue";

const email = ref("");
const password = ref("");

const loading = ref(false);

async function login() {
  loading.value = true;

  try {
    await setPersistence(firebaseAuth, browserLocalPersistence);

    const { user } = await signInWithEmailAndPassword(
      firebaseAuth,
      email.value,
      password.value
    );

    if (!user.email) {
      throw `No email for user ${user.uid}`;
    }
  } catch (_) {
    password.value = "";

    somethingsWrong("Invalid credentials");
  }

  loading.value = false;
}
</script>
