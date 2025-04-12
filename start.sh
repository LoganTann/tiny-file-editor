# -p Port, -f foreground, -v verbose -h folder -c config-file
busybox httpd -p 8001 -c `pwd`/httpd.conf -f -v -h www

# find . -type f -name "*.sh" -print0 |xargs -0 chmod +x