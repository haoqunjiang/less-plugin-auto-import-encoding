/// <reference path="../typings/tsd.d.ts" />

import * as less from 'less';

export interface PluginOptions {
    preferEncoding?: string;
};

export function createImportEncodingFix(less: LessStatic): typeof Less.FileManager {
    class ImportEncodingFix extends less.FileManager {
        options: PluginOptions;

        constructor(opts: PluginOptions = {}) {
            super();
            this.options = opts;
        }

        supports(): boolean {
            return true;
        }

        supportsSync(): boolean {
            return true;
        }

        loadFile(
            filename: string,
            currentDirectory: string,
            options: Less.LoadOptions = {},
            environment: any,
            callback: (err: void|Less.LessError, data: Less.LoadedFile) => void
            ): Promise<Less.LoadedFile> {
/*            let data: Less.LoadError|Less.LoadedFile;

            if (options.syncImport) {
                data = this.loadFileSync(filename, currentDirectory, options, environment);
                return callback(data.error, data);
            }
*/
            throw new Error('async load has not been implemented yet');
        };

        loadFileSync(
            filename: string,
            currentDirectory: string,
            options: Less.LoadOptions = {},
            environment: any
            ): Less.LoadError|Less.LoadedFile {
            return {
                contents: '',
                filename: ''
            };
        };
    }

    return ImportEncodingFix;
}
