## Low Footprint HTTP backend... written in bash 💩

BusyBox includes an HTTP daemon that can serve local files.

Similar to most HTTP services like Apache or Nginx, it supports the [Common Gateway Interface (CGI)](https://fr.wikipedia.org/wiki/Common_Gateway_Interface), enabling server-side scripting capabilities.

This means you now have a backend framework for Bash!

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

In dev environments, you might need to install busybox (`sudo apt install busybox`).

> [!CAUTION]
> This is a proof of concept intended solely for personal use, to be exposed only in a private network.

The CGI consists of creating a new shell process and passing HTTP data through environment variables or the stdin stream for each request. Which is painfully slow. (This is not the case with PHP since a single process handles the requests and stays alive.) 

Since we are spawning shells to handle requests, we have an ideal environment for vulnerabilities such as path traversal, code injection or DDOS 😀
