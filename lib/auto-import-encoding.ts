/// <reference path="../typings/tsd.d.ts" />

import * as fs from 'fs';
import * as path from 'path';

import * as less from 'less';

import convert from 'smart-encoding-convert';

export interface PluginOptions {
    preferEncoding?: string;
};

// can't decide which return type to use so as to avoid type incompatibility
export function createAutoImportEncoding(less: LessStatic): any {
    return class AutoImportEncoding extends less.FileManager {
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
            callback: (err: void|Less.LessError, data: Less.LoadedFile|any) => void
        ): Promise<Less.LoadedFile> {
            if (options.syncImport) {
                let data = this.loadFileSync(filename, currentDirectory, options, environment);
                callback((<Less.LoadError>data).error, data);
                return;
            }

            let isAbsoluteFilename = this.isPathAbsolute(filename);

            let paths = isAbsoluteFilename ? [''] : [currentDirectory];
            paths = paths.concat(options.paths || []);
            if (!isAbsoluteFilename && paths.indexOf('.') === -1) {
                paths.push('.');
            }

            let fullFilename: string, filenamesTried: string[];

            return new Promise((resolve, reject) => {
                (function tryPathIndex(i) {
                    if (i < paths.length) {
                        fullFilename = filename;
                        if (paths[i]) {
                            fullFilename = path.join(paths[i], fullFilename);
                        }
                        fs.stat(fullFilename, (err) => {
                            if (err) {
                                filenamesTried.push(fullFilename);
                                tryPathIndex(i + 1);
                            } else {
                                fs.readFile(fullFilename, (e, data) => {
                                    if (e) { reject(e); return; }

                                    let contents = convert(data, { mightFrom: 'gbk' }).toString();

                                    resolve({
                                        contents: contents,
                                        filename: fullFilename
                                    });
                                });
                            }
                        });
                    } else {
                        reject({
                            type: 'File',
                            message: `'${filename}' wasn't found. Tried - ${filenamesTried.join(',')}`
                        });
                    }
                }(0));
            });
        };

        loadFileSync(
            filename: string,
            currentDirectory: string,
            options: Less.LoadOptions = {},
            environment: any
        ): Less.LoadError|Less.LoadedFile {
            var fullFilename, paths, filenamesTried = [], isAbsoluteFilename = this.isPathAbsolute(filename) , data;
            options = options || {};

            paths = isAbsoluteFilename ? [""] : [currentDirectory];
            if (options.paths) {
                paths.push.apply(paths, options.paths);
            }
            if (!isAbsoluteFilename && paths.indexOf('.') === -1) {
                paths.push('.');
            }

            var err, result;
            for (var i = 0; i < paths.length; i++) {
                try {
                    fullFilename = filename;
                    if (paths[i]) {
                        fullFilename = path.join(paths[i], fullFilename);
                    }
                    filenamesTried.push(fullFilename);
                    fs.statSync(fullFilename);
                    break;
                } catch (e) {
                    fullFilename = null;
                }
            }

            if (!fullFilename) {
                err = { type: 'File', message: "'" + filename + "' wasn't found. Tried - " + filenamesTried.join(",") };
                result = { error: err };
            } else {
                data = fs.readFileSync(fullFilename, 'utf-8');
                result = { contents: data, filename: fullFilename};
            }

            return result;

        };
    };
}
