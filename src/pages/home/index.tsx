import React from 'react';

const Home: React.FC = () => {
    const [title, setTitle] = React.useState(99);

    const handleClick = (): void => {
        setTitle((pre) => pre + 1);
    };

    return (
        <section>
            <div onClick={handleClick}>{title}</div>
            <div>909也uu00000</div>
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
            </ul>
        </section>
    );
};
export default Home;
