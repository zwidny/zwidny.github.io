---
layout: markdown
title:  "webpack bundle analyzer"
date:   2019-12-18 00:00:00 +0800
categories: js:webpack js:bundle-analyzer
---

1. install webpack-bundle-analyzer
   ```
   npm install --save-dev webpack-bundle-analyzer
   ```
   
1. bundle analyzer
   ```
   webpack --model production --config build/webpack.prod.conf.js --profile --json > stats.json

   webpack-bundle-analyzer stats.json
   ```
