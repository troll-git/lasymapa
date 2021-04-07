import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import MapCanvas from "./MapCanvas";
import AddressSearch from "./AddressSearch";
import TravelTime from "./TravelTime";
import TravelDistance from "./TravelDistance";
import { useState, useEffect } from "react";
import { CircleMarker } from "leaflet";

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export default function Layout() {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const [Isoline1, setIsoline1] = useState(null);
  const [IsolineDist1, setIsolineDist1] = useState(null);
  //const [start, setStart] = useState([50.06143, 19.93658]);
  const updateValue = (datafromChild) => {
    setValue(datafromChild);
  };
  const updateIsoline1 = (datafromChild) => {
    setIsoline1(datafromChild);
  };
  const updateIsolineDist1 = (datafromChild) => {
    setIsolineDist1(datafromChild);
  };

  /*useEffect(() => {
    console.log(value);
  }, [value]);*/

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Map
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />

        <MapCanvas addr1={value} polygon={Isoline1} polygon2={IsolineDist1} />
      </main>
    </div>
  );
}
