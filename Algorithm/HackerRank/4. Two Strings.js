function twoStrings(s1, s2) {
    let result;
    if(s1.length > s2.length)
        result = compare(s1, s2);
    else
        result = compare(s2, s1);
    return result;
}

function compare(s1, s2) {
    for(let i = 0; i < s1.length; i++) {
        if(s2.indexOf(s1[i]) > -1)
            return 'YES';
    }
    return 'NO';
}