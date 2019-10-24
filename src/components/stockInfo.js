import React from 'react'
import {LineChart, Line, XAxis, YAxis, CartesianGrid} from 'recharts';

const stockInfo = (props) => {
    const{data} =props;

    const timeSeries =data['Time Series (Daily)'];
    const rows=[];

    for (var key in timeSeries){
        if(timeSeries[key]){
            const finData = timeSeries[key];
            const open = finData['1. open'];
            const high = finData['2. high'];
            const low = finData['3. low'];
            const close = finData['4. close'];
            const volume = finData['5. volume'];
            
        rows.push({
            date:key,
            open,
            high,
            low,
            close,
            volume
    });

        }
    }

    console.log(rows)

    return (
        <>
        <LineChart width={500} height={300} data={rows} >
            <XAxis dataKey="data"/>
            <YAxis/>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
            Line type="monotone" dataKey="open" stroke="#8884d8" activeDot={{r: 8}}/>
            <Line type="monotone" dataKey="high" stroke="#82ca9d" />
            <Line type="monotone" dataKey="low" stroke="#B4045F" />
            <Line type="monotone" dataKey="close" stroke="#868A08" />
        </LineChart>
        </>
    )
}

export default stockInfo
