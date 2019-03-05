import React, { Component } from 'react';
import { getBest, getWorst } from '../../api/PortfolioAPI';
import { LoafContext } from './../../LoafContext';
import { GREEN, RED, GREY } from '../../Constants';
import PortfolioStatItem from './PortfolioStatItem';


class PortfolioStatistics extends Component {
    componentWillMount(){
        let best = getBest(this.context.trackedCompanies, this.context.quotes)
        best.then(response => {
            this.setState({
                best: response.data.best
            })
        })
        let worst = getWorst(this.context.trackedCompanies, this.context.quotes)
        worst.then(response => (
            this.setState({
                worst: response.data.worst,
                complete: true
            })
        ))
    }
    static contextType = LoafContext;
    constructor(props){
        super(props)
        this.state = {
            complete: false
        }
    }
    render() {
        if(!this.state.complete)
            return null
        else{
            return(
                <div className="flex flex-column width-100">
                    <PortfolioStatItem color={GREEN} label='Best Return' stat={this.state.best} />
                    <div className="shares-divider width-100"></div>
                    <PortfolioStatItem color={RED} label='Worst Return' stat={this.state.worst} />
                </div>
            )
        }

    }
}

export default PortfolioStatistics