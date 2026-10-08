<!--
SPDX-FileCopyrightText: 2026 Damien Vesper <ldamienvesper@gmail.com>
SPDX-License-Identifier: AGPL-3.0-only
-->

<script lang="ts">
    const { data } = $props();
</script>

<main class="text-primary">
    <div>
        <div class="flex">
            <img src={data.avatar} alt="" class="rounded-full" />
            <div>
                <span>{data.username}</span>
                <span>Discord ID: {data.discordId}</span>
            </div>
            <div class="flex-1"></div>
            <a href="/config">Download Config</a>
        </div>
    </div>
    <div></div>
    <div></div>
</main>
