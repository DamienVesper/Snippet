// SPDX-FileCopyrightText: 2026 Damien Vesper <ldamienvesper@gmail.com>
// SPDX-License-Identifier: AGPL-3.0-only

const encoder = new TextEncoder();

const BYTE_SIZES = ["B", "KiB", "MiB", "GiB"];

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
    /**
     * Formats an integer representation of bytes to human-readable units.
     * @param bytes The number to format.
     * @param fixed The number of digits beyond the decimal point to keep.
     */
    formatBytes(bytes: number, fixed = 2): string {
        if (bytes === 0) return "0 B";

        const exp = Math.floor(Math.log(bytes) / Math.log(1024));
        return `${parseFloat((bytes / Math.pow(1024, exp)).toFixed(fixed))} ${BYTE_SIZES[exp]}`;
    },
    /**
     * Hash a string.
     * @param str The string to hash.
     */
    async hashString(str: string): Promise<string> {
        // TODO: Uint8Array#toHex is very new. Maybe this should be polyfilled?
        return new Uint8Array(await crypto.subtle.digest("SHA-256", encoder.encode(str))).toHex();
    }
};
