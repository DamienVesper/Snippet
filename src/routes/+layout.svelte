<!--
SPDX-FileCopyrightText: 2026 Damien Vesper <ldamienvesper@gmail.com>
SPDX-License-Identifier: AGPL-3.0-only
-->

<script lang="ts">
    import Footer from "#lib/components/Footer.svelte";
    import Header from "#lib/components/Header.svelte";
    import favicon from "#lib/img/favicon.ico";

    import "#lib/css/index.css";

    const { children, data } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<Header authenticated={data.authenticated} role={data.role} />
{@render children()}
<Footer />
