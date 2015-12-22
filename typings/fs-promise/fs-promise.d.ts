/// <reference path="../tsd.d.ts" />

declare module fsPromise {

    interface OpenOptions {
        encoding?: string;
        flag?: string;
    }

    interface Stats {
        isFile(): boolean;
        isDirectory(): boolean;
        isBlockDevice(): boolean;
        isCharacterDevice(): boolean;
        isSymbolicLink(): boolean;
        isFIFO(): boolean;
        isSocket(): boolean;
        dev: number;
        ino: number;
        mode: number;
        nlink: number;
        uid: number;
        gid: number;
        rdev: number;
        size: number;
        blksize: number;
        blocks: number;
        atime: Date;
        mtime: Date;
        ctime: Date;
    }

    interface Main {
        copy(src:string, dest:string, filter?:(src:string) => boolean):Promise<boolean>;
        copySync(src:string, dest:string, filter?:(src:string) => boolean):void;
        createFile(file:string):Promise<boolean>;
        createFileSync(file:string):void;
        mkdirs(dir:string):Promise<boolean>;
        mkdirsSync(dir:string):void;
        outputFile(file:string, data:any):Promise<boolean>;
        outputFileSync(file:string, data:any):void;
        outputJSON(file:string, data:any):Promise<boolean>;
        outputJSONSync(file:string, data:any):void;
        readJSON(file:string, options?:fsPromise.OpenOptions):Promise<any>;
        readJSONSync(file:string, options?:fsPromise.OpenOptions):any;
        remove(dir:string):Promise<boolean>;
        removeSync(dir:string):void;
        writeJSON(file:string, object:any, options?:fsPromise.OpenOptions):Promise<boolean>;
        writeJSONSync(file:string, object:any, options?:fsPromise.OpenOptions):void;
        rename(oldPath:string, newPath:string):Promise<boolean>;
        renameSync(oldPath:string, newPath:string):void;
        truncate(fd:number, len:number):Promise<boolean>;
        truncateSync(fd:number, len:number):void;
        chown(path:string, uid:number, gid:number):Promise<boolean>;
        chownSync(path:string, uid:number, gid:number):void;
        fchown(fd:number, uid:number, gid:number):Promise<boolean>;
        fchownSync(fd:number, uid:number, gid:number):void;
        lchown(path:string, uid:number, gid:number):Promise<boolean>;
        lchownSync(path:string, uid:number, gid:number):void;
        chmodSync(path:string, mode:number):void;
        fchmod(fd:number, mode:number):Promise<boolean>;
        fchmodSync(fd:number, mode:number):void;
        lchmod(path:string, mode:string):Promise<boolean>;
        lchmodSync(path:string, mode:string):void;
        stat(path:string):Promise<fsPromise.Stats>;
        statSync(path: string): fsPromise.Stats;
        readFile(path:string, encoding?):Promise<any>;
        readFileSync(filename: string, encoding):any;
        writeFile(filename:string, data:any, encoding?:string):Promise<boolean>;
        writeFileSync(filename: string, data: any, encoding?: string):void;
        readdir(path:string):Promise<Array<string>>;
        readdirSync(path:string):Array<string>;
    }

}

declare module "fs-promise" {
    var foo:fsPromise.Main;
    export = foo;
}
