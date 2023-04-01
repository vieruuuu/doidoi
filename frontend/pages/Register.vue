<template>
  <q-form @submit="register">
    <q-card bordered flat>
      <q-card-section>
        <div class="col-12 text-h6 text-center">Register</div>
      </q-card-section>

      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-6">
            <q-input
              v-model="firstName"
              outlined
              hide-bottom-space
              label="First Name"
            />
          </div>

          <div class="col-6">
            <q-input
              v-model="lastName"
              outlined
              hide-bottom-space
              label="Last Name"
            />
          </div>

          <div class="col-12">
            <q-input
              v-model="phoneNMbr"
              outlined
              hide-bottom-space
              label="Phone Number"
            />
          </div>

          <div class="col-12">
            <email-input v-model="email" />
          </div>

          <div class="col-12">
            <password-input v-model="password" />
          </div>

          <div class="col-12">
            <password-input
              v-model="passwordConfirm"
              confirm-type
              :check-with="password"
            />
          </div>
          <router-link
            class="text-bold text-body2 text-secondary col-12"
            to="/login"
            >Already have an account?</router-link
          >
        </div>
      </q-card-section>

      <q-card-actions align="center">
        <q-btn
          no-caps
          size="lg"
          label="Register"
          color="primary"
          outline
          type="submit"
        />
      </q-card-actions>
    </q-card>
  </q-form>
</template>

<script setup lang="ts">
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import type { User } from "types/users";

import { firebaseAuth } from "@/lib/firebase";
import { createUser } from "@/lib/functions";
import EmailInput from "@@/email-input.vue";
import PasswordInput from "@@/password-input.vue";

const email = ref("");
const password = ref("");
const passwordConfirm = ref("");
const firstName = ref("");
const lastName = ref("");
const phoneNMbr = ref("");

const { setUser } = useAuthStore();
const router = useRouter();

async function register() {
  try {
    const { user } = await createUserWithEmailAndPassword(
      firebaseAuth,
      email.value,
      password.value
    );

    if (!user.email) {
      signOut(firebaseAuth);

      throw `No email for user ${user.uid}`;
    }

    const userData: User = {
      id: user.uid,
      email: user.email,
    };

    await createUser(userData);

    setUser(userData);

    router.push("/");
  } catch (_) {
    email.value = "";
    password.value = "";
    passwordConfirm.value = "";

    console.log(_);

    somethingsWrong("Cannot create account");
  }
}
</script>
