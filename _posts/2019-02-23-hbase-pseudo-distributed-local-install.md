---
layout: markdown
title:  "Hbase Pseudo Distributed Local Install"
date:   2019-02-23 11:49:47 +0800
categories: Guide:HBase
---

## Install HBase

为了方便起见， 本文使用docker。
 
### Step 1. 建立Dockerfile

```dockerfile
FROM zwidny/jdk:8 

RUN groupadd -r hbase && useradd -r -m -g hbase hbase -p esabh

USER hbase
WORKDIR /home/hbase
RUN wget http://ftp.cuhk.edu.hk/pub/packages/apache.org/hbase/stable/hbase-1.4.9-bin.tar.gz
RUN tar zxvf hbase-1.4.9-bin.tar.gz
WORKDIR /home/hbase/hbase-1.4.9
RUN echo 'export JAVA_HOME=$(readlink -f /usr/bin/java | sed "s:bin/java::")' >> conf/hbase-env.sh

RUN echo '<?xml version="1.0"?>\n\
<?xml-stylesheet type="text/xsl" href="configuration.xsl"?>\n\
<configuration>\n\
  <property>\n\
    <name>hbase.rootdir</name>\n\
    <value>file:///home/hbase/hbase</value>\n\
  </property>\n\
  <property>\n\
    <name>hbase.zookeeper.property.dataDir</name>\n\
    <value>/home/hbase/zookeeper</value>\n\
  </property>\n\
  <property>\n\
    <name>hbase.unsafe.stream.capability.enforce</name>\n\
    <value>false</value>\n\
    <description>\n\
    </description>\n\
  </property>\n\
  <property>\n\
    <name>hbase.cluster.distributed</name>\n\
    <value>true</value>\n\
  </property>\n\
  <property>\n\
    <name>hbase.rootdir</name>\n\
    <value>hdfs://localhost:8020/hbase</value>\n\
  </property>\n\
</configuration>\n' > conf/hbase-site.xml

RUN ssh-keygen -t rsa -P '' -f ~/.ssh/id_rsa \
    && cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys \
    && chmod 0600 ~/.ssh/authorized_keys

USER root

CMD ["/usr/sbin/sshd", "-D"]

```
### Step 2. 构建镜像

```text
$ ls
Dockerfile
$ docker build -t hbase:1.4.9 .
```
### Step 3. 运行虚拟主机并登录

构建容器

```text
$ docker run -d -P --name hbase hbase:1.4.9
08043d9001682680439103d2d7415c7041f254be3c90806dc1474d1b7281b7b8
```

检查IP

```text
$ docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' hbase
172.17.0.2
```

登录(root:toor123$)
```text
$ ssh root@172.17.0.2
Last login: Thu Feb 21 08:49:17 2019 from 172.17.0.1

```
