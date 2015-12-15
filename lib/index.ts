/// <reference path="../typings/tsd.d.ts" />

import { createAutoImportEncoding, PluginOptions } from './auto-import-encoding';

export default class LessPluginImportEncodingFix {
    options: PluginOptions;
    minVersion: number[] = [2, 1, 1];

    constructor(opts: PluginOptions = {}) {
        this.options = opts;
    }

    install(less: LessStatic, pluginManager: Less.PluginManager): void {
        /* tslint:disable variable-name */
        const AutoImportEncoding = createAutoImportEncoding(less);
        pluginManager.addFileManager(new AutoImportEncoding(this.options));
    }

    printUsage(): void {
        console.log('Not implemented yet');
    }
}
