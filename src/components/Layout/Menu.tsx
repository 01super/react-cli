import React from 'react';
import { Menu } from 'antd';
import routes from '@/router.config';

const MenuCom: React.FC = () => {
    return (
        <Menu
            items={routes}
            style={{ width: 256 }}
            defaultSelectedKeys={[]}
            defaultOpenKeys={[]}
            mode="inline"
        ></Menu>
    );
};

export default MenuCom;
