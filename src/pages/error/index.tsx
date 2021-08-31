import React, { FC } from 'react';
import { Button, Result } from 'antd';
import { useHistory } from 'react-router-dom';

const ErrorPage: FC<{ status: number }> = ({ status }) => {
  const history = useHistory();

  const handleBack = () => {
    history.push('/user/user');
  };

  const backBtn = (
    <Button type="primary" onClick={handleBack}>
      返回首页
    </Button>
  );

  return status === 404 ? (
    <Result
      status="403"
      title="403"
      subTitle="抱歉，您无权访问此页面，如有疑问请联系管理员！"
      extra={backBtn}
    />
  ) : (
    <Result status="403" title="403" subTitle="抱歉，您访问的地址不存在！" extra={backBtn} />
  );
};

export default ErrorPage;
