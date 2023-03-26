import { Component, ReactNode } from 'react';

class IProps {
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

    render() {
        const { hasError } = this.state;
        const { children, fallback } = this.props;
        return <>{hasError ? fallback ?? <div>页面报错了：errors</div> : children}</>;
    }
}

export default ErrorBoundary;
