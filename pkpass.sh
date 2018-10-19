#!/bin/bash

base_dir="/usr/local/aclu/voter-apple-wallet"

if [ $# -lt 4 ] ; then
	echo "Usage pkpass.sh [address] [hours] [lat] [lng]"
	exit 1
fi

address=$1
hours=$2
lat=$3
lng=$4

hash=`echo -n "$address" | openssl sha1`
hash=${hash#*= }

if [ ! -f "$base_dir/passes/$hash/pass.pkpass" ] ; then

	dir="$base_dir/passes/$hash"
	cp -R "$base_dir/template" "$dir"

	/usr/local/bin/node "$base_dir/pkpass.js" "$hash" "$address" "$hours" "$lat" "$lng"

fi

echo "$base_dir/passes/$hash/pass.pkpass"
