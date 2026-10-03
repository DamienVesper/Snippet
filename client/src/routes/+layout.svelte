<!--
SPDX-FileCopyrightText: 2026 Damien Vesper <ldamienvesper@gmail.com>
SPDX-License-Identifier: AGPL-3.0-only
-->

<script lang="ts">
    import "#lib/css/index.css";

    import Header from "#lib/components/Header.svelte";
    import Footer from "#lib/components/Footer.svelte";

    // import favicon from "#lib/img/favicon.svg";

    const { children } = $props();
</script>

<!-- <svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head> -->

<Header />
{@render children()}
<Footer />
