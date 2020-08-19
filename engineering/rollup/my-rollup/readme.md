# rollup
## 
```sh
    # -f (--output.format) cjs (commonJs)
    # 所创建的bundle的类型为bundle.js
    rollup src/main.js -f cjs
    
    # -c代表执行配置文件
    # -c 后面带命令行将会覆盖配置文件的操作
    # `-o` is short for `--output.file`
    rollup -c -o bundle-2.js 


```