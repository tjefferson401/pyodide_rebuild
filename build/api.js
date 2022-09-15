"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.makePublicAPI = exports.checkInterrupt = exports.setInterruptBuffer = exports.unpackArchive = exports.pyimport = exports.toPy = exports.unregisterJsModule = exports.registerComlink = exports.registerJsModule = exports.runPythonAsync = exports.loadPackagesFromImports = exports.runPython = exports.version = exports.PythonError = exports.isPyProxy = exports.loadedPackages = exports.loadPackage = void 0;
var module_js_1 = require("./module.js");
var load_pyodide_js_1 = require("./load-pyodide.js");
exports.loadPackage = load_pyodide_js_1.loadPackage;
exports.loadedPackages = load_pyodide_js_1.loadedPackages;
var pyproxy_gen_js_1 = require("./pyproxy.gen.js");
exports.isPyProxy = pyproxy_gen_js_1.isPyProxy;
/**
 * @typedef {import('./pyproxy.gen').Py2JsResult} Py2JsResult
 * @typedef {import('./pyproxy.gen').PyProxy} PyProxy
 * @typedef {import('./pyproxy.gen').TypedArray} TypedArray
 * @typedef {import('emscripten')} Emscripten
 * @typedef {import('emscripten').Module.FS} FS
 */
/**
 * An alias to the Python :py:mod:`pyodide` package.
 *
 * You can use this to call functions defined in the Pyodide Python package
 * from JavaScript.
 *
 * @type {PyProxy}
 */
var pyodide_py = {}; // actually defined in loadPyodide (see pyodide.js)
/**
 *
 * An alias to the global Python namespace.
 *
 * For example, to access a variable called ``foo`` in the Python global
 * scope, use ``pyodide.globals.get("foo")``
 *
 * @type {PyProxy}
 */
var globals = {}; // actually defined in loadPyodide (see pyodide.js)
/**
 * A JavaScript error caused by a Python exception.
 *
 * In order to reduce the risk of large memory leaks, the ``PythonError``
 * contains no reference to the Python exception that caused it. You can find
 * the actual Python exception that caused this error as `sys.last_value
 * <https://docs.python.org/3/library/sys.html#sys.last_value>`_.
 *
 * See :ref:`type-translations-errors` for more information.
 *
 * .. admonition:: Avoid Stack Frames
 *    :class: warning
 *
 *    If you make a :any:`PyProxy` of ``sys.last_value``, you should be
 *    especially careful to :any:`destroy() <PyProxy.destroy>` it when you are
 *    done. You may leak a large amount of memory including the local
 *    variables of all the stack frames in the traceback if you don't. The
 *    easiest way is to only handle the exception in Python.
 *
 * @class
 */
var PythonError = /** @class */ (function () {
    // actually defined in error_handling.c. TODO: would be good to move this
    // documentation and the definition of PythonError to error_handling.js
    function PythonError() {
        /**
         * The Python traceback.
         * @type {string}
         */
        this.message;
    }
    return PythonError;
}());
exports.PythonError = PythonError;
/**
 *
 * The Pyodide version.
 *
 * It can be either the exact release version (e.g. ``0.1.0``), or
 * the latest release version followed by the number of commits since, and
 * the git hash of the current commit (e.g. ``0.1.0-1-bd84646``).
 *
 * @type {string}
 */
exports.version = ""; // actually defined in loadPyodide (see pyodide.js)
/**
 * Runs a string of Python code from JavaScript.
 *
 * The last part of the string may be an expression, in which case, its value
 * is returned.
 *
 * @param {string} code Python code to evaluate
 * @param {PyProxy=} globals An optional Python dictionary to use as the globals.
 *        Defaults to :any:`pyodide.globals`. Uses the Python API
 *        :any:`pyodide.eval_code` to evaluate the code.
 * @returns {Py2JsResult} The result of the Python code translated to JavaScript. See the
 *          documentation for :any:`pyodide.eval_code` for more info.
 */
function runPython(code, globals) {
    if (globals === void 0) { globals = module_js_1.Module.globals; }
    return module_js_1.Module.pyodide_py.eval_code(code, globals);
}
exports.runPython = runPython;
module_js_1.Module.runPython = runPython;
/**
 * @callback LogFn
 * @param {string} msg
 * @returns {void}
 * @private
 */
