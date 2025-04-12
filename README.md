## Low Footprint HTTP backend... written in bash 💩

BusyBox includes an HTTP daemon that can serve local files.

Similar to most HTTP services like Apache or Nginx, it supports the [Common Gateway Interface (CGI)](https://fr.wikipedia.org/wiki/Common_Gateway_Interface), enabling server-side scripting capabilities.

This means you now have an easy-to-use backend framework for Bash, in under 5Mb. The same would require 300Mb by using Node.js.

References : 
- https://www.geekyhacker.com/bash-shell-cgi-http-server-using-busybox/
- https://oldwiki.archive.openwrt.org/doc/howto/http.httpd

## Features

- [x] Serves static files
- [x] Dynamic directory listing and file content retrieval (GET)
- [ ] WIP: Can write files (POST)
- [ ] Dockerfile, public image + docker compose support

## Getting started

Start the web server

```sh
./start.sh
```

In dev environments, you need to install busybox (`sudo apt install busybox`).

> [!CAUTION]
> This is a proof of concept intended solely for personal use, to be exposed only in a private network.

Our approach creates a new process and passes HTTP data through environment variables and the stdin stream for each request. Which is painfully slow. 

As we are spawning shells to handle requests, we have an ideal environment for vulnerabilities such as path traversal, code injection or DDOS 😀
