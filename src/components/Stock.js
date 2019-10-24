import React, { Component } from 'react'
import Plot from 'react-plotly.js';

export default class Stock extends Component {
    constructor(props){
        super(props);
        this.state={
            stockChartXValues: [],
            stockChartYValues: [],
        }
    }

    componentDidMount(){
        this.fetchStock();
    }

    fetchStock(){
        const pointerToThis = this;
        const API_KEY = 'YHEYNYKSRPSSV0NX';
        let API_CAll = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=^BVSP&outputsize=compact&apikey=${API_KEY}`;
        let stockChartXValuesFunction = [];
        let stockChartYValuesFunction = [];
        
        fetch(API_CAll)
            .then(function(response){
                return response.json()
            })
            .then(
                function(data){
                    console.log(data);

                    for(var key in data['Time Series (Daily)']){
                        stockChartXValuesFunction.push(key);
                        stockChartYValuesFunction.push(data['Time Series (Daily)']
                        [key]['1. open']);

                    }
                    pointerToThis.setState({
                        stockChartXValues: stockChartXValuesFunction,
                        stockChartYValues: stockChartYValuesFunction
                    })
                }
            )
    }

    render() {
        return (
            <>
                <h1 className="text-center">Stock Market</h1>
                    <br/>
                    <div className="text-center">
                    <Plot
                        data={[
                            {
                            x: this.state.stockChartXValues,
                            y: this.state.stockChartYValues,
                            type: 'scatter',
                            mode: 'lines+points',
                            marker: {color: 'red'},
                            },
                        ]}
                        layout={ {width: 720, height: 440, title: 'Ibovespa'} }
                    />
                    </div>
            </>
        )
    }
}
