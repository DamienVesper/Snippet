<script lang="ts">
    import "#lib/css/index.css";

    import favicon from "#lib/img/favicon.svg";

    const { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
