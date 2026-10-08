// SPDX-FileCopyrightText: 2026 Damien Vesper <ldamienvesper@gmail.com>
// SPDX-License-Identifier: AGPL-3.0-only

export const util = {
    /**
     * @link https://stackoverflow.com/questions/27936772/how-to-deep-merge-instead-of-shallow-merge
     */
    // oxlint-disable-next-line typescript/explicit-function-return-type
    isObject(item: unknown) {
        return item && (typeof item === "undefined" ? "undefined" : typeof item) === "object" && !Array.isArray(item);
    },

    /**
     * @param target The object to merge all other objects into.
     * @param sources The objects to be merged.
     * @link https://stackoverflow.com/questions/27936772/how-to-deep-merge-instead-of-shallow-merge
     */
    mergeDeep(target: any, ...sources: any[]): any {
        if (!sources.length) return target;
        const source = sources.shift();

        if (this.isObject(target) && this.isObject(source)) {
            for (const key in source) {
                if (this.isObject(source[key])) {
                    if (!target[key]) Object.assign(target, { [key]: {} });
                    this.mergeDeep(target[key], source[key]);
                } else {
                    Object.assign(target, { [key]: source[key] });
                }
            }
        }

        return this.mergeDeep(target, ...sources);
    }
};

// oxfmt-ignore
export type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;
