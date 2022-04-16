<script lang="ts">
    export let href: string;
</script>

<a
    class="text-gray-600 hover:text-gray-400 transition-colors duration-75"
    {href}><slot /></a
>
