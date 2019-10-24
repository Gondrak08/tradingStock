import React, { Component } from 'react'
import StockInfo from './stockInfo';

export default class Profile extends Component {
    constructor(props){
        super(props);

        this.state={
            isLoading:true,
            error: null,
            results:[]
        };
        this.fetchStock = this.fetchStock.bind(this);
    }  
    componentDidMount(){
        this.fetchStock();
    }
    
    fetchStock(){
        
        const API_KEY = 'YHEYNYKSRPSSV0NX';
        let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=^BVSP&outputsize=compact&apikey=${API_KEY}`;
        let stockChartXValuesFunction = [];
        let stockChartYValuesFunction = [];
        

        fetch(API_Call)
            .then(res => res.json())
            .then(json => {
                    if(json.success){
                    this.setState({
                        isLoading:false,
                        results: json.results
                    })
                    }else{
                    this.setState({
                        isLoading: false,
                        error: json.message,
                    });
                    }
                });
            
    }
    



    render() {
        const{error,isLoading, results} = this.state;
            if (isLoading){
        return(
            <div>
                <p>Loading...</p>
            </div>
            );
        }
        if(error){
            return(
            <div style={{backgroundColor:'#610B21'}} >
                <p style={{color:'#fff'}} >{error}</p>
            </div>
            )
        }
        console.log(results)
        return (
            <>
             <p>Stock Market BOVESPA</p>   
                {
                    results.map(result => <StockInfo data={result} />) 
                }
                
            </>
        )
    }
}
