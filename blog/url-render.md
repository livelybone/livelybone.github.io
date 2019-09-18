# 用户从输入 URL 到看到页面，浏览器做了哪些事情？

## 监听用户输入
浏览器的 UI 线程监听用户的输入

## 查找域名的 IP 地址

### DNS 域名解析
-> 先去本地 hosts 查找有没有对应的 ip

-> 没有的话，再去本地 DNS 服务器中找有没有相应的缓存 ip

-> 没有的话，请求 DNS 根服务器，逐级向下知道找到匹配域名的 ip，得到响应后将域名 ip 信息存入本地 DNS 缓存

> 两种方式：
> 1. 迭代解析
>    A 查询 B，如果 B 找不到，会告诉 A 去 C 找（A 请求 C），迭代下去，直到找到对应 IP 信息
> 1. 递归解析
>    A 查询 B，如果 B 找不到，B 则会去 C 找，递归查找，直到找到对应 IP 信息，返回给 A 

客户端默认发起递归查询

## 客户端向 IP 发起请求
拿到对应 IP 地址之后，发起请求

### 三次握手
标识：
SYN: synchronous
ACK: acknowledgement
FIN: finish
PSH: push
RST: reset
seq: sequence number
ack: acknowledge number

(A: 客户端；B: 服务端)
-> A 向 B 发送（SYN: 1; seq: i） -- 状态（A: SYN_SENT；B: ~）

-> B 收到之后，向 A 发送（SYN: 1; ACK: 1; ack: i + 1; seq: j） -- 状态（A: SYN_SENT；B: SYN_RCVD）

-> A 收到之后，检查 ack 是否等于 i + 1，如果相等，向 B 发送（ACK: 1; seq: j + 1），
B 收到之后检查 seq 是否为 j + 1，检查通过则建立连接 -- 状态（A: ESTABLISHED；B: ESTABLISHED）

解决什么问题：已失效的连接请求。
由于网络问题，客户端发起的连接请求被长时间滞留在某个节点，导致到达服务端时客户端连接就已经被释放，如果这时候没有三次握手，服务端会建立一个没有客户端响应的连接，白白浪费资源

### 四次挥手
(A: 客户端；B: 服务端)
-> A 向 B 发送（FIN: i） -- 状态（A: FIN_WAIT_1；B: ~）

-> B 收到之后，向 A 发送（ack: i + 1） -- 状态（A: FIN_WAIT_2；B: CLOSE_WAIT）

-> B 向 A 发送（FIN: j） -- 状态（A: TIME_WAIT；B: LAST_ACK）

-> A 收到之后，向 B 发送（ACK: 1; ack: j + 1） -- 状态（A: TIME_WAIT；B: CLOSED）

解决什么问题：客户端发起断开连接的时候，服务端仍有数据需要传送给客户端

## 读取响应
拿到响应数据，通过 mime-type 判断用什么方式处理
text/html: 表示需要渲染 HTML 页面，由 network 线程通知 UI 线程完成资源获取并寻找渲染进程
其他 mime-type: 都会交给下载管理器

## 导航结束，页面渲染 
HTML 解析 -> DOM 树 -> （DOM 树 + style => 渲染树） -> 计算布局 -> 绘制
