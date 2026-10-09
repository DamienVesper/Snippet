<!--
SPDX-FileCopyrightText: 2026 Damien Vesper <ldamienvesper@gmail.com>
SPDX-License-Identifier: AGPL-3.0-only
-->

<script lang="ts">
    import { enhance } from "$app/forms";

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

<main class="text-primary">
    <article class="container mx-auto pt-5">
        <section class="mb-6 flex flex-wrap items-center gap-4 rounded-xl border border-border bg-card px-5 py-4">
            <img
                src="https://cdn.discordapp.com/avatars/{data.discordId}/{data.avatar}.webp"
                alt=""
                class="h-11 w-11 rounded-full"
            />
            <div class="flex flex-col">
                <span class="font-semibold">{data.username}</span>
                <span class="text-sm text-secondary">Discord ID: {data.discordId}</span>
            </div>
            <div class="flex-1"></div>
            <a
                href="/api/config"
                class="btn rounded-lg border border-border bg-accent px-3 py-[0.45rem] text-sm font-semibold hover:bg-accent-hover"
            >
                Download Config
            </a>
        </section>
        <section
            class="mb-6 flex flex-wrap items-center gap-4 rounded-xl border border-dashed border-border bg-card px-5 py-4"
        >
            <h2 class="w-full text-lg font-bold">Upload File</h2>
            <form
                action="/api/upload"
                method="POST"
                class="flex w-full gap-3"
                enctype="multipart/form-data"
                use:enhance
            >
                <input
                    type="file"
                    name="file"
                    id="file"
                    class="min-w-50 flex-1 rounded-lg border border-border bg-background p-[0.4rem] text-sm text-secondary"
                />
                <button
                    type="submit"
                    class="btn rounded-lg border border-border bg-accent px-6 text-sm font-semibold hover:bg-accent-hover"
                >
                    Upload
                </button>
            </form>
            <p class="text-sm text-secondary">
                Supports images, videos, and plaintext files. All files are stored permanently.
            </p>
        </section>
        <section>
            <h2 class="w-full text-lg font-bold">Your Uploads</h2>
            <div class="mt-4 mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {#each data.uploads as media, i (i)}
                    <UploadCard adminView={false} {media} {formatter} />
                {/each}
            </div>
        </section>
    </article>
</main>

<style>
    input[type="file"]::file-selector-button {
        background: var(--color-background-hover);
        color: white;

        font-weight: 600;

        border: 1px solid var(--color-border);
        border-radius: 0.375rem;

        margin-right: 0.75rem;
        padding: 0.4rem 0.9rem;

        cursor: pointer;
        transition: background 0.15s;
    }

    input[type="file"]::file-selector-button:hover {
        background: var(--color-border);
    }
</style>
