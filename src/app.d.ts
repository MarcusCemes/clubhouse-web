/// <reference types="@sveltejs/kit" />

// This file may not contain type imports!
// See https://github.com/sveltejs/kit/issues/3766#issuecomment-1031982175

declare namespace App {
    interface Session {
        user: import("$lib/stores/auth").AuthState;
    }
}
