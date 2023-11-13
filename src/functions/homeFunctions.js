import { add0, returnR$ } from "./helpFunctions/numberStringify.js"
import { verifyItem } from "./helpFunctions/array.js"

export default function getHome(req, res){
    let a = {userLog: {userName: "Philippe", password: "123456789", userSince: {day: 7, month: 9, year: 2023}},
            categories: ["Mensal", "Crédito"],
            transactions: [{name: "Teste", value: 2, date: {day: 1, month: 10, year: 2023}, categories: ["Mensal"]},
                        {name: "UCI", value: -28, date: {day: 1, month: 11, year: 2023}, categories: ["Mensal"]},
                        {name: "Burguer King", value: -30.80, date: {day: 1, month: 11, year: 2023}, categories: ["Mensal"]},
                        {name: "Pagamento da fatura", value: -6.13, date: {day: 2, month: 11, year: 2023}, categories: ["Mensal", "Crédito"]},
                        {name: "Sirene com o Blitzkow e Petrich", value: -20, date: {day: 4, month: 11, year: 2023}, categories: ["Mensal"]},
                        {name: "Pagamento da fatura", value: -62.75, date: {day: 5, month: 11, year: 2023}, categories: ["Mensal", "Crédito"]},
                        {name: "Pagamento da fatura", value: -7.03, date: {day: 6, month: 11, year: 2023}, categories: ["Mensal", "Crédito"]},
                        {name: "Torta de maçã da Luana", value: -7.90, date: {day: 10, month: 11, year: 2023}, categories: ["Mensal"]},
                        {name: "Pagamento da fatura", value: -22.60, date: {day: 12, month: 11, year: 2023}, categories: ["Mensal", "Crédito"]},
                        {name: "Pagamento da fatura", value: -11.50, date: {day: 12, month: 11, year: 2023}, categories: ["Mensal", "Crédito"]},
                        {name: "Toro > Nubank", value: 47.87, date: {day: 13, month: 11, year: 2023}, categories: ["Mensal"]}]
            }
    let d = new Date();
    let nowMonth = d.getMonth() + 1;
    let nowYear = d.getFullYear();
    let infoBasArray = [];
    let infoDetArray = [];

    // infoDet
    for(let i = 0; i < a.categories.length; i++){
        let categoryName = a.categories[i];
        let categoryTransactions = [];
        let categoryTransactionsTotal = 0;
        let categoryMonthResult = [];

        // Separa as transações desse mês detalhadamente e também prepara o categoryMonthResult
        for(let j = 0; j < a.transactions.length; j++){
            let trans = a.transactions[j];

            if(trans.date.year == nowYear && trans.date.month == nowMonth && verifyItem(trans.categories, categoryName, null)){
                let transName = add0(trans.date.day.toString()) + "/" + add0(trans.date.month.toString()) + "/" + trans.date.year.toString() + " - " + trans.name;
                let [transValue, transType] = returnR$(trans.value);
                categoryTransactionsTotal += trans.value;
                categoryTransactions.push({name: transName, value: transValue, type: transType});
            }
            else if(((trans.date.year == nowYear) || (trans.date.year == nowYear - 1 && trans.date.month >= nowMonth)) && verifyItem(trans.categories, categoryName, null)){
                if(categoryMonthResult.length == 0){
                    categoryMonthResult.push({date: {month: trans.date.month, year: trans.date.year}, result: trans.value})
                }
                else{
                    for(let k = 0; k < categoryMonthResult.length; k++){
                        if(categoryMonthResult[k].date.year == trans.date.year && categoryMonthResult[k].date.month == trans.date.month){
                            categoryMonthResult[k].result += trans.value;
                            break;
                        }
                        else if(k == categoryMonthResult.length - 1){
                            categoryMonthResult.push({date: {month: trans.date.month, year: trans.date.year}, result: trans.value});
                        }
                    }
                }
            }
        }

        // Estabelece o resultado da categoria no mês
        let [value, type] = returnR$(categoryTransactionsTotal);
        let result = {value: value, type: type};

        categoryMonthResult.push({date: {month: nowMonth, year: nowYear}, result: categoryTransactionsTotal})

        //graph
        // completa com os meses faltantes e verifica o máximo e o mínimo
        let graphMax = -999999999999999;
        let graphMin = 999999999999999;
        if(categoryMonthResult.length != 13){
            for(let m = nowMonth; m <= 12; m++){
                for(let n = 0; n < categoryMonthResult.length; n++){
                    if(categoryMonthResult[n].date.month == m && categoryMonthResult[n].date.year == nowYear - 1){
                        break;
                    }
                    else if(n == categoryMonthResult.length - 1){
                        categoryMonthResult.push({date: {month: m, year: nowYear - 1}, result: 0})
                    }
                }
            }
            for(let o = 1; o < nowMonth; o++){
                for(let p = 0; p < categoryMonthResult.length; p++){
                    if(categoryMonthResult[p].date.month == o && categoryMonthResult[p].date.year == nowYear){
                        break;
                    }
                    else if(p == categoryMonthResult.length - 1){
                        categoryMonthResult.push({date: {month: o, year: nowYear}, result: 0})
                    }
                }
            }
        }
        for(let a = 0; a < categoryMonthResult.length; a++){
            if(categoryMonthResult[a].result > graphMax){
                graphMax = categoryMonthResult[a].result
            }
            else if(categoryMonthResult[a].result < graphMin){
                graphMin = categoryMonthResult[a].result
            }
        }

        let graphBody = [];
        //gera as porcentagens no gráfico
        let cx = 5;
        for(let b = nowMonth; b <= 12; b++){
            cx += 7.5;
            for(let q = 0; q < categoryMonthResult.length; q++){
                if(categoryMonthResult[q].date.month == b && categoryMonthResult[q].date.year == nowYear - 1){
                    let cat = categoryMonthResult[q]
                    let title
                    let reference
                    if (graphMax >= 0){
                        reference = graphMax - graphMin
                    }
                    else{
                        reference = graphMin - graphMax
                    }
                    let porcentage
                    if(graphMin < 0){
                        if(cat.result >= 0){
                            porcentage = Math.round(((cat.result - graphMin)/reference)*90 + 5).toString() + "%";
                            title = add0(cat.date.month.toString()) + "/" + cat.date.year.toString() + " - " + returnR$(cat.result)[0];
                        }
                        else{
                            porcentage = Math.round(((graphMin - cat.result)/reference)*90 + 5).toString() + "%";
                            title = add0(cat.date.month.toString()) + "/" + cat.date.year.toString() + " - -" + returnR$(cat.result)[0];
                        }
                    }
                    else{
                        porcentage = Math.round(((cat.result + graphMin)/reference)*90 + 5).toString() + "%";
                        title = add0(cat.date.month.toString()) + "/" + cat.date.year.toString() + " - " + returnR$(cat.result)[0];
                    }
                    
                    graphBody.push({porcentage: porcentage, title: title, cx: cx.toString() + "%"})
                    break;
                }
            }
        }
        for(let d = 1; d <= nowMonth; d++){
            cx += 7.5;
            for(let w = 0; w < categoryMonthResult.length; w++){
                if(categoryMonthResult[w].date.month == d && categoryMonthResult[w].date.year == nowYear){
                    let cat = categoryMonthResult[w]
                    let title
                    let reference
                    if (graphMax >= 0){
                        reference = graphMax - graphMin
                    }
                    else{
                        reference = graphMin - graphMax
                    }
                    let porcentage
                    if(graphMin < 0){
                        if(cat.result >= 0){
                            porcentage = Math.round(((cat.result - graphMin)/reference)*90 + 5).toString() + "%";
                            title = add0(cat.date.month.toString()) + "/" + cat.date.year.toString() + " - " + returnR$(cat.result)[0];
                        }
                        else{
                            porcentage = Math.round(((graphMin - cat.result)/reference)*90 + 5).toString() + "%";
                            title = add0(cat.date.month.toString()) + "/" + cat.date.year.toString() + " - -" + returnR$(cat.result)[0];
                        }
                    }
                    else{
                        porcentage = Math.round(((cat.result - graphMin)/reference)*90 + 5).toString() + "%";
                        title = add0(cat.date.month.toString()) + "/" + cat.date.year.toString() + " - " + returnR$(cat.result)[0];
                    }
                    
                    graphBody.push({porcentage: porcentage, title: title, cx: cx.toString() + "%"})
                    break;
                }
            }
        }

        infoDetArray.push({category: categoryName, 
                        transactions: categoryTransactions.reverse(), 
                        result: result, 
                        graph: {
                            body: graphBody,
                            lateral: [{value: "R$ 0.4k", y: "6%"}, 
                                {value: "R$ ?", y: "28.5%"}, 
                                {value: "R$ ?", y: "51%"}, 
                                {value: "R$ ?", y: "73.5%"}, 
                                {value: "R$ 0,00", y: "96%"}]
                        }
                    })
    }

    let infoBasObj = [{name: "Saldo médio mensal", value: "R$ 50,00", type: 1}, 
                    {name: "Ganhos médios mensais", value: "R$ 100,00", type: 1}, 
                    {name: "Gastos médios mensais", value: "R$ 50,00", type: 0}]

    let object = {
        infoBas: infoBasObj,
        infoDet: infoDetArray
    }

    res.send(object).end()
}