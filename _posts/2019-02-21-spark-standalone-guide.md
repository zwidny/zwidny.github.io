---
layout: markdown
title:  "Spark Standalone Practise Guide"
date:   2019-02-21 09:49:47 +0800
categories: spark guide
---

本文主要的目的是了解spark的安装以及开发流程

## Install Spark

为了方便起见， 本文使用docker。
 
### Step 1. 建立Dockerfile

```dockerfile
FROM ubuntu:18.04

# ###### SSH CONFIG ######
RUN apt-get update && apt-get install --no-install-recommends -y openssh-server
RUN mkdir /var/run/sshd
RUN echo 'root:toor123$' | chpasswd
RUN sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config \
    && sed -i 's/#PubkeyAuthentication yes/PubkeyAuthentication yes/' /etc/ssh/sshd_config \
    && sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd

ENV NOTVISIBLE "in users profile"
RUN echo "export VISIBLE=now" >> /etc/profile

EXPOSE 22
##########################

# ###### JAVA 8 ######
RUN apt-get install --no-install-recommends -y software-properties-common \
    && add-apt-repository -y ppa:webupd8team/java \
    && apt-get update
RUN echo oracle-java8-installer shared/accepted-oracle-license-v1-1 select true | /usr/bin/debconf-set-selections
RUN apt-get install --no-install-recommends -y oracle-java8-set-default ssh rsync
RUN echo 'JAVA_HOME=$(readlink -f /usr/bin/java | sed "s:bin/java::")' >> ~/.bashrc
RUN groupadd -r develop && useradd -r -m -g develop develop

USER root

CMD ["/usr/sbin/sshd", "-D"]

```
### Step 2. 构建镜像

```text
$ ls
Dockerfile
$ docker build -t oracle/jdk:8 .
```
### Step 3. 运行虚拟主机并登录

构建容器

```text
$ docker run -d -P --restart=always --name jdk8 oracle/jdk:8
08043d9001682680439103d2d7415c7041f254be3c90806dc1474d1b7281b7b8
```

检查IP

```text
$ docker run -d -P --restart=always --name jdk8 oracle/jdk:8
172.17.0.3
```

登录(root:toor123$)
```text
$ ssh root@172.17.0.2
Last login: Thu Feb 21 08:49:17 2019 from 172.17.0.1

```