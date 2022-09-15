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
exports.loadPackage = exports.loadedPackages = exports.loadScript = exports._fetchBinaryFile = exports.initializePackageIndex = void 0;
var module_js_1 = require("./module.js");
var IN_NODE = typeof process !== "undefined" &&
    process.release &&
    process.release.name === "node" &&
    typeof process.browser ===
        "undefined"; /* This last condition checks if we run the browser shim of process */
/** @typedef {import('./pyproxy.js').PyProxy} PyProxy */
/** @private */
var baseURL;
/**
 * @param {string} indexURL
 * @private
 */
function initializePackageIndex(indexURL) {
    return __awaiter(this, void 0, void 0, function () {
        var package_json, fsPromises, package_string, response, _i, _a, name_1, _b, _c, import_name;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    baseURL = indexURL;
                    if (!IN_NODE) return [3 /*break*/, 3];
                    return [4 /*yield*/, Promise.resolve().then(function () { return require(/* webpackIgnore: true */ "fs/promises"); })];
                case 1:
                    fsPromises = _d.sent();
                    return [4 /*yield*/, fsPromises.readFile("".concat(indexURL, "packages.json"))];
                case 2:
                    package_string = _d.sent();
                    package_json = JSON.parse(package_string);
                    return [3 /*break*/, 6];
                case 3: return [4 /*yield*/, fetch("".concat(indexURL, "packages.json"))];
                case 4:
                    response = _d.sent();
                    return [4 /*yield*/, response.json()];
                case 5:
                    package_json = _d.sent();
                    _d.label = 6;
                case 6:
                    if (!package_json.packages) {
                        throw new Error("Loaded packages.json does not contain the expected key 'packages'.");
                    }
                    module_js_1.Module.packages = package_json.packages;
                    // compute the inverted index for imports to package names
                    module_js_1.Module._import_name_to_package_name = new Map();
                    for (_i = 0, _a = Object.keys(module_js_1.Module.packages); _i < _a.length; _i++) {
                        name_1 = _a[_i];
                        for (_b = 0, _c = module_js_1.Module.packages[name_1].imports; _b < _c.length; _b++) {
                            import_name = _c[_b];
                            module_js_1.Module._import_name_to_package_name.set(import_name, name_1);
                        }
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.initializePackageIndex = initializePackageIndex;
function _fetchBinaryFile(indexURL, path) {
    return __awaiter(this, void 0, void 0, function () {
        var fsPromises, tar_buffer, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!IN_NODE) return [3 /*break*/, 3];
                    return [4 /*yield*/, Promise.resolve().then(function () { return require(/* webpackIgnore: true */ "fs/promises"); })];
                case 1:
                    fsPromises = _a.sent();
                    return [4 /*yield*/, fsPromises.readFile("".concat(indexURL).concat(path))];
                case 2:
                    tar_buffer = _a.sent();
                    return [2 /*return*/, tar_buffer.buffer];
                case 3: return [4 /*yield*/, fetch("".concat(indexURL).concat(path))];
                case 4:
                    response = _a.sent();
                    return [4 /*yield*/, response.arrayBuffer()];
                case 5: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports._fetchBinaryFile = _fetchBinaryFile;
////////////////////////////////////////////////////////////
// Package loading
var DEFAULT_CHANNEL = "default channel";
// Regexp for validating package name and URI
var package_uri_regexp = /^.*?([^\/]*)\.js$/;
function _uri_to_package_name(package_uri) {
    var match = package_uri_regexp.exec(package_uri);
    if (match) {
        return match[1].toLowerCase();
    }
}
if (globalThis.document) {
    // browser
    exports.loadScript = function (url) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require(/* webpackIgnore: true */ url); })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    }); }); };
}
else if (globalThis.importScripts) {
    // webworker
    exports.loadScript = function (url) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // This is async only for consistency
            globalThis.importScripts(url);
            return [2 /*return*/];
        });
    }); };
}
else if (IN_NODE) {
    var pathPromise_1 = Promise.resolve().then(function () { return require(/* webpackIgnore: true */ "path"); }).then(function (M) { return M["default"]; });
    var fetchPromise_1 = Promise.resolve().then(function () { return require("node-fetch"); }).then(function (M) { return M["default"]; });
    var vmPromise_1 = Promise.resolve().then(function () { return require(/* webpackIgnore: true */ "vm"); }).then(function (M) { return M["default"]; });
    exports.loadScript = function (url) { return __awaiter(void 0, void 0, void 0, function () {
        var fetch_1, vm, _a, _b, path;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!url.includes("://")) return [3 /*break*/, 5];
                    return [4 /*yield*/, fetchPromise_1];
                case 1:
                    fetch_1 = _c.sent();
                    return [4 /*yield*/, vmPromise_1];
                case 2:
                    vm = _c.sent();
                    _b = (_a = vm).runInThisContext;
                    return [4 /*yield*/, fetch_1(url)];
                case 3: return [4 /*yield*/, (_c.sent()).text()];
                case 4:
                    _b.apply(_a, [_c.sent()]);
                    return [3 /*break*/, 8];
                case 5: return [4 /*yield*/, pathPromise_1];
                case 6:
                    path = _c.sent();
                    return [4 /*yield*/, Promise.resolve().then(function () { return require(path.resolve(url)); })];
                case 7:
                    _c.sent();
                    _c.label = 8;
                case 8: return [2 /*return*/];
            }
        });
    }); };
}
else {
    throw new Error("Cannot determine runtime environment");
}
function addPackageToLoad(name, toLoad) {
    name = name.toLowerCase();
    if (toLoad.has(name)) {
        return;
    }
    toLoad.set(name, DEFAULT_CHANNEL);
    // If the package is already loaded, we don't add dependencies, but warn
    // the user later. This is especially important if the loaded package is
    // from a custom url, in which case adding dependencies is wrong.
    if (exports.loadedPackages[name] !== undefined) {
        return;
    }
    for (var _i = 0, _a = module_js_1.Module.packages[name].depends; _i < _a.length; _i++) {
        var dep_name = _a[_i];
        addPackageToLoad(dep_name, toLoad);
    }
}
function recursiveDependencies(names, _messageCallback, errorCallback, sharedLibsOnly) {
    var toLoad = new Map();
    for (var _i = 0, names_1 = names; _i < names_1.length; _i++) {
        var name_2 = names_1[_i];
        var pkgname = _uri_to_package_name(name_2);
        if (toLoad.has(pkgname) && toLoad.get(pkgname) !== name_2) {
            errorCallback("Loading same package ".concat(pkgname, " from ").concat(name_2, " and ").concat(toLoad.get(pkgname)));
            continue;
        }
        if (pkgname !== undefined) {
            toLoad.set(pkgname, name_2);
            continue;
        }
        name_2 = name_2.toLowerCase();
        if (name_2 in module_js_1.Module.packages) {
            addPackageToLoad(name_2, toLoad);
            continue;
        }
        errorCallback("Skipping unknown package '".concat(name_2, "'"));
    }
    if (sharedLibsOnly) {
        var onlySharedLibs = new Map();
        for (var _a = 0, toLoad_1 = toLoad; _a < toLoad_1.length; _a++) {
            var c = toLoad_1[_a];
            var name_3 = c[0];
            if (module_js_1.Module.packages[name_3].shared_library) {
                onlySharedLibs.set(name_3, toLoad.get(name_3));
            }
        }
        return onlySharedLibs;
    }
    return toLoad;
}
// locateFile is the function used by the .js file to locate the .data file
// given the filename
module_js_1.Module.locateFile = function (path) {
    // handle packages loaded from custom URLs
    var pkg = path.replace(/\.data$/, "");
    var toLoad = module_js_1.Module.locateFile_packagesToLoad;
    if (toLoad && toLoad.has(pkg)) {
        var package_uri = toLoad.get(pkg);
        if (package_uri != DEFAULT_CHANNEL) {
            return package_uri.replace(/\.js$/, ".data");
        }
    }
    return baseURL + path;
};
// When the JS loads, it synchronously adds a runDependency to emscripten. It
// then loads the data file, and removes the runDependency from emscripten.
// This function returns a promise that resolves when there are no pending
// runDependencies.
function waitRunDependency() {
    var promise = new Promise(function (r) {
        module_js_1.Module.monitorRunDependencies = function (n) {
            if (n === 0) {
                r();
            }
        };
    });
    // If there are no pending dependencies left, monitorRunDependencies will
    // never be called. Since we can't check the number of dependencies,
    // manually trigger a call.
    module_js_1.Module.addRunDependency("dummy");
    module_js_1.Module.removeRunDependency("dummy");
    return promise;
}
function _loadPackage(names, messageCallback, errorCallback) {
    return __awaiter(this, void 0, void 0, function () {
        var toLoad, packageNames, scriptPromises, _loop_1, _i, toLoad_2, _a, pkg, uri, packageList, _b, toLoad_3, _c, pkg, uri, resolveMsg, packageNames;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    toLoad = recursiveDependencies(names, messageCallback, errorCallback);
                    // Tell Module.locateFile about the packages we're loading
                    module_js_1.Module.locateFile_packagesToLoad = toLoad;
                    if (toLoad.size === 0) {
                        return [2 /*return*/, Promise.resolve("No new packages to load")];
                    }
                    else {
                        packageNames = Array.from(toLoad.keys()).join(", ");
                        messageCallback("Loading ".concat(packageNames));
                    }
                    scriptPromises = [];
                    _loop_1 = function (pkg, uri) {
                        var loaded = exports.loadedPackages[pkg];
                        if (loaded !== undefined) {
                            // If uri is from the DEFAULT_CHANNEL, we assume it was added as a
                            // depedency, which was previously overridden.
                            if (loaded === uri || uri === DEFAULT_CHANNEL) {
                                messageCallback("".concat(pkg, " already loaded from ").concat(loaded));
                                return "continue";
                            }
                            else {
                                errorCallback("URI mismatch, attempting to load package ".concat(pkg, " from ").concat(uri, " ") +
                                    "while it is already loaded from ".concat(loaded, ". To override a dependency, ") +
                                    "load the custom package first.");
                                return "continue";
                            }
                        }
                        var pkgname = (module_js_1.Module.packages[pkg] && module_js_1.Module.packages[pkg].name) || pkg;
                        var scriptSrc = uri === DEFAULT_CHANNEL ? "".concat(baseURL).concat(pkgname, ".js") : uri;
                        messageCallback("Loading ".concat(pkg, " from ").concat(scriptSrc));
                        scriptPromises.push((0, exports.loadScript)(scriptSrc)["catch"](function (e) {
                            errorCallback("Couldn't load package from URL ".concat(scriptSrc), e);
                            toLoad["delete"](pkg);
                        }));
                    };
                    for (_i = 0, toLoad_2 = toLoad; _i < toLoad_2.length; _i++) {
                        _a = toLoad_2[_i], pkg = _a[0], uri = _a[1];
                        _loop_1(pkg, uri);
                    }
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, , 3, 4]);
                    return [4 /*yield*/, Promise.all(scriptPromises).then(waitRunDependency)];
                case 2:
                    _d.sent();
                    return [3 /*break*/, 4];
                case 3:
                    delete module_js_1.Module.monitorRunDependencies;
                    return [7 /*endfinally*/];
                case 4:
                    packageList = [];
                    for (_b = 0, toLoad_3 = toLoad; _b < toLoad_3.length; _b++) {
                        _c = toLoad_3[_b], pkg = _c[0], uri = _c[1];
                        exports.loadedPackages[pkg] = uri;
                        packageList.push(pkg);
                    }
                    if (packageList.length > 0) {
                        packageNames = packageList.join(", ");
                        resolveMsg = "Loaded ".concat(packageNames);
                    }
                    else {
                        resolveMsg = "No packages loaded";
                    }
                    module_js_1.Module.reportUndefinedSymbols();
                    messageCallback(resolveMsg);
                    // We have to invalidate Python's import caches, or it won't
                    // see the new files.
                    module_js_1.Module.importlib.invalidate_caches();
                    return [2 /*return*/];
            }
        });
    });
}
// This is a promise that is resolved iff there are no pending package loads. It
// never fails.
var _package_lock = Promise.resolve();
/**
 * An async lock for package loading. Prevents race conditions in loadPackage.
 * @returns A zero argument function that releases the lock.
 * @private
 */
