import { todosStore } from '@/hooks/todosStore';
import { Button } from 'antd';

// 这两个都可以用，实现的功能是一样的
// import { useSyncExternalStore } from 'react';
import { useSyncExternalStore } from 'use-sync-external-store';

const SyncExternalStore = () => {
    const todos = useSyncExternalStore(todosStore.subscribe, todosStore.getSnapshot);
    console.log('SyncExternalStore: render');

    return (
        <div className="section">
            <h1>SyncExternalStore</h1>
            <p>
                zustand 依赖了这个api，react18 自带了这个hooks，老版本没有这个hooks，但是可以使用
                use-sync-external-store 来支持（需react支持hooks的版本）
            </p>
            <Button onClick={() => todosStore.addTodo()}>Add todo</Button>
            <hr />
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id} onClick={() => todosStore.deleteTodo(todo.id)}>
                        {todo.text}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SyncExternalStore;
