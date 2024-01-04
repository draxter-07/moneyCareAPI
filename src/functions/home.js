import { add0, returnR$, returnGraphR$ } from "./numberStringify.js"
import { verifyItem, arrange, noDayArrange } from "./array.js"

export default function getHome(req, res){
    let a = {categories: [
                "Mensal", 
                "Pagamento de fatura",
                "Salário",
                "Nubank > Toro",
                "Toro > Nubank"
            ], 
            transactions: [
                {name: "Inter > Nubank", value: 100, date: {day: 28, month: 2, year: 2023}, categories: ["Mensal"]},
                {name: "Inter > Nubank", value: 78.20, date: {day: 28, month: 2, year: 2023}, categories: ["Mensal"]},
                {name: "Nubank > Inter", value: -35.90, date: {day: 2, month: 3, year: 2023}, categories: ["Mensal"]},
                {name: "Nubank > Inter", value: -70.05, date: {day: 2, month: 3, year: 2023}, categories: ["Mensal"]},
                {name: "Nubank > Inter", value: -22.25, date: {day: 4, month: 3, year: 2023}, categories: ["Mensal"]},
                {name: "Nubank > Inter", value: -70.05, date: {day: 2, month: 3, year: 2023}, categories: ["Mensal"]},
                {name: "Inter > Nubank", value: 665.71, date: {day: 7, month: 3, year: 2023}, categories: ["Mensal"]},
                {name: "Inter > Nubank", value: 586.12, date: {day: 14, month: 3, year: 2023}, categories: ["Mensal"]},
                {name: "Pagamento de fatura", value: -547.37, date: {day: 24, month: 3, year: 2023}, categories: ["Mensal", "Pagamento de fatura"]},
                {name: "Cheers", value: -55, date: {day: 24, month: 3, year: 2023}, categories: ["Mensal"]},
                {name: "Auto escola - Reposição de aula", value: -198, date: {day: 28, month: 3, year: 2023}, categories: ["Mensal"]},
                {name: "Inter > Nubank", value: 78.20, date: {day: 28, month: 2, year: 2023}, categories: ["Mensal"]},
                {name: "Pagamento de fatura", value: -34.80, date: {day: 31, month: 3, year: 2023}, categories: ["Mensal", "Pagamento de fatura"]},
                {name: "Inter > Nubank", value: 308.65, date: {day: 2, month: 4, year: 2023}, categories: ["Mensal"]},
                {name: "Salário UTFPR", value: 750, date: {day: 4, month: 4, year: 2023}, categories: ["Mensal", "Salário"]},
                {name: "Guilherme Cum", value: -25, date: {day: 17, month: 4, year: 2023}, categories: ["Mensal"]},
                {name: "Inscrição no ENEM", value: -150, date: {day: 28, month: 4, year: 2023}, categories: ["Mensal"]},
                {name: "Pagamento de fatura", value: -232.31, date: {day: 2, month: 5, year: 2023}, categories: ["Mensal", "Pagamento de fatura"]},
                {name: "Salário UTFPR", value: 750, date: {day: 3, month: 5, year: 2023}, categories: ["Mensal", "Salário"]},
                {name: "RU UTFPR", value: -3.50, date: {day: 4, month: 5, year: 2023}, categories: ["Mensal"]},
                {name: "3hat", value: -3.50, date: {day: 5, month: 5, year: 2023}, categories: ["Mensal"]},
                {name: "Jerônimo hamburgueria", value: -42.30, date: {day: 7, month: 5, year: 2023}, categories: ["Mensal"]},
                {name: "Bruno Furlan", value: -17, date: {day: 8, month: 5, year: 2023}, categories: ["Mensal"]},
                {name: "Hellen", value: -1700, date: {day: 16, month: 5, year: 2023}, categories: ["Mensal"]},
                {name: "Easynvest > Nubank", value: 735.85, date: {day: 18, month: 5, year: 2023}, categories: ["Mensal"]},
                {name: "Estação", value: -33.80, date: {day: 18, month: 5, year: 2023}, categories: ["Mensal"]},
                {name: "Condor", value: -112.84, date: {day: 21, month: 5, year: 2023}, categories: ["Mensal"]},
                {name: "Beco do Pastel", value: -24.50, date: {day: 24, month: 5, year: 2023}, categories: ["Mensal"]},
                {name: "Festval", value: -35.50, date: {day: 25, month: 5, year: 2023}, categories: ["Mensal"]},
                {name: "Almoço com Daniboy", value: -28.50, date: {day: 26, month: 5, year: 2023}, categories: ["Mensal"]},
                {name: "Pagamento de fatura", value: -320.86, date: {day: 31, month: 5, year: 2023}, categories: ["Mensal", "Pagamento de fatura"]},
                {name: "Anel", value: -15, date: {day: 1, month: 6, year: 2023}, categories: ["Mensal"]},
                {name: "Feira de Design na UTFPR", value: -50, date: {day: 1, month: 6, year: 2023}, categories: ["Mensal"]},
                {name: "Salário UTFPR", value: 770, date: {day: 2, month: 6, year: 2023}, categories: ["Mensal", "Salário"]},
                {name: "Jessica", value: 8, date: {day: 7, month: 6, year: 2023}, categories: ["Mensal"]},
                {name: "Nubank > Luana", value: -20, date: {day: 11, month: 6, year: 2023}, categories: ["Mensal"]},
                {name: "Sushi no dia dos namorados", value: -148.10, date: {day: 12, month: 6, year: 2023}, categories: ["Mensal"]},
                {name: "Ian", value: -30, date: {day: 15, month: 6, year: 2023}, categories: ["Mensal"]},
                {name: "Cheers", value: -70, date: {day: 19, month: 6, year: 2023}, categories: ["Mensal"]},
                {name: "Inscrição na UTFPR", value: -85, date: {day: 21, month: 6, year: 2023}, categories: ["Mensal"]},
                {name: "Pagamento de fatura", value: -354.08, date: {day: 21, month: 6, year: 2023}, categories: ["Mensal", "Pagamento de fatura"]},
                {name: "AAADEC", value: -5, date: {day: 24, month: 6, year: 2023}, categories: ["Mensal"]},
                {name: "Nubank > Easynvest", value: -20, date: {day: 27, month: 6, year: 2023}, categories: ["Mensal"]},
                {name: "Pagamento de fatura", value: -94.17, date: {day: 30, month: 6, year: 2023}, categories: ["Mensal"]},
                {name: "Salário UTFPR", value: 770, date: {day: 3, month: 7, year: 2023}, categories: ["Mensal", "Salário"]},
                {name: "BK", value: -12.90, date: {day: 10, month: 7, year: 2023}, categories: ["Mensal"]},
                {name: "Churrasco", value: -16.40, date: {day: 17, month: 7, year: 2023}, categories: ["Mensal"]},
                {name: "Pix brincadeira", value: -0.03, date: {day: 17, month: 7, year: 2023}, categories: ["Mensal"]},
                {name: "Pagamento de fatura", value: -377.89, date: {day: 21, month: 7, year: 2023}, categories: ["Mensal", "Pagamento de fatura"]},
                {name: "Pix marketplace", value: -105.51, date: {day: 23, month: 7, year: 2023}, categories: ["Mensal"]},
                {name: "Pagamento de fatura", value: -58, date: {day: 31, month: 7, year: 2023}, categories: ["Mensal", "Pagamento de fatura"]},
                {name: "Uber, 99", value: -36.96, date: {day: 10, month: 8, year: 2023}, categories: ["Mensal"]},
                {name: "Uber, 99", value: -50, date: {day: 20, month: 8, year: 2023}, categories: ["Mensal"]},
                {name: "Pagamento de fatura", value: -265.18, date: {day: 20, month: 8, year: 2023}, categories: ["Mensal"]},
                {name: "Pix", value: -19, date: {day: 20, month: 8, year: 2023}, categories: ["Mensal"]},
                {name: "Salário WebHelp", value: 868.87, date: {day: 29, month: 8, year: 2023}, categories: ["Mensal", "Salário"]},
                {name: "Pagamento de fatura", value: -183.10, date: {day: 29, month: 8, year: 2023}, categories: ["Mensal", "Pagamento de fatura"]},
                {name: "Nubank > Toro", value: -180, date: {day: 30, month: 8, year: 2023}, categories: ["Mensal", "Nubank > Toro"]},
                {name: "Pix", value: -6, date: {day: 1, month: 9, year: 2023}, categories: ["Mensal"]},
                {name: "Salário WebHelp", value: 1271.85, date: {day: 5, month: 9, year: 2023}, categories: ["Mensal", "Salário"]},
                {name: "Nubank > Toro", value: -200, date: {day: 5, month: 9, year: 2023}, categories: ["Mensal", "Nubank > Toro"]},
                {name: "Cheers", value: -73.50, date: {day: 5, month: 9, year: 2023}, categories: ["Mensal"]},
                {name: "Churrasco", value: -30.01, date: {day: 9, month: 9, year: 2023}, categories: ["Mensal"]},
                {name: "Pagamento de fatura", value: -181.17, date: {day: 15, month: 9, year: 2023}, categories: ["Mensal", "Pagamento de fatura"]},
                {name: "Toro > Nubank", value: 151.92, date: {day: 18, month: 9, year: 2023}, categories: ["Mensal", "Toro > Nubank"]},
                {name: "RU UTFPR", value: -7, date: {day: 27, month: 9, year: 2023}, categories: ["Mensal"]},
                {name: "Toro > Nubank", value: 195, date: {day: 29, month: 9, year: 2023}, categories: ["Mensal", "Toro > Nubank"]},
                {name: "Pagamento da fatura", value: -5.73, date: {day: 30, month: 9, year: 2023}, categories: ["Mensal", "Pagamento da fatura"]},
                {name: "Posto", value: -34.98, date: {day: 30, month: 9, year: 2023}, categories: ["Mensal"]},
                {name: "Pagamento da fatura", value: -13.91, date: {day: 30, month: 9, year: 2023}, categories: ["Mensal", "Pagamento da fatura"]},
                {name: "RU UTFPR", value: -3.50, date: {day: 2, month: 10, year: 2023}, categories: ["Mensal"]},
                {name: "Nubank > Toro", value: -995, date: {day: 4, month: 10, year: 2023}, categories: ["Mensal", "Nubank > Toro"]},
                {name: "Venda de ingresso", value: 70, date: {day: 5, month: 10, year: 2023}, categories: ["Mensal"]},
                {name: "Rescisão WebHelp", value: 673, date: {day: 6, month: 10, year: 2023}, categories: ["Mensal", "Salário"]},
                {name: "Pagamento de fatura", value: -151.82, date: {day: 6, month: 10, year: 2023}, categories: ["Mensal", "Pagamento de fatura"]},
                {name: "3hat", value: -4, date: {day: 9, month: 10, year: 2023}, categories: ["Mensal"]},
                {name: "RU UTFPR", value: -3.50, date: {day: 9, month: 10, year: 2023}, categories: ["Mensal"]},
                {name: "Hellen", value: -134.99, date: {day: 12, month: 10, year: 2023}, categories: ["Mensal"]},
                {name: "Pagamento de fatura", value: -13.63, date: {day: 13, month: 10, year: 2023}, categories: ["Mensal", "Pagamento de fatura"]},
                {name: "Nubank > Toro", value: -850, date: {day: 13, month: 10, year: 2023}, categories: ["Mensal", "Nubank > Toro"]},
                {name: "Pagamento de fatura", value: -21.06, date: {day: 13, month: 10, year: 2023}, categories: ["Mensal", "Pagamento de fatura"]},
                {name: "Toro > Nubank", value: 832.29, date: {day: 16, month: 10, year: 2023}, categories: ["Mensal", "Toro > Nubank"]},
                {name: "oBoticário", value: -73.12, date: {day: 17, month: 10, year: 2023}, categories: ["Mensal"]},
                {name: "Nubank > Toro", value: -26.88, date: {day: 19, month: 10, year: 2023}, categories: ["Mensal", "Nubank > Toro"]},
                {name: "Pagamento de fatura", value: -7.35, date: {day: 20, month: 10, year: 2023}, categories: ["Mensal", "Pagamento de fatura"]},
                {name: "Nubank > Toro", value: -271.56, date: {day: 20, month: 10, year: 2023}, categories: ["Mensal", "Nubank > Toro"]},
                {name: "Pagamento de fatura", value: -17.22, date: {day: 20, month: 10, year: 2023}, categories: ["Mensal", "Pagamento de fatura"]},
                {name: "Cheers", value: -94.50, date: {day: 21, month: 10, year: 2023}, categories: ["Mensal"]},
                {name: "Pagamento de fatura", value: -25.33, date: {day: 23, month: 10, year: 2023}, categories: ["Mensal", "Pagamento de fatura"]},
                {name: "RU e Luana doente", value: -61.81, date: {day: 25, month: 10, year: 2023}, categories: ["Mensal"]},
                {name: "Toro > Nubank", value: 37.69, date: {day: 26, month: 10, year: 2023}, categories: ["Mensal", "Toro > Nubank"]},
                {name: "Nubank > Toro", value: -200, date: {day: 30, month: 10, year: 2023}, categories: ["Mensal", "Nubank > Toro"]},
                {name: "Luana", value: -58.80, date: {day: 1, month: 11, year: 2023}, categories: ["Mensal"]},
                {name: "Pagamento de fatura", value: -6.13, date: {day: 2, month: 11, year: 2023}, categories: ["Mensal", "Pagamento de fatura"]},
                {name: "Sirene com Blitzkow e Petrich", value: -20, date: {day: 4, month: 11, year: 2023}, categories: ["Mensal"]},
                {name: "Pagamento de fatura", value: -69.78, date: {day: 5, month: 11, year: 2023}, categories: ["Mensal", "Pagamento de fatura"]},
                {name: "Amalfi", value: -7.90, date: {day: 10, month: 11, year: 2023}, categories: ["Mensal"]},
                {name: "Pagamento de fatura", value: -34.10, date: {day: 12, month: 11, year: 2023}, categories: ["Mensal", "Pagamento de fatura"]},
                {name: "Toro > Nubank", value: 50.79, date: {day: 13, month: 11, year: 2023}, categories: ["Mensal", "Toro > Nubank"]},
                {name: "Gasolina", value: -30, date: {day: 14, month: 11, year: 2023}, categories: ["Mensal"]},
                {name: "BK", value: -26.80, date: {day: 16, month: 11, year: 2023}, categories: ["Mensal"]},
                {name: "Toro > Nubank", value: 30, date: {day: 16, month: 11, year: 2023}, categories: ["Mensal", "Toro > Nubank"]},
                {name: "Skarillang com Lucas, João e Júlia", value: -19.50, date: {day: 17, month: 11, year: 2023}, categories: ["Mensal"]},
                {name: "Nubank > Toro", value: -46.61, date: {day: 20, month: 11, year: 2023}, categories: ["Mensal", "Nubank > Toro"]},
                {name: "Toro > Nubank", value: 94, date: {day: 30, month: 11, year: 2023}, categories: ["Mensal", "Toro > Nubank"]},
                {name: "Pagamento de fatura", value: -33.69, date: {day: 30, month: 11, year: 2023}, categories: ["Mensal", "Pagamento de fatura"]},
                {name: "RU UTFPR", value: -3.50, date: {day: 6, month: 12, year: 2023}, categories: ["Mensal"]},
                {name: "Farmácia com Luana", value: -27.89, date: {day: 6, month: 12, year: 2023}, categories: ["Mensal"]},
                {name: "Toro > Nubank", value: 27.07, date: {day: 8, month: 12, year: 2023}, categories: ["Mensal", "Toro > Nubank"]},
                {name: "Salário benefícios", value: 228.87, date: {day: 3, month: 1, year: 2024}, categories: ["Mensal", "Salário"]},
                {name: "Pagamento de fatura", value:-200.68, date: {day: 3, month: 1, year: 2024}, categories: ["Mensal", "Pagamento de fatura"]},
                {name: "Venda do teclado", value: 150, date: {day: 4, month: 1, year: 2024}, categories: ["Mensal"]}
            ]}
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
                        }
                        else if(cmrIndex == categoryMonthResult.length - 1){
                            categoryMonthResult.push({date: {month: trans.date.month, year: trans.date.year}, result: trans.value})
                            break;
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
                            break;
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