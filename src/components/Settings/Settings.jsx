import React, { Fragment } from 'react';
import Metric from '../Body/Metric';
import { GREY, LIGHT_GREY } from '../../Constants';
import { Avatar, Button } from 'antd'
import { LoafContext } from '../../LoafContext';
import { signOutUser } from '../../api/FirebaseAPI';
import LOAF from '../../assets/loaf.svg';


const Settings = (props: Object) => (
    <LoafContext.Consumer>
        {
            context => {
                let { account } = context;
                return (
                    <Fragment>
                        <div className="shares-divider width-100"></div>

                        <div style={{ marginRight: 15, height: window.innerHeight - 106 }} className={'flex flex-center flex-column'}>
                            <div className="flex flex-row">
                                <div className="flex flex-column loaf-component flex-center width-100" style={{ padding: 25 }}>
                                    <img src={LOAF} className='logo-large' />
                                    <Metric
                                        fontWeight={300}
                                        titleFontSize={24}
                                        title={'Bread'}
                                        center
                                        color={GREY}
                                        label={process.env.REACT_APP_VERSION}
                                        labelFontSize={12}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-row">
                                <div className="flex flex-column loaf-component flex-center width-50 border-right" style={{ padding: 25 }}>
                                    {/* <Avatar src={account.photoURL} size={64} icon="user" /> */}
                                    <Metric
                                        fontFamily={'Open Sans'}
                                        fontWeight={300}
                                        titleFontSize={24}
                                        title={account.displayName}
                                        center
                                        color={GREY}
                                        label={'All About You'}
                                        labelFontSize={12}
                                    />
                                </div>
                                <div className="flex flex-column loaf-component flex-center width-50" style={{ padding: 25 }}>
                                    <Metric
                                        fontFamily={'Open Sans'}
                                        fontWeight={300}
                                        titleFontSize={24}
                                        title={account.email}
                                        center
                                        color={GREY}
                                        label={'Account Email'}
                                        labelFontSize={12}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-row">
                                <div className="flex flex-column loaf-component flex-center width-100" style={{ padding: 25 }}>
                                    <Button icon="logout" size="large" onClick={signOutUser} className={'loaf-button open-sans'} style={{ borderRadius: 50, minWidth: 100 }} type="default">Logout</Button>
                                </div>
                            </div>

                        </div>
                    </Fragment>
                )

            }
        }

    </LoafContext.Consumer>
)

export default Settings;