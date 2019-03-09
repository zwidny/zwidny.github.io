---
layout: markdown
title:  Shadowsock quick deploy
date:   2019-03-08 11:49:47 +0800
categories: quick-start hbase
---


```
sudo apt-get install python-pip git && \
sudo pip install git+https://github.com/shadowsocks/shadowsocks.git@master && \
sudo ssserver -p 10323 -k Vps12345^ -m aes-256-cfb --user nobody -d start
```
