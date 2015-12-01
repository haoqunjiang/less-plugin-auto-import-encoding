/// <reference path="../typings/tsd.d.ts" />

import * as less from 'less';

export class ImportEncodingFix extends less.FileManager {
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
