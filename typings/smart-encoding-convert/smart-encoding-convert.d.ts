/// <reference path="../node/node.d.ts" />

declare module 'smart-encoding-convert' {
    function convert(buf: Buffer, opts?: convert.ConvertOptions): Buffer;
    export default convert;

    module convert {
        interface ConvertOptions {
            minConfidence?: number;
            mightFrom?: string;
            from?: string;
            to?: string;
        }
    }
}
