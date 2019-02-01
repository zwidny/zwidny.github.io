# 痕迹

## 开发指导


### 环境设置

#### ubuntu 18.04
**这里针对的是zsh, 如果你是用的是其他sh， 请更改相应的文件**
``
```commandline
sudo apt-get install ruby-full build-essential zlib1g-dev 

cat << EOF > ~/.zshrc
# Install Ruby Gems to ~/gems
export GEM_HOME="\$HOME/gems" 
export PATH="\$HOME/gems/bin:\$PATH" 
EOF 

source ~/.zshrc 

gem install jekyll bundler
```

### 运行指导

```text
-> pwd
zwidny.github.
-> bundle install
-> bundle exec jekyll serve

```

### 目录结构
```text

├── assets                     # 资源文件目录
│   └── css
│       └── styles.scss
├── _authors                   # 自定义集合, 参见_config.yml collections部分, 名称为集合中的名称
│   ├── jill.md
│   └── ted.md
├── _config.yml                # Jekyll 配置文件
├── _data                      # 数据定语文件， 相当于数据库
│   └── navigation.yml
├── Gemfile
├── _includes                  # include 文件存放位置  e.g.:  {% include navigation.html %}
│   └── navigation.html
├── index.md
├── _layouts                   # layout模板文件
│   ├── author.html
│   ├── default.html
│   └── post.html              # blog文件的元文件
├── blog.html                  # data/navigation.yml中对应的link文件
├── _posts  
│   ├── 2019-01-30-kiwifruit.md
│   ├── 2019-01-31-apples.md
│   ├── 2019-01-31-first-bold.md
│   └── 2019-01-31-welcome-to-jekyll.markdown
├── README.md
├── _sass                      # assets 中css/*.scss中对应的导入文件
│   └── main.scss
└── staff.html

```