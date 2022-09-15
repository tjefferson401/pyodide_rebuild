"use strict";
/**
 * @typedef {import('emscripten').Module} Module
 */
exports.__esModule = true;
exports.setHomeDirectory = exports.setStandardStreams = exports.Module = void 0;
/**
 * The Emscripten Module.
 *
 * @private
 * @type {Module}
 */
exports.Module = {};
exports.Module.noImageDecoding = true;
exports.Module.noAudioDecoding = true;
exports.Module.noWasmDecoding = false; // we preload wasm using the built in plugin now
exports.Module.preloadedWasm = {};
exports.Module.preRun = [];
/**
 *
 * @param {undefined | function(): string} stdin
 * @param {undefined | function(string)} stdout
 * @param {undefined | function(string)} stderr
 * @private
 */
function setStandardStreams(stdin, stdout, stderr) {
    // For stdout and stderr, emscripten provides convenient wrappers that save us the trouble of converting the bytes into a string
    if (stdout) {
        exports.Module.print = stdout;
    }
    if (stderr) {
        exports.Module.printErr = stderr;
    }
    // For stdin, we have to deal with the low level API ourselves
    if (stdin) {
        exports.Module.preRun.push(function () {
            exports.Module.FS.init(createStdinWrapper(stdin), null, null);
        });
    }
}
exports.setStandardStreams = setStandardStreams;
function createStdinWrapper(stdin) {
    // When called, it asks the user for one whole line of input (stdin)
    // Then, it passes the individual bytes of the input to emscripten, one after another.
    // And finally, it terminates it with null.
    var encoder = new TextEncoder();
    var input = new Uint8Array(0);
    var inputIndex = -1; // -1 means that we just returned null
    function stdinWrapper() {
        try {
            if (inputIndex === -1) {
                var text = stdin();
                if (text === undefined || text === null) {
                    return null;
                }
                if (typeof text !== "string") {
                    throw new TypeError("Expected stdin to return string, null, or undefined, got type ".concat(typeof text, "."));
                }
                if (!text.endsWith("\n")) {
                    text += "\n";
                }
                input = encoder.encode(text);
                inputIndex = 0;
            }
            if (inputIndex < input.length) {
                var character = input[inputIndex];
                inputIndex++;
                return character;
            }
            else {
                inputIndex = -1;
                return null;
            }
        }
        catch (e) {
            // emscripten will catch this and set an IOError which is unhelpful for
            // debugging.
            console.error("Error thrown in stdin:");
            console.error(e);
            throw e;
        }
    }
    return stdinWrapper;
}
/**
 * Make the home directory inside the virtual file system,
 * then change the working directory to it.
 *
 * @param {string} path
 * @private
 */
function setHomeDirectory(path) {
    exports.Module.preRun.push(function () {
        var fallbackPath = "/";
        try {
            exports.Module.FS.mkdirTree(path);
        }
        catch (e) {
            console.error("Error occurred while making a home directory '".concat(path, "':"));
            console.error(e);
            console.error("Using '".concat(fallbackPath, "' for a home directory instead"));
            path = fallbackPath;
        }
        exports.Module.ENV.HOME = path;
        exports.Module.FS.chdir(path);
    });
}
exports.setHomeDirectory = setHomeDirectory;
