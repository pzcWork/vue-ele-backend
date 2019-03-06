#!/bin/sh
./qrsctl login jl@pandaminer.com DpT-YUJ-aXb-Pq6
cdn_path="pandaminer/backend/static/"
echo "$cdn_path"
n=0
function getdir(){
    for element in `ls $1`
    do  
        dir_or_file=$1"/"$element
        if [ -d $dir_or_file ]
        then 
            getdir $dir_or_file
        else
        	filename=${dir_or_file/dist\/static\//$cdn_path};
            
            n=$[$n+1]  

            echo "[$n] $filename"

            ./qrsctl put  pandapooleth $filename $dir_or_file
        fi  
    done
}
root_dir="dist"
getdir $root_dir
echo "send $n files to cdn success!"