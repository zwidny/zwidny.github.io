---
layout: markdown
title:  "Hadoop Install Guide with Docker"
date:   2019-02-12 09:49:47 +0800
categories: hadoop guide docker
---

本文将带你完成hadoop cluster的搭建, 本文假设你已经安装了
[Docker version 18.09.1, build 4c52b90](https://docs.docker.com/install/)和

## Step 1. 搭建两台服务
1. 创建 Docker image

```Dockerfile
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
WORKDIR /data/downloads
RUN wget http://apache.forsale.plus/hadoop/common/hadoop-3.2.0/hadoop-3.2.0.tar.gz
RUN groupadd -r hdfs && useradd -r -m -g hdfs hdfs

USER hdfs
RUN cp hadoop-3.2.0.tar.gz /home/hdfs/ 
WORKDIR /home/hdfs
RUN tar -zxf hadoop-3.2.0.tar.gz \
    && cd hadoop-3.2.0 \
    && echo HADOOP_HOME=$(pwd) >> ~/.bashrc \
    && echo export 'JAVA_HOME=$(readlink -f /usr/bin/java | sed "s:bin/java::")' >> ./etc/hadoop/hadoop-env.sh
# 使container能够互相ssh访问.
RUN ssh-keygen -t rsa -P '' -f ~/.ssh/id_rsa \
    && cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys \
    && chmod 0600 ~/.ssh/authorized_keys
######################

USER root
# ###### VIM ######
RUN apt-get install --no-install-recommends -y vim
###################


CMD ["/usr/sbin/sshd", "-D"]

```