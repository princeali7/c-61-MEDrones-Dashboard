import React, {Fragment, PureComponent} from "react";
import {Card, Col, Row, Tooltip} from 'antd';
import numeral from 'numeral';

import {Gauge, Pie, TagCloud, WaterWave} from 'ant-design-pro/lib/Charts';
import NumberInfo from 'ant-design-pro/lib/NumberInfo';
import CountDown from 'ant-design-pro/lib/CountDown';
// import ActiveChart from 'ant-design-pro/lib/ActiveChart';
import styles from './dashboard.less';

const Secured = true;

const targetTime = new Date().getTime() + 3900000;

// use permission as a parameter
const havePermissionAsync = new Promise(resolve => {
	// Call resolve on behalf of passed
	setTimeout(() => resolve(), 1000);
});

export default class Monitor extends PureComponent {
	componentDidMount() {
		const { dispatch } = this.props;
		// dispatch({
		// 	type: 'monitor/fetchTags',
		// });
		//
		//

	}

	render() {
		const { monitor, loading } = this.props;
		const tags  = true; //monitor;

		return (
			<Fragment>
				<Row gutter={24}>
					<Col xl={18} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
						<Card title="MEDrones Dashboard" bordered={false}>
							<Row>
								<Col md={6} sm={12} xs={24}>
									<NumberInfo
										subTitle="TOTAL PILGRIMS"
										suffix=""
										total={numeral(124543233).format('0,0')}
									/>
								</Col>
								<Col md={6} sm={12} xs={24}>
									<NumberInfo subTitle="NEED ASSISTANCE" total="12" />
								</Col>
								<Col md={6} sm={12} xs={24}>
									<NumberInfo subTitle="HELP IS ON THE WAY" total={5} />
								</Col>
								<Col md={6} sm={12} xs={24}>
									<NumberInfo
										subTitle="SAVED"
										suffix=""
										total={20}
									/>
								</Col>
							</Row>
							<div className={styles.mapChart}>
								<Tooltip title="REALTIME MAP">
									<img
										src="https://gw.alipayobjects.com/zos/rmsportal/HBWnDEUXCnGnGrRfrpKa.png"
										alt="map"
									/>
								</Tooltip>
							</div>
						</Card>
					</Col>
					<Col xl={6} lg={24} md={24} sm={24} xs={24}>
						<Card title="PROGRESS" style={{ marginBottom: 24 }} bordered={false}>
							{/*<ActiveChart />*/}
						</Card>
						<Card
							title="HELP"
							style={{ marginBottom: 24 }}
							bodyStyle={{ textAlign: 'center' }}
							bordered={false}
						>
							<Gauge title="HELP" height={180} percent={87} />
						</Card>
					</Col>
				</Row>
				<Row gutter={24}>
					<Col xl={12} lg={24} sm={24} xs={24}>
						<Card title="WHAT TO PUT HERE" bordered={false} className={styles.pieCard}>
							<Row style={{ padding: '16px 0' }}>
								<Col span={8}>
									<Pie
										animate={false}
										percent={28}
										subTitle="here"
										total="28%"
										height={128}
										lineWidth={2}
									/>
								</Col>
								<Col span={8}>
									<Pie
										animate={false}
										color="#5DDECF"
										percent={22}
										subTitle="here "
										total="22%"
										height={128}
										lineWidth={2}
									/>
								</Col>
								<Col span={8}>
									<Pie
										animate={false}
										color="#2FC25B"
										percent={32}
										subTitle="here"
										total="32%"
										height={128}
										lineWidth={2}
									/>
								</Col>
							</Row>
						</Card>
					</Col>
					<Col xl={6} lg={12} sm={24} xs={24}>
						<Card
							title="NOTHING "
							loading={loading}
							bordered={false}
							bodyStyle={{ overflow: 'hidden' }}
						>
							<TagCloud data={tags} height={161} />
						</Card>
					</Col>
					<Col xl={6} lg={12} sm={24} xs={24}>
						<Card
							title="GOOD THING "
							bodyStyle={{ textAlign: 'center', fontSize: 0 }}
							bordered={false}
						>
							<WaterWave height={161} title="IT WORKS" percent={34} />
						</Card>
					</Col>
				</Row>
			</Fragment>
		);
	}
}
