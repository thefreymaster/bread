import React, { Component } from 'react';
import classnames from 'classnames';
import "./Body.css";
import Today from './Today/Today';
import YourShares from './YourShares/YourShares';
import LineChart from '../LineChart/LineChart';
import Systems from './Systems';
import Recomendations from '../Recomendations/Recomendations';
import GetRecomendations from '../Recomendations/GetRecomendations';



class Bread extends Component {
    showRecomendations = () => {
        this.setState({
            getRecomendations: true
        })
    }
    receiveUpdateFromChild = (obj) => {
        this.setState({ ...obj })
    }
    componentWillMount() {
        if (this.props.activeTickerIndex === undefined) {
            this.props.setActiveTicker(this.props.trackedCompanies[0].symbol, this.props.trackedCompanies[0], false)
        }
    }
    componentDidUpdate(prevProps){
        if(this.props.activeTicker !== prevProps.activeTicker)
        {
            this.setState({
                getRecomendations: false
            })
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            green: "#2ec061",
            red: "#c61515",
            getRecomendations: false
        }
    }
    render() {
        if (this.props.activeTickerIndex === undefined || this.props.trackedCompanies.length === 0)
            return null;
        else {
            const index = this.props.activeTickerIndex;
            const userHasShares = this.props.trackedCompanies[index].shares.hasShares
            const count = this.props.trackedCompanies[index].shares.count;
            const price = this.props.trackedCompanies[index].shares.price;
            return (
                <div className="flex flex-column" style={{ marginRight: 15 }}>
                    <div className={classnames("flex", { "flex-column": this.props.screen.xs, "flex-row": !this.props.screen.xs || !this.props.screen.sm })}>
                        <Today sendUpdateToParent={this.receiveUpdateFromChild} screen={this.props.screen} trackedCompanies={this.props.trackedCompanies} removeCompanyFromTrackedCompanies={this.props.removeCompanyFromTrackedCompanies} ticker={this.props.activeTicker} />
                        <YourShares
                            week52High={this.state.week52High}
                            week52Low={this.state.week52Low}
                            price={this.state.price}
                            width={50}
                            index={index}
                            count={count}
                            price={price}
                            trackedCompanies={this.props.trackedCompanies}
                            saveShares={this.props.saveShares}
                            ticker={this.props.activeTicker}
                            userHasShares={userHasShares} />
                    </div>
                    <div className='flex flex-row'>
                        <div className="flex flex-column dashed-border-top width-75">
                            <div className="flex flex-row dashed-border-bottom width-100">
                                <LineChart screen={this.props.screen} width={'50%'} ticker={this.props.activeTicker} timeframe={'1d'} interval={10} title='1 Day' rightDivider />
                                <LineChart screen={this.props.screen} width={'50%'} ticker={this.props.activeTicker} timeframe={'6m'} interval={2} title='6 Month' rightDivider />
                            </div>
                            <div className="flex flex-row width-100">
                                <LineChart screen={this.props.screen} width={'50%'} ticker={this.props.activeTicker} timeframe={'1y'} interval={5} title='1 Year' rightDivider />
                                <LineChart screen={this.props.screen} width={'50%'} ticker={this.props.activeTicker} timeframe={'5y'} interval={20} title='5 Year' rightDivider />
                            </div>
                        </div>
                        <div className="flex flex-column width-25 dashed-border-top flex-center">
                            {
                                this.state.getRecomendations
                                ?
                                <Recomendations />
                                :
                                <GetRecomendations showRecomendations={this.showRecomendations} />
                            }
                        </div>
                    </div>
                    {/* <div className="flex flex-row dashed-border-bottom dashed-border-top">
                        <LineChart screen={this.props.screen} width={'33%'} ticker={this.props.activeTicker} timeframe={'1d'} interval={10} title='1 Day' rightDivider />
                        <LineChart screen={this.props.screen} width={'33%'} ticker={this.props.activeTicker} timeframe={'6m'} interval={2} title='6 Month' rightDivider />
                    </div> */}
                    {/* <div className="flex flex-row">
                        <LineChart screen={this.props.screen} width={'33%'} ticker={this.props.activeTicker} timeframe={'1y'} interval={5} title='1 Year' rightDivider />
                        <LineChart screen={this.props.screen} width={'33%'} ticker={this.props.activeTicker} timeframe={'5y'} interval={20} title='5 Year' rightDivider />
                    </div> */}
                    <Systems />
                </div>
            )
        }

    }
}

export default Bread;