# npm 直接从 Git 仓库安装 模块/私有模块

npm 是 nodejs 的官方包管理，有成千上万的包，方便了前端模块化开发。

但有些前端库并没有发布到 npm，但有时候项目又需要它。比如公司内部的私有模块，我们可能并不希望将它公布到 npm 源，它的代码只存在于公司私有的 Git 仓库中

> 这时候，拷贝代码的方式显然不够优雅/不够高效，那我们能使用 npm 引入/安装这种前端库吗？

基于这个问题，本文主要介绍如何通过 npm 从 Git 仓库安装模块的方法。

## npm install 命令介绍
```bash
npm install <git remote url>

<git remote url>:
    <protocol>://[<user>[:<password>]@]<hostname>[:<port>][:][/]<path>[#<commit-ish>]

<protocol> 对应协议。支持：git, git+ssh, git+http, git+https, git+file. 

<commit-ish> 安装的分支/commit/tag，默认值是 master.
```

### 对应 protocol 的有效写法
目前亲测：git+ssh, git+https

> git+ssh
>> 注意：这个协议需要对应仓库有你的 ssh-key  <br>
>> 示例: <br>
>> `npm i -D git+ssh://git@github.com/livelybone/vue-select.git` <br>

> git+https
>> 注意：这个协议在非开源/私有仓库中需要加上可登录成功的用户名密码 <br>
>> 示例1： <br>
>> `npm i -D git+https://github.com/livelybone/vue-select.git` <br>
>> 示例1： <br>
>> `npm i -D git+https://[username]:[pwd]@git.yipiaoyun.com/liuzhiping/title-code-scanner.git` <br>

其它协议待验证
