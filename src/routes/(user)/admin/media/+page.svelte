<!--
SPDX-FileCopyrightText: 2026 Damien Vesper <ldamienvesper@gmail.com>
SPDX-License-Identifier: AGPL-3.0-only
-->

<script lang="ts">
    import UploadCard from "#lib/components/dashboard/UploadCard.svelte";

    const { data } = $props();

    const formatter = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    });
</script>

<article class="flex flex-col gap-2 rounded-lg border border-border bg-card p-5">
    <h1 class="text-2xl font-bold">All Uploads</h1>
    <hr class="my-4 text-border" />
    <section class="mt-4 mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {#each data.uploads as media, i (i)}
            <UploadCard {media} {formatter} adminView={true} />
        {/each}
    </section>
</article>
