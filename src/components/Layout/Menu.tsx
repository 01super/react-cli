import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import routes, { RouteType } from '@/router.config';

const { SubMenu } = Menu;

const MenuCom: React.FC = () => {
  // 子菜单的标题
  const subMenuTitle = (data: RouteType): JSX.Element => {
    const { icon: MenuIcon } = data;
    return (
      <span>
        {!!MenuIcon && <MenuIcon />}
        <span>{data.name}</span>
      </span>
    );
  };

  // 创建可展开的第一级子菜单
  const creatSubMenu = (data: RouteType): JSX.Element => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const menuItemList = data.routes!.map((item: RouteType) => renderMenu(item));

    return (
      <SubMenu key={data.path} title={subMenuTitle(data)}>
        {menuItemList}
      </SubMenu>
    );
  };

  // 创建可跳转的多级子菜单
  const createMenuItem = (data: RouteType): JSX.Element | null =>
    data.menu !== false ? (
      <Menu.Item key={data.path} title={data.breadcrumb}>
        <Link to={data.path}>{subMenuTitle(data)}</Link>
      </Menu.Item>
    ) : null;

  // 判断是否有子菜单，渲染不同组件
  function renderMenu(item: RouteType) {
    return item?.routes?.length ? creatSubMenu(item) : createMenuItem(item);
  }

  // 创建菜单树
  const renderMenuMap = (list: RouteType[]): (JSX.Element | null)[] =>
    list.map((item) => renderMenu(item));

  return (
    <Menu style={{ width: 256 }} defaultSelectedKeys={[]} defaultOpenKeys={[]} mode="inline">
      {renderMenuMap(routes)}
    </Menu>
  );
};

export default MenuCom;
