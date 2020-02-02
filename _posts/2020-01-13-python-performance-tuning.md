---
layout: markdown
title:  "Python performance tuning"
date:   2020-01-13 00:00:00 +0800
categories: Tech:Python:Tuning

---

这篇文章主要介绍如何发现python程序中慢的部分, 以及如何优化,(暂时不考虑硬件层面的优化)

## 1. 发现程序中慢的部分
假设我们需要计算两个二维数组{R=nxn}相加之后的和, 

例如
```text
a = [[1, 2,], [3, 4]]
b = [[1, 2,], [3, 4]]

c = a + b = [[2, 4], [6, 8]]
sum(c) = 2 + 4 + 6 + 8 = 20
```

程序如下
```text
def normal_sum(a, b, size=1000):
    s = 0
    for i in range(size):
        for j in range(size):
            s += a[i][j]
            s += b[i][j]
    return s

```
拿到程序了我们如何分析呢， 方法如下， 
1. 查看程序的平均运行时间,
 
   如何查看平均时间呢， 我们可以用time来完成，但强大的python已经为我们准备好了内置的module来完成这个功能： [timeit](https://docs.python.org/3/library/timeit.html)，
   因为ipython提供了很方便的交互式， 这里我们使用ipython
   + 安装并启动
   
      ```text
      
      pip install ipython
      ipython
      
      ```
   + 示例程序

   ```python
   
   import numpy as np
   
   SIZE = 1000 * 1000
   
   MatrixA = np.arange(SIZE).reshape(1000, 1000)
   MatrixB = np.arange(SIZE).reshape(1000, 1000)
   
   def normal_sum(a, b, size=1000):
       s = 0
       for i in range(size):
           for j in range(size):
               s += a[i][j]
               s += b[i][j]
       return s
   %timeit normal_sum(MatrixA, MatrixB)
   > 767 ms ± 24.3 ms per loop (mean ± std. dev. of 7 runs, 1 loop each)
   
   ```
   
1. 查看具体的时间消耗

   知道了平均的时间消耗， 那么具体是哪里慢了呢， 这里我们使用第三方包[scalene](https://github.com/emeryberger/scalene)来分析我们的代码， 
   虽然Python为我们提供了剖析代码的module: cProfile, 但是相对于cProfile, 
   scanle有更好的表现.
   + 安装 
   
   ```text
   pip install scalene
   ```
   
   + 将我们上面的代码移动到particle.py中, 内容如下
   
   ```python
   import numpy as np
   
   SIZE = 1000 * 1000
   MatrixA = np.arange(SIZE).reshape(1000, 1000)
   MatrixB = np.arange(SIZE).reshape(1000, 1000)
   
   
   def normal_sum(a, b, size=1000):
       s = 0
       for i in range(size):
           for j in range(size):
               s += a[i][j]
               s += b[i][j]
       return s
   
   
   # pr = cProfile.Profile()
   # pr.enable()
   print(normal_sum(MatrixA, MatrixB))
   
   ```
   
   + profile code
   
   ```text
   
   python -m scalene particle.py
   
   ```
   
   ```
   particle.py: % of CPU time = 100.00% out of   0.93s.
            |     CPU % |     CPU % |   
     Line   |  (Python) |  (native) |  [particle.py]
   --------------------------------------------------------------------------------
        1   |           |           | import numpy as np
        2   |           |           | import cProfile
        3   |           |           | 
        4   |           |           | SIZE = 1000 * 1000
        5   |           |           | MatrixA = np.arange(SIZE).reshape(1000, 1000)
        6   |           |           | MatrixB = np.arange(SIZE).reshape(1000, 1000)
        7   |           |           | 
        8   |           |           | 
        9   |           |           | def normal_sum(a, b, size=1000):
       10   |           |           |     s = 0
       11   |           |           |     for i in range(size):
       12   |     2.66% |     1.28% |         for j in range(size):
       13   |    35.96% |     9.38% |             s += a[i][j]
       14   |    38.63% |    12.09% |             s += b[i][j]
       15   |           |           |     return s

   ```
   
   我们可以看到程序的大部分时间都花在for循环上面了， 如果我们消除显示的for循环就可以达到优化效果了
## 2. 优化代码
   
   改写代码如下
      
   ```text
   
   def tuning_sum(a, b, size=1000):
       return np.sum(a + b)
   print(tuning_sum(MatrixA, MatrixB))
   ```
   + 我们在分析一下代码
   ```text
   
   python -m scalene particle.py
   
   ```
   
   ```text
   
   particle.py: % of CPU time = 100.00% out of   0.22s.
            |     CPU % |     CPU % |   
     Line   |  (Python) |  (native) |  [particle.py]
   --------------------------------------------------------------------------------
        1   |           |           | import numpy as np
        2   |           |           | import cProfile
        3   |           |           | 
        4   |           |           | SIZE = 1000 * 1000
        5   |           |           | MatrixA = np.arange(SIZE).reshape(1000, 1000)
        6   |           |           | MatrixB = np.arange(SIZE).reshape(1000, 1000)
        7   |           |           | 
        8   |           |           | 
        9   |           |           | def tuning_sum(a, b, size=1000):
       10   |    21.72% |    78.28% |     return np.sum(a + b)
       11   |           |           | 
       12   |           |           | 
       13   |           |           | # pr = cProfile.Profile()
       14   |           |           | # pr.enable()
       15   |           |           | print(tuning_sum(MatrixA, MatrixB))
       16   |           |           | # pr.disable()
       17   |           |           | # pr.print_stats()
   
   ```
   
   我们可以看到优化后的代码比以前快了至少3倍
   
## 总结
本篇文章主要讲了如何发现代码中慢的部分， 主要使用scalen， 以及相应的优化， 去掉显示的循环。 
