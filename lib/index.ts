/// <reference path="../typings/tsd.d.ts" />

import { ImportEncodingFix, PluginOptions } from './import-encoding-fix';

export default class LessPluginImportEncodingFix {
    options: PluginOptions;
    minVersion: number[] = [2, 1, 1];

    constructor(opts: PluginOptions) {
        this.options = opts;
    }

    install(less: LessStatic, pluginManager: Less.PluginManager): void {
        pluginManager.addFileManager(new ImportEncodingFix(this.options));
    }

    printUsage(): void {
        console.log('Not implemented yet');
    }
}
