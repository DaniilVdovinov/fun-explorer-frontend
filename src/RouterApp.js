import React from 'react';
import {BrowserRouter as Router, Route, Link, Routes,} from "react-router-dom";
import {Layout, Menu} from 'antd';
import {
    ContactsOutlined,
    DesktopOutlined,
    CalculatorOutlined
} from "@ant-design/icons"
import {Contacts} from "./components/Utils";
import SwarmPage from "./components/Swarm";
import PopulationCreate from "./components/Genetic/create";
import GeneticPage from "./components/Genetic";
import PopulationItem from "./components/Genetic/item";
import SwarmCreate from "./components/Swarm/create";
import SwarmItem from "./components/Swarm/item";

const {Header, Content, Footer, Sider} = Layout;

class RouterApp extends React.Component {

    state = {
        collapsed: false,
    };

    onCollapse = (collapsed) => {
        this.setState({collapsed});
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        return (
            <Router>
                <Layout style={{minHeight: '100vh'}}>
                    <Sider theme="light"
                           collapsible
                           collapsed={this.state.collapsed}
                           onCollapse={this.onCollapse}>
                        <div className="logo"/>
                        <Menu defaultSelectedKeys={['genetic']} mode="inline">
                            <Menu.Item key="genetic">
                                <DesktopOutlined/>
                                <span>Genetic</span>
                                <Link to="/genetic"/>
                            </Menu.Item>
                            <Menu.Item key="swarm">
                                <DesktopOutlined/>
                                <span>Swarm</span>
                                <Link to="/swarm"/>
                            </Menu.Item>
                            <Menu.Item key="contacts">
                                <ContactsOutlined/>
                                <span>Contacts</span>
                                <Link to="/contacts"/>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{background: '#fff', padding: 0, paddingLeft: 16}}>
                            {/*<Link to={'..'}>*/}
                            {/*    <ArrowLeftOutlined*/}
                            {/*        style={{cursor: 'pointer'}}*/}
                            {/*    />*/}
                            {/*</Link>*/}
                            <CalculatorOutlined
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                style={{cursor: 'pointer', marginLeft: '20px'}}
                                onClick={this.toggle}
                            />
                            <b style={{marginLeft: '20px', fontSize: 20}}>Fun explorer</b>
                        </Header>
                        <Content style={{margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280}}>
                            <Routes>
                                <Route exact path="/swarm" element={<SwarmPage/>}/>
                                <Route exact path="/swarm/:id" element={<SwarmItem/>}/>
                                <Route exact path="/swarm/create" element={<SwarmCreate/>}/>

                                <Route exact path="/genetic" element={<GeneticPage/>}/>
                                <Route exact path="/genetic/:id" element={<PopulationItem/>}/>
                                <Route exact path="/genetic/create" element={<PopulationCreate/>}/>

                                <Route path="/contacts" element={<Contacts/>}></Route>
                            </Routes>
                        </Content>
                        <Footer style={{textAlign: 'center'}}>
                            ITIS 2023
                        </Footer>
                    </Layout>

                </Layout>
            </Router>
        );
    }
}


export default RouterApp;