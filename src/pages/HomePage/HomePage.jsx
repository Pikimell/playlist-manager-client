import style from './HomePage.module.css';
import { useState } from 'react';
import { Button, Card, Flex } from 'antd';
import { loginUrl } from '../../utils/constants.js';
import { Typography } from 'antd';

const HomePage = ({}) => {
  const handleClick = () => {
    window.location.replace(loginUrl);
  };

  return (
    <Flex vertical className="page-container" justify="center" align="center">
      <Card className={style.form}>
        <Typography.Title>PlayList Manager</Typography.Title>
        <Button onClick={handleClick}>Login</Button>
      </Card>
    </Flex>
  );
};

export default HomePage;
