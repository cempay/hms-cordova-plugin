"use strict";
/*
    Copyright 2020. Huawei Technologies Co., Ltd. All rights reserved.

    Licensed under the Apache License, Version 2.0 (the "License")
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        https://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disableLogger = exports.enableLogger = exports.navigateToAppMarket = exports.isAREngineServiceAPKReady = exports.hasCameraPermission = exports.requestCameraPermission = exports.ARBodyScene = exports.ARFaceScene = exports.ARWorldScene = exports.ARHandScene = exports.ARScene = void 0;
const util_1 = require("./util");
var interfaces_1 = require("./interfaces");
Object.defineProperty(exports, "TrackingState", { enumerable: true, get: function () { return interfaces_1.TrackingState; } });
Object.defineProperty(exports, "ARCoordinateSystemType", { enumerable: true, get: function () { return interfaces_1.ARCoordinateSystemType; } });
Object.defineProperty(exports, "ARHandType", { enumerable: true, get: function () { return interfaces_1.ARHandType; } });
Object.defineProperty(exports, "PlaneType", { enumerable: true, get: function () { return interfaces_1.PlaneType; } });
Object.defineProperty(exports, "SemanticPlaneLabel", { enumerable: true, get: function () { return interfaces_1.SemanticPlaneLabel; } });
function getInitialProps(divId) {
    const htmlElement = document.getElementById(divId);
    const clientRect = htmlElement.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(htmlElement, null);
    let props = {};
    props['x'] = clientRect.x;
    props['y'] = clientRect.y;
    props['width'] = parseInt(computedStyle.getPropertyValue('width'));
    props['height'] = parseInt(computedStyle.getPropertyValue('height'));
    return props;
}
class ARScene {
    constructor(scene, divId) {
        this.scene = scene;
        this.divId = divId;
    }
    execHelper(func, args) {
        return util_1.asyncExec('HMSAREngine', func, args);
    }
    on(call) {
        window.subscribeHMSEvent(`${this.scene}_${this.divId}`, call);
        return this.execHelper('setCallback', [this.scene, this.divId, call.toString()]);
    }
    startARScene(config, bounds) {
        const initialProps = getInitialProps(this.divId);
        if (bounds) {
            if (bounds.marginTop)
                initialProps['marginTop'] = bounds.marginTop;
            if (bounds.marginBottom)
                initialProps['marginBottom'] = bounds.marginBottom;
        }
        this.mutationObserver = new MutationObserver(() => {
            const sceneRect = document.getElementById(this.divId).getBoundingClientRect();
            this.forceUpdateXAndY(sceneRect.x, sceneRect.y);
        });
        const mutationObserverConfig = { attributes: true, childList: true, subtree: true };
        this.mutationObserver.observe(document.body, mutationObserverConfig);
        return this.execHelper('startARScene', [this.scene, config, initialProps]);
    }
    destroy() {
        return this.execHelper('destroy', [this.scene]);
    }
    setConfig(config) {
        return this.execHelper('setConfig', [this.scene, config]);
    }
    scroll() {
        const sceneRect = document.getElementById(this.divId).getBoundingClientRect();
        return this.forceUpdateXAndY(sceneRect.x, sceneRect.y);
    }
    forceUpdateXAndY(x, y) {
        return this.execHelper('forceUpdateXAndY', [this.scene, x, y]);
    }
}
exports.ARScene = ARScene;
class ARHandScene extends ARScene {
    constructor(divId) { super("ARHand", divId); }
}
exports.ARHandScene = ARHandScene;
class ARWorldScene extends ARScene {
    constructor(divId) { super("ARWorld", divId); }
}
exports.ARWorldScene = ARWorldScene;
class ARFaceScene extends ARScene {
    constructor(divId) { super("ARFace", divId); }
}
exports.ARFaceScene = ARFaceScene;
class ARBodyScene extends ARScene {
    constructor(divId) { super("ARBody", divId); }
}
exports.ARBodyScene = ARBodyScene;
function requestCameraPermission() {
    return util_1.asyncExec('HMSAREngine', 'requestPermission', []);
}
exports.requestCameraPermission = requestCameraPermission;
function hasCameraPermission() {
    return __awaiter(this, void 0, void 0, function* () {
        const out = yield util_1.asyncExec('HMSAREngine', 'hasPermission', []);
        return out.result;
    });
}
exports.hasCameraPermission = hasCameraPermission;
function isAREngineServiceAPKReady() {
    return __awaiter(this, void 0, void 0, function* () {
        const out = yield util_1.asyncExec('HMSAREngine', 'isAREngineServiceAPKReady', []);
        return out.result;
    });
}
exports.isAREngineServiceAPKReady = isAREngineServiceAPKReady;
function navigateToAppMarket() {
    return util_1.asyncExec('HMSAREngine', 'navigateToAppMarket', []);
}
exports.navigateToAppMarket = navigateToAppMarket;
function enableLogger() {
    return util_1.asyncExec('HMSAREngine', 'enableLogger', []);
}
exports.enableLogger = enableLogger;
function disableLogger() {
    return util_1.asyncExec('HMSAREngine', 'disableLogger', []);
}
exports.disableLogger = disableLogger;
//# sourceMappingURL=HMSAREngine.js.map