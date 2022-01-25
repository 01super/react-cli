import React, { FC } from 'react';
import { Breadcrumb } from 'antd';
import { useLocation } from 'react-router-dom';
import routes from '@/router.config';
import useBreadcrumb from '@/utils/useBreadcrumb';

const style = {
    height: 40,
    paddingLeft: 20,
    lineHeight: '40px',
    background: '#ffffff',
};

// 通用面包屑
const Breadcrumbs: FC = () => {
    const location = useLocation();

    const breadcrumbs = useBreadcrumb(routes, location, { excludePaths: ['/'] });

    return (
        <Breadcrumb style={style}>
            {breadcrumbs.map(({ breadcrumb, key }) => (
                <Breadcrumb.Item key={key}>{breadcrumb}</Breadcrumb.Item>
            ))}
        </Breadcrumb>
    );
};

export default Breadcrumbs;
