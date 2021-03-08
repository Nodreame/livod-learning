## 本地启动流服务器

有时我们可能想在本地搭建直播流服务器，用于调试直播，[node-media-server](https://github.com/illuspas/Node-Media-Server) 可以很方便地启动一个流服务器，Demo 如下：

进入 demo\01-node-media-server 目录，安装依赖，`yarn start` 启动 nodemedia.js，然后就可以使用 ffmpeg 推流命令，如下例子

``` shell
# 推送本地视频 ik.mp4 并循环播放，推送地址为 localhost/live/home
ffmpeg.exe -stream_loop -1 -re -i .\ik.mp4 -c copy -f flv rtmp://localhost/live/home

# 推流之后根据在 nodemedia.js 中的配置，可以得到以下拉流地址，可以尝试用 VLC 打开
# http://localhost:8000/live/home.flv
# http://localhost:8000/live/home/index.m3u8
# http://localhost:8000/live/home/index.mpd
```
