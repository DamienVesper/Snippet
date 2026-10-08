<!--
SPDX-FileCopyrightText: 2026 Damien Vesper <ldamienvesper@gmail.com>
SPDX-License-Identifier: AGPL-3.0-only
-->

<script lang="ts">
    import { enhance } from "$app/forms";

    const { authenticated }: { authenticated: boolean } = $props();
</script>

<header class="sticky top-0 z-100 border border-b-border bg-header-bg py-3">
    <div class="container mx-auto text-primary">
        <nav class="flex items-center gap-2">
            <a href="/" class="text-xl font-bold hover:underline">Snippet</a>
            <div class="flex-1"></div>
            {#if authenticated}
                <a
                    href="/dashboard"
                    class="rounded-lg border border-border bg-background-hover px-3 py-[0.45rem] text-sm font-semibold hover:bg-border"
                >
                    Dashboard
                </a>
                <!-- svelte-ignore a11y_invalid_attribute -->
                <a
                    href=""
                    class="cursor-not-allowed rounded-lg border border-border bg-background-hover! px-3 py-[0.45rem] text-sm font-semibold opacity-50 hover:bg-border"
                    aria-disabled="true"
                >
                    Settings
                </a>
                <!-- svelte-ignore a11y_invalid_attribute -->
                <a
                    href=""
                    class="cursor-not-allowed rounded-lg border border-border bg-background-hover! px-3 py-[0.45rem] text-sm font-semibold opacity-50 hover:bg-border"
                    aria-disabled="true"
                >
                    Admin
                </a>

                <form action="/auth/logout" method="POST" use:enhance>
                    <button
                        type="submit"
                        class="rounded-lg border border-border bg-background-hover px-3 py-[0.45rem] text-sm font-semibold hover:bg-border"
                    >
                        Logout
                    </button>
                </form>
            {/if}
        </nav>
    </div>
</header>

<style>
    header {
        backdrop-filter: blur(0.5rem);
    }

    a:not([aria-disabled="true"]):not(:first-child):hover,
    form button:hover {
        transform: translateY(-0.0625rem);
        transition:
            background 0.15s,
            transform 0.1s;
    }
</style>
