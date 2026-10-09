<!--
SPDX-FileCopyrightText: 2026 Damien Vesper <ldamienvesper@gmail.com>
SPDX-License-Identifier: AGPL-3.0-only
-->

<script lang="ts">
    import { enhance } from "$app/forms";
    import Trash from "@lucide/svelte/icons/trash";

    import { helpers } from "#lib/utils/helpers.ts";

    import type { MediaType } from "#lib/server/models/Media.ts";
    import type { UserType } from "#lib/server/models/User.ts";

    // oxfmt-ignore
    const {
        adminView,
        formatter,
        media
    }:
        | {
            adminView: true;
            formatter: Intl.DateTimeFormat;
            media: Pick<MediaType, "createdAt" | "filename" | "name" | "size"> & Pick<UserType, "avatar" | "discordId" | "username">;
        }
        | {
            adminView: false;
            formatter: Intl.DateTimeFormat;
            media: Pick<MediaType, "createdAt" | "filename" | "name" | "size">;
        } = $props();
</script>

<div class="upload-card max-w-full min-w-0 overflow-hidden rounded-lg border border-border bg-card hover:border-accent">
    <a
        href="/i/{media.filename}"
        target="_blank"
        class="relative flex aspect-video flex-col items-center justify-center gap-[0.35rem] overflow-hidden bg-background-hover"
    >
        <!-- TODO: Find better way to determine video vs. img vs. document files. -->
        {#if media.filename.endsWith(".mp4") || media.filename.endsWith(".mov") || media.filename.endsWith(".mkv") || media.filename.endsWith(".webm")}
            <!-- svelte-ignore a11y_media_has_caption -->
            <video src="/i/{media.filename}" preload="metadata" class="h-full w-full max-w-full"></video>
        {:else}
            <img src="/i/{media.filename}" alt="" loading="lazy" class="h-full w-full max-w-full" />
        {/if}
    </a>
    <div class="px-4 py-[0.85rem]">
        <p class="overflow-hidden text-sm font-semibold text-nowrap text-ellipsis" title={media.name}>
            {media.name}
        </p>
        <span class="text-xs text-secondary">
            {formatter.format(media.createdAt)} &middot; {helpers.formatBytes(media.size)}
        </span>
        <br />
        <a href="/i/{media.filename}" target="_blank" class="font-mono text-sm break-all text-accent hover:underline">
            /i/{media.filename}
        </a>
        {#if adminView}
            <form
                action="?/delete"
                method="POST"
                enctype="multipart/form-data"
                use:enhance
                class="mt-2 flex items-center text-xs text-secondary"
            >
                <input type="hidden" name="target" value={media.filename} />
                <div class="flex items-center gap-1">
                    <img
                        src="https://cdn.discordapp.com/avatars/{media.discordId}/{media.avatar}.webp"
                        alt=""
                        class="w-6 h-6 rounded-full"
                    />
                    <span>{media.username}</span>
                </div>
                <div class="flex-1"></div>
                <button
                    type="submit"
                    class="btn-darken rounded-sm bg-danger-bg px-2 py-1 text-xs font-semibold text-danger"
                >
                    <Trash size={20} />
                </button>
            </form>
        {/if}
    </div>
</div>

<style>
    .upload-card {
        transition:
            border-color 0.15s,
            transform 0.15s;
    }

    .upload-card:hover {
        transform: translateY(-0.125rem);
    }
</style>
