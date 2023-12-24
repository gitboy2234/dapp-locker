import React from "react";
import Navbar from "../../components/Navbar/navbar";
import Grid from '@mui/material/Unstable_Grid2'; 
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
function Main() {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#1A2027',
        padding: theme.spacing(1),
        color: '#fff',
        
      }));
    return (
        <div>
            
            <div className=" bg-slate-900 absolute h-full w-full fixed">
            <Navbar />
            <div className=" w-11/12 left-0 right-0 mx-auto my-8">
                
            <Grid container spacing={2} >
               
              <Grid xs={8} className="flex space-x-3">
                
              <div className=" flex  text-white  rounded-lg bg-black bg-opacity-40 w-full shadow-2xl">
             
                <div className=" mx-4 my-8 border rounded-md w-1/2">
                <div className="mx-4 mt-4">
                <div>
                    Number of Token Locked
                </div>
                <div className="">
                    <div className=" space-y-5">
                        <span className=" text-gray-500 text-sm text-left">Total Tokens</span>
                        <div className=" pb-[100px] "><span className=" text-4xl">10000 Tokens</span></div>
                    </div>
                </div>
                </div>
                </div>
               
                <div className="mx-4 my-8 border rounded-md w-1/2  ">
                <div className="mx-4 mt-4">
                <div>
                    Number of Token Locked
                </div>
                <div>
                    <div className=" space-y-5">
                        <span className=" text-gray-500 text-sm">Total Tokens</span>
                        <div className=" pb-[100px]"><span className=" text-4xl">10000 Tokens</span></div>
                    </div>
                </div>
                </div>
                </div>
                </div>
            </Grid>
            <Grid xs={4}>
                <Item>Recent Locks</Item>
            </Grid>
                </Grid>
            </div>
        </div>
        </div>
    );
}

export default Main;
