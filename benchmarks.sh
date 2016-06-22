#!/bin/bash
# declare an array called array and define 3 vales
benchmarks=( functionalnative functionalramda functionalasync )
numiters=180
numparallel=6
for i in "${benchmarks[@]}"
do
    echo "starting benchmark $i..."
    ab -n $numiters -c $numparallel -g graphdata/$i http://localhost:3000/$i > logs/$i.out
    gnuplot settings/$i.gnuplot
    echo "finished benchmark $i"
done

