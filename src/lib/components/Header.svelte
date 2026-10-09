<!--
SPDX-FileCopyrightText: 2026 Damien Vesper <ldamienvesper@gmail.com>
SPDX-License-Identifier: AGPL-3.0-only
-->

<script lang="ts">
    import { enhance } from "$app/forms";

    import { Role } from "#lib/types/enums.ts";

    const { authenticated, role }: { authenticated: boolean; role: Role | undefined } = $props();
</script>

<header class="sticky top-0 z-100 border border-b-border bg-header-bg py-3">
    <div class="container mx-auto text-primary">
        <nav class="flex items-center gap-2 text-sm font-semibold">
            <a href="/" class="text-xl font-bold hover:underline">Snippet</a>
            <div class="flex-1"></div>
            {#if authenticated}
                <a
                    href="/dashboard"
                    class="rounded-lg border border-border bg-background-hover px-3 py-[0.45rem] hover:bg-border"
                >
                    Dashboard
                </a>
                {#if role === Role.Admin}
                    <a
                        href="/admin"
                        class="rounded-lg border border-border bg-background-hover px-3 py-[0.45rem] hover:bg-border"
                    >
                        Admin
                    </a>
                {/if}
                <a
                    href="/settings"
                    class="rounded-lg border border-border bg-background-hover px-3 py-[0.45rem] hover:bg-border"
                >
                    Settings
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
