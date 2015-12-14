// Type definitions for LESS
// Project: http://lesscss.org/
// Definitions by: Tom Hasner <https://github.com/thasner>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare module Less {
    interface RootFileInfo {
        filename: string;
        relativeUrls: boolean;
        rootpath: string;
        currentDirectory: string;
        entryPath: string;
        rootFilename: string;
    }

    class PluginManager {
        constructor(less: LessStatic);

        addPreProcessor(preProcessor: PreProcessor, priority?: number): void;
        addFileManager(fileManager: FileManager): void;
    }

    interface Plugin {
        install: (less: LessStatic, pluginManager: PluginManager) => void;
    }

    interface PreProcessor {
        process: (src: string, extra: PreProcessorExtraInfo) => string;
    }

    interface PreProcessorExtraInfo {
        context: {
            pluginManager: PluginManager;
        };

        fileInfo: RootFileInfo;

        imports: {
            [key: string]: any;
        };
    }

    interface SourceMapOption {
        sourceMapURL: string;
        sourceMapBasepath: string;
        sourceMapRootpath: string;
        outputSourceFiles: boolean;
        sourceMapFileInline: boolean;
    }

    interface Options {
        sourceMap?: SourceMapOption;
        filename?: string;
        plugins: Plugin[];
        rootFileInfo?: RootFileInfo;
    }

    interface RenderError {
        column: number;
        extract: string[];
        filename: string;
        index: number;
        line: number;
        message: string;
        type: string;
    }

    interface RenderOutput {
        css: string;
        map: string;
        imports: string[];
    }


    // interfaces for FileManager

    interface LoadedFile {
        contents: string;
        filename: string;
    }

    interface LessError {
        type: string;
        message: string;
    }

    interface LoadError {
        error: LessError;
    }

    interface LoadOptions {
        syncImport?: boolean;
        paths?: string[];
    }

    class AbstractFileManager {
        isPathAbsolute(filename: string): boolean;
    }

    class FileManager extends AbstractFileManager {
        /**
         * Loads a file asynchronously.
         * Expects a promise that either rejects with an error or fulfills with an object containing a LessError object.
         */
        loadFile(
            filename: string,
            currentDirectory: string,
            options: LoadOptions,
            environment: any,
            callback: (err: void|LessError, loaded: LessError|LoadedFile) => void
         ): Promise<LoadedFile>;

         /**
          * Loads a file synchronously.
          */
         loadFileSync(filename: string, currentDirectory: string, options: any, environment: any): LoadError|LoadedFile;
    }
}

interface LessStatic {
    version: number[];
    FileManager: typeof Less.FileManager;

    render(input: string, callback: (error: Less.RenderError, output: Less.RenderOutput) => void): void;
    render(input: string, options: Less.Options, callback: (error: Less.RenderError, output: Less.RenderOutput) => void): void;

    render(input: string): Promise<Less.RenderOutput>;
    render(input: string, options: Less.Options): Promise<Less.RenderOutput>;
}

declare module "less" {
    export = less;
}

declare var less: LessStatic;
