#!/bin/bash
# declare an array called array and define 3 vales
benchmarks=( functionalnative functionalramda functionalasync )
numiters=20
numparallel=4
for i in "${benchmarks[@]}"
do
    echo "starting benchmark $i..."
    ab -n $numiters -c $numparallel -g graphdata/$i http://localhost:3033/$i > logs/$i.out
    gnuplot settings/$i.gnuplot
    echo "finished benchmark $i"
done

