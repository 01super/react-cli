import { Component } from 'react';

type IProps = Readonly<{ name: string }>;
class LifeCycle extends Component<IProps, { num: number }> {
    constructor(props: IProps) {
        console.log('constructor');
        super(props);
        this.state = {
            num: 100,
        };
    }

    /**
     * getDerivedStateFromProps 会在调用 render 方法之前调用，
     * 并且在初始挂载及后续更新时都会被调用。它应返回一个对象来更新 state，如果返回 null 则不更新任何内容。
     */
    static getDerivedStateFromProps(props, state) {
        console.log('getDerivedStateFromProps');
        console.log('props, state: ', props, state);
        return { num: 0 };
    }

    shouldComponentUpdate(
        nextProps: Readonly<Readonly<{ name: string }>>,
        nextState: Readonly<{ num: number }>,
        nextContext: any,
    ): boolean {
        console.log('shouldComponentUpdate');
        return true;
    }

    componentDidMount(): void {
        console.log('componentDidMount');
    }

    componentDidUpdate(
        prevProps: Readonly<Readonly<{ name: string }>>,
        prevState: Readonly<{ num: number }>,
        snapshot?: any,
    ): void {
        console.log('componentDidUpdate：snapshot: ', snapshot);
    }

    // getSnapshotBeforeUpdate() 在最近一次渲染输出（提交到 DOM 节点）之前调用。
    // 它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。
    // 此生命周期方法的任何返回值将作为参数传递给 componentDidUpdate()。
    getSnapshotBeforeUpdate(
        prevProps: Readonly<Readonly<{ name: string }>>,
        prevState: Readonly<{ num: number }>,
    ) {
        console.log('getSnapshotBeforeUpdate');
        return 'getSnapshotBeforeUpdate return value';
    }

    changeNum = () => {
        this.setState({ num: this.state.num + 1 });
    };

    render() {
        console.log('render');
        return (
            <div>
                <p>num: {this.state.num}</p>
                <button onClick={this.changeNum}>change num</button>
            </div>
        );
    }
}

export default LifeCycle;