function acquirePackageLock() {
    return __awaiter(this, void 0, void 0, function () {
        var old_lock, releaseLock;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    old_lock = _package_lock;
                    _package_lock = new Promise(function (resolve) { return (releaseLock = resolve); });
                    return [4 /*yield*/, old_lock];
                case 1:
                    _a.sent();
                    return [2 /*return*/, releaseLock];
            }
        });
    });
}
/**
 *
 * The list of packages that Pyodide has loaded.
 * Use ``Object.keys(pyodide.loadedPackages)`` to get the list of names of
 * loaded packages, and ``pyodide.loadedPackages[package_name]`` to access
 * install location for a particular ``package_name``.
 *
 * @type {object}
 */
exports.loadedPackages = {};
var sharedLibraryWasmPlugin;
var origWasmPlugin;
var wasmPluginIndex;
function initSharedLibraryWasmPlugin() {
    for (var p in module_js_1.Module.preloadPlugins) {
        if (module_js_1.Module.preloadPlugins[p].canHandle("test.so")) {
            origWasmPlugin = module_js_1.Module.preloadPlugins[p];
            wasmPluginIndex = p;
            break;
        }
    }
    sharedLibraryWasmPlugin = {
        canHandle: origWasmPlugin.canHandle,
        handle: function (byteArray, name, onload, onerror) {
            var _this = this;
            origWasmPlugin.handle(byteArray, name, onload, onerror);
            origWasmPlugin.asyncWasmLoadPromise = (function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, origWasmPlugin.asyncWasmLoadPromise];
                        case 1:
                            _a.sent();
                            module_js_1.Module.loadDynamicLibrary(name, {
                                global: true,
                                nodelete: true
                            });
                            return [2 /*return*/];
                    }
                });
            }); })();
        }
    };
}
// override the load plugin so that it calls "Module.loadDynamicLibrary" on any
// .so files.
// this only needs to be done for shared library packages because we assume that
// if a package depends on a shared library it needs to have access to it. not
// needed for .so in standard module because those are linked together
// correctly, it is only where linking goes across modules that it needs to be
// done. Hence, we only put this extra preload plugin in during the shared
// library load
function useSharedLibraryWasmPlugin() {
    if (!sharedLibraryWasmPlugin) {
        initSharedLibraryWasmPlugin();
    }
    module_js_1.Module.preloadPlugins[wasmPluginIndex] = sharedLibraryWasmPlugin;
}
function restoreOrigWasmPlugin() {
    module_js_1.Module.preloadPlugins[wasmPluginIndex] = origWasmPlugin;
}
/**
 * @callback LogFn
 * @param {string} msg
 * @returns {void}
 * @private
 */