/**
 * Inspect a Python code chunk and use :js:func:`pyodide.loadPackage` to install
 * any known packages that the code chunk imports. Uses the Python API
 * :func:`pyodide.find\_imports` to inspect the code.
 *
 * For example, given the following code as input
 *
 * .. code-block:: python
 *
 *    import numpy as np x = np.array([1, 2, 3])
 *
 * :js:func:`loadPackagesFromImports` will call
 * ``pyodide.loadPackage(['numpy'])``.
 *
 * @param {string} code The code to inspect.
 * @param {LogFn=} messageCallback The ``messageCallback`` argument of
 * :any:`pyodide.loadPackage` (optional).
 * @param {LogFn=} errorCallback The ``errorCallback`` argument of
 * :any:`pyodide.loadPackage` (optional).
 * @async
 */
function loadPackagesFromImports(code, messageCallback, errorCallback) {
    return __awaiter(this, void 0, void 0, function () {
        var pyimports, imports, packageNames, packages, _i, imports_1, name_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pyimports = module_js_1.Module.pyodide_py.find_imports(code);
                    try {
                        imports = pyimports.toJs();
                    }
                    finally {
                        pyimports.destroy();
                    }
                    if (imports.length === 0) {
                        return [2 /*return*/];
                    }
                    packageNames = module_js_1.Module._import_name_to_package_name;
                    packages = new Set();
                    for (_i = 0, imports_1 = imports; _i < imports_1.length; _i++) {
                        name_1 = imports_1[_i];
                        if (packageNames.has(name_1)) {
                            packages.add(packageNames.get(name_1));
                        }
                    }
                    if (!packages.size) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, load_pyodide_js_1.loadPackage)(Array.from(packages), messageCallback, errorCallback)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
exports.loadPackagesFromImports = loadPackagesFromImports;
/**
 * Runs Python code using `PyCF_ALLOW_TOP_LEVEL_AWAIT
 * <https://docs.python.org/3/library/ast.html?highlight=pycf_allow_top_level_await#ast.PyCF_ALLOW_TOP_LEVEL_AWAIT>`_.
 *
 * .. admonition:: Python imports
 *    :class: warning
 *
 *    Since pyodide 0.18.0, you must call :js:func:`loadPackagesFromImports` to
 *    import any python packages referenced via `import` statements in your code.
 *    This function will no longer do it for you.
 *
 * For example:
 *
 * .. code-block:: pyodide
 *
 *    let result = await pyodide.runPythonAsync(`
 *        from js import fetch
 *        response = await fetch("./packages.json")
 *        packages = await response.json()
 *        # If final statement is an expression, its value is returned to JavaScript
 *        len(packages.packages.object_keys())
 *    `);
 *    console.log(result); // 79
 *
 * @param {string} code Python code to evaluate
 * @param {PyProxy=} globals An optional Python dictionary to use as the globals.
 *        Defaults to :any:`pyodide.globals`. Uses the Python API
 *        :any:`pyodide.eval_code_async` to evaluate the code.
 * @returns {Py2JsResult} The result of the Python code translated to JavaScript.
 * @async
 */
function runPythonAsync(code, globals) {
    if (globals === void 0) { globals = module_js_1.Module.globals; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, module_js_1.Module.pyodide_py.eval_code_async(code, globals)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.runPythonAsync = runPythonAsync;
module_js_1.Module.runPythonAsync = runPythonAsync;
/**
 * Registers the JavaScript object ``module`` as a JavaScript module named
 * ``name``. This module can then be imported from Python using the standard
 * Python import system. If another module by the same name has already been
 * imported, this won't have much effect unless you also delete the imported
 * module from ``sys.modules``. This calls the ``pyodide_py`` API
 * :func:`pyodide.register_js_module`.
 *
 * @param {string} name Name of the JavaScript module to add
 * @param {object} module JavaScript object backing the module
 */
function registerJsModule(name, module) {
    module_js_1.Module.pyodide_py.register_js_module(name, module);
}
exports.registerJsModule = registerJsModule;
/**
 * Tell Pyodide about Comlink.
 * Necessary to enable importing Comlink proxies into Python.
 */
function registerComlink(Comlink) {
    module_js_1.Module._Comlink = Comlink;
}
exports.registerComlink = registerComlink;
/**
 * Unregisters a JavaScript module with given name that has been previously
 * registered with :js:func:`pyodide.registerJsModule` or
 * :func:`pyodide.register_js_module`. If a JavaScript module with that name
 * does not already exist, will throw an error. Note that if the module has
 * already been imported, this won't have much effect unless you also delete
 * the imported module from ``sys.modules``. This calls the ``pyodide_py`` API
 * :func:`pyodide.unregister_js_module`.
 *
 * @param {string} name Name of the JavaScript module to remove
 */
function unregisterJsModule(name) {
    module_js_1.Module.pyodide_py.unregister_js_module(name);
}
exports.unregisterJsModule = unregisterJsModule;
/**
 * Convert the JavaScript object to a Python object as best as possible.
 *
 * This is similar to :any:`JsProxy.to_py` but for use from JavaScript. If the
 * object is immutable or a :any:`PyProxy`, it will be returned unchanged. If
 * the object cannot be converted into Python, it will be returned unchanged.
 *
 * See :ref:`type-translations-jsproxy-to-py` for more information.
 *
 * @param {*} obj
 * @param {object} options
 * @param {number=} options.depth Optional argument to limit the depth of the
 * conversion.
 * @returns {PyProxy} The object converted to Python.
 */
function toPy(obj, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.depth, depth = _c === void 0 ? -1 : _c;
    // No point in converting these, it'd be dumb to proxy them so they'd just
    // get converted back by `js2python` at the end
    switch (typeof obj) {
        case "string":
        case "number":
        case "boolean":
        case "bigint":
        case "undefined":
            return obj;
    }
    if (!obj || module_js_1.Module.isPyProxy(obj)) {
        return obj;
    }
    var obj_id = 0;
    var py_result = 0;
    var result = 0;
    try {
        obj_id = module_js_1.Module.hiwire.new_value(obj);
        try {
            py_result = module_js_1.Module.js2python_convert(obj_id, new Map(), depth);
        }
        catch (e) {
            if (e instanceof module_js_1.Module._PropagatePythonError) {
                module_js_1.Module._pythonexc2js();
            }
            throw e;
        }
        if (module_js_1.Module._JsProxy_Check(py_result)) {
            // Oops, just created a JsProxy. Return the original object.
            return obj;
            // return Module.pyproxy_new(py_result);
        }
        result = module_js_1.Module._python2js(py_result);
        if (result === 0) {
            module_js_1.Module._pythonexc2js();
        }
    }
    finally {
        module_js_1.Module.hiwire.decref(obj_id);
        module_js_1.Module._Py_DecRef(py_result);
    }
    return module_js_1.Module.hiwire.pop_value(result);
}
exports.toPy = toPy;
/**
 * Imports a module and returns it.
 *
 * .. admonition:: Warning
 *    :class: warning
 *
 *    This function has a completely different behavior than the old removed pyimport function!
 *
 *    ``pyimport`` is roughly equivalent to:
 *
 *    .. code-block:: js
 *
 *      pyodide.runPython(`import ${pkgname}; ${pkgname}`);
 *
 *    except that the global namespace will not change.
 *
 *    Example:
 *
 *    .. code-block:: js
 *
 *      let sysmodule = pyodide.pyimport("sys");
 *      let recursionLimit = sys.getrecursionlimit();
 *
 * @param {string} mod_name The name of the module to import
 * @returns A PyProxy for the imported module
 */
function pyimport(mod_name) {
    return module_js_1.Module.importlib.import_module(mod_name);
}
exports.pyimport = pyimport;
/**
 * Unpack an archive into a target directory.
 *
 * @param {ArrayBuffer} buffer The archive as an ArrayBuffer (it's also fine to pass a TypedArray).
 * @param {string} format The format of the archive. Should be one of the formats recognized by `shutil.unpack_archive`.
 * By default the options are 'bztar', 'gztar', 'tar', 'zip', and 'wheel'. Several synonyms are accepted for each format, e.g.,
 * for 'gztar' any of '.gztar', '.tar.gz', '.tgz', 'tar.gz' or 'tgz' are considered to be synonyms.
 *
 * @param {string=} extract_dir The directory to unpack the archive into. Defaults to the working directory.
 */
function unpackArchive(buffer, format, extract_dir) {
    if (!module_js_1.Module._util_module) {
        module_js_1.Module._util_module = pyimport("pyodide._util");
    }
    module_js_1.Module._util_module.unpack_buffer_archive.callKwargs(buffer, {
        format: format,
        extract_dir: extract_dir
    });
}
exports.unpackArchive = unpackArchive;
/**
 * @private
 */
module_js_1.Module.saveState = function () { return module_js_1.Module.pyodide_py._state.save_state(); };
/**
 * @private
 */
module_js_1.Module.restoreState = function (state) { return module_js_1.Module.pyodide_py._state.restore_state(state); };
/**
 * Sets the interrupt buffer to be `interrupt_buffer`. This is only useful when
 * Pyodide is used in a webworker. The buffer should be a `SharedArrayBuffer`
 * shared with the main browser thread (or another worker). To request an
 * interrupt, a `2` should be written into `interrupt_buffer` (2 is the posix
 * constant for SIGINT).
 *
 * @param {TypedArray} interrupt_buffer
 */
function setInterruptBuffer(interrupt_buffer) {
    module_js_1.Module.interrupt_buffer = interrupt_buffer;
    module_js_1.Module._set_pyodide_callback(!!interrupt_buffer);
}
exports.setInterruptBuffer = setInterruptBuffer;
/**
 * Throws a KeyboardInterrupt error if a KeyboardInterrupt has been requested
 * via the interrupt buffer.
 *
 * This can be used to enable keyboard interrupts during execution of JavaScript
 * code, just as `PyErr_CheckSignals` is used to enable keyboard interrupts
 * during execution of C code.
 */
function checkInterrupt() {
    if (module_js_1.Module.interrupt_buffer[0] === 2) {
        module_js_1.Module.interrupt_buffer[0] = 0;
        module_js_1.Module._PyErr_SetInterrupt();
        module_js_1.Module.runPython("");
    }
}
exports.checkInterrupt = checkInterrupt;
function makePublicAPI() {
    /**
     * An alias to the `Emscripten File System API
     * <https://emscripten.org/docs/api_reference/Filesystem-API.html>`_.
     *
     * This provides a wide range of POSIX-`like` file/device operations, including
     * `mount
     * <https://emscripten.org/docs/api_reference/Filesystem-API.html#FS.mount>`_
     * which can be used to extend the in-memory filesystem with features like `persistence
     * <https://emscripten.org/docs/api_reference/Filesystem-API.html#persistent-data>`_.
     *
     * While all the file systems implementations are enabled, only the default
     * ``MEMFS`` is guaranteed to work in all runtime settings. The implementations
     * are available as members of ``FS.filesystems``:
     * ``IDBFS``, ``NODEFS``, ``PROXYFS``, ``WORKERFS``.
     *
     * @type {FS}
     */
    var FS = module_js_1.Module.FS;
    var namespace = {
        globals: globals,
        FS: FS,
        pyodide_py: pyodide_py,
        version: exports.version,
        loadPackage: load_pyodide_js_1.loadPackage,
        loadPackagesFromImports: loadPackagesFromImports,
        loadedPackages: load_pyodide_js_1.loadedPackages,
        isPyProxy: pyproxy_gen_js_1.isPyProxy,
        runPython: runPython,
        runPythonAsync: runPythonAsync,
        registerJsModule: registerJsModule,
        unregisterJsModule: unregisterJsModule,
        setInterruptBuffer: setInterruptBuffer,
        checkInterrupt: checkInterrupt,
        toPy: toPy,
        pyimport: pyimport,
        unpackArchive: unpackArchive,
        registerComlink: registerComlink,
        PythonError: PythonError,
        PyBuffer: pyproxy_gen_js_1.PyBuffer
    };
    namespace._module = module_js_1.Module; // @private
    module_js_1.Module.public_api = namespace;
    return namespace;
}
exports.makePublicAPI = makePublicAPI;
