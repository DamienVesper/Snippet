<!--
SPDX-FileCopyrightText: 2026 Damien Vesper <ldamienvesper@gmail.com>
SPDX-License-Identifier: AGPL-3.0-only
-->

<script lang="ts">
    import AdminNav from "#lib/components/admin/AdminNav.svelte";

    const { children, data } = $props();
</script>

<div class="container mx-auto">
    <AdminNav />
    <main class="mt-5 text-primary">
        {@render children()}
    </main>
</div>
