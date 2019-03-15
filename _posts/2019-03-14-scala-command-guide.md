---
layout: markdown
title:  scala-command-guide
date:   2019-03-14 11:49:47 +0800
categories: scala guide command
---


# 常用的命令
## 如何执行mainClass with parameter
```
mvn package exec:java -Dexec.mainClass=com.xxxx.App -Dexec.args="--SCALA_MODE=LIVE"
```
