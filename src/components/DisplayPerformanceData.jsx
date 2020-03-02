import React, { Component } from 'react';
import { getData } from "../modules/performanceData";
import { Line } from "react-chartjs-2";

class DisplayPerformanceData extends Component {
    state = {
        performanceData: null,
        renderIndex: false
    }
    componentDidMount() {
        this.getPerformanceData()
    }
    componentDidUpdate(prevProps) {
        if (this.props.updateIndex != prevProps.updateIndex) {
            this.getPerformanceData()
        }
    }
    async getPerformanceData() {
        let result = await getData();
        this.setState({performanceData: result.data.entries}, () => {
            this.props.indexUpdated();
        })
    }
    render () {
        let dataIndex;
        if (this.state.performanceData != null) {
            dataIndex = (
                <div>
                    {this.state.performanceData.map(item => {
                    return <div key={item.id}>Your result was {item.data.message} with {item.data.distance} meters</div>
                    })}
                </div>
            )
        }
        const distances = []
        const labels = []

        if (this.state.performanceData != null) {          
          this.state.performanceData.forEach(entry => {
              distances.push(entry.data.distance)
              labels.push(entry.data.message)
          })  
        }

        let dataForLineDiagram = {
            datasets: [{
                data: distances,   
                label: "your personal history data",
                fill: false,
                borderColor: "cyan",
                backgroundColor: "darkblue"           
            }],
            labels: labels,
        }
        return (
            <div id='index'>
                {dataIndex}
                <Line data={dataForLineDiagram}
                />
            </div>
        )
    }
}
export default DisplayPerformanceData;