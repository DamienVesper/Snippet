<!--
SPDX-FileCopyrightText: 2026 Damien Vesper <ldamienvesper@gmail.com>
SPDX-License-Identifier: AGPL-3.0-only
-->

<script lang="ts"></script>

<header class="sticky top-0 z-100 border border-b-border bg-header-bg py-3">
    <div class="container mx-auto text-primary">
        <nav class="flex items-center gap-2">
            <a href="/" class="text-xl font-bold hover:underline">Snippet</a>
            <div class="flex-1"></div>
            <a
                href="/gallery"
                class="rounded-lg border border-border bg-background-hover px-3 py-[0.45rem] text-sm font-semibold hover:bg-border"
            >
                Gallery
            </a>
            <a
                href="/settings"
                class="rounded-lg border border-border bg-background-hover px-3 py-[0.45rem] text-sm font-semibold hover:bg-border"
            >
                Settings
            </a>
            <a
                href="/admin"
                class="rounded-lg border border-border bg-background-hover px-3 py-[0.45rem] text-sm font-semibold hover:bg-border"
            >
                Admin
            </a>
            <a
                href="/logout"
                class="rounded-lg border border-border bg-background-hover px-3 py-[0.45rem] text-sm font-semibold hover:bg-border"
            >
                Logout
            </a>
        </nav>
    </div>
</header>

<style>
    header {
        backdrop-filter: blur(0.5rem);
    }

    a:not(:first-child):hover {
        transform: translateY(-0.0625rem);
        transition:
            background 0.15s,
            transform 0.1s;
    }
</style>
