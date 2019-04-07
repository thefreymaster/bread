import React from 'react';
import { Tag, Button, Icon, Tooltip } from 'antd';
import { SECTORS } from './../../Constants';
import Metric from '../Body/Metric';
import { Radio } from 'antd';
import { getSectorQuotes } from '../../api/SectorAPI';
import { sortCompaniesYTDChangeForChoices, filterLowVolumeCompaniesOut, filterCompaniesWithoutSymbols } from '../HelperFunctions/Helper';
import { LoafContext } from '../../LoafContext';
import { Link } from 'react-router-dom';

const { CheckableTag } = Tag;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class Choices extends React.Component {
    getSectorQuotes = () => {
        let that = this;
        let sectors = getSectorQuotes(this.state.selectedSector)
        sectors.then((response) => {
            let sorted = sortCompaniesYTDChangeForChoices(response)
            let filtered = filterLowVolumeCompaniesOut(sorted);
            (filtered.forEach(company => {
                that.context.addCompanyToTrackedCompanies(company.symbol, {
                    date: new Date(),
                    isEnabled: true,
                    symbol: company.symbol
                })
            }));
        })
    }
    markSectionMade = (e) => {
        this.setState({
            selectionMade: true,
            selectedSector: e.target.value,
        })
    }
    static contextType = LoafContext;
    constructor(props) {
        super(props)
        this.state = {
            selectionMade: false
        }
    }
    render() {
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        return (
            <div className='flex flex-column flex-center' style={{ height: window.innerHeight - 64 }}>
                <Metric
                    fontWeight={500}
                    titleFontSize={32}
                    title={'Get Started'}
                    labelFontSize={18}
                    label={'Choose your sector to focus on'}
                    center={true}
                />
                <div className='shares-divider'></div>
                <div className='flex flex-row flex-center'>
                    <div className='border-right spacing-right'>
                        <RadioGroup defaultValue="" size="large">
                            {SECTORS.map((sector) => {
                                return (
                                    <Radio onClick={this.markSectionMade} style={radioStyle} value={sector.name}>{sector.name}</Radio>
                                )
                            })}
                        </RadioGroup>
                    </div>

                    <div className="flex flex-column">
                        <Link to="/add">
                            <Button
                                style={{ borderRadius: 50, minWidth: 150 }}
                                className={'loaf-button open-sans'}
                                type="dashed"
                                size="small"
                                onClick={this.getSectorQuotes}>
                                Or Add Your Own
                                </Button>
                        </Link>
                        <div style={{ marginBottom: 15 }}></div>

                        <Tooltip visible={!this.state.selectionMade} placement="right" title={'Make a selection to continue'}>
                            <Button
                                disabled={!this.state.selectionMade}
                                style={{ borderRadius: 50, minWidth: 150 }}
                                className={'loaf-button open-sans'}
                                type="default"
                                onClick={this.getSectorQuotes}
                                icon="forward">Begin<Icon type="forward" />
                            </Button>
                        </Tooltip>

                    </div>
                </div>
            </div>
        )
    }
}

export default Choices;