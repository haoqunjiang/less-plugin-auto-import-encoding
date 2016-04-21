# less-plugin-auto-import-encoding

DEPRECATED. See README for more information.

This package is an incomplete implementation becasue I can't find a way to elegantly hook into other FileManager plugins with using current public API.

You might need this quick and dirty way to hack less:

```javascript
const readFile = fs.readFile
const importer = require('less').Parser.importer
const convert = require('smart-encoding-convert').convert

const preferredEncoding = 'GBK'

fs.readFile = function(pathname, encoding, cb) {
    if (arguments.callee.caller === importer) {
        readFile.call(this, pathname, function(err, data) {
            if (err) { return cb(err) }

            const buf = convert(data, { mightFrom: preferredEncoding })
            if (!buf) {
                return cb(new Error('decode error'))
            }

            cb(null, buf)
        });
    } else {
        return readFile.apply(this, arguments)
    }
};
```



-----------------------

Fix encodings when importing from files with different encodings
(by detecting the file encoding and convert buffers to utf-8 for less to parse).

Tested with GBK & UTF-8 encodings.

Only programmatic usage is supported.

This is a drop-in replacement of less's built-in FileManager.
So, if it's used with any other FileManager plugins, it has to be the last one in the plugin list.

## Options

- `preferredEncoding: string`: If the imported buffer's encoding cannot be decided (that is, the detected encoding's confidence is too low to trust), then the buffer is believed to be of `preferredEncoding`. Default to `utf-8`.

## Limitations

`jschardet` is not accurate enough for files with few non-ascii characters.
