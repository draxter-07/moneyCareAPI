export function verifyItem(array, item, path){
    if(path == null){
        for(let i = 0; i < array.length; i++){
            if(array[i] == item){
                return true;
            }
            else if(i == array.length - 1){
                return false;
            }
        }
    }
    else{
        for(let i = 0; i < array.length; i++){
            if(array[i][path] == item){
                return true;
            }
            else if(i == array.length - 1){
                return false;
            }
        }
    }
}

export function arrange(array){
    let newArray = [];
    
    for(let index = 0; index < array.length; index++){
        let elem = array[index], temp = [];
        if(newArray.length == 0){
            newArray.push(elem);
        }
        else{
            for(let naIndex = 0; naIndex < newArray.length; naIndex++){
                let elem2 = newArray[naIndex];
                if(elem2.date.year > elem.date.year || (elem2.date.year == elem.date.year && elem2.date.month > elem.date.month) || (elem2.date.year == elem.date.year && elem2.date.month == elem.date.month && elem2.date.day > elem.date.day)){
                    for(let naIndex2 = 0; naIndex2 < naIndex; naIndex2++){
                        temp.push(newArray[naIndex2])
                    }
                    temp.push(elem)
                    for(let naIndex3 = naIndex; naIndex3 < newArray.length; naIndex3++){
                        temp.push(newArray[naIndex3])
                    }
                    newArray = temp;
                    break
                }
                else if(naIndex == newArray.length - 1){
                    newArray.push(elem)
                    break
                }
            }
        }
    }

    return newArray;
}

export function noDayArrange(array){
    let newArray = [];
    
    for(let index = 0; index < array.length; index++){
        let elem = array[index], temp = [];
        if(newArray.length == 0){
            newArray.push(elem);
        }
        else{
            for(let naIndex = 0; naIndex < newArray.length; naIndex++){
                let elem2 = newArray[naIndex];
                if(elem2.date.year > elem.date.year || (elem2.date.year == elem.date.year && elem2.date.month > elem.date.month)){
                    for(let naIndex2 = 0; naIndex2 < naIndex; naIndex2++){
                        temp.push(newArray[naIndex2])
                    }
                    temp.push(elem)
                    for(let naIndex3 = naIndex; naIndex3 < newArray.length; naIndex3++){
                        temp.push(newArray[naIndex3])
                    }
                    newArray = temp;
                    break
                }
                else if(naIndex == newArray.length - 1){
                    newArray.push(elem)
                    break
                }
            }
        }
    }

    return newArray;
}