export function todayDateAsNumber(){
    const date = new Date();
    const day = (`${date.getDate()}`.length>1 ? "" : "0") + `${date.getDate()}`
    const month = (`${date.getMonth()}`.length>1 ? "" : "0") + `${date.getMonth()+1}`
    return parseInt(`${date.getFullYear()}` + month + day);
}

export function dateAsNumber(date : Date){
    const day = (`${date.getDate()}`.length>1 ? "" : "0") + `${date.getDate()}`
    const month = (`${date.getMonth()}`.length>1 ? "" : "0") + `${date.getMonth()+1}`
    return parseInt(`${date.getFullYear()}` + month + day);
}