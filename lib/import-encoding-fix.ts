/// <reference path="../typings/tsd.d.ts" />

import * as less from 'less';

export interface PluginOptions {
    preferEncoding: string;
};

export class ImportEncodingFix extends less.FileManager {
    options: PluginOptions;

    constructor(opts: PluginOptions) {
        super();
        this.options = opts;
    }

    supports() {}

    supportsSync() {}

    loadFile(
        filename: string,
        currentDirectory: string,
        options: any,
        environment: any,
        callback: (err: void|Less.LessError, data: Less.LoadedFile) => void
        ): Promise<Less.LoadedFile> {
            throw new Error('todo');
        };

    loadFileSync(
        filename: string,
        currentDirectory: string,
        options: any,
        environment: any
        ): Less.LoadError|Less.LoadedFile {
        return {
            contents: '',
            filename: ''
        };
    };
}
