<!--
SPDX-FileCopyrightText: 2026 Damien Vesper <ldamienvesper@gmail.com>
SPDX-License-Identifier: AGPL-3.0-only
-->

<script lang="ts">
    import Discord from "#lib/img/icons/discord.svg";
</script>

<main class="py-32 font-sans text-primary text-center">
    <h1 class="text-5xl font-bold pt-4">Snippet</h1>
    <p class="text-lg text-secondary my-6">
        Private hosting for screenshots, video, audio, and files from ShareX.
        <br>
        Sign in with Discord to access your gallery and upload endpoint.
    </p>

    <a
        class="btn-darken btn-discord flex justify-center items-center gap-2 bg-discord px-4.5 py-2.5 rounded-lg cursor-pointer mx-auto mt-8 w-fit"
        href="https://discord.com/oauth2/authorize?client_id={undefined}&redirect_uri={undefined}&response_type=code&scope=identify+email&state={undefined}"
    >
        <img src={Discord} alt="Discord logo" class="h-6" />
        <span class="text-md font-semibold">Login with Discord</span>
    </a>
</main>
