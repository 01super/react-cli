import { immer } from '@/esm/middleware/immer';
// import { create } from 'zustand';
import { create } from '../zustandx';

const useTodoStore = create(
    immer((set) => ({
        todos: {
            '82471c5f-4207-4b1d-abcb-b98547e01a3e': {
                id: '82471c5f-4207-4b1d-abcb-b98547e01a3e',
                title: 'Learn Zustand',
                done: false,
            },
            '354ee16c-bfdd-44d3-afa9-e93679bda367': {
                id: '354ee16c-bfdd-44d3-afa9-e93679bda367',
                title: 'Learn Jotai',
                done: false,
            },
            '771c85c5-46ea-4a11-8fed-36cc2c7be344': {
                id: '771c85c5-46ea-4a11-8fed-36cc2c7be344',
                title: 'Learn Valtio',
                done: false,
            },
            '363a4bac-083f-47f7-a0a2-aeeee153a99c': {
                id: '363a4bac-083f-47f7-a0a2-aeeee153a99c',
                title: 'Learn Signals',
                done: false,
            },
        },
        toggleTodo: (todoId: string) => {
            return set((state) => {
                state.todos[todoId].done = !state.todos[todoId].done;
            });
        },
    })),
);

const WidthImmer = () => {
    const { todos, toggleTodo } = useTodoStore();

    return (
        <div className="box">
            <h2>集成immer</h2>
            {Object.entries(todos).map(([key, value]) => (
                <div
                    style={{
                        padding: '10px',
                        margin: '10px 0',
                        border: '1px solid #ccc',
                    }}
                    key={key}
                    onClick={() => {
                        toggleTodo(key);
                    }}
                >
                    <div>title: {value.title}</div>
                    <div>done: {value.done ? '完成' : '未完成'}</div>
                </div>
            ))}
        </div>
    );
};

export default WidthImmer;
