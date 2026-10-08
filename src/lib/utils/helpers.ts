// SPDX-FileCopyrightText: 2026 Damien Vesper <ldamienvesper@gmail.com>
// SPDX-License-Identifier: AGPL-3.0-only

const encoder = new TextEncoder();

export const helpers = {
    /**
     * Safely fetch a URL without having to handle errors.
     * @param url The URL to fetch.
     * @param init Request options.
     */
    async fetchSafe<T>(
        url: string | URL | Request,
        init?: RequestInit
    ): Promise<{ ok: false; data?: T } | { ok: true; data: T }> {
        try {
            const res = await fetch(url, init);

            const type = res.headers.get("Content-Type");
            if (!type?.toLowerCase().includes("application/json")) {
                return {
                    ok: false
                };
            }

            const data = await res.json();
            return {
                ok: res.ok,
                data
            };
        } catch {
            return {
                ok: false
            };
        }
    },
    async hashString(str: string): Promise<string> {
        // TODO: Uint8Array#toHex is very new. Maybe this should be polyfilled?
        return new Uint8Array(await crypto.subtle.digest("SHA-256", encoder.encode(str))).toHex();
    }
};
