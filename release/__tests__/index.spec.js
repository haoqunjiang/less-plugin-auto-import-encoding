'use strict';

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _blueTape = require('blue-tape');

var _blueTape2 = _interopRequireDefault(_blueTape);

var _less = require('less');

var less = _interopRequireWildcard(_less);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _bufferEncoding = require('buffer-encoding');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/// <reference path="../../typings/tsd.d.ts" />

const baseOptions = {
    plugins: [new _index2.default()]
};
(0, _blueTape2.default)('in utf-8 file, import from gbk & utf-8 files', t => {
    const options = Object.assign({
        filename: path.resolve(process.cwd(), './test-fixtures/main.utf8.less')
    }, baseOptions);
    const mainGbk = (0, _bufferEncoding.convert)(fs.readFileSync(options.filename)).toString();
    const expectedCss = (0, _bufferEncoding.convert)(fs.readFileSync('./test-fixtures/combined.utf8.less'), 'utf-8', 'gbk').toString();
    return less.render(mainGbk, options).then(output => {
        t.comment(output.css);
        t.comment(expectedCss);
        t.equals(output.css, expectedCss);
    });
});