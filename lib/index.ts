/// <reference path="../typings/tsd.d.ts" />

export default class LessPluginImportEncodingFix {
    minVersion: number[] = [2, 1, 1];

    install(less: LessStatic, pluginManager: Less.PluginManager): void {};

    printUsage(): void {
        console.log('Not implemented yet');
    }
}
