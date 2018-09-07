import React from "react";

import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import SimpleLineChart from "./simple-line-chart";
import SimpleTable from "./simple-table";

const styles = theme => ({
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: "100vh",
    overflow: "auto"
  },
  chartContainer: {
    marginLeft: -22
  },
  tableContainer: {
    height: 320
  }
});

const Dashboard = props => {
  const { classes } = props;
  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Typography variant="display1" gutterBottom>
        Sales
      </Typography>
      <Typography component="div" className={classes.chartContainer}>
        <SimpleLineChart />
      </Typography>
      <Typography variant="display1" gutterBottom>
        Products
      </Typography>
      <div className={classes.tableContainer}>
        <SimpleTable />
      </div>
    </main>
  );
};

export default withStyles(styles)(Dashboard);
