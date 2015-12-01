/// <reference path="../node/node.d.ts" />

declare module 'buffer-encoding' {
    export function convert(bufferOrString: Buffer|String, toEncoding?: string, fromEncoding?: string): Buffer;
}
