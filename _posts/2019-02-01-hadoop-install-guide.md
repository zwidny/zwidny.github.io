---
layout: markdown
title:  "Hadoop Install Guide with Vagrant"
date:   2019-02-01 09:49:47 +0800
categories: Guide:Hadoop
---

本文将带你完成hadoop cluster的搭建, 本文假设你已经安装了
[Vagrant 2.2.3](https://www.vagrantup.com/downloads.html)和
[VirtualBox v6.0.2](https://www.virtualbox.org/wiki/Downloads)

## Step 1. 搭建两台服务
1. 创建 Vagrantfile

   ```text
   touch Vagrantfile   
   ```
1. 复制如下内容到Vagrantfile

   ```text
   # -*- mode: ruby -*-
   # vi: set ft=ruby :
   
   Vagrant.configure("2") do |config|
     config.vm.define :master do |master|
       master.vm.box = "ubuntu/bionic64"
       master.vm.network "private_network", ip: "192.168.11.2"
     end
     config.vm.define :cluster do |cluster|
       cluster.vm.box = "ubuntu/bionic64"
       cluster.vm.network "private_network", ip: "192.168.11.3"
     end
   
     config.vm.provision "shell", inline: <<-SHELL
       add-apt-repository -y ppa:webupd8team/java
       apt-get update
       echo oracle-java8-installer shared/accepted-oracle-license-v1-1 select true | sudo /usr/bin/debconf-set-selections
       apt-get install -y oracle-java8-set-default
     SHELL
   end
   ```
1. 创建服务器

   ```text
   vagrant up
   ```
  
1. 验证

   1. 执行如下命令
   
      ```text
      vagrant status
      ```
   
   1. 结果如下应如下所示.
   
      ```text
      Current machine states:
      
      master                    running (virtualbox)
      cluster                   running (virtualbox)
      
      This environment represents multiple VMs. The VMs are all listed
      above with their current state. For more information about a specific
      VM, run `vagrant status NAME`.
      
      ```
      
## Step 2. 安装Hadoop

### 在master机器上安装Hadoop

1. 登陆到master

   1. 查看master私钥
   
      ```text
      vagrant ssh-config
      ```
      输入如下所以
      ```text
      Host master
        ...
        User vagrant
        ...
        IdentityFile /home/mi/clouds/ubuntu/.vagrant/machines/master/virtualbox/private_key
      
      Host cluster
        ...
        User vagrant
        ...
        IdentityFile /home/mi/clouds/ubuntu/.vagrant/machines/cluster/virtualbox/private_key
      
      ```
   1. 登陆, 注意这里IP是Vagrantfile里配置的, master是192.168.11.2
   
      ```text
      ssh -i /home/mi/clouds/ubuntu/.vagrant/machines/cluster/virtualbox/private_key vagrant@192.168.11.2
      ```
1. 准备hadoop环境, 假设你已经成功登陆到master

   ```commandline
   sudo apt-get install -y ssh rsync
   echo 'JAVA_HOME=$(readlink -f /usr/bin/java | sed "s:bin/java::")' >> ~/.bashrc
   source ~/.bashrc
   ```

1. 安装hadoop

   ```text
   wget http://apache.forsale.plus/hadoop/common/hadoop-3.2.0/hadoop-3.2.0.tar.gz
   ```
   ```text
   tar -zxf hadoop-3.2.0.tar.gz
   ```
   
1. 配置hadoop, 执行下面命令, [官方配合文档](https://hadoop.apache.org/docs/r3.2.0/hadoop-project-dist/hadoop-common/ClusterSetup.html)

   ```text
   cd hadoop-3.2.0
   echo HADOOP_HOME=$(pwd) >> ~/.bashrc
   source ~/.bashrc
   echo export 'JAVA_HOME=$(readlink -f /usr/bin/java | sed "s:bin/java::")' >> ./etc/hadoop/hadoop-env.sh
   ```
   
   ```text
   cat << EOF > etc/hadoop/core-site.xml
   <?xml version="1.0" encoding="UTF-8"?>
   <?xml-stylesheet type="text/xsl" href="configuration.xsl"?>
   
   <configuration>
   <property>
     <name>fs.defaultFS</name>
     <value>hdfs://192.168.11.2:9000/</value>
   </property>
   </configuration>
   EOF
   ```
   ```text
   cat << EOF > etc/hadoop/hdfs-site.xml
   <?xml version="1.0" encoding="UTF-8"?>
   <?xml-stylesheet type="text/xsl" href="configuration.xsl"?>
   <configuration>
   <property>
     <name>dfs.namenode.name.dir</name>
     <value>/home/vagrant/hadoop-3.2.0/dfs/name</value>
   </property>
   <property>
     <name>dfs.datanode.data.dir</name>
     <value>/home/vagrant/hadoop-3.2.0/dfs/data</value>
   </property>
   </configuration>
   EOF
   ```
1. 设置 ssh

   Now check that you can ssh to the localhost without a passphrase:
   ```text
   ssh localhost
   ```
   If you cannot ssh to localhost without a passphrase, execute the following commands:
   ```text
   ssh-keygen -t rsa -P '' -f ~/.ssh/id_rsa
   cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
   chmod 0600 ~/.ssh/authorized_keys
   ```
