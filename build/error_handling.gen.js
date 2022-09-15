"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var error_stack_parser_1 = require("error-stack-parser");
var module_js_1 = require("./module.js");
function isPyodideFrame(frame) {
    var fileName = frame.fileName || "";
    if (fileName.includes("pyodide.asm")) {
        return true;
    }
    if (fileName.includes("wasm-function")) {
        return true;
    }
    if (!fileName.includes("pyodide.js")) {
        return false;
    }
    var funcName = frame.functionName || "";
    if (funcName.startsWith("Object.")) {
        funcName = funcName.slice("Object.".length);
    }
    if (funcName in module_js_1.Module.public_api && funcName !== "PythonError") {
        frame.functionName = funcName;
        return false;
    }
    return true;
}
function isErrorStart(frame) {
    if (!isPyodideFrame(frame)) {
        return false;
    }
    var funcName = frame.functionName;
    return funcName === "PythonError" || funcName === "new_error";
}
module_js_1.Module.handle_js_error = function (e) {
    if (e.pyodide_fatal_error) {
        throw e;
    }
    if (e instanceof module_js_1.Module._PropagatePythonError) {
        // Python error indicator is already set in this case. If this branch is
        // not taken, Python error indicator should be unset, and we have to set
        // it. In this case we don't want to tamper with the traceback.
        return;
    }
    var restored_error = false;
    if (e instanceof module_js_1.Module.PythonError) {
        // Try to restore the original Python exception.
        restored_error = module_js_1.Module._restore_sys_last_exception(e.__error_address);
    }
    if (!restored_error) {
        // Wrap the JavaScript error
        var eidx = module_js_1.Module.hiwire.new_value(e);
        var err = module_js_1.Module._JsProxy_create(eidx);
        module_js_1.Module._set_error(err);
        module_js_1.Module._Py_DecRef(err);
        module_js_1.Module.hiwire.decref(eidx);
    }
    var stack = error_stack_parser_1["default"].parse(e);
    if (isErrorStart(stack[0])) {
        while (isPyodideFrame(stack[0])) {
            stack.shift();
        }
    }
    // Add the Javascript stack frames to the Python traceback
    for (var _i = 0, stack_1 = stack; _i < stack_1.length; _i++) {
        var frame = stack_1[_i];
        if (isPyodideFrame(frame)) {
            break;
        }
        var funcnameAddr = module_js_1.Module.stringToNewUTF8(frame.functionName || "???");
        var fileNameAddr = module_js_1.Module.stringToNewUTF8(frame.fileName || "???.js");
        module_js_1.Module.__PyTraceback_Add(funcnameAddr, fileNameAddr, frame.lineNumber);
        module_js_1.Module._free(funcnameAddr);
        module_js_1.Module._free(fileNameAddr);
    }
};
var PythonError = /** @class */ (function (_super) {
    __extends(PythonError, _super);
    function PythonError(message, error_address) {
        var _this = this;
        var oldLimit = Error.stackTraceLimit;
        Error.stackTraceLimit = Infinity;
        _this = _super.call(this, message) || this;
        Error.stackTraceLimit = oldLimit;
        _this.name = _this.constructor.name;
        // The address of the error we are wrapping. We may later compare this
        // against sys.last_value.
        // WARNING: we don't own a reference to this pointer, dereferencing it
        // may be a use-after-free error!
        _this.__error_address = error_address;
        return _this;
    }
    return PythonError;
}(Error));
module_js_1.Module.PythonError = PythonError;
// A special marker. If we call a CPython API from an EM_JS function and the
// CPython API sets an error, we might want to return an error status back to
// C keeping the current Python error flag. This signals to the EM_JS wrappers
// that the Python error flag is set and to leave it alone and return the
// appropriate error value (either NULL or -1).
var _PropagatePythonError = /** @class */ (function (_super) {
    __extends(_PropagatePythonError, _super);
    function _PropagatePythonError() {
        module_js_1.Module.fail_test = true;
        return _super.call(this, "If you are seeing this message, an internal Pyodide error has " +
            "occurred. Please report it to the Pyodide maintainers.") || this;
    }
    return _PropagatePythonError;
}(Error));
module_js_1.Module._PropagatePythonError = _PropagatePythonError;
