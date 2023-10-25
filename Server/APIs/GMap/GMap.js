import express from "express";
import mongoose from "mongoose";
import GMap from "../../Schemas/GMap.js";

const gMapRouter = express.Router();

gMapRouter.post("/AutoComplete/addData", async (req, res) => {
    console.log("/APIs/GMap/Gmap.js autocomplete data addition fired");
    try{
      const newData = new GMap(req.body);
      var x=null;
      try{
      x = await newData.save();
      }
      catch(err){
        console.log("/APIs/GMap/Gmap.js Error => in catch 2 => err", err);    //    2
        return res.status(400).send(err);
      }
      if(x===null){
        console.log("/APIs/GMap/Gmap.js Error => in catch 4 => err", err);    //    4
        return res.status(400).send(err);
      }
      if(x.error){
        console.log("/APIs/GMap/Gmap.js Error => in catch 3 => err", err);    //    3
        return res.status(400).send(err);
      }
      console.log("/APIs/GMap/Gmap.js Success => in catch 1 => x", x);    //    1
      res.status(200).send(x);

    }
    catch(err){
        console.log("/APIs/GMap/Gmap.js Error => in catch 1 => err", err);    //    1
    }
})


export default gMapRouter;