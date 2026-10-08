<!--
SPDX-FileCopyrightText: 2026 Damien Vesper <ldamienvesper@gmail.com>
SPDX-License-Identifier: AGPL-3.0-only
-->

<script lang="ts">
    import Discord from "#lib/img/icons/discord.svg";
</script>

<main class="py-32 text-center font-sans text-primary">
    <h1 class="pt-4 text-5xl font-bold">Snippet</h1>
    <p class="my-6 text-lg text-secondary">
        Private hosting for screenshots, video, audio, and files from ShareX.
        <br />
        Sign in with Discord to access your gallery and upload endpoint.
    </p>

    <a
        class="btn-darken btn-discord mx-auto mt-8 flex w-fit cursor-pointer items-center justify-center gap-2 rounded-lg bg-discord px-4.5 py-2.5"
        href="/auth/login"
    >
        <img src={Discord} alt="Discord logo" class="h-6" />
        <span class="text-md font-semibold">Login with Discord</span>
    </a>
</main>
