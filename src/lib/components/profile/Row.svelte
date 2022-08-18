<script lang="ts">
  export let title: string;
  export let tooltip: string | undefined = undefined;

  let className = "";
  export { className as class };
</script>

<tr class="transition-colors duration-100 hover:bg-gray-200" title={tooltip}>
  <td class="whitespace-nowrap rounded-l-md px-6 py-3 font-bold">{title}</td>
  <td class={`px-6 py-3 rounded-r-md ${className}`}><slot /></td>
</tr>
