export default function getHome(req, res){
    const greenColorMoney = "rgb(0, 200, 150)";
    const redColorMoney = "rgb(240, 0, 0)";
    const blackColorMoney = "rgb(0, 0, 0)";

    let infoBasObj = [[greenColorMoney, "Saldo médio mensal", "R$ 50,00"], 
                [blackColorMoney, "Ganhos médios mensais", "R$ 100,00"], 
                [blackColorMoney, "Gastos médios mensais", "R$ 50,00"]]

    let infoDetObj = [["Extrato Mensal", 
                [["00/00/00 - Transação", "R$ 30,00", greenColorMoney], 
                ["00/00/00 - Transação", "R$ 15,00", redColorMoney], 
                ["00/00/00 - Transação", "R$ 30,00", greenColorMoney], 
                ["00/00/00 - Transação", "R$ 15,00", redColorMoney], 
                ["00/00/00 - Transação", "R$ 30,00", greenColorMoney], 
                ["00/00/00 - Transação", "R$ 15,00", redColorMoney], 
                ["00/00/00 - Transação", "R$ 30,00", greenColorMoney], 
                ["00/00/00 - Transação", "R$ 15,00", redColorMoney], 
                ["00/00/00 - Transação", "R$ 30,00", greenColorMoney], 
                ["00/00/00 - Transação", "R$ 15,00", redColorMoney], 
                ["00/00/00 - Transação", "R$ 30,00", greenColorMoney], 
                ["00/00/00 - Transação", "R$ 15,00", redColorMoney], 
                ["00/00/00 - Transação", "R$ 30,00", greenColorMoney], 
                ["00/00/00 - Transação", "R$ 15,00", redColorMoney], 
                ["00/00/00 - Transação", "R$ 30,00", greenColorMoney], 
                ["00/00/00 - Transação", "R$ 15,00", redColorMoney], 
                ["00/00/00 - Transação", "R$ 30,00", greenColorMoney], 
                ["00/00/00 - Transação", "R$ 15,00", redColorMoney], 
                ["00/00/00 - Transação", "R$ 30,00", greenColorMoney], 
                ["00/00/00 - Transação", "R$ 15,00", redColorMoney]], 
                [greenColorMoney, "R$ 15,00"]]];

    let infoGraphObj = {body: [{porcentage: "95%", title: "03/2022 - R$ 0,00", cx: "5%"},
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
                        {value: "R$ 0,00", y: "96%"}
                        ]
                }

    let object = {
        infoBas: infoBasObj,
        infoDet: infoDetObj,
        infoGraph: infoGraphObj
    }

    res.send(object).end()
}