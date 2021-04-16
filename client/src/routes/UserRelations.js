import React, { useState, useEffect } from "react";
import axios from "axios";
import { Graph } from "react-d3-graph";

export default function UserRelations() {
    // const url = `${window.location.origin}:5000`;
    // const [GDB, setGDB] = useState();

    // async function getGraphDB() {
    //     const response = await axios.post(url + '/user-relations', {
    //         method: "POST",
    //         body: JSON.stringify({
    //           userid: sessionStorage.userid,
    //         }),
    //         withCredentials: true,
    //       })
    //     setGDB(response.data)
    // }
    // getGraphDB()
    // // useEffect(() => {
    // //     getGraphDB
    // // }, [])

    // const data = GDB;

    // const myConfig = {
    //     nodeHighlightBehavior: true,
    //     node: {
    //         color: "lightgreen",
    //         size: 3000,
    //         highlightStrokeColor: "blue",
    //     },
    //     link: {
    //         strokeWidth: 20,
    //         highlightColor: "lightblue",
    //     },
    // };

    // const onNodePositionChange = function(nodeId, x, y) {
    //     window.alert(`Node ${nodeId} is moved to new position. New position is x= ${x} y= ${y}`);
    // };

    return (
        <div>
            {/* <Graph
                id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
                data={data}
                config={myConfig}
                onNodePositionChange={onNodePositionChange}
            /> */}
            hello
        </div>
    )
}