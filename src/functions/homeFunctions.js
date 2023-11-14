import { add0, returnR$ } from "./helpFunctions/numberStringify.js"
import { verifyItem, arrange } from "./helpFunctions/array.js"

export default function getHome(req, res){
    let a = {userLog: {userName: "Philippe", email: "philippe.idalgoprestes@gmail.com", password: "123456789", userSince: {day: 7, month: 9, year: 2023}},
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

    for(let catIndex = 0; catIndex < a.categories.length; catIndex++){
        let categoryName = a.categories[catIndex];
        let categoryTransactions = [];
        let categoryTransactionsTotal = 0;
        let categoryMonthResult = [];
        let monthEarningsExpenses = [];

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
                                categoryMonthResult[meeIndex].expenses += trans.value;
                            }
                            else{
                                categoryMonthResult[meeIndex].earnings += trans.value;
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
                        break;
                    }
                    else if(testMonth == nowMonth && categoryMonthResult[cmrIndex2].date.month == nowMonth && categoryMonthResult[cmrIndex2].date.year == nowYear - 1){
                        nowMonthLastYearFound = 1;
                        break;
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
        if(graphMax - graphMin < 100){
            graphMax += 50;
            graphMin -+ 50;
        }

        console.log(categoryMonthResult);

        let graphBody = [];
        //gera as porcentagens no gráfico
        let cx = 5;
        for(let testMonth2 = nowMonth; testMonth2 <= 12; testMonth2++){
            for(let cmrIndex3 = 0; cmrIndex3 < categoryMonthResult.length; cmrIndex3++){
                let cat = categoryMonthResult[cmrIndex3]
                let title
                let reference = graphMax - graphMin;
                if(categoryMonthResult[cmrIndex3].date.month == testMonth2 && categoryMonthResult[cmrIndex3].date.year == nowYear - 1){

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