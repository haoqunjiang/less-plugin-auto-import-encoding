/// <reference path="../node/node.d.ts" />

declare module 'smart-encoding-convert' {
    interface ConvertOptions {
        minConfidence?: number;
        mightFrom?: string;
        from?: string;
        to?: string;
    };

    function convert(buf: Buffer, opts: ConvertOptions): Buffer;

    export default convert;
}
