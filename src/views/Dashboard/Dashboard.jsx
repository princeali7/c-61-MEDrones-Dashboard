import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
import {message ,notification, Button  } from "antd";

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";

// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Tasks from "components/Tasks/Tasks.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import { bugs, website, server } from "variables/general";

import {
  dailyPilgrimsTreated,
  VoluteersHelped,
  doctorsConsulted
} from "variables/charts";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import db from '../../DataStore/datastore';
const ButtonGroup = Button.Group;



class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: {},
      doctors_helped_today:[],
      volunteers_helped_today:[],
      parent: "",
      charts:{},

    }

  window.dThis=this;
  }
  state = {
    value: 0
  };


  handleChange = (event, value) => {
    this.setState({ value });
  };
  componentDidMount(){

    db.syncState(`stats`, {
      context: this,
      state: 'stats',
      asArray: false
    });
    db.syncState(`doctors_helped_today`, {
      context: this,
      state: 'doctors_helped_today',
      asArray: true
    });
    db.syncState(`volunteers_helped_today`, {
      context: this,
      state: 'volunteers_helped_today',
      asArray: true
    });
    db.syncState(`charts`, {
      context: this,
      state: 'charts',
      asArray: false
    });
    // message.success("HHELLO");

    db.listenTo('pilgrim', {
      context: this,
      asArray: true,
      then(pilgrimData){

        var pilgrimNotify = [];
        pilgrimData.forEach((pilgrim, index) => {


          if(pilgrim.need_assistance==true){

            pilgrimNotify.push(pilgrim);

          }

          if(pilgrim.help_status=="OnWay"){
            pilgrimNotify.push(pilgrim);

          }
        });
        pilgrimNotify.forEach(pn=>{
          if(pn.need_assistance==true) {

            notification.open({
              message: <div>Patient#{pn.id} - Ali - Pakistan </div>,
              description: <div>

                {pn.need_assistance=="OnWay"? <p>The Drone is On the way for the Patient #{pn.id}</p> :<p>Patient#{pn.id} is asking for help, he is having food poisning and needs to treatment.</p>
                }
                <ButtonGroup>
                  <Button type="primary">
                    <Icon type="left" />View Information
                  </Button>
                  |
                  <Button type="primary" onClick={()=>{
                    message.success("Dispatching drone now ")
                  }

                  }>
                    Send Drone<Icon type="right" />
                  </Button>
                </ButtonGroup>
              </div>
            });

          }
        });

        // this.setState({total});
      }
    })


  }



  handleChangeIndex = index => {
    this.setState({ value: index });
  };


  render() {
    const { classes } = this.props;
    const { stats,doctors_helped_today :doctors,volunteers_helped_today:volunteers,charts} = this.state;

    dailyPilgrimsTreated.data=charts.dailyPilgrimsTreated;
    VoluteersHelped.data=charts.VoluteersHelped;
    doctorsConsulted.data=charts.doctorsConsulted;



    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>content_copy</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Total Pilgrims</p>
                <h3 className={classes.cardTitle}>
                  {stats.pilgrims} <small>people</small>
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Danger>
                    <Warning />
                  </Danger>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    4000 people are above 50year.
                  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success" >
                 <Icon>accessibility</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Require Help</p>
                <h3 className={classes.cardTitle}>{stats.help_needed}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  Last 24 Hours
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Icon>airplanemode_active</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Help On the Way</p>
                <h3 className={classes.cardTitle}>{stats.help_on_way}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <LocalOffer />
                  Drones in air </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Accessibility />
                </CardIcon>
                <p className={classes.cardCategory}>LIFES SAVED</p>
                <h3 className={classes.cardTitle}>+{stats.saved}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  Just Updated
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={dailyPilgrimsTreated.data}
                  type="Line"
                  options={dailyPilgrimsTreated.options}
                  listener={dailyPilgrimsTreated.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Daily Pilgrims Treated</h4>
                <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                  </span>{" "}
                  increase in piligrams issue in last 3 days.
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> updated 4 minutes ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="warning">
                <ChartistGraph
                  className="ct-chart"
                  data={VoluteersHelped.data}
                  type="Bar"
                  options={VoluteersHelped.options}
                  responsiveOptions={VoluteersHelped.responsiveOptions}
                  listener={VoluteersHelped.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Volunteers Helped</h4>
                <p className={classes.cardCategory}>
                  TODAY
              </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> updated 2 hours ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="danger">
                <ChartistGraph
                  className="ct-chart"
                  data={doctorsConsulted.data}
                  type="Line"
                  options={doctorsConsulted.options}
                  listener={doctorsConsulted.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Doctors Consulted</h4>
                <p className={classes.cardCategory}>
TODAY                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> campaign sent 2 days ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="success">
                <h4 className={classes.cardTitleWhite}>E-Consultant Stats</h4>
                <p className={classes.cardCategoryWhite}>
                  Today
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="warning"
                  tableHead={["ID", "Name", "Person Helped", "City"]}
                  tableData={doctors}
                />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Volunteer Stats</h4>
                <p className={classes.cardCategoryWhite}>
                   Today
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="warning"
                  tableHead={["ID", "Name", "Person Helped", "City"]}
                  tableData={volunteers}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
