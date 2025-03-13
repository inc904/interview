# JSBridge 和 webView

## webview

webview 是一个基于 webkit 内核的浏览器环境。 可以解析 DOM 元素，展示 html 页面，执行 js 代码。

## JSBridge

混合开发，需要 原生应用 和 web h5 之间通讯

### 原理

Web 端和 Native 可以类比于 Client/Server 模式，Web 端调用原生接口时就如同 Client 向 Server 端发送一个请求类似，JSB 在此充当类似于 HTTP 协议的角色，实现 JSBridge 主要是两点：

将 Native 端原生接口封装成 JavaScript 接口
将 Web 端 JavaScript 接口封装成原生接口

### 原生应用和 webview 通信

- JavaScript Interface：在原生代码中暴露接口，供前端 JavaScript 调用。

        - Android：使用 addJavascriptInterface。

        - iOS：使用 WKScriptMessageHandler。

- URL Scheme：通过自定义 URL Scheme 触发原生代码。

- PostMessage：在 WebView 和前端页面之间通过 postMessage 传递消息。

        在APP与H5通信中，postMessage的通信原理可以概括为以下几个步骤：

1. 获取目标窗口引用：在 APP 中，通常通过 WebView 组件加载 H5 页面，并获取该 WebView 的引用。在 H5 页面中，可以通过 `window.parent` 或 `window.opener` 等属性获取到 APP 端 Window 对象的引用。
2. 发送消息：使用目标窗口的 postMessage 方法发送消息。postMessage 方法接受两个参数：第一个参数是要传递的数据（通常为字符串或对象），第二个参数是目标窗口的源（origin），用于指定消息可以发送到的窗口。为了安全起见，建议明确指定目标窗口的源。
3. 接收消息：在接收端，通过监听 window 的 message 事件来接收消息。在事件处理函数中，可以通过 event.data 获取到传递的数据，通过 event.origin 获取到发送方的源。
