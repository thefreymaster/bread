import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Systems from './../Body/Systems';
import { LoafContext } from './../../LoafContext';
import Loser from './Loser';
import Gainer from './Gainer';
import PieGraph from './../PieGraph/PieGraph';
import { findIndex } from './../HelperFunctions/Helper';
import BarGraph from '../BarGraph/BarGraph';
import Loader from './../Load';
import PortfolioToday from './PortofolioToday';

class Portfolio extends Component {
    calculatePortfolioTotal = () => {

    }
    componentDidMount() {
        this.props.setActiveTicker('portfolio', '', false, -1);
    }
    static contextType = LoafContext;
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        if(!this.context.portfolio)
            return null
        else
        return (
            <div className="flex flex-column" style={{ marginRight: 15 }}>
                <div className='flex flex-row border-top'>
                    <PortfolioToday 
                        currentTotal={this.context.portfolio.currentTotal} 
                        previousTotal={this.context.portfolio.previousTotal}
                        percentChange={this.context.portfolio.percentChange}
                        total={this.context.portfolio.total}
                         />
                    <div className={"loaf-component flex flex-column flex-start-center"} style={{ height: (window.innerHeight - 84) * 0.40, width: '50%' }}>
                        <Link className='width-100' to="/quote" onClick={() => this.props.setActiveTicker(this.context.portfolio.gainer.symbol, this.context.portfolio.gainer, false, findIndex(this.context.portfolio.gainer.symbol, this.props.trackedCompanies))}>
                            <Gainer gainer={this.context.portfolio.gainer} />
                        </Link>
                        <div className="shares-divider width-100"></div>
                        <Link className='width-100' to="/quote" onClick={() => this.props.setActiveTicker(this.context.portfolio.loser.symbol, this.context.portfolio.loser, false, findIndex(this.context.portfolio.loser.symbol, this.props.trackedCompanies))}>
                            <Loser loser={this.context.portfolio.loser} />
                        </Link>
                    </div>
                </div>
                <div className='flex flex-row'>
                    <div className="flex flex-column flex-center dashed-border-top width-60 dashed-border-right">
                        {
                            !this.context.portfolio.quotes ? <div className="flex flex-row flex-center show-zoom-animation" style={{ height: (window.innerHeight - 84) * 0.54, width: this.props.width }}>
                                <Loader
                                    type="Bars"
                                    color="#000000a6"
                                    height="20"
                                    width="20"
                                />
                            </div> : <PieGraph width={'100%'} change={this.context.portfolio.percentChange} currentTotal={this.context.portfolio.currentTotal} data={this.props.trackedCompanies} quotes={this.context.quotes} />
                        }
                    </div>
                    <div className="flex flex-column dashed-border-top width-40">
                        {
                            !this.context.portfolio.quotes ? <div className="flex flex-row flex-center show-zoom-animation" style={{ height: (window.innerHeight - 84) * 0.54, width: this.props.width }}>
                                <Loader
                                    type="Bars"
                                    color="#000000a6"
                                    height="20"
                                    width="20"
                                />
                            </div>
                                :
                                <BarGraph width={'100%'} total={this.context.portfolio.total} change={this.context.portfolio.percentChange} currentTotal={this.context.portfolio.currentTotal} data={this.props.trackedCompanies} quotes={this.context.quotes} />
                        }
                    </div>
                </div>

                <Systems />

            </div>
        )
    }
}

export default Portfolio;