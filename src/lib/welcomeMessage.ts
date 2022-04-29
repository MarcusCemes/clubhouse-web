import { browser } from "$app/env";

let welcomed = false;

export function welcomeDeveloper() {
    if (browser && !welcomed) {
        welcomed = true;

        const messages = [
            "👋 Hi there",
            "Interested in web development?",
            "Have an idea you would like to share?",
            "We'd love to hear from you!",
            "Have a great day! 🥂",
        ];

        console.log(messages.join("\n"));
    }
}
