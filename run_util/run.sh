#!/bin/bash

# $1=submission exec $2=model exec $3=input $4=tl $5=ml

res2=$(mktemp)
res1=$(mktemp)

mem=$(timeout $4 gtime 2>&1 --quiet -f%M $1 < $3 > $res1)
ret=$?

if [ $ret -eq 124 ]; then
    echo "Time Limit Exceeded"
elif [ $mem -ge $5 ]; then
    echo "Memory Limit Exceeded"
elif [ $ret -ne 0 ]; then
    echo "Runtime Error"
else
    $2 < $3 > $res2

    if cmp --silent -- "$res1" "$res2"; then
        echo "OK"
    else
        echo "Wrong Answer"
    fi
fi

rm $res1 $res2
