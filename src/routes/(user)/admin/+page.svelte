<!--
SPDX-FileCopyrightText: 2026 Damien Vesper <ldamienvesper@gmail.com>
SPDX-License-Identifier: AGPL-3.0-only
-->

<script lang="ts">
    const { data } = $props();
</script>

<article class="grid gap-4 xl:grid-cols-2">
    <div class="flex flex-col items-center justify-center gap-2 rounded-lg border border-border bg-card p-5">
        <span class="text-4xl font-bold text-accent">{data.stats.users}</span>
        <span class="text-sm text-secondary">Users</span>
    </div>
    <div class="flex flex-col items-center justify-center gap-2 rounded-lg border border-border bg-card p-5">
        <span class="text-4xl font-bold text-accent">{data.stats.uploads}</span>
        <span class="text-sm text-secondary">Uploads</span>
    </div>
    <div class="rounded-lg border border-border bg-card p-5 lg:col-span-2">
        <h1 class="text-2xl font-bold">Welcome, {data.username}.</h1>
        <p class="text-md mt-2 text-secondary">Manage users and media, or view logs here.</p>
    </div>
</article>
