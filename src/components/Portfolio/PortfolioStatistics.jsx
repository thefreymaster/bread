import React, { Component } from 'react';
import { getBest, getWorst } from '../../api/PortfolioAPI';
import { LoafContext } from './../../LoafContext';
import { GREEN, RED, GREY } from '../../Constants';
import PortfolioStatItem from './PortfolioStatItem';
import None from './None';

class PortfolioStatistics extends Component {
    componentWillMount() {
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
    constructor(props) {
        super(props)
        this.state = {
            complete: false,
            best: {},
            worst: {}
        }
    }
    render() {
        if (!this.state.complete)
            return null
        else {
            if (Object.keys(this.state.best).length !== 0 || Object.keys(this.state.worst).length !== 0) {
                return (
                    <div className="flex flex-column width-100 flex-center">
                        {
                            Object.keys(this.state.best).length === 0
                                ?
                                <None center titleFontSize={18} title='None' label='No Best Investments' />
                                :
                                <PortfolioStatItem color={GREEN} label='Best Return' stat={this.state.best} />
                        }
                        <div className="shares-divider width-100 flex-center"></div>
                        {
                            Object.keys(this.state.worst).length === 0
                                ?
                                <None center titleFontSize={18} title='None' label='No Worst Investments' />
                                :
                                <PortfolioStatItem color={RED} label='Worst Return' stat={this.state.worst} />
                        } 
                    </div>
                )
            }
            else {
                return (
                    <div className="flex flex-column width-100">
                        <None titleFontSize={18} title='No Investments' label='Add shares to see Best and Worst investments here' />
                    </div>
                )
            }
        }

    }
}

export default PortfolioStatistics