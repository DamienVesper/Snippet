// SPDX-FileCopyrightText: 2026 Damien Vesper <ldamienvesper@gmail.com>
// SPDX-License-Identifier: AGPL-3.0-only

import { styleText } from "node:util";

import type { Config } from "../../configType.d.ts";

/**
 * Custom logger. Cannot be used on the client.
 */
export class Logger {
    constructor(protected readonly config: Config["logging"]) {}

    clear(): void {
        console.clear();
    }

    protected log(fn = console.log, levelText: string, topic: string, ...args: any[]): void {
        let message = "";

        if (this.config.timestamp) {
            const time = new Date();

            const second = time.getSeconds().toString().padStart(2, "0");
            const minute = time.getMinutes().toString().padStart(2, "0");
            const hour = time.getHours().toString();

            const day = time.getDate().toString();
            const month = (time.getMonth() + 1).toString();
            const year = time.getFullYear().toString();

            message += styleText(
                "dim",
                `${month.padStart(2, "0")}/${day.padStart(2, "0")}/${year.padStart(2, "0")} ${hour.padStart(2, "0")}:${minute}:${second}`
            );
            message += styleText("dim", " | ");
        }

        message += levelText;
        message += styleText("dim", " | ");
        message += styleText("bold", topic);
        message += styleText("dim", " |");
        message += styleText("reset", "");

        fn(message, ...args);
    }

    info(topic: string, ...args: any[]): void {
        if (!this.config.info) return;
        this.log(console.info, styleText(["bold", "cyan"], "INFO"), topic, ...args);
    }

    warn(topic: string, ...args: any[]): void {
        if (!this.config.warn) return;
        this.log(console.warn, styleText(["bold", "yellow"], "WARN"), topic, ...args);
    }

    error(topic: string, ...args: any[]): void {
        if (!this.config.error) return;
        this.log(console.error, styleText(["bold", "red"], "ERROR"), topic, ...args);
    }

    debug(topic: string, ...args: any[]): void {
        if (!this.config.debug) return;
        this.log(console.debug, styleText(["bold", "white"], "DEBUG"), topic, ...args);
    }
}
