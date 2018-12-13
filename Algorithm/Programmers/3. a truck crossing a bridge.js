function solution(bridge_length, weight, truck_weights) {
    var answer = 0;
    let bridge_weight = 0, trucks = [];
    while(true) {
        let next = truck_weights[0]
        if(next+bridge_weight <= weight) {
            bridge_weight += next;
            truck_weights.splice(0, 1);
            trucks.push({val: next, move: bridge_length});
        }

        trucks = trucks.map(truck => ({val:truck.val, move: truck.move-1}));
        if(trucks[0].move == 0) {
            bridge_weight -= trucks[0].val;
            trucks.shift()
        }
        
        if(trucks.length >= 0)
            answer+=1;

        if(trucks.length == 0 && truck_weights.length == 0)
            return answer+1;
    }
}

console.log(solution(100, 100, [10,10,10,10,10,10,10,10,10,10]));