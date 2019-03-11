import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Metric from '../Body/Metric';
import ChangeBadge from '../ChangeBadge/ChangeBadge';
import classnames from 'classnames';


class Portfolio extends Component {
    constructor(props){
        super(props)
    }
    render() {
        const index = this.props.activeTickerIndex;
        return (
            <Link to="/portfolio">
                <div
                    className={classnames('padding10 margin10 companies-button loaf-button-hover-action', { 'active-loaf-button ':  this.props.activeTicker === 'portfolio', 'box-shadow-bottom': this.props.trackedCompanies.length !== parseInt(index) })}
                    onClick={() => { this.props.setActiveTicker('portfolio', '', false, -1 )}}>
                    <div className={classnames("flex flex-row")}>
                        <div className={'flex flex-column width-100'}>
                            <div className={classnames("flex flex-row")}>
                                <div className={classnames("flex flex-column")}>
                                    <Metric
                                        fontFamily={'Open Sans'}
                                        fontWeight={900}
                                        titleFontSize={14}
                                        title={'Your Portfolio'}
                                        label={'Latest Changes'}
                                        center={false}
                                    />
                                    <Metric
                                        fontFamily={'Open Sans'}
                                        fontWeight={900}
                                        titleFontSize={12}
                                        
                                        labelFontSize={11}
                                        center={false}
                                    />
                                </div>
                                {/* {!this.state.quickQuotes ?
                                    null
                                    :
                                    this.state.quickQuotes[company.symbol]
                                        ?
                                        <div className={'flex flex-badge flex-column'}>
                                            <ChangeBadge
                                                backgroundColor={this.determineColor(company.shares.count, company.shares.price, this.state.quickQuotes[company.symbol].quote.latestPrice)}
                                                company={company}
                                                count={this.determineText(company.shares.count, company.shares.price, this.state.quickQuotes[company.symbol].quote.latestPrice)}
                                            />
                                        </div>
                                        :
                                        null
                                } */}
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        )
    }
}

export default Portfolio;