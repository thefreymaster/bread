import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import Metric from '../Body/Metric';
import ChangeBadge from '../ChangeBadge/ChangeBadge';
import classnames from 'classnames';
import { LoafContext } from './../../LoafContext';
import { RED, GREEN } from '../../Constants';
import PieGraph from './../PieGraph/PieGraph';

class Portfolio extends Component {
    getPercentAndPrice() {
        if (this.context.portfolio) {
            return this.context.portfolio.currentTotal
        }
    }
    getColor() {
        if (this.context.portfolio) {
            return this.context.portfolio.percentChange > 0 ? GREEN : RED
        }
    }
    static contextType = LoafContext;
    constructor(props) {
        super(props)
    }
    render() {
        const index = this.props.activeTickerIndex;
        if (!this.context.portfolio)
            return null
        else {
            const { percentChange } = this.context.portfolio;

            return (
                <Link to="/portfolio">
                    <div
                        className={classnames('padding10 companies-button loaf-button-hover-action', { 'active-loaf-button ': this.props.activeTicker === 'portfolio'})}
                        onClick={() => { this.props.setActiveTicker('portfolio', '', false, -1) }}>
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
                                        <Metric
                                            fontFamily={'Open Sans'}
                                            fontWeight={900}
                                            titleFontSize={11}
                                            prefix='$'
                                            number
                                            duration={1}
                                            decimals={2}
                                            color={this.getColor()}
                                            title={this.getPercentAndPrice()}
                                            labelFontSize={11}
                                            center={false}
                                        />

                                    </div>
                                    <div className={'flex flex-badge flex-column'}>
                                        <ChangeBadge
                                            backgroundColor={this.getColor()}
                                            width={75}
                                            count={'$' + parseFloat(this.context.portfolio.currentTotal - this.context.portfolio.previousTotal).toFixed(2)}
                                        />
                                        <ChangeBadge
                                            backgroundColor={this.getColor()}
                                            width={75}
                                            count={percentChange + '%'}
                                        />
                                    </div>
                                </div>
                                {
                                    this.props.activeTicker === 'portfolio' && (this.context.screen.xs || this.context.screen.sm)
                                        ?
                                        <Fragment>
                                            <div className="shares-divider"></div>
                                            <PieGraph width={'100%'} change={this.context.portfolio.percentChange} currentTotal={this.context.portfolio.currentTotal} data={this.props.trackedCompanies} quotes={this.context.quotes} />
                                        </Fragment>
                                        :
                                        null
                                }
                            </div>
                        </div>
                    </div>
                </Link>
            )
        }

    }
}

export default Portfolio;