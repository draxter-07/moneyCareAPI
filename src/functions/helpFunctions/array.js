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