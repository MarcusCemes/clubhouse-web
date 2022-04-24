import { apiSignOut } from "$lib/api/auth";
import { authStore } from "$lib/stores/auth";

export async function actionSignOut() {
    await apiSignOut();
    authStore.set({ state: "SIGNED_OUT" });
}
