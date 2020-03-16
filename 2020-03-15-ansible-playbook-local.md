---
layout: markdown
title:  "title"
date:   2020-03-15 00:00:00 +0800
categories: Tech:DevOps:Ansible
---
本文主要演示ansible在调用remote机器时， 如何执行在local机器上执行命令

背景:

> 部署前段代码， 但不希望remote服务器安装很多无用的东西， 
> 所以需要在本地build静态文件， 然后拷贝到remote server

Code:

```yaml
---
- hosts: test
  remote_user: deploy
  become: yes
  become_user: root
  tasks:
    - name: Install Nginx
      apt:
        name: nginx
        state: present

    - name: copy domain config
      template:
        src: ./nginx/test.cms.airdoc.com.j2
        dest: /etc/nginx/sites-enabled/test.cms.airdoc.com
      notify:
        - restart nginx

    - name: install npm package
      shell: npm install --registry=https://registry.npm.taobao.org
      become: no
      args:
        chdir: ..
      delegate_to: 127.0.0.1

    - name: npm run build
      shell: npm run build
      become: no
      args:
        chdir: ..
      delegate_to: 127.0.0.1

    - name: make sure frontend dir exists
      file:
        path: '{{cms_path}}'
        state: directory
        owner: '{{ nginx_user }}'
        group: '{{ nginx_user }}'

    - name: copy the html code to remote
      copy:
        src: ../dist
        dest: '{{cms_path}}'
        owner: '{{ nginx_user }}'
        group: '{{ nginx_user }}'

  handlers:
    - name: restart nginx
      systemd:
        state: restarted
        name: nginx

```
