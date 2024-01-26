/**
 * @namespace       $h
 * @author          Inswave Systems
 * @description     W-Matrix Plugin Javascript wrapping 객체로 app,misc,camera 등 플러그인객체에 property와 API를 제공한다.
 */
if (typeof $h !== "object") {
    $h = {};
}

/**
 * @function        $h.exec
 * @description     plugin을 실행을 실행시킨다.
 * @param           {Callback} callback - 콜백함수
 * @param           {String} callback.statusCode - 코드
 * @param           {String} callback.msg - 메시지
 * @param           {String} callback.data - 데이터
 * @param           {String} class - 실행할 네이티브 클래스명
 * @param           {String} method - 실행할 네이티브 메서드 이름
 * @param           {Array} params - 파라미터
 * @example
 * var callback = function(msg){console.log(msg);};
 * $h.exec(callback,"CustomPlugin","echo",["echo test"]);
 */
$h.exec = function(callback, service, method, params){
    if(typeof wmatrix === "object"){
        wmatrix.exec(callback,service,method,params);
    } else {
        console.log("not found wmatrix");
    }
}

/**
 * @function       $h.dismissScreen
 * @description    native progrees view를 제거한다.
 * @example
 * $h.dismissScreen();
 */
$h.dismissScreen = function () {
    if (typeof window.webkit == "undefined") {
        wmatrixBridge.dismissLoadingLayout();
    } else {
        webkit.messageHandlers.wmatrix.postMessage(["WMatrix","dismissScrean"]);
    }
}

/**
 * @function      $h.foregroundListener
 * @description   app이 background에서 foreground로 올라올때 이벤트리스너를 등록한다.
 * @param         {Function} listener - 이벤트발생시 실행할 함수
 * @example
 * var listener = function(e){ console.log(e); };
 * $h.foregroundListener(listener);
 */
