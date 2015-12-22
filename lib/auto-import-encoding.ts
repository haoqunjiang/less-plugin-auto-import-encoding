/// <reference path="../typings/tsd.d.ts" />

import * as fs from 'fs';
import * as fsp from 'fs-promise';
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

            let fullFilename: string, filenamesTried: string[] = [];
            let p: Promise<any> = paths.reduce((prev, curPath, i) => {
                return prev.catch(() => {
                    filenamesTried.push(curPath);

                    fullFilename = path.join(curPath, filename);
                    return fsp.stat(fullFilename);
                });
            }, Promise.reject('No reason'));

            p = p.catch(() => {
                throw({
                    type: 'File',
                    message: `'${filename}' wasn't found. Tried - ${filenamesTried.join(',')}`
                });
            });

            let preferEncoding = this.options.preferEncoding;
            p = p.then(() => {
                return fsp.readFile(fullFilename);
            }).then((data) => {
                const contents = convert(data, { mightFrom: preferEncoding }).toString();
                return {
                    contents: contents,
                    filename: fullFilename
                };
            }).catch((err) => {
                throw err;
            });

            return p;
        };

        loadFileSync(
            filename: string,
            currentDirectory: string,
            options: Less.LoadOptions = {},
            environment: any
        ): Less.LoadError|Less.LoadedFile {
            let fullFilename, filenamesTried = [], data;
            let preferEncoding = this.options.preferEncoding;
            options = options || {};

            let isAbsoluteFilename = this.isPathAbsolute(filename);

            let paths = isAbsoluteFilename ? [''] : [currentDirectory];
            paths = paths.concat(options.paths || []);
            if (!isAbsoluteFilename && paths.indexOf('.') === -1) {
                paths.push('.');
            }

            let err, result;
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
                err = { type: 'File', message: `'${filename}' wasn't found. Tried - ${filenamesTried.join(',')}` };
                result = { error: err };
            } else {
                data = convert(fs.readFileSync(fullFilename), { mightFrom: preferEncoding });
                result = { contents: data, filename: fullFilename};
            }

            return result;
        };
    };
}
