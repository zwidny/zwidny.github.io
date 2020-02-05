---
layout: markdown
title:  "远程登录"
date:   2020-02-04 00:00:00 +0800
categories: Guide:SSH
---
本文介绍ssh授权到远程服务器的两种形式

## 本地生成key-pair登陆到远程服务器
这种方式适用于一个人对多台服务器的登陆形式， 设置方式如下：  
+ 本地服务器设置

```
  ssh-keygen -t rsa
  chmod 700 ~/.ssh
  chmod 600 ~/.ssh/id_rsa
  ssh-copy-id -i ~/.ssh/id_rsa.pub user@host
```
+ 远程服务器配置

```
 chmod 755 $HOME
 chmod 700 ~/.ssh  
 chmod 600 ~/.ssh/authorized_keys 
 restorecon -Rv ~/.ssh 
```

现在就可以在本地登陆了

## 本地使用远程服务器生成的key-pair登陆
这种方式使用于一台服务器对多个人的登陆形式， 设置如下：

+ 远程服务器

```
  ssh-keygen -t rsa
  chmod 700 ~/.ssh
  chmod 600 ~/.ssh/id_rsa
  ssh-copy-id -i ~/.ssh/id_rsa.pub user@host
```

+ 本地服务器
这里不需要做什么， 只需要将远程服务器的私钥down下来就可以登陆了， 比如： 

```
ssh user@host -i id_rsa
```




