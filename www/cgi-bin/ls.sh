#!/bin/bash
 
echo "Content-type: text/plain"
echo ""

echo "# dir" 
find ../files -type d
echo "---"
echo "# files"
find ../files -type f
