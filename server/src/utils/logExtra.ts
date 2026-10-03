// SPDX-FileCopyrightText: 2026 Damien Vesper <ldamienvesper@gmail.com>
// SPDX-License-Identifier: AGPL-3.0-only

import { author, version } from "../../package.json";

/**
 * Log a header to the console.
 */
const logHeader = (): void => {
    console.log(`\x1b[34m`, `--------------------------------------------------`);
};

/**
 * Log the splash screen.
 */
const logSplash = (): void => {
    console.log(
        `\x1b[34m`,
        `
    
    ███████╗███╗   ██╗██╗██████╗ ██████╗ ███████╗████████╗
    ██╔════╝████╗  ██║██║██╔══██╗██╔══██╗██╔════╝╚══██╔══╝
    ███████╗██╔██╗ ██║██║██████╔╝██████╔╝█████╗     ██║   
    ╚════██║██║╚██╗██║██║██╔═══╝ ██╔═══╝ ██╔══╝     ██║   
    ███████║██║ ╚████║██║██║     ██║     ███████╗   ██║   
    ╚══════╝╚═╝  ╚═══╝╚═╝╚═╝     ╚═╝     ╚══════╝   ╚═╝   
                                                                                                                  
            Created by ${author} | v${version}
    `
    );
};

export { logHeader, logSplash };
