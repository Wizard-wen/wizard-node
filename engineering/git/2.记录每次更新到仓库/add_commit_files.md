# 

## 


track 跟踪
stage 暂存
commit 提交
modify 修改

```sh
    $ git status
    # 位于分支 master
    On branch master
    Your branch is up-to-date with 'origin/master'.
    # 无文件要提交，干净的工作区
    nothing to commit, working directory clean
```

```sh
    $ echo 'My Project' > README
    
    $ git status
    
    # 位于分支 master
    On branch master
    # 
    Your branch is up-to-date with 'origin/master'.
    # 未跟踪的文件:
    Untracked files:
    # （使用 "git add <文件>..." 以包含要提交的内容）
    (use "git add <file>..." to include in what will be committed)

        README
    # 提交为空，但是存在尚未跟踪的文件（使用 "git add" 建立跟踪）
    nothing added to commit but untracked files present (use "git add" to track)

    $ git status
    
    On branch master
    Your branch is up-to-date with 'origin/master'.
    # 要提交的变更：
    Changes to be committed:
    # （使用 "git reset HEAD <文件>..." 以取消暂存）
    (use "git restore --staged <file>..." to unstage)

        new file:   README
    
    $ git status
    On branch master
    Your branch is up-to-date with 'origin/master'.
    Changes to be committed:
    (use "git reset HEAD <file>..." to unstage)

        new file:   README
    # 尚未暂存以备提交的变更：
    Changes not staged for commit:
    # 使用 "git add <文件>..." 更新要提交的内容）
    (use "git add <file>..." to update what will be committed)
    # 使用 "git checkout -- <文件>..." 丢弃工作区的改动）
    (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   CONTRIBUTING.md
```

git status -s 

?? 新添加的未跟踪文件
A 新添加到暂存区中的文件
M 修改过的文件


.gitignore 
```sh
    #
    .a忽略所有的.a文件
    # 但是跟踪所有的lib.a，即使你在前面忽略了.a文件
    !lib.a
    # 只忽略当前目录下的TODO文件，而不忽略subdir/TODO
    /TODO
    # 忽略任何目录下名为TODO的文件夹
    TODO/ 
    # 忽略doc/notes.txt，但是不忽略doc/server/arch.txt
    doc/*.txt
    # 忽略doc/目录及其子目录下的.txt文件
    doc/**/*.txt
```
