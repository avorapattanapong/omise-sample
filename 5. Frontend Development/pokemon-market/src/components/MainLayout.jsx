import React from 'react';
import {
  Breadcrumb,
  Col,
  Input,
  Layout,
  Menu,
  Row,
  theme,
  Typography,
  Space, Button
} from 'antd';
import {
  ShoppingCartOutlined
} from '@ant-design/icons';
import {setFilters, setPage} from "../redux/slices/cards.js";
import {useDispatch} from "react-redux";
import {toggleCartDrawer} from "../redux/slices/app.js";
import usePokemonCards from "../redux/hooks/pokemon.js";
const { Header, Content, Footer } = Layout;
const { Title } = Typography;
const { Search } = Input;


function MainLayout({children}) {
  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  const {
    updateFilters,
    doFetchCards
  } = usePokemonCards();

  const dispatch = useDispatch();
  const onCartButtonClick = () => {
    dispatch(toggleCartDrawer(true));
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
    <Layout>
        <Header style={{ display: 'flex', alignItems: 'start' }}>
          <Row style={{ width: '100%' }}>
            <Col style={{textAlign: 'left'}} span={8}>
              <span style={{ fontSize: 'large'}}>Pokemon Market</span>
            </Col>
            <Col span={8} offset={8}>
              <Space align={'center'} style={{ float: 'right' }}>
                <Input.Search
                  placeholder="Search by name"
                  onSearch={doFetchCards}
                  onChange={(e) => updateFilters({name: e.target.value})}
                  allowClear
                />
                <Button type="primary" shape="default" icon={<ShoppingCartOutlined />} onClick={onCartButtonClick} />
              </Space>
            </Col>
          </Row>

        </Header>
        <Content style={{ padding: '0 48px' }}>
          <div
            style={{
              minHeight: 280,
              padding: 24,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Athikom Vorapattanapong ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
    </Layout>
    </div>
  );
}

export default MainLayout;
