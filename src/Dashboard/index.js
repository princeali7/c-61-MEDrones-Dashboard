import React, {Component} from 'react';
import {Icon, Layout, LocaleProvider, Menu} from 'antd';
import en_US from 'antd/lib/locale-provider/en_US';
import 'whatwg-fetch';
import {observer} from 'mobx-react';
import '@shopify/polaris/styles.css';
import RescueDashboard from './RescueDashboard';
import '../App.css';
import '../tailwind.css';
import history from '../components/history';
import {Route, Router as Router} from 'react-router-dom';

import DB from '../store';

const { Header, Sider, Content } = Layout;


@observer
export default class Dashboard extends Component {


	constructor(props) {
		super(props);
		console.log(props);
		DB.showdashboard=false;

	}
	componentWillMount(){

		DB.getUser();

	}

	componentDidMount() {

		window.db=DB;




	}







	render() {


		return (

			<LocaleProvider locale={en_US}>
				<div className="App">


					<Layout>
						<Sider
							trigger={null}
							collapsible
							collapsed={true}
						>
							<div className="logo" />
							<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
								<Menu.Item key="1">
									<Icon type="user" />
									<span>Pilgrims</span>
								</Menu.Item>
								<Menu.Item key="2">
									<Icon type="video-camera" />
									<span>Volunteers</span>
								</Menu.Item>
								<Menu.Item key="3">
									<Icon type="upload" />
									<span>Doctors</span>
								</Menu.Item>
							</Menu>
						</Sider>
						<Layout>
							<Header style={{ background: '#fff', padding: 0 }}>
								<Icon
									className="trigger"
									type={ true ? 'menu-unfold' : 'menu-fold'}
									onClick={this.toggle}
								/>
							</Header>
							<Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
								<Router history={history}>
									<div >



										<Route path={`/dashboard`} exact component={RescueDashboard}/>
									</div>
								</Router>
							</Content>
						</Layout>
					</Layout>



				</div>
			</LocaleProvider>
		);
	}

}






