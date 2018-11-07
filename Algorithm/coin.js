function weeklyTemp() {
    this.temps = [[]];
    this.week = 0;
    this.addTemp = addTemp;
    this.getMonthlyAvg = getMonthlyAvg;
    this.getWeeklyAvg = getWeeklyAvg.bind(this);
    this.getAllWeeklyAvg = getAllWeeklyAvg;
}

function addTemp(temp) {
    const {temps} = this;
    if(temps[this.week].length % 7 == 6) {
        this.week += 1;
        temps.push([temp]);
    }else {
        temps[this.week].push(temp);
    }
    
}

function getMonthlyAvg() {
    const {week, temps} = this;
    let sum = 0, days = 0;
    for(let i = 0; i < week; i++) {
        for(let j = 0; j < temps[i].length; j++) {
            sum += temps[i][j];
            days += 1;
        }
    }
    return sum / days;
}

function getWeeklyAvg(getWeek) {
    const {temps} = this, week = getWeek - 1;
    let sum = 0, days = 0;
    for(let i = 0; i < temps[week].length; i++) {
        sum += temps[week][i];
        days += 1;
    }
    return sum / days;
}

function getAllWeeklyAvg() {
    const {temps, getWeeklyAvg, week} = this, allAvg = [];
    for(let i = 0; i < week; i++) {
        let sum = 0, days = 0;
        for(let j = 0; j < temps[i].length; j++) {
            sum += temps[i][j];
            days += 1;
        }
        allAvg.push(sum/days);
    }
    return allAvg;
}

const myWeeklyTemp = new weeklyTemp();
for(let i = 0; i < 25; i++) {
    myWeeklyTemp.addTemp(i);
}
console.log(myWeeklyTemp.getAllWeeklyAvg());
console.log(myWeeklyTemp.getMonthlyAvg());
console.log(myWeeklyTemp.getWeeklyAvg(2));