$h.foregroundListener = function (listener) {
    try {
        document.addEventListener('resume', listener, false);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.backgroundListener
 * @description   app이 foreground에서 background로 올라올때 이벤트리스너를 등록한다.
 * @param         {Function} listener - 이벤트발생시 실행할 함수
 * @example
 * var listener = function(e){ console.log(e); };
 * $h.backgroundListener(listener);
 */
$h.backgroundListener = function (listener) {
    try {
        document.addEventListener('pause', listener, false);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.backKeyPressedListener
 * @description   뒤로가기 키를 눌렀을때 Web에 전달되는 이벤트리스너를 등록한다.(Android Only)
 * @param         {Function} listener - 이벤트발생시 실행할 함수
 * @example
 * var listener = function(e){ console.log(e); };
 * $h.backKeyPressedListener(listener);
 */
$h.backKeyPressedListener = function (listener) {
    try {
        document.addEventListener('onBackKeyPressed', listener, false);
        $h.backKeyPressedListenerRegistered = true;
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.removeForegroundListener
 * @description   app이 background에서 foreground로 올라올때 이벤트리스너를 삭제한다. addEventListener에 인자로 받은 callback함수를 인자로 받는다.
 * @example
 * $h.removeForegroundListener(listener);
 */
$h.removeForegroundListener = function(listener){
    if(typeof listener === "function"){
        document.removeEventListener("resume", listener, false);
    } else {
        console.log("listener type is function");
    }
}

/**
 * @function      $h.removeBaackgroundListener
 * @description   app이 foreground에서 background로 올라올때 이벤트리스너를 삭제한다. addEventListener에 인자로 받은 callback함수를 인자로 받는다.
 * @example
 * $h.removeBackgroundListener(listener);
 */
$h.removeBackgroundListener = function(listener){
    if(typeof listener === "function"){
        document.removeEventListener("pause", listener, false);
    } else {
        console.log("listener type is function");
    }
}

/**
 * @property {Boolean} $h.backKeyPressedListenerRegistered - 뒤로가기 키 리스너가 등록됐는지 여부 Flag (Android only)
 */
$h.backKeyPressedListenerRegistered = false;


// event      $h.onBackKeyPressed
// description   뒤로가기 키를 눌렀을때 이벤트를 발생한다. (App에서 호출)
$h.onBackKeyPressed = function (data) {
    if ($h.backKeyPressedListenerRegistered) {
        var event = new Event('onBackKeyPressed');
        event.data = data
        document.dispatchEvent(event);
    } else {
        var callback = function (result) { console.log(result); };
        var options;

        if (typeof (data) == 'undefined') {
            options = { "popup": true };
        } else {
            options = { "popup": data.popup };
        }
        $h.app.finish(callback, options);
    }
}

/**
 * @function      $h.removeBackKeyPressedListener
 * @description   뒤로가기 키를 눌렀을때 Web에 전달되는 이벤트리스너를 제거한다.(Android Only)
 * @param         {Function} listener - 제거할 이벤트 리스너
 * @example
 * var listener = function(e){ console.log(e); };
 * $h.removeBackKeyPressedListener(listener);
 */
$h.removeBackKeyPressedListener = function (listener) {
    try {
        document.removeEventListener('onBackKeyPressed', listener, false);
        $h.backKeyPressedListenerRegistered = false;
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.webviewTouchListener
 * @description   Webview에서 Touch Event (ACTION_UP)이 발생했을때 Web에 전달되는 Listener를 등록한다.
 * @param         {Function} listener - 이벤트발생시 실행할 함수
 * @example
 * var listener = function(e){ console.log(e); };
 * $h.webviewTouchListener(listener);
 */
$h.webviewTouchListener = function (listener) {
    try {
        document.addEventListener('onWebviewTouched', listener, false);
        $h.webviewTouchListenerRegistered = true;
    } catch (e) {
        console.log(e);
    }
}

/**
 * @property {Boolean} $h.webviewTouchListenerRegistered - Webview Touch 리스너가 등록됐는지 여부 Flag
 */
$h.webviewTouchListenerRegistered = false;


// event         $h.onWebviewTouched
// description   Webview에 Touch Event가 발생했을때 이벤트를 발생한다. (App에서 호출)
$h.onWebviewTouched = function (data) {
    if ($h.webviewTouchListenerRegistered) {
        var event = new Event('onWebviewTouched');
        event.data = data
        document.dispatchEvent(event);
    }
}

/**
 * @function      $h.removeWebviewTouchListener
 * @description   Webview에서 Touch Event이 발생했을때 Web에 전달되는 이벤트리스너를 제거한다.
 * @param         {Function} listener - 제거할 이벤트 리스너
 * @example
 * var listener = function(e){ console.log(e); };
 * $h.removeWebviewTouchListener(listener);
 */
$h.removeWebviewTouchListener = function(listener) {
    try {
        document.removeEventListener('onWebviewTouched', listener, false);
        $h.webviewTouchListenerRegistered = false;
    } catch (e) {
        console.log(e);
    }
}

/**
 * @namespace      $h.app
 * @memberof       $h
 * @author         Inswave Systems
 * @description    App에 일반적인 기능을 모아놓은 플러그인으로 이벤트 및 API를 제공한다. 제공되는 API로는 preference 추가/삭제, applog관리, 앱 이벤트 감지, TTS, screenshot 같은 기능들이 있다.
 */
if (typeof $h.app !== "object") {
    $h.app = {};
}

/**
 * @function      $h.app.finish
 * @description   사용자에게 팝업메시지를 띄워 종료메시지를 알리고 종료한다.
 * @param         {Function} callback - 콜백함수
 * @param         {String} callback.statusCode - 코드
 * @param         {String} callback.msg - 메시지
 * @param         {String} callback.data - 데이터
 * @param         {Object} options - object
 * @param         {Bool} options.popup - 종료 Popup 생성 여부 (Default : false)
 * @param         {Bool} options.message - 종료 popup에 보여줄 Message (Default : "앱을 종료합니다.")
 * @param         {Bool} options.cancelButton - 종료 popup에 취소 버튼 보여줄지 여부 (Default : true)
 * @example
 * var callback = function(result){ console.log(result); };
 * var params = {"message": "앱을 종료하시겠습니까?", "popup":true, "cancelButton":true}
 * $h.app.finish(callback,params);
 */
$h.app.finish = function (callback, options) {
    try {
        wmatrix.plugin.app.finish(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.app.version
 * @description   wmatrix app에 version 정보를 callback에 param으로 반환한다.
 * @param         {Function} callback - 콜백함수
 * @param         {String} callback.statusCode - 코드
 * @param         {String} callback.msg - 메시지
 * @param         {Object} callback.data - 데이터
 * @param         {String} callback.data.version - 버전
 * @param         {String} callback.data.versionCode - 버전코드
 * @example
 * var callback = function(result){ console.log(result); };
 * $h.app.version(callback);
 */
$h.app.version = function (callback) {
    try {
        wmatrix.plugin.app.version(callback);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.app.checkAppInstalled
 * @description   Android: 전달한 package의 앱이 설치되어 있는지 확인한다.<br/>
 *                iOS: url scheme를 이용하여 앱이 설치되어 있는지 확인한다. urlscheme를 지원하는 앱만 확인이 가능하다.
 * @param         {Function} callback - 콜백함수
 * @param         {String} callback.statusCode - 코드
 * @param         {String} callback.msg - 메시지
 * @param         {Object} callback.data - 데이터
 * @param         {Object} options - object
 * @param         {String} options.pakageName - 앱 패키지명 (Android)
 * @param         {String} options.appName - 앱 이름 (Android)
 * @param         {String} options.storeURL - 앱 스토어 주소 (Android)
 * @param         {String} options.appScheme - urlScheme명 (iOS)
 * @param         {Bool} options.gotoStore - 스토어이동여부
 * @example
 * var callback = function(result){ console.log(result); };
 * //Android
 * var opt = {};
 * opt.packageName = 'com.android.chrome';
 * opt.gotoStore = true;
 * opt.storeURL = 'market://details?id=com.android.chrome';
 * opt.appName = 'Chrome';
 * $h.app.checkAppInstalled(callback,options);
 *
 * //iOS
 * var opt = {};
 * opt.appScheme = "twitter://";
 * opt.storeScheme = "itms-apps://itunes.apple.com/app/id333903271";
 * opt.gotoStore = true;
 * $h.app.checkAppInstalled(callback,options);
 */
$h.app.checkAppInstalled = function (callback, options) {
    try {
        wmatrix.plugin.app.checkAppInstalled(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @namespace      $h.screen
 * @memberof       $h
 * @author         Inswave Systems
 * @description    앱화면과 관련된 기능을 모아놓은 플러그인으로 이벤트 및 API를 제공한다. 제공되는 API로는 webView추가, screenCapture, orientation변경, 화면밝기조절 기능들이 있다.
 */
if (typeof $h.screen !== "object") {
    $h.screen = {};
}

/**
 * @function      $h.screen.startWebview
 * @description   새로운 Webview에서 지정된 페이지를 로드한다.
 * @param         {Function} callback - 콜백함수
 * @param         {String} callback.statusCode - 코드
 * @param         {String} callback.msg - 메시지
 * @param         {Object} callback.data - 데이터
 * @param         {Object} options - object
 * @param         {String} options.ulr - 실행할 Page 경로 또는 url
 * @param         {Object} options.header - 헤더 값
 * @param         {String} options.closeCallbackfunction - webview를 close했을 때 받을 function명 startWebView로 호춣한 subWebview를 close하는 방법 - subWebview에서 아래의 함수 호출, 호출 시 main webview에 전달할 data를 인자로 넣어준다.</br>if(typeof(subWebview) == 'undefined'){</br>  window.webkit.messageHandlers.subWebview.postMessage("test data");</br>}else{</br>subWebview.finish("test data");</br>}
 * @example
 * var callback = function(result){ console.log(result); };
 * var options = {"header":{"key1":"value1", "key2":"value2"}, "url" : "${화면 경로 또는 Web URL}"};
 * $h.screen.startWebview(callback, options);
 */
$h.screen.startWebview = function (callback, options) {
    try {
        wmatrix.plugin.screen.startWebView(callback, options);
    } catch(e) {
        console.log(e);
    }
}

/**
 * @function      $h.screen.closeSubWebview
 * @description   새로운 Webview를 닫는다.
 * @param         {Function} callback - 콜백함수
 * @param         {String} callback.statusCode - 코드
 * @param         {String} callback.msg - 메시지
 * @param         {Object} callback.data - 데이터
 * @example
 * var callback = function(result){ console.log(result); };
 * $h.screen.closeSubWebview(callback);
 */
$h.screen.closeSubWebview = function (callback) {
    try {
        wmatrix.plugin.screen.closeSubWebView(callback);
    } catch(e) {
        console.log(e);
    }
}

/**
 * @function      $h.screen.screenCapture
 * @description   현재 보이는 화면을 Capture 하여 해당 base64를 Web 으로 전달한다.
 * @param         {Function} callback - 콜백함수
 * @param         {String} callback.statusCode - 코드
 * @param         {String} callback.msg - 메시지
 * @param         {Object} callback.data - 데이터
 * @param         {String} callback.data.imgBase64 - "data:image/jpg;base64,~~"
 * @param         {Object} options - object
 * @param         {Bool}   options.allView - Native 를 포함한 모든 View 를 캡쳐할지 여부 (default : false)
 * @param         {Bool}   options.saveAlbum - ScreenCapture 한 이미지를 Album 에 저장할지 여부 (default : false)
 * @param         {Int}    options.quality - Capture 할 Image quality (default : 70)
 * @example
 * var callback = function(result){ console.log(result); };
 * var opt = {};
 * opt.allView = false;
 * opt.quality = 50;
 * $h.screen.screenCapture(callback,opt);
 */
$h.screen.screenCapture = function (callback, options) {
    try {
        wmatrix.plugin.screen.screenCapture(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.screen.screenOrientation
 * @description   주어진 Orientation 속성을 Native View에 설정한다. (Android Only)
 * @param         {Function} callback - 콜백함수
 * @param         {String} callback.statusCode - 코드
 * @param         {String} callback.msg - 메시지
 * @param         {Object} callback.data - 데이터
 * @param         {Object} options - object
 * @param         {Object} options.orientation - 설정할 orientation 속성 (0 : Sensor, 1 : Portrait, 2 : Landscape, 3 : Landscape Sensor)
 * @example
 * var callback = function(result){ console.log(result); };
 * var opt = {};
 * opt.orientation = 1;
 * $h.screen.screenOrientation(callback,opt);
 */
$h.screen.screenOrientation = function (callback, options) {
    try {
        wmatrix.plugin.screen.screenOrientation(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
* @function      $h.screen.setupBrightness
* @description   앱 화면의 밝기를 조절한다.
* @param         {Function} callback - 콜백함수
* @param         {String} callback.statusCode - 코드
* @param         {String} callback.msg - 메시지
* @param         {Object} callback.data - 데이터
* @param         {Object} options - object
* @param         {Int} options.brightness - 화면 밝기의 정도 (1~100)
* @example
* const callback = function(result){ console.log(JSON.stringify(result)); };
* const options = {};     // 1 ~ 100
* options.brightness = 1
* $h.screen.setupBrightness(callback,options);
*/
$h.screen.setupBrightness = function (callback, params) {
    try {
        wmatrix.plugin.screen.setupBrightness(callback, params)
    } catch (e) {
        console.log(e);
    }
}

/**
 * @namespace      $h.storage
 * @memberof       $h
 * @author         Inswave Systems
 * @description    앱내부에 저장되는 데이터관련 플러그인으로 API를 제공한다. 제공되는 API로는 setPreference, getPreference, removePreference, shareData 기능들이 있다.
 */
if (typeof $h.storage !== "object") {
    $h.storage = {};
}

/**
 * @function      $h.storage.reset
 * @description   wmatrix storage 엔진,리소스,db,cache 및 모든 설정을 reset한다.
 * @param         {Function} callback - 콜백함수
 * @param         {String} callback.statusCode - 코드
 * @param         {String} callback.msg - 메시지
 * @param         {String} callback.data - 데이터
 * @param         {Object} options - object
 * @param         {Bool} options.popup - 리셋 Popup 생성 여부 (Default : true)
 * @param         {String} options.message - 리셋 Popup 메세지 (Default : "앱을 초기화하고 종료합니다.")
 * @param         {Bool} options.message - 데이터 초기화 여부  (Default : true)
 * @param         {Bool} options.message - 캐시 초기화 여부 (Default : true)
 * @example
 * var callback = function(result){ console.log(result); };
 * var params = {"popup": true, "message": "앱을 초기화 하시겠습니까?", "clearData": true, "clearCache": true}
 * $h.storage.reset(callback,params);
 */
$h.storage.reset = function (callback, options) {
    try {
        wmatrix.plugin.storage.reset(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.storage.setPreference
 * @description   native preference에 값을 저장한다.
 * @param         {Function} callback - 콜백함수
 * @param         {String} callback.statusCode - 코드
 * @param         {String} callback.msg - 메시지
 * @param         {Object} callback.data - 데이터
 * @param         {Object} options - object
 * @param         {Object} options.key - 저장할 Preference Key
 * @param         {Object} options.value - 저장할 Preference Value
 * @example
 * var callback = function(result){ console.log(result); };
 * var opt = {};
 * opt.key = "test1";
 * opt.value = "test1 value";
 * $h.storage.setPreference(callback,opt);
 */
$h.storage.setPreference = function (callback, options) {
    try {
        wmatrix.plugin.storage.setPreference(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.storage.getPreference
 * @description   native preference에서 값을 가져온다.
 * @param         {Function} callback - 콜백함수
 * @param         {String} callback.statusCode - 코드
 * @param         {String} callback.msg - 메시지
 * @param         {Object} callback.data - 데이터
 * @param         {Object} options - object
 * @param         {Object} options.key - 가져올 Preference Key
 * @example
 * var callback = function(result){ console.log(result); };
 * var opt = {};
 * opt.key = "test1";
 * $h.storage.getPreference(callback,opt);
 */
$h.storage.getPreference = function (callback, options) {
    try {
        wmatrix.plugin.storage.getPreference(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.storage.removePreference
 * @description   native preference에 값을 삭제한다.
 * @param         {Function} callback - 콜백함수
 * @param         {String} callback.statusCode - 코드
 * @param         {String} callback.msg - 메시지
 * @param         {Object} callback.data - 데이터
 * @param         {Object} options - object
 * @param         {Object} options.key - 삭제할 Preference Key
 * @example
 * var callback = function(result){ console.log(result); };
 * var opt = {};
 * opt.key = "test1";
 * $h.storage.removePreference(callback,opt);
 */
$h.storage.removePreference = function (callback, options) {
    try {
        wmatrix.plugin.storage.removePreference(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.storage.shareData
 * @description   주어진 data의 url을 이용하여 다른앱과 공유한다.
 * @param         {Function} callback - 콜백함수
 * @param         {String} callback.statusCode - 코드
 * @param         {String} callback.msg - 메시지
 * @param         {Object} callback.data - 데이터
 * @param         {Object} options - object
 * @param         {Int} options.type - share할 data type (0: url, 1: image)
 * @param         {String} options.data - share할 data url
 * @param         {String} options.title - share chooser에 표시될 title
 * @example
 * var callback = function(result){ console.log(result); };
 * var opt = {};
 * opt.type = 1;
 * opt.data = "https://www.naver.com";
 * opt.title = "Select App"
 * $h.storage.shareData(callback,opt);
 */
$h.storage.shareData = function (callback, options) {
    try {
        wmatrix.plugin.storage.shareData(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @namespace      $h.log
 * @memberof       $h
 * @author         Inswave Systems
 * @description    앱 로그 기능을 제공하는 플러그인으로 API를 제공한다. 제공되는 API로는 getLog, getLogUpload, getLogMail, logPath, clearLog 기능들이 있다.
 */
if (typeof $h.log !== "object") {
    $h.log = {};
}

/**
 * @function      $h.log.getLog
 * @description   앱 로그를 가져온다.
 * @param         {Function} callback - 콜백함수
 * @param         {String} callback.statusCode - 코드
 * @param         {String} callback.msg - 메시지
 * @param         {Object} callback.data - 데이터
 * @param         {String} callback.data.log - log
 * @param         {Object} options - object
 * @param         {Int} type - 0: 전체 로그, 1: 웹 console.log 만 기록, 2: Websquare 로그만 기록. (default: 0)
 * @example
 * var callback = function(result){ console.log(result); };
 * var opt = {"type" : 0};
 *
 * $h.log.getAppLog(callback,opt);
 */
$h.log.getLog = function (callback, options) {
    try {
        wmatrix.plugin.log.getLog(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
* @function      $h.log.getLogUpload
* @description   앱 로그를 가져온 후 특정 URL 로 로그 파일을 업로드 한다.
* @param         {Function} callback - 콜백함수
* @param         {String} callback.statusCode - 코드
* @param         {String} callback.msg - 메시지
* @param         {Object} callback.data - 데이터
* @param         {Object} options - object
* @param         {Int}    options.type - 0: 전체 로그, 1: 웹 console.log 만 기록, 2: Websquare 로그만 기록. (default: 0)
* @param         {String} options.fileName - 로그 파일 명 (필수 체크)
* @param         {String} options.uploadUrl - 업로드 할 서버 URL. (필수. 일단 POST 방식만 지원, Content-Type : multipart/form-data)
* @example
* var callback = function(result){ console.log(result); };
* var opt = {"type" : 0, "fileName" : "logFile.log", "uploadUrl" : "http://test.server.com/fileUpload"};
* $h.log.getLogUpload(callback,opt);
*/
$h.log.getLogUpload = function (callback, options) {
    try {
        wmatrix.plugin.log.getLogUpload(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
* @function      $h.log.getLogMail
* @description   앱 로그를 가져온 후 메일로 로그를 전달한다.
* @param         {Function} callback - 콜백함수
* @param         {String}   callback.statusCode - 코드
* @param         {String}   callback.msg - 메시지
* @param         {Object}   callback.data - 데이터
* @param         {Object}   options - object
* @param         {Int}      options.type - 0: 전체 로그, 1: 웹 console.log 만 기록, 2: Websquare 로그만 기록. (default: 0)
* @param         {String}   options.fileName - 로그 파일 명 (isAttachFile 이 true 인 경우 필수)
* @param         {Boolean}  options.isAttachFile - 메일 전송 시 파일 첨부 여부. true: 파일 첨부, false: 메일 내용에 로그 내용 작성 (default: false)
* @param         {String}   options.subject - 메일 전송 시 제목 (default: "")
* @param         {String[]} options.to - 메일 받는 사람
* @param         {String[]} options.cc - 참조
* @param         {String[]} options.bcc - 숨은 참조
* @example
* var callback = function(result){ console.log(result); };
* var opt = {"type" : 0, "isAttachFile" : false, "fileName" : "logFile.log", "subject" : "appReport", "to" : ["to@test.com"], "cc" : ["cc@test.com"], "bcc" : ["bcc@test.com", "bcc2@test.com", "bcc3@test.com"]}
* $h.log.getLogMail(callback,opt);
*/
$h.log.getLogMail = function (callback, options) {
    try {
        wmatrix.plugin.log.getLogMail(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
* @function      $h.log.clearLog
* @description   기록 되어 있는 앱 로그를 초기화 한다.
* @param         {Function} callback - 콜백함수
* @param         {String} callback.statusCode - 코드
* @param         {String} callback.msg - 메시지
* @param         {Object} callback.data - 데이터
* @example
* var callback = function(result){ console.log(result); };
* $h.log.clearLog(callback);
*/
$h.log.clearLog = function (callback) {
    try {
        wmatrix.plugin.log.clearLog(callback);
    } catch (e) {
        console.log(e);
    }
}

/**
* @function      $h.log.logPath
* @description   앱 로그 파일생성 후 경로를 알려준다.
* @param         {Function} callback - 콜백함수
* @param         {String} callback.statusCode - 코드
* @param         {String} callback.msg - 메시지
* @param         {Object} callback.data - 데이터
* @param         {String} callback.data.logPath - 로그경로
* @param         {Object} options - object
* @param         {Int} options.type - 0: 전체 로그, 1: 웹 console.log 만 기록, 2: Websquare 로그만 기록. (default: 0)
* @param         {String} options.fileName - 로그 파일 명 (필수 체크)
* @example
* var callback = function(result){ console.log(result); };
* var opt = {"type" : 0,  "fileName" : "test.log"}
* $h.log.logPath(callback,opt);
*/
$h.log.logPath = function (callback, options) {
    try {
        wmatrix.plugin.log.logPath(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @namespace      $h.speech
 * @memberof       $h
 * @author         Inswave Systems
 * @description    앱에 읽기/말하기 기능을 제공하는 플러그인으로 API를 제공한다. 제공되는 API로는 speakTTS, stopTTS, startSpeechToText, stopSpeechToText 기능들이 있다.
 */
if (typeof $h.speech !== "object") {
    $h.speech = {};
}

/**
* @function      $h.speech.speakTTS
* @description   message 를 음성으로 읽어준다.
* @param         {Function} callback - 콜백함수
* @param         {String} callback.statusCode - 코드
* @param         {String} callback.msg - 메시지
* @param         {Object} callback.data - 데이터
* @param         {Object} options - object
* @param         {String} options.language - 언어 코드 (ko: 한국어, en: 영어, ja: 일본어, zh_cn: 중국어 간체, zh_tw: 중국어 번체)
* @param         {String} options.message - 음성으로 말할 메세지 내용.
* @param         {Float} options.speechSpeed - 음성으로 말하는 속도 (default: 1.0)
* @example
* var callback = function(result){ console.log(result); };
* var opt = {"language": "ko", "message" : "hello, world", "speechSpeed" : 0.9 };
* $h.speech.speakTTS(callback,opt);
*/
$h.speech.speakTTS = function (callback, options) {
    try {
        wmatrix.plugin.speech.speakTTS(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
* @function      $h.speech.stopTTS
* @description   TTS가 실행중이면 중단시킨다.
* @param         {Function} callback - 콜백함수
* @param         {String} callback.statusCode - 코드
* @param         {String} callback.msg - 메시지
* @param         {Object} callback.data - 데이터
* @example
* var callback = function(result){ console.log(result); };
* $h.speech.stopTTS(callback);
*/
$h.speech.stopTTS = function (callback) {
    try {
        wmatrix.plugin.speech.stopTTS(callback);
    } catch (e) {
        console.log(e);
    }
}

/**
* @function      $h.speech.startSpeechToText
* @description   음성 인식 후 인식된 텍스트를 리턴한다.
* @param         {Function} callback - 콜백함수
* @param         {String} callback.statusCode - 코드
* @param         {String} callback.msg - 메시지
* @param         {String} callback.data - 인식된 텍스트
* @example
* var callback = function(result){ console.log(result); };
* $h.speech.startSpeechToText(callback);
*/
$h.speech.startSpeechToText = function (callback) {
    try {
        wmatrix.plugin.speech.startSpeechToText(callback);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.speech.stopSpeechToText
 * @description   음성 인식 엔진을 중지 한다.
 * @param         {Function} callback - 콜백함수
 * @param         {String} callback.statusCode - 코드
 * @param         {String} callback.msg - 메시지
 * @param         {String} callback.data - 인식된 텍스트
 * @example
 * var callback = function(result){ console.log(result); };
 * $h.speech.stopSpeechToText(callback);
 */
$h.speech.stopSpeechToText = function (callback) {
    try {
        wmatrix.plugin.speech.stopSpeechToText(callback);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.speech.speechToTextEventListener
 * @description   App의 오디오 엔진의 상태 변화가 발생했을때 Web에 전달되는 Listener를 등록한다.
 * @param         {Function} listener - 이벤트발생시 실행할 함수
 * @example
 * var listener = function(result){ console.log(result); };
 * $h.speech.speechToTextEventListener(listener);
 */
$h.speech.speechToTextEventListener = function (listener) {
    try {
        document.addEventListener('onSpeechToTextEventChanged', listener, false);
    } catch (e) {
        console.log(e);
    }
}

// event         $h.onSpeechToTextEventChanged
// description   App의 오디오 엔진의 상태 변화가 발생했을때 이벤트를 발생한다. (App에서 호출)
$h.speech.onSpeechToTextEventChanged = function (data) {
    var event = new Event('onSpeechToTextEventChanged');
    event.data = data
    document.dispatchEvent(event);
}

/**
 * @namespace      $h.audioRecorder
 * @memberof       $h
 * @author         Inswave Systems
 * @description    음성녹음에 관련된 녹음,저장,일시중지,재개,취소 등에 API를 제공한다.
 */
if (typeof $h.audioRecorder !== "object") {
    $h.audioRecorder = {};
}

/**
 * @function      $h.audiorecorder.recordAudio
 * @description   option의 설정에 따라 녹음을 시작한다.
 * @param         {Function} callback - 콜백함수
 * @param         {String} callback.statusCode - 코드
 * @param         {String} callback.msg - 메시지
 * @param         {Object} callback.data - 데이터
 * @param         {Object} options - object
 * @param         {String} options.quality - quality 녹음 품질 Default: 32768
 * @param         {String} options.fileName - 파일 이름 Default: audio
 * @param         {String} options.isInternal - 녹음 파일을 내부/외부 저장소중 저장할 곳을 설정 (true or false) Default: true / 내부 저장소
 * @param         {String} options.codec - 코덱 설정 0: AAC, 1: AAC_LED, 2: HE_AAC Default: 0
 * @param         {String} options.outputFormat - 녹음 파일 형식 0: MPEG_4, 1: AAC_ADTS, 2: MPEG_2_TS Default: 0
 * @example
 * var callback = function(result){ console.log(result); };
 * var options = {'quality':'32768', 'fileName':'audio', 'isInternal':'false', 'codec':'0', 'outputFormat':'0'};
 * $h.audioRecorder.recordAudio(callback,options);
 */
$h.audioRecorder.recordAudio = function (callback, options) {
    try {
        wmatrix.plugin.audioRecorder.recordAudio(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.audioRecorder.recordFinish
 * @description   녹음을 종료한다.
 * @param         {Function} callback - 콜백함수
 * @param         {String} callback.statusCode - 코드
 * @param         {String} callback.msg - 메시지
 * @param         {Object} callback.data - 데이터
 * @param         {Object} callback.data.audio - base64 스트링
 * @param         {Object} callback.data.recordTime - 파일시간
 * @param         {Object} callback.data.filePath - 파일경로
 * @example
 * var callback = function(result){ console.log(result); };
 * $h.audioRecorder.recordFinish(callback)
 */
$h.audioRecorder.recordFinish = function (callback) {
    try {
        wmatrix.plugin.audioRecorder.recordFinish(callback);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.audioRecorder.recordCancel
 * @description   녹음을 취소한다.
 * @param         {Function} callback - 콜백함수
 * @param         {String} callback.statusCode - 코드
 * @param         {String} callback.msg - 메시지
 * @param         {Object} callback.data - 데이터
 * @example
 * var callback = function(result){ console.log(result); };
 * $h.audioRecorder.recordCancel(callback)
 */
$h.audioRecorder.recordCancel = function (callback) {
    try {
        wmatrix.plugin.audioRecorder.recordCancel(callback);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.audioRecorder.recordPause
 * @description   녹음을 일시정한다.
 * @param         {Function} callback - 콜백함수
 * @param         {String} callback.statusCode - 코드
 * @param         {String} callback.msg - 메시지
 * @param         {Object} callback.data - 데이터
 * @example
 * var callback = function(result){ console.log(result); };
 * $h.audioRecorder.recordPause(callback)
 */
$h.audioRecorder.recordPause = function (callback) {
    try {
        wmatrix.plugin.audioRecorder.recordPause(callback);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.audioRecorder.recordResume
 * @description   일시정지 된 녹음을 다시 시작한다.
 * @param         {Function} callback - 콜백함수
 * @param         {String} callback.statusCode - 코드
 * @param         {String} callback.msg - 메시지
 * @param         {Object} callback.data - 데이터
 * @example
 * var callback = function(result){ console.log(result); };
 * $h.audioRecorder.recordResume(callback)
 */
$h.audioRecorder.recordResume = function (callback) {
    try {
        wmatrix.plugin.audioRecorder.recordResume(callback);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.audioRecorder.recordStatus
 * @description   녹음상태를 조회한다.
 * @param         {Function} callback - 콜백함수
 * @param         {String} callback.statusCode - 코드
 * @param         {String} callback.msg - 메시지
 * @param         {String} callback.data - 데이터 (0 - 녹음중 , 1 - 녹음정지, 2 - 일시중지)
 * @example
 * var callback = function(result){ console.log(result); };
 * $h.audioRecorder.recordStatus(callback)
 */
$h.audioRecorder.recordStatus = function (callback) {
    try {
        wmatrix.plugin.audioRecorder.recordStatus(callback);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.audioRecorder.deleteAudioFile
 * @description   녹음된 파일을 삭제한다.
 * @param         {Function} callback - 콜백함수
 * @param         {String} callback.statusCode - 코드
 * @param         {String} callback.msg - 메시지
 * @param         {Object} callback.data - 데이터
 * @param         {Object} options - object
 * @param         {String[]} options.deleteFilePath - 파일경로배열
 * @example
 * var callback = function(result){ console.log(result); };
 * var options = {'deleteFilePath':['$filePath','$filePath','$filePath']}
 * $h.audioRecorder.deleteAudioFile(callback, options)
 */
$h.audioRecorder.deleteAudioFile = function (callback, data) {
    try {
        wmatrix.plugin.audioRecorder.deleteAudioFile(callback, data);
    } catch (e) {
        console.log(e);
    }
}


/**
 * @function      $h.audioRecorder.deleteAllFile
 * @description   녹음된 파일 및 폴더를 전부 삭제한다.
 * @param         {Function} callback - 콜백함수
 * @param         {String} callback.statusCode - 코드
 * @param         {String} callback.msg - 메시지
 * @param         {Object} callback.data - 데이터
 * @example
 * var callback = function(result){ console.log(result); };
 * $h.audioRecorder.deleteAllFile(callback)
 */
$h.audioRecorder.deleteAllFile = function (callback) {
    try {
        wmatrix.plugin.audioRecorder.deleteAllFile(callback);
    } catch (e) {
        console.log(e);
    }
}


/**
 * @namespace      $h.barcode
 * @memberof       $h
 * @author         Inswave Systems
 * @description    다양한 종류에 barcode들을 스캔하여 데이터를 반환하는 API를 제공한다. 지원되는 바코드 종류 AZTEC, CATBODY, CODE_128, CODE_39, CODE_39MOD43, CODE_93, UPC_E, QR_CODE, PDF_417, DATA_MATRIX, DOG_BODY, EAN_13, EAN_8, FACE, HUMAN_BODY, INTERLEAVED2OF5, ITF14 이다.
 */
if (typeof $h.barcode !== "object") {
    $h.barcode = {}
}

/**
 * @function       $h.barcode.scan
 * @param         {Function} callback - 콜백함수
 * @param         {String} callback.statusCode - 코드
 * @param         {String} callback.msg - 메시지
 * @param         {String} callback.data - 데이터
 * @param         {Object} option - option
 * @param         {Bool}   option.disableSuccessBeep - Barcode Scanner 성공 시 성공음 출력 여부 Flag
 * @param         {Bool}   option.preferFrontCamera - Barcode Scanner 실행 시 전면 카메라로 실행할건지에 대한 Flag
 * @param         {Bool}   option.showTorchButton - Barcode Scanner 화면에 Flash 버튼 표시할 건지에 대한 Flag
 * @param         {Bool}   option.showFlipCameraButton - Barcode Scanner 화면에 전면, 후면 카메라 전환 버튼 표시할 건지에 대한 Flag
 * @param         {Bool}   option.torchOn - Barcode Scanner 실행 시 Flash를 사용할건지에 대한 Flag
 * @param         {String} option.formats - 어떤 barcode를 scan 할건지에 대한 설정값. 값이 없으면 자동으로 인식하여 scan 한다.( , 를 이용하여 다중 지정 가능)
 * @param         {Bool}   option.saveHistory - Barcode Scanner History를 저장할건지에 대한 Flag (Android Only)
 * @param         {Bool}   option.resultDisplayDuration - Barcode Scanner 완료 후 그 화면에서 결과를 몇초동안 표시할건지에 대한 설정값 (ms) (Android Only)
 * @param         {String} option.prompt - Barcode Scanner 화면에 표시할 문구 (Android Only)
 * @param         {String} option.orientation - Barcode Scanner화면의 가로, 세로 설정값 (가로 : landscape, 세로 : portrait) (Android Only)
 * @description    barcode scanner를 실행한다.
 * @example
 * var options = {};
 * options.disableSuccessBeep = false;
 * options.preferFrontCamera = false;
 * options.showTorchButton = false;
 * options.showFlipCameraButton = false;
 * options.torchOn = false;
 * options.formats = "";
 * var callback = function(r){ console.log(r); };
 * $h.barcode.scan(callback,options);
 */
$h.barcode.scan = function (callback, options) {
    try {
        barcodescanner.scan(callback, options);
    } catch (e) {
        console.log(e);
    }
}


/**
 * @namespace      $h.biometric
 * @memberof       $h
 * @author         Inswave Systems
 * @description    바이오인증을 이용한 데이터 저장, 출력, 삭제 등에 API을 제공한다.
 */
if (typeof $h.biometric !== "object") {
    $h.biometric = {};
}

/**
 * @function      $h.biometric.deleteData
 * @description   저장된 biometric data를 삭제한다. (keystore 포함)
 * @param         {Function} callback - 콜백함수
 * @param         {String} callback.statusCode - 코드
 * @param         {String} callback.msg - 메시지
 * @param         {Object} callback.data - 데이터
 * @param         {Object} options - object
 * @param         {Object} options.key - 삭제할 data의 key 값 (String)
 * @example
 * var callback = function(result){ console.log(result); };
 * var options = {'key':'test'};
 * $h.biometric.deleteData(callback,options);
 */
$h.biometric.deleteData = function (callback, options) {
    try {
        wmatrix.plugin.biometric.deleteData(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.biometric.checkData
 * @description   주어진 key값으로 저장된 biometric data가 있는지 확인한다. (keystore 포함)
 * @param         {Function} callback - 콜백함수
 * @param         {String} callback.statusCode - 코드
 * @param         {String} callback.msg - 메시지
 * @param         {Object} callback.data - 데이터
 * @param         {Object} options - object
 * @param         {Object} options.key - 확인할 data의 key (String)
 * @example
 * var callback = function(result){ console.log(result); };
 * var options = {'key':'test'};
 * $h.biometric.checkData(callback,options);
 */
$h.biometric.checkData = function (callback, options) {
    try {
        wmatrix.plugin.biometric.checkData(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.biometric.encryptData
 * @description   주어진 key값과 data로 Bio 정보를 이용하여 암호화하고, keystore에 저장한다.
 * @param         {Function} callback - 콜백함수
 * @param         {String} callback.statusCode - 코드
 * @param         {String} callback.msg - 메시지
 * @param         {Object} callback.data - 데이터
 * @param         {Object} options - object
 * @param         {String} options.key - 암호화 data의 key
 * @param         {String} options.data - 암호화할 Data
 * @param         {String} options.title - Bio 인증 창에 표시해줄 title
 * @param         {String} options.subTitle - Bio 인증 창에 표시해줄 subTitle
 * @param         {String} options.description - Bio 인증 창에 표시해줄 description
 * @param         {String} options.negativeText - Bio 인증 창에 표시될 취소버튼 텍스트
 * @example
 * var callback = function(result){ console.log(result); };
 * var options = {'key' : 'test', 'data' : '1!2@3#4$5%', 'title' : 'testDialog', 'subTitle' : '바이오인증', 'description' : '생체인증을 해주세요.', 'negativeText' : '취소'};
 * $h.biometric.encryptData(callback,options);
 */
$h.biometric.encryptData = function (callback, options) {
    try {
        wmatrix.plugin.biometric.encryptData(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.biometric.decryptData
 * @description   주어진 key값으로 저장된 data를 복호화 하여 전달한다.
 * @param         {Function} callback - 콜백함수
 * @param         {String} callback.statusCode - 코드
 * @param         {String} callback.msg - 메시지
 * @param         {Object} callback.data - 데이터
 * @param         {Object} options - object
 * @param         {String} options.key - 복호화할 data의 key
 * @param         {String} options.title - Bio 인증 창에 표시해줄 title
 * @param         {String} options.subTitle - Bio 인증 창에 표시해줄 subTitle
 * @param         {String} options.description - Bio 인증 창에 표시해줄 description
 * @param         {String} options.negativeText - Bio 인증 창에 표시될 취소버튼 텍스트
 * @example
 * var callback = function(result){ console.log(result); };
 * var options = {'key' : 'test','title' : 'testDialog', 'subTitle' : '바이오인증', 'description' : '생체인증을 해주세요.', 'negativeText' : '취소'};
 * $h.biometric.decryptData(callback,options);
 */
$h.biometric.decryptData = function (callback, options) {
    try {
        wmatrix.plugin.biometric.decryptData(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @namespace       $h.camera
 * @memberof        $h
 * @author          Inswave Systems
 * @description     사진촬영 및 갤러리(포토라이브러리) API를 제공한다.
 * @property        {Object} DestinationType - 사진촬영후 반환타입 {DATA_URL:0,ENCRYPT_DATA_URL:3,FILE_URI:1,NATIVE_URI:2}
 * @property        {Object} Direction - 카메라방향 {BACK:0,FRONT:1}
 * @property        {Object} EncodingType - 파일타입 {JPEG:0, PNG:1}
 * @property        {Object} MediaType - 촬영타입 {PICTURE:0,VIDEO:1,ALLMEDIA:2}
 * @property        {Object} PictureSourceType - 사진소스타입 {CAMERA:1,PHOTOLIBRARY:0,SAVEDPHOTOALBUM:2}
 * @property        {Object} PopoverArrowDirection - iOS popover 카메라 모드 사용시 카메라 위치 {ARROW_UP:1,ARROW_DOWN:2,ARROW_LEFT:4,ARROW_RIGHT:8,ARROW_ANY:15}
 */
if (typeof $h.camera !== "object") {
    $h.camera = {};
}

/**
 * @function        $h.camera.capturePhoto
 * @description     사진을 촬영하여 저장하고 사진경로나 base64string을 콜백함수에 인자로 리턴한다.
 * @param         {Function} callback - 콜백함수
 * @param         {String} callback.statusCode - 코드
 * @param         {String} callback.msg - 메시지
 * @param         {Object} callback.data - 데이터
 * @param         {Object} options - camera option
 * @param         {Int} options.quality - 저장될이미지에 퀄리티값을 지정 default값은 50 이며 최대는 100이며 100을 사용하면 해상도손실이 없음.
 * @param         {Int} options.destinationType - result callback 함수에 리턴되는 타입 ($h.camera.DestinationType.DATA_URL,$h.camera.DestinationType.FILE_URI)
 * @param         {Int} options.sourceType - 사진소스 선택 ($h.camera.PictureSourceType.PHOTOLIBRARY,$h.camera.PictureSourceType.CAMERA)
 * @param         {Bool} options.allowEdit - 사진촬영후 보정유무 (true,false)
 * @param         {Int} options.encodingType - 리턴되는 이미지타입 ($h.camera.EncodingType.JPG,$h.camera.EncodingType.PNG)
 * @param         {Int} options.targetWidth - 이미지에 가로크기 설정 (pixel), targetHeight와 같이사용
 * @param         {Int} options.targetHeight - 이미지에 세로크기 설정 (pixel), targetWidth와 같이사용
 * @param         {Int} options.mediaType - 촬영타입 ($h.camera.MediaType.PICTURE, $h.camera.MediaType.VIDEO, $h.camera.MediaType.ALLMEDIA)
 * @param         {Bool} options.correctOrientation - 장비방향에 맞게 이미지회전유무 (true,false)
 * @param         {Bool} options.saveToPhotoAlbum - 앨범에 저장유무 (true,false)
 * @param         {Int} options.cameraDirection - 카메라 방향 ($h.camera.Direction.BACK,$h.camera.Direction.FRONT)
 * @param         {Bool} options.popoverOptions - 카메라가 Popover형태로 동작하게 설정(iOS only) (true,false)
 * @example
 * var callback = function(path){ console.log(path); };
 * var options = {"quality":100,"sourceType":$h.camera.PictureSourceType.CAMERA,"allowEdit":false,"encodingType":$h.camera.EncodingType.JPEG};
 * $h.camera.capturePhoto(callback,options);
 */
$h.camera.capturePhoto = function (callback, options) {
    try {
        if (typeof navigator.camera === "object") {
            navigator.camera.getPicture(callback, options);
        } else {
            console.log("Not found Camera Plugin");
        }
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function        $h.camera.cleanup
 * @description     tmp 폴더에 저장된 사진파일을 삭제한다.
 * @param         {Function} callback - 콜백함수
 * @param         {String} callback.statusCode - 코드
 * @param         {String} callback.msg - 메시지
 * @param         {Object} callback.data - 데이터
 * @example
 * var callback = function(){};
 * $h.camera.cleanup(callback);
 */
$h.camera.cleanup = function (callback) {
    try {
        if (typeof navigator.camera === "object") {
            navigator.camera.cleanup(callback);
        } else {
            console.log("Not found Camera Plugin");
        }
    } catch (e) {
        console.log(e);
    }
}

document.addEventListener("wmatrixready", function () {
    // $h.camera
    $h.camera.DestinationType = Camera.DestinationType;
    $h.camera.Direction = Camera.Direction;
    $h.camera.EncodingType = Camera.EncodingType;
    $h.camera.MediaType = Camera.MediaType;
    $h.camera.PictureSourceType = Camera.PictureSourceType;
    $h.camera.PopoverArrowDirection = Camera.PopoverArrowDirection;
}, false);

/**
 * @namespace      $h.contents
 * @memberof       $h
 * @author         Inswave Systems
 * @description    Content관련 API를 제공하는 플러그인으로 image picker, file picker, fileDownload 기능을 제공한다.
 */
if (typeof $h.contents !== "object") {
    $h.contents = {};
}

/**
 * @function      $h.contents.filePicker
 * @description   파일선택창을 띄운다.
 * @param         {Function} callback - 콜백함수
 * @param         {String} callback.statusCode - 코드
 * @param         {String} callback.msg - 메시지
 * @param         {Object} callback.data - 데이터
 * @param         {String[]} callback.data.fileUri - 파일경로("filePath" or {Array} ["filepath1","filpath2",...])
 * @param         {Object} options - object
 * @param         {Bool} options.multiselect - 여러 파일 선택 가능 여부 (true 여러개 파일 선택)
 * @param         {String} options.extension - 허용된 확장자
 * @param         {String} options.start - sdcard 내 시작 경로
 * @param         {Int} options.maxcount - 선택 가능한 파일 수
 * @example
 * var callback = function(result){ //filepath array param console.log(result); };
 * var opt = {};
 * opt.multiselect = true;
 * opt.extension = "pdf,docx,jpg,png,pptx,xlsx,zip"; // 허용된 확장자
 * opt.start = "" //default : document
 * opt.maxcount = 2;
 * $h.contents.filePicker(callback,options);
 */
$h.contents.filePicker = function (callback, options) {
    try {
        wmatrix.plugin.contents.filePicker(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.contents.imagePicker
 * @description   이미지선택창을 띄운다.
 *
 * @param         {Function} callback - 콜백함수
 * @param         {String} callback.statusCode - 코드
 * @param         {String} callback.msg - 메시지
 * @param         {Object} callback.data - 데이터
 * @param         {String[]} callback.data.image - 이미지경로 ("imgPath" or {Array} ["imgPath1","imgPath2",...])
 * @param         {Object} options - object
 * @param         {Bool} options.multiselect - 여러 파일 선택 가능 여부 (true 여러개 파일 선택)
 * @param         {Int} options.maxcount - 선택 가능한 파일 수
 * @param         {Bool} options.camera - 카메라 사용 여부 (카메라 플러그인 이용)
 * @param         {Object} options.cameraoption - 카메라 플러그인 옵션 참고
 * @param         {Int} options.type - 반환타입 (0: base64 String (default), 1 : file URL String)
 * @param         {Int} options.galleryFolder - 갤러리폴더 (0: DCIM, 1: PICTURES, 2: DOWNLOADS) (Andorid Only)
 * @example
 * var callback = function(result){ //filepath array param console.log(result); };
 * var opt = {};
 * opt.multiselect = true;
 * opt.maxcount = 2;
 * opt.camera = false;
 * opt.cameraoption = {};
 * opt.type = 0
 * opt.galleryFolder = 0 (0: DCIM, 1: PICTURES, 2: DOWNLOADS)
 * $h.contents.imagePicker(callback,options);
 */
$h.contents.imagePicker = function (callback, options) {
    try {
        wmatrix.plugin.contents.imagePicker(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.contents.fileDownload
 * @description   url에 파일을 다운로드한다.
 * @param         {Function} callback - 콜백함수
 * @param         {String} callback.statusCode - 코드
 * @param         {String} callback.msg - 메시지
 * @param         {Object} callback.data - 데이터
 * @param         {Object} options - object
 * @param         {String} options.url = Download url
 * @param         {Bool} options.progress = 다운로드 진행상황을 상단 Notification bar에 표시 (true or false)
 * @param         {Bool} options.open = 다운로드가 완료되면 해당 파일을 open할지 여부 (true or false)
 * @param         {Bool} options.notify = 다운로드가 완료되면 toast로 다운로드 완료 여부를 알려줄지 여부 (true or false)
 * @param         {String} options.location = 다운로드가 될 위치 지정 (default : Download)
 * @param         {String} options.requestType = 다운로드 request Type (get or post)
 * @param         {String} options.fileName = 다운로드 후 저장될 파일 이름 (post의 경우 필수)
 * @example
 * var callback = function(result){ console.log(result); };
 * var options = {"url":"http://localhost:8080/download/test.xlsx","progress":"true","open":"true","notify":"true", "location":"Download", "requestType" : "get", "fileName" : "test.xlsx"}
 * $h.contents.fileDownload(callback,options);
 */
$h.contents.fileDownload = function (callback, options) {
    try {
        wmatrix.plugin.contents.fileDownload(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @namespace      $h.device
 * @memberof       $h
 * @author         Inswave Systems
 * @description    디바이스에 모델, 플랫폼, OS버전 등에 데이터를 반환하는 API제공한다.
 */
if (typeof $h.device !== "object") {
    $h.device = {};
}

/**
 * @function       $h.device.getDeviceInfo
 * @description    device plugin을 통해서 device 데이터를 리턴한다.
 * @return         {Object} device - device 정보객체
 * @example
 * var deviceInfo = $h.device.getDeviceInfo();
 * console.log("model : "+deviceInfo.model);
 * console.log("platform : "+deviceInfo.platform);
 * console.log("uuid : "+deviceInfo.uuid);
 * console.log("version : "+deviceInfo.version);
 * console.log("manufacturer : "+deviceInfo.manufacturer);
 * console.log("isVirtual : "+deviceInfo.isVirtual);
 * console.log("serial : "+deviceInfo.serial);
 * consoel.log("type: "+deviceInfo.type);
 */
$h.device.getDeviceInfo = function () {
    if (typeof window.device === "object") {
        return window.device;
    }
}

/**
 * @namespace      $h.geolocation
 * @memberof       $h
 * @author         Inswave Systems
 * @description    위도,경도 등에 현재 위치정보를 반환하거나 일정간격으로 위치정보를 반환하는 API를 제공한다.
 */
if (typeof $h.geolocation !== "object") {
    $h.geolocation = {};
}

/**
 * @function       $h.geolocation.getCurrentPosition
 * @description    geolocation 플러그인을 통해서 현재 위치에 위도,경도 등을 가져온다.
 * @param         {Function} callback - 콜백함수
 * @param         {Int} callback.timestamp - 타임스탬프
 * @param         {Int} callback.velocity - 속도
 * @param         {Int} callback.altitudeAccuracy - 고도정확도
 * @param         {Int} callback.accuracy - 정확도
 * @param         {Int} callback.heading - 헤딩
 * @param         {Int} callback.altitude - 고도
 * @param         {Int} callback.latitude - 위도
 * @param         {Int} callback.longitude - 경도
 * @example
 * var callback = function(position){console.log("lat : "+position.coords.latitude+", long : "+position.coords.longitude);};
 * $h.geolocation.getCurrentPosition(callback);
 */
$h.geolocation.getCurrentPosition = function (callback, options) {
    try {
        if (typeof navigator.geolocation === "object") {
            if (typeof options === "object") {
                navigator.geolocation.getCurrentPosition(callback, options);
            } else {
                navigator.geolocation.getCurrentPosition(callback);
            }
        } else {
            console.log("Not Found Geolocation Plugin");
        }
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function       $h.geolocation.watchPosition
 * @description    geolocation 플러그인을 통해서 위치가변경될때 마다 callback함수를 통해서 위치에 위도,경도 전달
 * @param         {Function} callback - 콜백함수
 * @param         {Int} callback.timestamp - 타임스탬프
 * @param         {Int} callback.velocity - 속도
 * @param         {Int} callback.altitudeAccuracy - 고도정확도
 * @param         {Int} callback.accuracy - 정확도
 * @param         {Int} callback.heading - 
 * @param         {Int} callback.altitude - 고도
 * @param         {Int} callback.latitude - 위도
 * @param         {Int} callback.longitude - 경도
 * @param         {Obejct} options - options (optional)
 * @param         {Int} options.maximumAge - 위치정보 캐싱 유지 시간
 * @param         {Int} options.timeout - 타임아웃시간
 * @param         {Int} options.enableHighAccuracy - 배터리소모하여 정확도 높임 (true 설정 시 기기에 GPS 모듈이 있어야 함).
 * @return        {String} watchID - watchID
 * @example
 * var watchId = "";
 * var callback = function(position){
 *   if (position != null && position.coords != null) {
 *        var lat = position.coords.latitude;
 *        var long = position.coords.longitude;
 *
 *        console.log("watchPositionID:" + watchID + " lat : " + lat + ", long : " + long);
 *    }
 * };
 * var options = { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };
 * watchId = $h.geolocation.watchPosition(callback,options);
 */
$h.geolocation.watchPosition = function (callback, options) {
    try {
        var watchID = null;
        if (typeof navigator.geolocation === "object") {
            if (typeof options === "object") {
                watchID = navigator.geolocation.watchPosition(callback, options);
            } else {
                watchID = navigator.geolocation.watchPosition(callback);
            }
            return watchID;
        } else {
            console.log("Not Found Geolocation Plugin");
        }
        return null;
    } catch (e) {
        console.log(e);
        return null;
    }
}

/**
 * @function       $h.geolocation.clearWatch
 * @description    geolocation 플러그인을 통해서 붙인 watchPosition 이벤트를 제거할때 사용
 * @param          {String} watchID - watchID
 * @example
 * var callback = function(pos){console.log("lat : "+pos.coord.latitude + "long : "+pos.coord.longitude)};
 * var watchID = $h.geolocation.watchPosition(callback);
 * $h.geolocation.clearWatch(watchID);
 */
$h.geolocation.clearWatch = function (watchID) {
    try {
        if (typeof navigator.geolocation === "object") {
            if (typeof watchID === "string") {
                navigator.geolocation.clearWatch(watchID);
            } else {
                console.log("watchID is string");
            }
        } else {
            console.log("Not Found Geolocation Plugin");
        }
    } catch (e) {
        console.log(e);
    }
}


/**
 * @namespace      $h.inappbrowser
 * @memberof       $h
 * @author         Inswave Systems
 * @description    webpage를 별도에 webview로 호출하는 API를 제공한다.
 */
if (typeof $h.inappbrowser !== "object") {
    $h.inappbrowser = {};
}

/**
 * @function       $h.inappbrowser.open
 * @description    inappbrowser 플러그인을 통해서 별도 웹뷰를 붙여서 화면을 띄우거나 모바일브라우저를 호출한다.
 * @param          {String} URL - 화면URL
 * @param          {String} type - "_blank": 웹뷰 , "_system": 모바일브라우저
 * @param          {String} option - 옵션 예) "locoation=yes"
 * @example
 * $h.inappbrowser.open("https://www.inswave.com","_system");
 */
$h.inappbrowser.open = function (url,type,option) {
    var iab = null;
    try {
        if (typeof wmatrix.plugin.InAppBrowser === "object") {
            iab = wmatrix.plugin.InAppBrowser.open(url, type, option);
        }
        return iab;
    } catch (e) {
        console.log(e);
        return iab;
    }
}


/**
 * @namespace      $h.license
 * @memberof       $h
 * @author         Inswave Systems
 * @description    open source license를 출력하는 API를 제공한다.
 */
if (typeof $h.license !== "object") {
    $h.license = {};
}

/**
 * @function      $h.license.showView
 * @description   wmatrix에서 사용된 open source license를 출력한다. license파일에 내용을 추가하여 출력이 가능하다.
 * @param         {Function} callback - 콜백함수
 * @param         {String} callback.statusCode - 코드
 * @param         {String} callback.msg - 메시지
 * @param         {Object} callback.data - 데이터
 * @example
 * var callback = function(result){ console.log(result); };
 * $h.license.showView(callback);
 */
$h.license.showView = function (callback) {
    try {
        wmatrix.plugin.license.showView(callback);
    } catch (e) {
        console.log(e);
    }
}



/**
 * @namespace      $h.misc
 * @memberof       $h
 * @author         Inswave Systems
 * @description    여러가지 잡다한 기능들을 모아놓은 플러그인으로 브라우저열기, 전화, 주소록, SMS 같은 기능들을 제공한다.
 */
if (typeof $h.misc !== "object") {
    $h.misc = {};
}

/**
 * @function      $h.misc.sendCall
 * @description   전화를 건다.
 * @param         {Function} callback - 콜백함수
 * @param         {String} callback.statusCode - 코드
 * @param         {String} callback.msg - 메시지
 * @param         {Object} callback.data - 데이터
 * @param         {Object} options - object
 * @param         {String} options.number - 전화번호
 * @example
 * var callback = function(result){ console.log(result); };
 * var options = {"number":"01011112222"};
 * $h.misc.sendCall(callback,options);
 */
$h.misc.sendCall = function (callback, options) {
    try {
        wmatrix.plugin.misc.sendCall(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.misc.sendSMS
 * @description   문자를 보낸다.
 * @param         {Function} callback - 콜백함수
 * @param         {String} callback.statusCode - 코드
 * @param         {String} callback.msg - 메시지
 * @param         {Object} callback.data - 데이터
 * @param         {Object} options - object
 * @param         {String} options.number - 전화번호
 * @param         {String} options.message - 메세지
 * @example
 * var callback = function(result){ console.log(result); };
 * var options = {"number":"01011112222", "message":"sample message"};
 * $h.misc.sendSMS(callback,options);
 */
$h.misc.sendSMS = function (callback, options) {
    try {
        wmatrix.plugin.misc.sendSMS(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.misc.getContacts
 * @description   주소록에 접근하여 선택된 전화번호를 반환한다.
 * @param         {Function} callback - 콜백함수
 * @param         {String} callback.statusCode - 코드
 * @param         {String} callback.msg - 메시지
 * @param         {Object} callback.data - 데이터
 * @param         {String} callback.data.name - 이름
 * @param         {String} callback.data.phoneNumber - 전화번호
 * @example
 * var callback = function(result){ console.log(result); };
 * $h.misc.getContacts(callback);
 */
$h.misc.getContacts = function (callback) {
    try {
        wmatrix.plugin.misc.getContacts(callback);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.misc.openBrowser
 * @description   외부 브라우저를 호출한다.
 * @param         {Function} callback - 콜백함수
 * @param         {String} callback.statusCode - 코드
 * @param         {String} callback.msg - 메시지
 * @param         {Object} callback.data - 데이터
 * @param         {Object} options - object
 * @param         {String} options.url - 호출url
 * @example
 * var callback = function(result){ console.log(result); };
 * var options = {"url":"http://www.inswave.com"};
 * $h.misc.openBrowser(callback,options);
 */
$h.misc.openBrowser = function (callback, options) {
    try {
        wmatrix.plugin.misc.openBrowser(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.misc.settingStatus
 * @description   현재 setting값을 얻어 온다.
 * @param         {Function} callback - 콜백함수
 * @param         {String} callback.statusCode - 코드
 * @param         {String} callback.msg - 메시지
 * @param         {Object} callback.data - 데이터(type별 메시지)
 * @param         {Object} options - object
 * @param         {String} options.type - 설정값 종류 ("wifi", "data", "gps")
 * @param         {String} options.message - 출력 메세지
 * @param         {Bool} options.open - 권한 요청 여부
 * @example
 * var callback = function(result){ console.log(result); };
 * var options = {"type": "gps", "message" : "GPS가 켜져 있지 않습니다. Setting으로 이동하시겠습니까?", "open" : true};
 * $h.misc.settingStatus(callback,options);
 */
$h.misc.settingStatus = function (callback, options) {
    try {
        wmatrix.plugin.misc.settingStatus(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.misc.startTimer
 * @description   Timer를 start한다. (Android Only)
 * @param         {Function} callback - 콜백함수
 * @param         {String} callback.statusCode - 코드
 * @param         {String} callback.msg - 메시지
 * @param         {Object} callback.data - 데이터
 * @param         {String} callback.data.timerId - 타이머아이디
 * @param         {String} callback.data.timerMode - 타이머모드
 * @param         {Object} options - object
 * @param         {String} options.id - Timer Unique ID
 * @param         {Int} options.period - Timer 주기 1000 = 1초 (Int)
 * @param         {String} options.mode - Timer Mode - once : period만큼 후에 expireFuncation 호출, repeat : period마다 한번씩 expireFunction 호출
 * @param         {String} options.expireFunction - timer 시간이 되었을때 호출되는 javascript 함수
 * @example
 * var callback = function(result){ console.log(result); };
 * var options = {'id':'testTimer', 'period' : 2000, 'mode' : 'once', 'expireFunction' : 'console.log("expire!")'};
 * $h.misc.startTimer(callback,options);
 */
$h.misc.startTimer = function (callback, options) {
    try {
        wmatrix.plugin.misc.startTimer(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.misc.stopTimer
 * @description   주어진 ID 값의 Timer를 stop한다. (Android Only)
 * @param         {Function} callback - 콜백함수
 * @param         {String} callback.statusCode - 코드
 * @param         {String} callback.msg - 메시지
 * @param         {Object} callback.data - 데이터
 * @param         {String} callback.data.timerId - 타이머아이디
 * @param         {Object} options - object
 * @param         {String} options.id - Timer Unique ID
 * @example
 * var callback = function(result){ console.log(result); };
 * var options = {'id':'testTimer'};
 * $h.misc.stopTimer(callback,options);
 */
$h.misc.stopTimer = function (callback, options) {
    try {
        wmatrix.plugin.misc.stopTimer(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.misc.stopTimerAll
 * @description   현재 실행되고 있는 모든 Timer를 stop 한다. (Android Only)
 * @param         {Function} callback - 콜백함수
 * @param         {String} callback.statusCode - 코드
 * @param         {String} callback.msg - 메시지
 * @param         {Object} callback.data - 데이터
 * @example
 * var callback = function(result){ console.log(result); };
 * $h.misc.stopTimerAll(callback);
 */
$h.misc.stopTimerAll = function (callback) {
    try {
        wmatrix.plugin.misc.stopTimerAll(callback);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.misc.networkChangeListener
 * @description   Network 상태가 변경 되었을때 Event를 Web에 전달 한다.
 * @param         {Function} listener - 이벤트발생시 실행할 함수
 * @example
 * var listener = function(e){ console.log(e); };
 * $h.misc.networkChangeListener(listener);
 */
$h.misc.networkChangeListener = function (listener) {
    try {
        document.addEventListener('onNetworkChanged', listener, false);
    } catch (e) {
        console.log(e);
    }
}

/**
 * function      $h.misc.onNetworkChanged
 * description   Network 상태가 변경 되었을때 이벤트를 발생한다. (App에서 호출)
 */
$h.misc.onNetworkChanged = function (data) {
    var event = new Event('onNetworkChanged');
    event.data = data
    document.dispatchEvent(event);
}

/**
 * @function      $h.misc.getServerIp
 * @description   현재 설정된 Server Ip 반환 (iOS Only)
 * @param         {Function} callback - 콜백함수
 * @param         {String} callback.statusCode - 코드
 * @param         {String} callback.msg - 메시지
 * @param         {Object} callback.data - 데이터
 * @param         {Object} callback.data.ip - 현재 접속한 서버주소
 * @example
 * var callback = function(result){ console.log(result); };
 * $h.misc.getServerIp(callback);
 */
$h.misc.getServerIp = function (callback) {
    try {
        wmatrix.plugin.misc.getServerIp(callback);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @namespace      $h.network
 * @memberof       $h
 * @author         Inswave Systems
 * @description    network 변화를 감지하거나 현재 네트워크 접속상태를 확인하는 API를 제공한다.
 */
if (typeof $h.network !== "object") {
    $h.network = {};
}

/**
 * @function       $h.network.checkNetwork
 * @description    network를 체크하여 true,false를 반환
 * @example
 * $h.network.checkNetwork();
 */
$h.network.checkNetwork = function () {
    try {
        if (navigator.connection.type == "none") {
            return false;
        }
        return true;
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function       $h.network.addEventListener
 * @description    네트워크타입 변경시 event를 감지하는 listener를 추가한다.
 * @param          {String} type - online, offline 두가지타입
 * @param          {Function} callback - event발생시 실행시킬 함수
 * @example
 * $h.network.addEventListener(type,callback);
 */
$h.network.addEventListener = function (type, callback) {
    try {
        document.addEventListener(type, callback, false);
    } catch (e) {
        console.log(e);
    }
}


/**
 * @namespace      $h.paint
 * @memberof       $h
 * @author         Inswave Systems
 * @description    웹뷰 위에 레이어를 띄워 펜기능을 제공한다.
 */
if(typeof $h.paint !== "object"){
    $h.paint = {};
}

/**
 * @function      $h.paint.openPaint
 * @description   메모가 가능한 그림판을 출력한다.
 * @param         {Function} callback - 콜백함수
 * @param         {String} callback.statusCode - 코드
 * @param         {String} callback.msg - 메시지
 * @param         {Object} callback.data - 데이터
 * @param         {Object} options - object
 * @param         {String[]} options.color - 펜 색상값 배열
 * @example
 * var callback = function(result){ console.log((result)); };
 * var options = {'color' : ['#000000','#FF0000','#00FF00','#0000FF']};
 * $h.paint.openPaint(callback, options);
 */
$h.paint.openPaint = function(callback, opt) {
    try{
        wmatrix.plugin.paint.openPaint(callback, opt);
    } catch(e){
        console.log(e);
    }
}


/**
 * @namespace      $h.screenRecorder
 * @memberof       $h
 * @author         Inswave Systems
 * @description    디바이스(폰,테블릿)에 화면 녹화/녹음에 필요한 녹화, 저장, 취소, 일시정지 등에 API를 제공한다.
 */
if (typeof $h.screenRecorder !== "object") {
    $h.screenRecorder = {};
}


/**
 * @function      $h.screenRecorder.recordScreen
 * @description   option의 설정에 따라 화면 녹화를 시작한다.
 * @param         {Function} callback - 콜백함수
 * @param         {String} callback.statusCode - 코드
 * @param         {String} callback.msg - 메시지
 * @param         {Object} callback.data - 데이터
 * @param         {Object} options - object
 * @param         {String} options.fileName - 파일 이름
 * @param         {String} options.audio - 오디오 녹음 여부(true or false) Default: false
 * @param         {String} options.isInternal - 녹음 파일을 내부/외부 저장소중 저장할 곳을 설정 (true or false) Default: true / 내부 저장소 (Android only)
 * @param         {String} options.saveToGallery - 녹음 파일 앨범에 저장유무 (true,false)
 * @example
 * var callback = function(result){ console.log(result); };
 * var options = {'fileName':'screenRecorderExample', 'isInternal':'true', 'audio':'false', 'saveToGallery':'true'};
 * $h.screenRecorder.recordScreen(callback,options);
 */
$h.screenRecorder.recordScreen = function (callback, options) {
    try {
        wmatrix.plugin.screenRecorder.recordScreen(callback, options);
    } catch (e) {
        console.log(e);
    }
}


/**
 * @function      $h.screenRecorder.recordFinish
 * @description   화면 녹화를 종료 및 저장한다.
 * @param         {Function} callback - 콜백함수
 * @param         {String} callback.statusCode - 코드
 * @param         {String} callback.msg - 메시지
 * @param         {Object} callback.data - 데이터
 * @param         {Object} callback.data.filePath - 파일경로
 * @param         {Object} callback.data.recordingTime - 녹화시간
 * @example
 * var callback = function(result){ console.log(result); };
 * $h.screenRecorder.recordFinish(callback);
 */
$h.screenRecorder.recordFinish = function (callback) {
    try {
        wmatrix.plugin.screenRecorder.recordFinish(callback);
    } catch (e) {
        console.log(e);
    }
}


/**
* @function      $h.screenRecorder.recordCancel
* @description   화면 녹화를 취소하고 파일은 생성하지 않는다.
* @param         {Function} callback - 콜백함수
* @param         {String} callback.statusCode - 코드
* @param         {String} callback.msg - 메시지
* @param         {Object} callback.data - 데이터
* @example
* var callback = function(result){ console.log(result); };
* $h.screenRecorder.recordCancel(callback);
*/
$h.screenRecorder.recordCancel = function (callback) {
    try {
        wmatrix.plugin.screenRecorder.recordCancel(callback)
    } catch (e) {
        console.log(e)
    }
}


/**
* @function      $h.screenRecorder.recordPause
* @description   화면 녹화를 일시정지한다.
* @param         {Function} callback - 콜백함수
* @param         {String} callback.statusCode - 코드
* @param         {String} callback.msg - 메시지
* @param         {Object} callback.data - 데이터
* @example
* var callback = function(result){ console.log(result); };
* $h.screenRecorder.recordPause(callback);
*/
$h.screenRecorder.recordPause = function (callback) {
    try {
        wmatrix.plugin.screenRecorder.recordPause(callback)
    } catch (e) {
        console.log(e)
    }
}

/**
* @function      $h.screenRecorder.recordResume
* @description   일시정지된 녹화를 다시 시작한다.
* @param         {Function} callback - 콜백함수
* @param         {String} callback.statusCode - 코드
* @param         {String} callback.msg - 메시지
* @param         {Object} callback.data - 데이터
* @example
* var callback = function(result){ console.log(result); };
* $h.screenRecorder.recordResume(callback);
*/
$h.screenRecorder.recordResume = function (callback) {
    try {
        wmatrix.plugin.screenRecorder.recordResume(callback)
    } catch (e) {
        console.log(e)
    }
}

/**
* @function      $h.screenRecorder.recordStatus
* @description   녹화가 진행 중인지 아닌지 상태를 나타낸다.
* @param         {Function} callback - 콜백함수
* @param         {String} callback.statusCode - 코드
* @param         {String} callback.msg - 메시지
* @param         {Int} callback.data - 데이터 (0:record, 1:stop, 2:pause)
* @example
* var callback = function(status){ console.log(status); };
* $h.screenRecorder.recordStatus(callback);
*/
$h.screenRecorder.recordStatus = function (callback) {
    try {
        wmatrix.plugin.screenRecorder.recordStatus(callback)
    } catch (e) {
        console.log(e)
    }
}

/**
* @function      $h.screenRecorder.deleteFile
* @description   녹화 파일을 삭제한다.
* @param         {Function} callback - 콜백함수
* @param         {String} callback.statusCode - 코드
* @param         {String} callback.msg - 메시지
* @param         {Object} callback.data - 데이터
* @param         {Object} options - object
* @param         {String[]} options.deletefilePath - 파일경로
* @example
* var callback = function(result){ console.log(result); };
* var options = {'deleteFilePath':['$filePath','$filePath','$filePath']}
* $h.screenRecorder.deleteFile(callback,options);
*/
$h.screenRecorder.deleteFile = function (callback, options) {
    try {
        wmatrix.plugin.screenRecorder.deleteFile(callback, options)
    } catch (e) {
        console.log(e)
    }
}

/**
* @function      $h.screenRecorder.deleteAllFile
* @description   녹화된 파일 및 폴더를 전부 삭제한다.
* @param         {Function} callback - 콜백함수
* @param         {String} callback.statusCode - 코드
* @param         {String} callback.msg - 메시지
* @param         {Object} callback.data - 데이터
* @param         {Object} options - object
* @param         {Bool} options.isInternal - 삭제할 파일 저장소 중 내부/외부 저장소 (Default: true) (Android only)
* @example
* var callback = function(result){ console.log(result); };
* var options = {'isInternal':'true'};
* $h.screenRecorder.deleteAllFile(callback,options);
*/
$h.screenRecorder.deleteAllFile = function (callback, options) {
    try {
        wmatrix.plugin.screenRecorder.deleteAllFile(callback, options)
    } catch (e) {
        console.log(e)
    }
}


/**
 * @namespace      $h.view
 * @memberof       $h
 * @author         Inswave Systems
 * @description    toast, snacker, notification 같은 네이티브 뷰를 호출하는 API를 제공한다.
 */
if (typeof $h.view !== "object") {
    $h.view = {};
}

/**
* @function      $h.view.toast
* @description   message 를 팝업(toast)으로 보여준다.
*
* @param         {Function} callback - 콜백함수
* @param         {String} callback.statusCode - 코드
* @param         {String} callback.msg - 메시지
* @param         {Object} callback.data - 데이터
* @param         {Object} options - object
* @param         {String} options.message - 팝업 (toast)로 보여줄 메세지
* @param         {Int}    options.time - 0: Short Time, 1: Long Time. (default: 0)
* @example
* var callback = function(result){ console.log(result); };
* var opt = {"message": "Showing toast message.", "time" : 0};
* $h.view.toast(callback, opt);
*/
$h.view.toast = function (callback, options) {
    try {
        wmatrix.plugin.view.toast(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
* @function      $h.view.snackBar
* @description   message 를 팝업(SnackBar)으로 보여준다.
* @param         {Function} callback - 콜백함수
* @param         {String} callback.statusCode - 코드
* @param         {String} callback.msg - 메시지
* @param         {Object} callback.data - 데이터
* @param         {Object} options - object
* @param         {String} options.message - 팝업 (SnackBar)로 보여줄 메세지.
* @param         {Int}    options.time - 0: Short Time, 1: Long Time. (default: 0 - action 이 있는 경우 해당 옵션은 무시한다.)
* @param         {Object} options.action - object
* @param         {Object} options.action.buttonText - 버튼텍스트
* @param         {Object} options.action.onClickEvent - 터치시 실행할 javascript 텍스트
* @param         {String} options.buttonText - SnackBar 상호작용 버튼에 보여질 텍스트.
* @param         {String} options.onClickEvent - 상호작용 버튼 클릭 시 실행 될 javascript.
* @example
* var callback = function(result){ console.log(result); };
* var opt = {"message": "Showing snack message.", "time" : 0, action : { "buttonText" : "앱 종료", "onClickEvent" : "alert('종료');" } };
* $h.view.snackBar(callback, opt);
*/
$h.view.snackBar = function (callback, options) {
    try {
        wmatrix.plugin.view.snackBar(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
* @function      $h.view.notification
* @description   message 를 notification 으로 보여준다.
*
* @param         {Function} callback - 콜백함수
* @param         {String} callback.statusCode - 코드
* @param         {String} callback.msg - 메시지
* @param         {Object} callback.data - 데이터
* @param         {Object} options - object
* @param         {String} options.title - Notification 에 보여줄 Title 문구.
* @param         {String} options.message - Notification 에 보여줄 Message 문구.
* @param         {String} options.icon - Notification 에 보여줄 Icon Image. (Base64 형태의 String 값.) (Android Only) <br/> ldpi: 48x48 px *0.75 <br/> mdpi: 64x64 px *1.00 <br/> hdpi: 96x96 px *1.50 <br/> xhdpi: 128x128 px *2.00 </br> xxhdpi: 192x192 px *3.00
* @param         {String} options.action - 실행 할 javascript.
* @example
* var callback = function(result){ console.log(result); };
* var opt = {"title": "Notification Title", "message": "Showing notification message.", "icon" : "adsfdasfadsf==", action : "alert('종료');" };
* $h.view.notification(callback, opt);
*/
$h.view.notification = function (callback, options) {
    try {
        wmatrix.plugin.view.notification(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * namespace      $h.websquare
 * memberof       $h
 * version        1.1.0
 * author         Inswave Systems
 * description    WebSquare 플러그인을 추가하면 웹스퀘어에서 exceldownload함수 호출시 앱에 엑셀 저장기능을 제공한다.
 */
if (typeof $h.websquare !== "object") {
    $h.websquare = {};
}

$h.websquare.excelDownload = function (success, fail, option) {
    try {
        wmatrix.plugin.websquare.excelDownload(success, fail, option);
    } catch (e) {
        console.log(e);
    }
}

/**
 * namespace      $h.inAppUpdate
 * memberof       $h
 * version        1.0.0
 * author         Inswave Systems
 * description    inappupdate 기능을 플러그인함수로 제공한다.
 */
if (typeof $h.inAppUpdate !== "object") {
    $h.inAppUpdate = {};
}

/**
 * function       $h.inAppUpdate.checkOffline
 * description    offline mode로 실행중인지 아닌지 알려준다.
 * example
 * var callback = function(r){ console.log(r); };
 * $h.inAppUpdate.checkOffline(callback);
 */
$h.inAppUpdate.checkOffline = function (callback) {
    wmatrix.exec(callback, "InAppUpdatePlugin", "isOffline", []);
}

/**
 * function       $h.inAppUpdate.checkRefreshUpdate
 * description    Refresh Update대상 파일 확인 후 결과값을 전달 받는다. (RefreshUpdate Policy가 켜져있을때만 동작)
 *
 * param   {Object} options - API parameter.
 * * restart : Refresh Update 확인 시 Resource 변경이 있으면 App을 종료하는 Dialog를 보여줄 지 Flag (Default : false)
 * * restartMessage : restart Dialog에서 보여줄 문구 (비어있으면 Default Message 출력)
 * * progress : Refresh Update 확인 시 Native Progress를 보여줄 지 Flag (Default : false)
 * * progressMessage : progress Dialog에서 보여줄 문구 (비어있으면 Default Message 출력)
 *
 * returns     {String} e - callback status code.
 * *   -1 - Refresh Update 오류
 * *    0 - Refresh Update 확인 결과 Resource가 Local과 Server가 같은 상태
 * *    1 - Refresh Update 확인 결과 Resource가 Local과 Server가 다르며, Update를 완료한 상태
 *
 * example
 * var callback = function(e){console.log(e);};
 * var options = {"progress" : true, "restart":true};
 * $h.inAppUpdate.checkRefreshUpdate(callback, options);
 */
$h.inAppUpdate.checkRefreshUpdate = function (callback, options) {
    wmatrix.exec(callback, "InAppUpdatePlugin", "checkRefreshUpdate", options);
}

/**
 * function       $h.inAppUpdate.showServerSelect
 * description    Server Select 화면을 보여준다.
 *                 서버를 선택하면 WmatrixSdk.init() 부터 다시 시작할 수 있도록 Native 에서 처리가 필요하다.
 * example
 * var callback = function(e){console.log(e);};
 * $h.inAppUpdate.showServerSelect(callback);
 */
$h.inAppUpdate.showServerSelect = function (callback) {
    wmatrix.exec(callback, "InAppUpdatePlugin", "showServerSelect", {});
}

/**
 * @namespace      $h.screenprotector
 * @memberof       $h
 * @author         Inswave Systems
 * @description    웹뷰에 스크린샷,화면녹화를 막는다.
 */
if (typeof $h.screenprotector !== "object") {
    $h.screenprotector = {};
}

/**
* @function      $h.screenprotector.start
* @description   screenprotector를 실행한다. Android에 스크린샷,화면녹화기능을 막는다. iOS는 스크린샷,화면녹화시 화면을 덮어 컨텐츠 노출을 막는다.
* @param         {Function} callback - 콜백함수
* @param         {String} callback.statusCode - 코드
* @param         {String} callback.msg - 메시지
* @param         {Object} callback.data - 데이터
* @example
* var callback = function(result){ console.log(result); };
* $h.screenprotector.start(callback);
*/
$h.screenprotector.start = function(callback) {
    try {
        wmatrix.plugin.screenprotector.start(callback);
    } catch(e) {
        console.log(e);
    }
}

/**
* @function      $h.screenprotector.stop
* @description   screenprotector를 중지한다.
* @param         {Function} callback - 콜백함수
* @param         {String} callback.statusCode - 코드
* @param         {String} callback.msg - 메시지
* @param         {Object} callback.data - 데이터
* @example
* var callback = function(result){ console.log(result); };
* $h.screenprotector.stop(callback);
*/
$h.screenprotector.stop = function(callback) {
    try {
        wmatrix.plugin.screenprotector.stop(callback);
    } catch(e) {
        console.log(e);
    }
}

/**
 * @namespace      $h.edgeagent
 * @memberof       $h
 * @author         Inswave Systems
 * @description    EdgeManager와 연계되는 기능을 제공한다.
 */
if (typeof $h.edgeagent !== "object") {
    $h.edgeagent = {};
}

/**
 * @function      $h.edgeagent.userLogIn
 * @description   EdgeManager에 로그인한다.
 * @param         {Function} callback - 콜백함수
 * @param         {String} callback.statusCode - 코드
 * @param         {String} callback.msg - 메시지
 * @param         {Object} callback.data - 데이터
 * @param         {Object} options - object
 * @param         {Object} options.userId - 사용자 ID
 * @param         {Object} options.userName - 사용자 이름
 * @param         {Object} options.departCode - 소속 코드
 * @param         {Object} options.duty - 직위
 * @param         {Object} options.position - 직급
 * @param         {Object} options.email - 사용자 E-Mail
 * @param         {Object} options.phoneNo - 전화번호
 * @example
 * var callback = function(result){ console.log(result); };
 * var params = {"userId" : "10002", "userName" : "USER", "departCode" : "010101", "duty" : "팀장", "position" : "부장", "email" : "example@inswave.com", "phoneNo" : "010-000-0000"};
 * $h.edgeagent.userLogIn(callback,params);
 */
$h.edgeagent.userLogIn = function (callback, options) {
    try {
        wmatrix.plugin.edgeagent.userLogIn(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.edgeagent.userLogOut
 * @description   EdgeManager에 로그아웃한다.
 * @param         {Function} callback - 콜백함수
 * @param         {String} callback.statusCode - 코드
 * @param         {String} callback.msg - 메시지
 * @param         {Object} callback.data - 데이터
 * @param         {Object} options - object
 * @param         {Object} options.userId - 사용자 ID
 * @example
 * var callback = function(result){ console.log(result); };
 * var params = {"userId" : "10002"};
 * $h.edgeagent.userLogOut(callback,params);
 */
$h.edgeagent.userLogOut = function (callback, options) {
    try {
        wmatrix.plugin.edgeagent.userLogOut(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.edgeagent.getNewNotification
 * @description   읽지 않은 공지를 조회한다.
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * @param         {String} callback.statusCode - 코드
 * @param         {String} callback.msg - 메시지
 * @param         {Object} callback.data - 데이터
 * @param         {Object} options - object
 * @param         {Object} options.JsonObj - 공지 조회에 필요한 옵션 Json (사이트마다 정의)
 * @example
 * var callback = function(result){ console.log(result); };
 * var params = {};
 * $h.edgeagent.getNewNotification(callback,params);
 */
$h.edgeagent.getNewNotification = function (callback, options) {
    try {
        wmatrix.plugin.edgeagent.getNewNotification(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.edgeagent.getAllNotification
 * @description   모든 공지를 조회한다.
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * @param         {String} callback.statusCode - 코드
 * @param         {String} callback.msg - 메시지
 * @param         {Object} callback.data - 데이터
 * @param         {Object} options - object
 * @param         {Object} options.JsonObj - 공지 조회에 필요한 옵션 Json (사이트마다 정의)
 * @example
 * var callback = function(result){ console.log(result); };
 * var params = {};
 * $h.edgeagent.getAllNotification(callback,params);
 */
$h.edgeagent.getAllNotification = function (callback, options) {
    try {
        wmatrix.plugin.edgeagent.getAllNotification(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.edgeagent.setNotificationRead
 * @description   전달된 공지 ID들을 읽음 처리한다.
 * @param         {Function} callback - 콜백함수
 * @param         {String}   callback.statusCode - 코드
 * @param         {String}   callback.msg - 메시지
 * @param         {Object[]} callback.data - 데이터
 * @param         {Object}   callback.data.notiId - 읽음 공지 처리할 공지 ID
 * @example
 * var callback = function(result){ console.log(result); };
 * var params = [ { "notiId": 11111 }, { "notiId": 11112}] ;
 * $h.edgeagent.setNotificationRead(callback,params);
 */
$h.edgeagent.setNotificationRead = function (callback, options) {
    try {
        wmatrix.plugin.edgeagent.setNotificationRead(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.edgeagent.onMessageListener
 * @description   공지가 수신되었을때 호출될 함수를 등록한다.
 * @param         {Function} listener - 이벤트발생시 실행할 함수
 * @example
 * var listener = function(e){ console.log(e); };
 * $h.edgeagent.onMessageListener(listener);
 */
$h.edgeagent.onMessageListener = function (listener) {
    try {
        document.addEventListener('onEdgeManagerMessage', listener, false);
    } catch (e) {
        console.log(e);
    }
}

// event      $h.edgeagent.onMessageReceived
// description   EdgeManager Message를 받았을때 Event를 발생시킨다. (App에서 호출)
$h.edgeagent.onMessageReceived = function (data) {
    var event = new Event('onEdgeManagerMessage');
            event.data = data
            document.dispatchEvent(event);
}

/**
 * @namespace      $h.debugging
 * @memberof       $h
 * @author         Inswave Systems
 * @description    디버깅을 편의성을 위한 기능
 */
if (typeof $h.debugging !== "object") {
    $h.debugging = {};
}

/**
 * function       $h.debugging.setWebInspector
 * description    Web Inspector 가능하도록 변경
 * example
 * var callback = function(r){ console.log(r); };
 * $h.debugging.setWebInspector(callback);
 */
$h.debugging.setWebInspector = function (callback) {
    wmatrix.exec(callback, "WMDebuggingPlugin", "setWebInspector", []);
}

/**
 * function       $h.debugging.showFileList
 * description    앱 내부 파일브라우저 실행
 * example
 * var callback = function(r){ console.log(r); };
 * $h.debugging.showFileList(callback);
 */
$h.debugging.showFileList = function (callback) {
    wmatrix.exec(callback, "WMDebuggingPlugin", "showFileList", []);
}
