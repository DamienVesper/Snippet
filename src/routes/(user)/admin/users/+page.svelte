<!--
SPDX-FileCopyrightText: 2026 Damien Vesper <ldamienvesper@gmail.com>
SPDX-License-Identifier: AGPL-3.0-only
-->

<script lang="ts">
    import { enhance } from "$app/forms";
    import BadgeCheck from "@lucide/svelte/icons/badge-check";
    import Pause from "@lucide/svelte/icons/pause";
    import Trash from "@lucide/svelte/icons/trash";

    import { Status } from "#lib/types/enums.ts";
    import { helpers } from "#lib/utils/helpers.ts";

    const { data } = $props();

    const dateFormatter = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    });

    const numFormatter = new Intl.NumberFormat("en-US");
</script>

<article class="flex flex-col gap-2 rounded-lg border border-border bg-card p-5">
    <h1 class="text-2xl font-bold">Users</h1>
    <hr class="my-4 text-border" />
    <div class="max-w-full overflow-auto">
        <table class="w-full">
            <thead>
                <tr class="text-xs text-secondary uppercase">
                    <th class="border-b border-border bg-background-hover py-4">User</th>
                    <th class="border-b border-border bg-background-hover py-4">Discord ID</th>
                    <th class="border-b border-border bg-background-hover py-4 text-center!">Role</th>
                    <th class="border-b border-border bg-background-hover py-4 text-center!">Status</th>
                    <th class="border-b border-border bg-background-hover py-4">Created At</th>
                    <th class="border-b border-border bg-background-hover py-4">Last Login</th>
                    <th class="border-b border-border bg-background-hover py-4">Uploads</th>
                    <th class="border-b border-border bg-background-hover py-4 text-center!">Actions</th>
                </tr>
            </thead>
            <tbody>
                {#each data.users as user, i (i)}
                    <tr class="text-sm">
                        <td>
                            <div class="flex items-center gap-2">
                                <img
                                    src="https://cdn.discordapp.com/avatars/{user.discordId}/{user.avatar}.webp"
                                    alt=""
                                    class="h-7 w-7 rounded-full"
                                />
                                <span>{user.username}</span>
                            </div>
                        </td>
                        <td>{user.discordId}</td>
                        <td class="text-center">
                            <button
                                class="cursor-default rounded-sm bg-info-bg px-2 py-1 text-xs font-semibold text-info"
                                disabled
                            >
                                {helpers.capitalize(user.role)}
                            </button>
                        </td>
                        <td class="text-center">
                            <button
                                class="cursor-default rounded-sm px-2 py-1 text-xs font-semibold"
                                class:text-success={user.status === Status.Verified}
                                class:bg-success-bg={user.status === Status.Verified}
                                class:text-warning={user.status === Status.Unverified}
                                class:bg-warning-bg={user.status === Status.Unverified}
                                class:text-danger={user.status === Status.Suspended}
                                class:bg-danger-bg={user.status === Status.Suspended}
                                disabled
                            >
                                {helpers.capitalize(user.status)}
                            </button>
                        </td>
                        <td>{dateFormatter.format(user.createdAt)}</td>
                        <td>{dateFormatter.format(user.lastLoginAt)}</td>
                        <td>{numFormatter.format(user.uploads)}</td>
                        <td>
                            {#if user.discordId === data.discordId}
                                <span class="text-secondary">You</span>
                            {:else}
                                <div class="flex justify-center gap-1">
                                    {#if user.status === Status.Verified}
                                        <form
                                            action="?/suspend"
                                            method="POST"
                                            enctype="multipart/form-data"
                                            use:enhance
                                        >
                                            <input type="hidden" name="target" value={user.discordId} />
                                            <button
                                                type="submit"
                                                class="btn-darken rounded-sm bg-warning-bg px-2 py-1 text-xs font-semibold text-warning"
                                            >
                                                <Pause />
                                            </button>
                                        </form>
                                    {:else}
                                        <form action="?/verify" method="POST" enctype="multipart/form-data" use:enhance>
                                            <input type="hidden" name="target" value={user.discordId} />
                                            <button
                                                type="submit"
                                                class="btn-darken rounded-sm bg-info-bg px-2 py-1 text-xs font-semibold text-info"
                                            >
                                                <BadgeCheck />
                                            </button>
                                        </form>
                                    {/if}
                                    <form action="?/delete" method="POST" enctype="multipart/form-data" use:enhance>
                                        <input type="hidden" name="target" value={user.discordId} />
                                        <button
                                            type="submit"
                                            class="btn-darken rounded-sm bg-danger-bg px-2 py-1 text-xs font-semibold text-danger"
                                        >
                                            <Trash />
                                        </button>
                                    </form>
                                </div>
                            {/if}
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</article>

<style>
    th {
        text-align: left;
        padding-left: 0.85rem;
        padding-right: 0.85rem;
    }

    td {
        padding: 0.65rem 0.85rem;
        border-bottom: 1px solid var(--color-border);
    }
</style>
