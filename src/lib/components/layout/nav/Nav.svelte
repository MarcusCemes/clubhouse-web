<script lang="ts">
    import { FORUM_URL } from "$lib/api/constants";
    import Logo from "$lib/components/common/Logo.svelte";
    import { MessageSquareIcon } from "svelte-feather-icons";
    import NavAuthentication from "./NavAuthentication.svelte";
    import NavLink from "./NavLink.svelte";
</script>

<nav class="mb-4 md:mb-0 md:h-32 flex justify-center">
    <div class="w-full max-w-4xl flex flex-col md:flex-row items-center">
        <a
            href="/"
            class="pt-8 pb-6 md:pt-0 md:pb-0 md:relative md:bottom-0.5 text-2xl font-bold select-none"
        >
            <Logo class="h-12" />
        </a>

        <span
            class="mb-4 md:mb-0 md:ml-16 inline-flex md:justify-start items-center font-semibold"
        >
            <NavLink href={FORUM_URL}>
                <MessageSquareIcon size="1x" class="mr-1" />
                Forum
            </NavLink>
        </span>

        <div class="hidden md:block flex-1" />
        <NavAuthentication />
    </div>
</nav>
