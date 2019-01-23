import React, { Component } from 'react';
import './AddCompany.css';

import { Button } from 'antd';


class AddCompany extends Component {
    render() {
        return(
            <div className="add-company-component">
                <Button className="width100 loaf-button">Add Company</Button>
            </div>
        )
    }
}

export default AddCompany;
