#!/bin/bash

node=`which node`
composite=`which composite`
curl=`which curl`
base_dir="/usr/local/aclu/voter-apple-wallet"
mapbox_api_key="pk.eyJ1IjoiYWNsdSIsImEiOiJjamtzcG13eXIwMnA3M3dxbzhvZnlqaGNxIn0.dt0nTfFyf__f25JbQQtoaw"
mapbox_api_url="https://api.mapbox.com/styles/v1/mapbox/light-v9/static"
zoom=15

pin="$base_dir/img/pin.png"
pin2x="$base_dir/img/pin@2x.png"

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

	$curl -s "$mapbox_api_url/$lng,$lat,$zoom.0,0,0/375x144?access_token=$mapbox_api_key" > "$dir/map.png"
	$curl -s "$mapbox_api_url/$lng,$lat,$zoom.0,0,0/375x144@2x?access_token=$mapbox_api_key" > "$dir/map@2x.png"
	$composite -gravity center "$pin" "$dir/map.png" "$dir/strip.png"
	$composite -gravity center "$pin2x" "$dir/map@2x.png" "$dir/strip@2x.png"

	$node "$base_dir/pkpass.js" "$hash" "$address" "$hours" "$lat" "$lng"

fi

echo "$base_dir/passes/$hash/pass.pkpass"
