export function add0(numberString){
    if(numberString.length == 1){
        return "0" + numberString
    }
    else{
        return numberString
    }
}

export function returnR$(number){
    let type;
    if (number > 0){
        type = 1;
    }
    else{
        type = 0;
        number = -number;
    }

    number = Math.round((number) * 100) / 100;

    number = number.toString();
    number = number.replaceAll(".", ",");
    if(number.length <= 2){
        number = number + ",00";
    }
    else if (number[number.length - 2] == ","){
        number = number + "0";
    }
    else if (number[number.length - 3] != ","){
        number = number + ",00";
    }
    number = "R$ " + number;

    return [number, type];
}