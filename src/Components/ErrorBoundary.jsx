import React, { Component } from 'react';
import ErrorPanel from '../Components/ErrorPanel/ErrorPanel';

class ErrorBoundary extends Component {
constructor(props) {
    super(props);
    this.state = {
    hasError: false,
    };
}

componentDidMount() {
    this.checkWindowSize();
    window.addEventListener('resize', this.checkWindowSize);
}

componentWillUnmount() {
    window.removeEventListener('resize', this.checkWindowSize);
}

checkWindowSize = () => {
    try {
    if (window.innerWidth < 767) {
        throw new Error('No se puede acceder desde este dispositivo.');
    } else {
        this.setState({ hasError: false });
    }
    } catch (error) {
    this.setState({ hasError: true });
    }
};

render() {
    if (this.state.hasError) {
    return (
        <ErrorPanel />
    );
    }

    return this.props.children;
}
}

export default ErrorBoundary;
