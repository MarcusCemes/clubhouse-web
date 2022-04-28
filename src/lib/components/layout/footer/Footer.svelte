<script lang="ts">
    import Logo from "$lib/components/common/Logo.svelte";
    import Link from "./FooterLink.svelte";
</script>

<footer class="mt-4 py-8 flex justify-center border-t">
    <div class="w-full max-w-5xl grid grid-cols-2">
        <div>
            <div class="text-xl font-bold"><Logo /></div>
            <div class="mt-2 pl-8">The unofficial EPFL community website.</div>
        </div>
        <div class="flex flex-col gap-y-1 items-start">
            <Link href="/faq">FAQ</Link>
            <Link href="/tos">Terms of Service</Link>
            <Link href="/privacy">Privacy Policy</Link>
        </div>
    </div>
</footer>
