#!/bin/sh

validate_input() {
    if [ "$QUERY_STRING" = "${QUERY_STRING#path=}" ]; then
        echo "Erreur: QueryParam 'path' doit être obligatoire et unique"
        return 1
    fi

    ## && .. > < " \ / : | ?
    case "$QUERY_STRING" in
        *\&\&*|*\.\.*|*\>*|*\<*|*\"*|*\\*|*/*|*:*|*|*|*\?* )
            echo "ERR: Invalid characters in path"
            return 1
            ;;
    esac
}
get_output_path() {
    strippedpath="${QUERY_STRING#path=}"
    decodedpath=`busybox httpd -d $strippedpath`
    echo "$decodedpath"
    return 0
}
save_file() {
    validate_input
    output="../files/${get_output_path}"
    cat >$output
}


## Header
echo "HTTP/1.1 200 OK"
echo "Content-Type:text/html"
echo ""

## Body
echo "<html>"
echo "<a href='?'>reset</a>"
if [ "$REQUEST_METHOD" == "POST" ]; then
    save_file
else
    echo '<form action="?"  method="POST" enctype="text/plain"><textarea name="content" id="content"></textarea><button>Submit</button></form>'
fi
echo "</pre>"
echo "</html>"
echo ""
