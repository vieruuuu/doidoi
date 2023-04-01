<template>
  <div class="row flex-center q-col-gutter-md q-mt-xl">
    <div class="col-xs-12 col-sm-8 col-lg-4">
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
            />

            <q-btn
              no-caps
              size="lg"
              label="Register"
              color="secondary"
              outline
              to="/register"
            />
          </q-card-actions>
        </q-card>
      </q-form>
    </div>
  </div>
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

const { setUser } = useAuthStore();
const router = useRouter();

async function login() {
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

    const userData: User = {
      id: user.uid,
      email: user.email,
    };

    setUser(userData);

    router.push("/");
  } catch (_) {
    password.value = "";

    somethingsWrong("Invalid credentials");
  }
}
</script>
