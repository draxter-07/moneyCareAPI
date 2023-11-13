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
        let graphMax = 0;
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
            if(categoryMonthResult[a].result < graphMin){
                graphMin = categoryMonthResult[a].result
            }
        }

        console.log(categoryMonthResult)
        console.log(graphMax)
        console.log(graphMin)

        infoDetArray.push({category: categoryName, 
                        transactions: categoryTransactions.reverse(), 
                        result: result, 
                        graph: {
                            body: [{porcentage: "95%", title: "03/2022 - R$ 0,00", cx: "5%"},
                                {porcentage: "95%", title: "04/2022 - R$ 0,00", cx: "12.5%"},
                                {porcentage: "95%", title: "05/2022 - R$ 0,00", cx: "20%"},
                                {porcentage: "95%", title: "06/2022 - R$ 0,00", cx: "27.5%"},
                                {porcentage: "95%", title: "07/2022 - R$ 0,00", cx: "35%"},
                                {porcentage: "95%", title: "08/2022 - R$ 0,00", cx: "42.5%"},
                                {porcentage: "95%", title: "09/2022 - R$ 0,00", cx: "50%"},
                                {porcentage: "95%", title: "10/2022 - R$ 0,00", cx: "57.5%"},
                                {porcentage: "95%", title: "11/2022 - R$ 0,00", cx: "65%"},
                                {porcentage: "95%", title: "12/2022 - R$ 0,00", cx: "72.5%"},
                                {porcentage: "95%", title: "01/2023 - R$ 0,00", cx: "80%"},
                                {porcentage: "50%", title: "02/2023 - R$ 215,00", cx: "87.5%"},
                                {porcentage: "5%", title: "03/2023 - R$ 430,00", cx: "95%"}],
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