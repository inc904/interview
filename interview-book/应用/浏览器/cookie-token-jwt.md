# Cookie、Session、Token、JWT

1. 认证 Authentication： 验证当前用户的身份
2. 授权 Authorization： 验证当前用户是否有权限访问资源

- cookie、session、token、OAuth

3. 凭证 credentials (身份证)

## cookie

- HTTP 协议是无状态的，即服务器不保存用户状态，每次请求都需要用户重新登录。
- 所以浏览器和服务器之间为了进行会话跟踪（知道是谁在访问我），就必须主动去维护一个状态，这个状态 告知服务端前后两个请求是否来自同一个浏览器。
- 这个状态一半是 cookie 或者 session 去实现

- cookie 是存在客户端本地的一小块数据，他会在浏览器下次向同一服务器再次发起请求的时候被携带并发送到服务器上。

- cookie 是不可跨域的：每个 cookie 都会绑定单一域名，无法在别的域名下使用，一级域名和二级域名之间允许共享使用（靠的是 domain）

- cookie 传输的过程中 放在 请求头的 cookie 字段字段里面
- expires 和 max-ages 设置过期时间
- secure 设置 https、ssl 协议下才生效
- httpOnly 设置为 true，表示 cookie 只能通过 http 协议访问，不能通过 js 脚本访问，防止 xss 攻击
- cookie 的作用域是当前域名下的所有页面，所以如果要设置跨域的 cookie，需要设置 domain 参数，同时设置 path 参数，否则无法设置成功。

## section

- session 存在服务器端
- sessionId 存在 客户端的 cookie 中

- sessionId 是由服务器端生成的一个随机字符串，客户端浏览器每次向服务器端发起请求都会携带这个 sessionId，服务器端根据这个 sessionId 来获取对应的 session 对象，从而获取到用户信息。
- sessionId 是一个字符串，长度是固定的，所以可以设置一个固定的长度，也可以使用随机数生成器生成一个随机的字符串。

cookie 和 session 的区别

- 安全性 cookie 比 session 更安全，因为 cookie 是在客户端存储的，而 session 是在服务器端存储的，所以 cookie 可以通过浏览器的插件来查看和修改，而 session 是在服务器端存储的，所以无法通过浏览器的插件来查看和修改。
- 存储值的类型不同，cookie 还是 session，都是字符串类型，所以 cookie 的值不能存储对象，而 session 的值可以存储对象。

- 有效期不同，cookie 有效期是客户端存储的，而 session 有效期是服务器端存储的，所以 cookie 有效期是相对的，而 session 有效期是相对的。session 的有效期比较短，cookie 可以设置长时间保持（默认登录）
- cookie 的大小限制是 4kb，而 session 的大小限制是服务器内存的大小。

## token

access token 访问资源接口（api） 需要的资源凭证

- token 是一种特殊的 cookie，它存储在客户端的浏览器中，而不是在服务器端。
- 每一次都需要发送请求的时候，都需要携带这个 token
- 放在 http 的 header 里面

### refresh token

- token 过期了，需要刷新 token
- 刷新 token 的时候，需要携带 refresh token
- refresh token 是一个随机字符串，客户端每次请求的时候，都会携带这个 refresh token
- refresh token 未过期，access token 过期了，通过 refresh token 刷新 access token，不需要重新登录，但是 refresh token 过期需要重新登录

### jwt

`json-web-token`
