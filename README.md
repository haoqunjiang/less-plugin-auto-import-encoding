less-plugin-import-encoidng-fix
===============================

**Work-in-Process**

Fix encodings when importing from files with different encodings
(by detecting the file encoding and convert that into utf-8 for less to parse).

Tested with GBK & UTF-8 encodings.

Only programmatic usage is supported.

This is a drop-in replacement of less's built-in FileManager.
So, if it's used with any other FileManager plugins, it has to be the last one in the plugin list.

## Limitations

`jschardet` is not accurate enough for files with few non-ascii characters.
