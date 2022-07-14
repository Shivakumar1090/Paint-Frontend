import React from 'react'
import { Box, Button, makeStyles, Typography } from '@material-ui/core'
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Link, NavLink } from "react-router-dom";

const Usestyles=makeStyles({
    container:{
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:'#282828',
        color:'white',
        padding:'10px'
    },
    title:{
        fontSize:'36px',
        "@media only screen and (max-width: 420px)":{
          fontSize:'20px'
        }
    },
    authbtn:{
        backgroundColor:'#8dffcc'
    }
});

const Navbar = ({ isAuth, setIsAuth }) => {
    const classes=Usestyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logoutHandler = () => {
        setAnchorEl(null);
        setIsAuth(false);
        window.localStorage.clear();
    };
  return (
    <Box className={classes.container}>
        <Typography className={classes.title}>
          <Link to="/" style={{"textDecoration":'none',"color":'inherit'}}>PaintApplication</Link>
        </Typography>
        <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
        className="account_icon icons"
      >
        {!isAuth && (
          <Button className={classes.authbtn}>
            <b>LOGIN</b>
          </Button>
        )}
        {isAuth && (
          <>
            <Button className={classes.authbtn}>
              {window.localStorage.getItem("name").substring(0, 9)}
            </Button>
          </>
        )}
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
      >
        {isAuth ? (
          <div>
            <MenuItem onClick={logoutHandler}>LOGOUT</MenuItem>
          </div>
        ) : (
          <div>
            <NavLink
              to="/"
              exact
              style={{
                textDecoration: "none",
                color: "black",
                backgroundColor: "yellow",
              }}
              className="nav-link"
            >
              <MenuItem onClick={logoutHandler}>LOGIN</MenuItem>
            </NavLink>
          </div>
        )}
      </Menu>
    </Box>
  )
}

export default Navbar