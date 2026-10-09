<!--
SPDX-FileCopyrightText: 2026 Damien Vesper <ldamienvesper@gmail.com>
SPDX-License-Identifier: AGPL-3.0-only
-->

<script lang="ts">
    import { page } from "$app/state";
</script>

<aside class="mt-5 flex gap-2 text-sm text-primary">
    <a
        href="/admin"
        class="rounded-lg border border-border bg-card px-3 py-2 hover:border-accent hover:bg-border"
        class:active={page.url.pathname === "/admin"}
    >
        Dashboard
    </a>
    <a
        href="/admin/users"
        class="rounded-lg border border-border bg-card px-3 py-2 hover:border-accent hover:bg-border"
        class:active={page.url.pathname === "/admin/users"}
    >
        Users
    </a>
    <a
        href="/admin/media"
        class="rounded-lg border border-border bg-card px-3 py-2 hover:border-accent hover:bg-border"
        class:active={page.url.pathname === "/admin/media"}
    >
        Media
    </a>
    <a
        href="/admin/login-activity"
        class="rounded-lg border border-border bg-card px-3 py-2 hover:border-accent hover:bg-border"
        class:active={page.url.pathname === "/admin/login-activity"}
    >
        Login Attempts
    </a>
    <a
        href="/admin/logs"
        class="rounded-lg border border-border bg-card px-3 py-2 hover:border-accent hover:bg-border"
        class:active={page.url.pathname === "/admin/logs"}
    >
        Admin Logs
    </a>
    <a
        href="/admin/user-activity"
        class="rounded-lg border border-border bg-card px-3 py-2 hover:border-accent hover:bg-border"
        class:active={page.url.pathname === "/admin/user-activity"}
    >
        User Activity
    </a>
</aside>

<style>
    a {
        transition: background 0.15s;
    }

    a.active {
        background: var(--color-background-hover);
        border-color: var(--color-accent);
    }
</style>
