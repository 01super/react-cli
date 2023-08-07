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
            const previousState = state;
            state =
                replace ?? typeof nextState !== 'object'
                    ? nextState
                    : Object.assign({}, state, nextState);
            listeners.forEach((listener) => listener(state, previousState));
        }
    };

    const subscribe = (listener) => {
        listeners.add(listener);
        return () => listeners.delete(listener);
    };

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
