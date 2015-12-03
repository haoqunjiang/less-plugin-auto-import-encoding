/// <reference path="../../typings/tsd.d.ts" />

import * as fs from 'fs';
import * as path from 'path';

import tape from 'blue-tape';

import * as less from 'less';
import ImportEncodingFix from '../index';

import { convert } from 'buffer-encoding';

const baseOptions: Less.Options = {
    plugins: [
        new ImportEncodingFix()
    ]
};

tape('in utf-8 file, import from gbk & utf-8 files', (t: tape.Test): Promise<void> => {
    const options: Less.Options = Object.assign({
        filename: path.resolve(process.cwd(), './test-fixtures/main.utf8.less')
    }, baseOptions);

    const mainGbk: string = convert(fs.readFileSync(options.filename)).toString();
    const expectedCss: string = convert(fs.readFileSync('./test-fixtures/combined.utf8.less'), 'utf-8', 'gbk').toString();

    return less.render(mainGbk, options)
        .then((output: Less.RenderOutput) => {
            t.comment(output.css);
            t.comment(expectedCss);
            t.equals(output.css, expectedCss);
        });
});
