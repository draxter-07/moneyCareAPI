import { add0, returnR$, returnGraphR$ } from "./numberStringify.js"
import { verifyItem, arrange, noDayArrange } from "./array.js"

export default function getHome(req, res){
    let a = {categories: ["Mensal", "Salário"], transactions: [{name: "oi", value: 30, date: {day: 4, month: 1, year: 2024}}]}
    let d = new Date();
    let nowMonth = d.getMonth() + 1;
    let nowYear = d.getFullYear();
    let infoBasArray = [];
    let infoDetArray = [];
    let monthEarningsExpenses = [];
    let medMonthResult = 0;
    a.transactions = arrange(a.transactions)

    for(let catIndex = 0; catIndex < a.categories.length; catIndex++){
        let categoryName = a.categories[catIndex];
        let categoryTransactions = [];
        let categoryTransactionsTotal = 0;
        let categoryMonthResult = [];

        for(let transIndex = 0; transIndex < a.transactions.length; transIndex++){
            let trans = a.transactions[transIndex];
            
            // Adiciona a transação caso seja dessa categoria e desse mês
            if(trans.date.year == nowYear && trans.date.month == nowMonth && verifyItem(trans.categories, categoryName, null)){
                let transName = add0(trans.date.day.toString()) + "/" + add0(trans.date.month.toString()) + "/" + trans.date.year.toString() + " - " + trans.name;
                let [transValue, transType] = returnR$(trans.value);
                categoryTransactionsTotal += trans.value;
                categoryTransactions.push({name: transName, value: transValue, type: transType});
            }

            // Adiciona o resultado da transação para a array de mes e resultado
            if(((trans.date.year == nowYear) || (trans.date.year == nowYear - 1 && trans.date.month >= nowMonth)) && verifyItem(trans.categories, categoryName, null)){
                if(categoryMonthResult.length == 0){
                    categoryMonthResult.push({date: {month: trans.date.month, year: trans.date.year}, result: trans.value})
                }
                else{
                    for(let cmrIndex = 0; cmrIndex < categoryMonthResult.length; cmrIndex++){
                        if(categoryMonthResult[cmrIndex].date.year == trans.date.year && categoryMonthResult[cmrIndex].date.month == trans.date.month){
                            categoryMonthResult[cmrIndex].result += trans.value;
                            break;
                        }
                        else if(cmrIndex == categoryMonthResult.length - 1){
                            categoryMonthResult.push({date: {month: trans.date.month, year: trans.date.year}, result: trans.value});
                        }
                    }
                }
            }

            // Adiciona os ganhos e perdas de cada mês para criar o infoBasArray
            if(categoryName == "Mensal"){
                if(monthEarningsExpenses.length == 0){
                    if(trans.value < 0){
                        monthEarningsExpenses.push({date: {month: trans.date.month, year: trans.date.year}, earnings: 0, expenses: trans.value})
                    }
                    else{
                        monthEarningsExpenses.push({date: {month: trans.date.month, year: trans.date.year}, earnings: trans.value, expenses: 0})
                    }
                }
                else{
                    for(let meeIndex = 0; meeIndex < monthEarningsExpenses.length; meeIndex++){
                        if(categoryMonthResult[meeIndex].date.year == trans.date.year && categoryMonthResult[meeIndex].date.month == trans.date.month){
                            if(trans.value < 0){
                                monthEarningsExpenses[meeIndex].expenses += trans.value;
                            }
                            else{
                                monthEarningsExpenses[meeIndex].earnings += trans.value;
                            }
                            break;
                        }
                        else if(meeIndex == categoryMonthResult.length - 1){
                            if(trans.value < 0){
                                monthEarningsExpenses.push({date: {month: trans.date.month, year: trans.date.year}, earnings: 0, expenses: trans.value})
                            }
                            else{
                                monthEarningsExpenses.push({date: {month: trans.date.month, year: trans.date.year}, earnings: trans.value, expenses: 0})
                            }
                        }
                    }
                }
            }
        }

        // Estabelece o resultado da categoria no mês
        let [value, type] = returnR$(categoryTransactionsTotal);
        let result = {value: value, type: type};

        let graphMax = 0;
        let graphMin = 0;
        // Completa a array de meses
        if(categoryMonthResult.length != 13){
            let nowMonthLastYearFound = 0;
            let nowMonthThisYearFound = 0;
            for(let testMonth = 1; testMonth <= 12; testMonth++){
                for(let cmrIndex2 = 0; cmrIndex2 < categoryMonthResult.length; cmrIndex2++){
                    if((testMonth > nowMonth && categoryMonthResult[cmrIndex2].date.month == testMonth && categoryMonthResult[cmrIndex2].date.year == nowYear - 1) || 
                    (testMonth < nowMonth && categoryMonthResult[cmrIndex2].date.month == testMonth && categoryMonthResult[cmrIndex2].date.year == nowYear)){
                        break;
                    }
                    else if(testMonth == nowMonth && categoryMonthResult[cmrIndex2].date.month == nowMonth && categoryMonthResult[cmrIndex2].date.year == nowYear){
                        nowMonthThisYearFound = 1;
                    }
                    else if(testMonth == nowMonth && categoryMonthResult[cmrIndex2].date.month == nowMonth && categoryMonthResult[cmrIndex2].date.year == nowYear - 1){
                        nowMonthLastYearFound = 1;
                    }
                    else if(cmrIndex2 == categoryMonthResult.length - 1){
                        let objYear;
                        if((testMonth > nowMonth) || (testMonth == nowMonth && nowMonthLastYearFound == 0 && nowMonthThisYearFound == 1)){
                            objYear = nowYear - 1;
                        }
                        else if ((testMonth < nowMonth) || (testMonth == nowMonth && nowMonthLastYearFound == 1 && nowMonthThisYearFound == 0)){
                            objYear = nowYear;
                        }
                        else if (testMonth == nowMonth && nowMonthLastYearFound == 0 && nowMonthThisYearFound == 0){
                            objYear = nowYear;
                            categoryMonthResult.push({date: {month: testMonth, year: objYear - 1}, result: 0})
                        }
                        categoryMonthResult.push({date: {month: testMonth, year: objYear}, result: 0})
                    }
                }
            }
        }

        // Encontra o máximo e mínimo para o gráfico
        for(let a = 0; a < categoryMonthResult.length; a++){
            if(categoryMonthResult[a].result > graphMax){
                graphMax = categoryMonthResult[a].result
            }
            else if(categoryMonthResult[a].result < graphMin){
                graphMin = categoryMonthResult[a].result
            }
        }
        
        // Estabelece uma distância mínima entre eles
        if(graphMax - graphMin < 10){
            graphMax += 5;
            graphMin -= 5;
        }

        categoryMonthResult = noDayArrange(categoryMonthResult)
        
        let graphBody = [];
        //gera as porcentagens no gráfico e já pega o valor dos resultados para infoBas
        let cx = -2.5;
        for(let cmrIndex3 = 0; cmrIndex3 < categoryMonthResult.length; cmrIndex3++){
            cx += 7.5
            let cat = categoryMonthResult[cmrIndex3]
            let title = add0(cat.date.month.toString()) + "/" + cat.date.year.toString() + ": " + returnGraphR$(cat.result)
            let reference = graphMax - graphMin
            let porcentage = Math.round(((graphMax - cat.result)/reference)*90 + 5).toString() + "%"
            if(categoryName == "Mensal"){
                medMonthResult += cat.result;
            }
            graphBody.push({porcentage: porcentage, title: title, cx: cx.toString() + "%"})
        }

        let lateralValues = [{value: returnGraphR$(graphMax), y: "6%"}, 
                            {value: returnGraphR$((graphMax - graphMin)*0.75 + graphMin), y: "28.5%"}, 
                            {value: returnGraphR$((graphMax - graphMin)*0.5 + graphMin), y: "51%"}, 
                            {value: returnGraphR$((graphMax - graphMin)*0.25 + graphMin), y: "73.5%"}, 
                            {value: returnGraphR$(graphMin), y: "96%"}]

        infoDetArray.push({category: categoryName, 
                        transactions: categoryTransactions.reverse(), 
                        result: result, 
                        graph: {
                            body: graphBody,
                            lateral: lateralValues
                        }
                    })
    }

    let medMonthEarnings = 0, medMonthExpenses = 0;
    for(let meeIndex2 = 0; meeIndex2 < monthEarningsExpenses.length; meeIndex2++){
        medMonthEarnings += monthEarningsExpenses[meeIndex2].earnings
        medMonthExpenses += monthEarningsExpenses[meeIndex2].expenses
    }

    medMonthResult /= monthEarningsExpenses.length
    medMonthEarnings /= monthEarningsExpenses.length
    medMonthExpenses /= monthEarningsExpenses.length

    let infoBasObj = [{name: "Saldo médio mensal", value: returnR$(medMonthResult)[0], type: returnR$(medMonthResult)[1]}, 
                    {name: "Ganhos médios mensais", value: returnR$(medMonthEarnings)[0], type: returnR$(medMonthEarnings)[1]}, 
                    {name: "Gastos médios mensais", value: returnR$(medMonthExpenses)[0], type: returnR$(medMonthExpenses)[1]}]

    let object = {
        userInfo: {name: "Philippe"},
        infoBas: infoBasObj,
        infoDet: infoDetArray
    }

    res.send(object).end()
}