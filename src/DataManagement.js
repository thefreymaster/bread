import React, { Component } from 'react';
import { connect } from "react-redux";

class DataManagement extends Component {
    checkDeviceSize = () => {
        if (window.innerWidth < 600) {
            this.props.updateScreenBreakpoint({ xs: true, sm: false, md: false, lg: false,xl: false })
        }
        if (window.innerWidth >= 600 && window.innerWidth < 960) {
            this.props.updateScreenBreakpoint({ xs: false, sm: true, md: false, lg: false, xl: false })
        }
        if (window.innerWidth >= 960 && window.innerWidth < 1280) {
            this.props.updateScreenBreakpoint({ xs: false, sm: false, md: true, lg: false, xl: false })
        }
        if (window.innerWidth >= 1280 && window.innerWidth < 1920) {
            this.props.updateScreenBreakpoint({ xs: false, sm: false, md: false, lg: true, xl: false })
        }
        if (window.innerWidth >= 1920) {
            this.props.updateScreenBreakpoint({ xs: false, sm: false, md: false, lg: false, xl: true })
        }
    }
    componentDidMount(){
        this.checkDeviceSize();
        window.addEventListener('resize', () => {
          this.checkDeviceSize();
        })
    }
    render() {
        return (
            this.props.children
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateScreenBreakpoint: (screen) => dispatch({ type: "SCREEN_SIZE_UPDATE", screen })
    };
  };

export default connect(null, mapDispatchToProps)(DataManagement);