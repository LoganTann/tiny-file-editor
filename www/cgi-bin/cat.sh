#!/bin/sh

get_output_path() {
    strippedpath="${QUERY_STRING#path=}"
    decodedpath=`busybox httpd -d $strippedpath`
    echo "$decodedpath"
    return 0
}
outputPath=`get_output_path`
output="../files/${outputPath}"


## Header
echo "HTTP/1.1 200 OK"
echo "Content-Type:text/plain"
echo ""

## Body
cat $output