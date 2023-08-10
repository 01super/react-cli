/**
 * 创建状态仓库
 * @param {*} createState
 * 获取状态 getState
 * 设置状态 setState(state, replace) 既可以覆盖 、也可以合并
 * 订阅 listener  返回一个销毁的监听函数
 * 销毁 destroy
 */

export const createStore = (createState) => {
    let state;

    const listeners = new Set();

    const getState = () => state;

    /**
     *
     * @param {object|function} partial
     * @param {boolean} replace
     */
    const setState = (partial, replace) => {
        // 传进来的状态可以是函数，也可以是对象
        const nextState = typeof partial === 'function' ? partial(state) : partial;

        // 判断状态值是否改变
        if (!Object.is(nextState, state)) {
            // 存下之前的值
            const previousState = state;
            // 修改现在的值
            state =
                replace ?? typeof nextState !== 'object'
                    ? nextState
                    : Object.assign({}, state, nextState);
            // 触发监听，react会判断，同时给监听的回调函数传上新值和旧值
            listeners.forEach((listener) => listener(state, previousState));
        }
    };

    const subscribe = (listener) => {
        // 这里可以查看react源码里面的处理
        console.log('listener: ', listener);
        listeners.add(listener);
        // 返回一个取消订阅的函数
        return () => listeners.delete(listener);
    };

    // 删除所有订阅
    const destroy = () => {
        listeners.clear();
    };

    const api = {
        setState,
        getState,
        destroy,
        subscribe,
    };

    state = createState(setState, getState, api);

    return api;
};
