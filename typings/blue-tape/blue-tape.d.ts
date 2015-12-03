/// <reference path="../tape/tape.d.ts" />

declare module 'blue-tape' {
	import tape = require('tape');
	// should use commonjs export
	// but for babel interop purpose, I have to modify it to export default ... sytanx
	// this is ugly
	export default tape;
}
