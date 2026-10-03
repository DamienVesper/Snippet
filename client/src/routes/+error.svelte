<script lang="ts">
    const { error } = $props();
</script>

<main class="text-center">
    <h1 class="mt-5 text-2xl">{error.status}</h1>
    <h3 class="text-lg">{error.message}</h3>
</main>   
