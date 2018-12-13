function minimumBribes(q) {
    const arr = []
    let count = 0;
    for(let i = 0; i<q.length; i++) {
        arr[i] = i+1;
    }
    for(let i = q.length; i >= 0; i--) {
        if(q[i] != arr[i]) {
            [arr[i], arr[i-1]] = [arr[i-1], arr[i]];
            count+=1;
        }
    }
    return count>2?count:"Too chaostic";
}

console.log(minimumBribes([2,1,5,4,3]))