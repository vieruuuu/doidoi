import { klona } from "klona";
import { LocalStorage } from "quasar";
import type { User } from "types/users";

import { defineRefStore } from "./lib/defineRefStore";

const initialUserState: User = {
  id: "",
  firstName: "",
  lastName: "",
  phone: "",
  type: "citizen",
  email: "",
};

export const useAuthStore = defineRefStore("auth", () => {
  const user = ref<User>(klona(initialUserState));

  const userSaved = ref(!!LocalStorage.getItem<boolean>("userSaved"));
  const userLogged = ref(false);

  function setAuth(value: boolean) {
    LocalStorage.set("userSaved", value);
    userSaved.value = value;
  }

  function setUser(passedUser?: User) {
    const userExists = !!passedUser;

    if (userExists) {
      user.value = passedUser;
    } else {
      user.value = klona(initialUserState);
    }

    userLogged.value = userExists;
    setAuth(userExists);
  }

  return {
    user,
    userSaved,
    userLogged,
    setUser,
  };
});
