import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import logo from "../Images/logo.jpg";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import makeBlockie from "ethereum-blockies-base64";
import "./navbar.css";
function Navbar({ onConnectWallet, isConnected, isConnecting, account }) {
    const formatAddress = (address) => {
        if (!address) return "";
        return `${address.substring(0, 6)}...${address.substring(
            address.length - 6
        )}`;
    };
    const blockieImage = account ? makeBlockie(account) : "";
    return (
        <div className=" bg-black main-font">
            <Grid container spacing={1}>
                <Grid xs={2}>
                    <div className="flex justify-center space-x-3 my-1">
                        <div className="h-12 w-12 ">
                            <img src={logo} alt="logo" />
                        </div>
                        <div>
                            <p className=" text-white pt-2 text-2xl">SPHERE</p>
                        </div>
                    </div>
                </Grid>
                <Grid xs={10}>
                    <div className=" text-white flex justify-between mx-5">
                        <div>
                            <ul className="flex space-x-5 text-xl pt-4 justify-start ">
                                <li className=" cursor-pointer">
                                    <Link to="/main">Discover</Link>
                                </li>
                                <li className=" cursor-pointer">My Locker</li>
                            </ul>
                        </div>
                        {!isConnected ? (
                            <div className="p-2">
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={onConnectWallet}
                                    disabled={isConnecting}>
                                    {isConnecting
                                        ? "Connecting..."
                                        : "Connect Wallet"}
                                </Button>
                            </div>
                        ) : (
                            <ul className="flex space-x-5 text-xl pt-3 justify-end ">
                                <li>
                                    <Link to="/locker">
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            className="main-font">
                                            LOCK TOKEN
                                        </Button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/unlocker">
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            className="main-font">
                                            Unlock Token
                                        </Button>
                                    </Link>
                                </li>
                                <li className=" text-sm border-1 rounded-md  bg-gray-700 border-gray-200">
                                    <div className="flex space-x-2 mx-3 my-1 ">
                                        <div>
                                            <img
                                                src={blockieImage}
                                                alt="emptylogo"
                                                className="h-7 w-7 rounded-full"
                                            />
                                        </div>
                                        <span className=" mt-1  shadow-2xl">
                                            {formatAddress(account)}
                                        </span>
                                    </div>
                                </li>
                            </ul>
                        )}
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default Navbar;