/**
 * Load a package or a list of packages over the network. This installs the
 * package in the virtual filesystem. The package needs to be imported from
 * Python before it can be used.
 *
 * @param {string | string[] | PyProxy} names Either a single package name or
 * URL or a list of them. URLs can be absolute or relative. The URLs must have
 * file name ``<package-name>.js`` and there must be a file called
 * ``<package-name>.data`` in the same directory. The argument can be a
 * ``PyProxy`` of a list, in which case the list will be converted to JavaScript
 * and the ``PyProxy`` will be destroyed.
 * @param {LogFn=} messageCallback A callback, called with progress messages
 *    (optional)
 * @param {LogFn=} errorCallback A callback, called with error/warning messages
 *    (optional)
 * @async
 */
function loadPackage(names, messageCallback, errorCallback) {
    return __awaiter(this, void 0, void 0, function () {
        var temp, sharedLibraryNames, sharedLibraryPackagesToLoad, _i, sharedLibraryPackagesToLoad_1, pkg, releaseLock;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (module_js_1.Module.isPyProxy(names)) {
                        temp = void 0;
                        try {
                            temp = names.toJs();
                        }
                        finally {
                            names.destroy();
                        }
                        names = temp;
                    }
                    if (!Array.isArray(names)) {
                        names = [names];
                    }
                    sharedLibraryNames = [];
                    try {
                        sharedLibraryPackagesToLoad = recursiveDependencies(names, messageCallback, errorCallback, true);
                        for (_i = 0, sharedLibraryPackagesToLoad_1 = sharedLibraryPackagesToLoad; _i < sharedLibraryPackagesToLoad_1.length; _i++) {
                            pkg = sharedLibraryPackagesToLoad_1[_i];
                            sharedLibraryNames.push(pkg[0]);
                        }
                    }
                    catch (e) {
                        // do nothing - let the main load throw any errors
                    }
                    return [4 /*yield*/, acquirePackageLock()];
                case 1:
                    releaseLock = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, , 5, 6]);
                    useSharedLibraryWasmPlugin();
                    return [4 /*yield*/, _loadPackage(sharedLibraryNames, messageCallback || console.log, errorCallback || console.error)];
                case 3:
                    _a.sent();
                    restoreOrigWasmPlugin();
                    return [4 /*yield*/, _loadPackage(names, messageCallback || console.log, errorCallback || console.error)];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    restoreOrigWasmPlugin();
                    releaseLock();
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.loadPackage = loadPackage;
