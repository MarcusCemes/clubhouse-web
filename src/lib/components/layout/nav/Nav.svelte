<script lang="ts">
    import { FORUM_URL } from "$lib/api/constants";
    import Logo from "$lib/components/common/Logo.svelte";
    import { MessageSquareIcon } from "svelte-feather-icons";
    import NavAuthentication from "./NavAuthentication.svelte";
    import NavLink from "./NavLink.svelte";
</script>

<nav class="mb-4 flex justify-center md:mb-0 md:h-32">
    <div class="flex w-full max-w-4xl flex-col items-center md:flex-row">
        <a
            href="/"
            class="select-none pt-8 pb-6 text-2xl font-bold md:relative md:bottom-0.5 md:pt-0 md:pb-0"
        >
            <Logo class="h-12" />
        </a>

        <span
            class="mb-4 inline-flex items-center font-semibold md:mb-0 md:ml-16 md:justify-start"
        >
            <NavLink href={FORUM_URL}>
                <MessageSquareIcon size="1x" class="mr-1" />
                Forum
            </NavLink>
        </span>

        <div class="hidden flex-1 md:block" />
        <NavAuthentication />
    </div>
</nav>
