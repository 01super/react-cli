import { Component, ErrorInfo, ReactNode } from 'react';

interface IProps {
    children: ReactNode;
    fallback?: ReactNode;
}

class ErrorBoundary extends Component<IProps, { hasError: boolean }> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            hasError: false,
        };
    }

    static getDerivedStateFromError(err: Error) {
        console.log('错误：', err);

        return {
            hasError: true,
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        // sendErrorToServer(error, errorInfo.componentStack);
        console.log('上报：：：', error, errorInfo.componentStack);
    }

    render() {
        const { hasError } = this.state;
        const { children, fallback } = this.props;
        return <div>{hasError ? fallback ?? <div>页面报错了：errors</div> : children}</div>;
    }
}

ErrorBoundary.defaultProps = {
    fallback: <div>页面报错了：errors</div>,
};

export default ErrorBoundary;
