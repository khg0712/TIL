function solution(arrangement) {
let answer = 0, bars = 0;
    const arr = arrangement.split('');
    for(let i = 0; i < arr.length; i++) {
        if(isLaser(arr[i], arr[i+1])) {
            answer+=bars;
            i+=1;
        }else {
            if(arr[i]=='(')
                bars+=1;
            if(arr[i]==')'){
                answer+=1;
                bars-=1;
            }
        }
    }
    
    return answer;
}

function isLaser(ele1, ele2) {
    if(ele1 == '(' && ele2 == ')'){
        return true;
    }
    return false;
}

console.log(solution("()(((()())(())()))(())"))