#!/bin/bash

# $1=source

sub=$(mktemp)

g++ $1 -std=c++17 -o "$sub" &> /dev/null
if [ "$?" -ne 0 ]; then
    echo "Compile Error"
else
    echo $sub
fi