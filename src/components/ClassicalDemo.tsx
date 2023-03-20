import React from 'react';
import { flushSync, unstable_batchedUpdates } from 'react-dom';

type IState = Readonly<{ count: number }>;
class ClassicalDemo extends React.Component {
    state: IState = {
        count: 1,
    };

    handlePlus1 = () => {
        setTimeout(() => {
            this.setState(
                {
                    count: this.state.count + 1,
                },
                () => console.log('callback: ', this.state.count),
            );
            console.log('setTimeout: ', this.state.count);
        }, 0);
    };

    handlePlusByFn = () => {
        // 函数无法合并
        this.setState((p) => {
            console.log(p);
            return {
                count: p.count + 1,
            };
        });
        this.setState((p) => ({
            count: p.count + 1,
        }));
    };

    handlePlusByObj = () => {
        // 对象会合并，类似 Object.assign 的效果
        this.setState({
            count: this.state.count + 1,
        });
        this.setState({
            count: this.state.count + 1,
        });
    };

    handlePlusBySync = () => {
        flushSync(() => {
            this.setState({
                count: this.state.count + 1,
            });
        });
        console.log(this.state.count);
    };

    componentDidMount(): void {
        const $btn = document.getElementById('origin-btn') as HTMLButtonElement;
        $btn.addEventListener('click', () => {
            this.setState({
                count: this.state.count + 1,
            });
            console.log('原生事件: ', this.state.count);
        });
    }

    render(): React.ReactNode {
        return (
            <div>
                <p style={{ color: 'red' }}>count：{this.state.count}</p>
                <p>在 react 18 之前，react 中的 setState 在 setTimeout 和 原生事件中，表现为同步</p>
                <p>在合成事件和钩子（生命周期）函数中，表现为异步 </p>
                <button onClick={this.handlePlus1}>setTimeout + </button>
                <br />
                <br />
                <button id="origin-btn">原生事件 +</button>
                <p>对象会合并，类似 Object.assign 的效果，一次就只能加1</p>
                <button onClick={this.handlePlusByObj}>传对象调用多次setState +</button>
                <p>函数无法合并，就会有多个效果产生，一次加2</p>
                <button onClick={this.handlePlusByFn}>传函数调用多次setState +</button>
                <p>使用 flushSync 可以让setState 同步执行</p>
                <button onClick={this.handlePlusBySync}>flushSync异步改为同步setState +</button>
            </div>
        );
    }
}

export default ClassicalDemo;
