less-plugin-auto-import-encoding
===============================

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
