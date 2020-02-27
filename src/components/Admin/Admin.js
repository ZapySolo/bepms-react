
import React, { Component } from 'react';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sideBarToggle: false,
            activeTab: 'home'
        };
    }

    render() {
        return (
            <div>Cannot be viewed in mobile</div>
        );
    }
}

export default Admin;
