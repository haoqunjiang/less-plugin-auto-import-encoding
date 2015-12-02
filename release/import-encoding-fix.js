'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ImportEncodingFix = undefined;

var _less = require('less');

var less = _interopRequireWildcard(_less);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

class ImportEncodingFix extends less.FileManager {
    loadFile(filename, currentDirectory, options, environment, callback) {
        throw new Error('todo');
    }

    loadFileSync(filename, currentDirectory, options, environment) {
        return {
            contents: '',
            filename: ''
        };
    }
}
exports.ImportEncodingFix = ImportEncodingFix; /// <reference path="../typings/tsd.d.ts" />