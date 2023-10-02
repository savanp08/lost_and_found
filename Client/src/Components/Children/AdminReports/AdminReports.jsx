import React from "react";
import './This.scss';
import { Chart } from 'react-google-charts'

const AdminReports = () =>{

  const chart1Data = [
    ["Type","Number"],
    ["Unseen Reports",3],
    ["In Process Reports",4],
    ["Unclaimed Reports",5],
    ["Completed Resports",7],
  ];
  const chart2Data = [
    ["Type","Number"],
    ["Public Resports",7],
    ["Private Resports",7],
  ];

  return(
    <div className="admin-Reports-wrap AA-After">
        <div className="c01-ARC-inner-wrap">
            <div className="c01-ARC-header-wrap">
                <div className="c01-ARC-Hc-wrap">
                    <div className="c01-ARC-Hstat-wrap">
                        <div className="c01-ARC-Hstat-text-wrap">
                            <span className="c01-ARC-Hstat-text">
                                Unseen Reports
                            </span>
                            <span className="c01-ARC-Hstat-text">
                                In Process Reports
                            </span>
                            <span className="c01-ARC-Hstat-text">
                                Unclaimed Things
                            </span>
                            <span className="c01-ARC-Hstat-text">
                                Public Reports
                            </span>
                            <span className="c01-ARC-Hstat-text">
                                Private Reports
                            </span>
                        </div>
                        <div className="c01-ARC-Hstat-charts-wrap">
                            <div className="co1-ARC-Hstat-chart1-wrap">
                                <Chart
                                chartType="PieChart"
                                data={chart1Data}
                                options={{title : "Progress of Reports"}}
                                width={"100%"}
                                height={"100%"}
                                />
                            </div>
                            <div className="co1-ARC-Hstat-chart2-wrap">
                            <Chart
                                chartType="PieChart"
                                data={chart2Data}
                                options={{title : "Types of Reports"}}
                                width={"100%"}
                                height={"100%"}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="co1-ARC-Hfilter-wrap">

                    </div>
                </div>
                <div className="c01-ARC-HClose-wrap">
                    X
                </div>
            </div>
            <div className="c01-ARC-Reports-wrap">

            </div>
        </div>
    </div>
)
}


export default AdminReports;