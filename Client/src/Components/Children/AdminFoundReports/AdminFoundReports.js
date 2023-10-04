import React from "react";
import './AdminFoundReports.scss';
import { Chart } from 'react-google-charts';

const AdminFoundReports = () =>{

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
    <div className="Fadmin-Reports-wrap">
        <div className="c01-FARC-inner-wrap">
            <div className="c01-FARC-header-wrap">
                <div className="c01-FARC-Hc-wrap">
                    <div className="c01-FARC-Hstat-wrap">
                        <div className="c01-FARC-Hstat-text-wrap">
                            <span className="c01-FARC-Hstat-text">
                                Unseen Reports
                            </span>
                            <span className="c01-FARC-Hstat-text">
                                In Process Reports
                            </span>
                            <span className="c01-FARC-Hstat-text">
                                Unclaimed Things
                            </span>
                            <span className="c01-FARC-Hstat-text">
                                Public Reports
                            </span>
                            <span className="c01-FARC-Hstat-text">
                                Private Reports
                            </span>
                        </div>
                        <div className="c01-FARC-Hstat-charts-wrap">
                            <div className="co1-FARC-Hstat-chart1-wrap">
                                <Chart
                                chartType="PieChart"
                                data={chart1Data}
                                options={{title : "Progress of Reports"}}
                                width={"100%"}
                                height={"100%"}
                                />
                            </div>
                            <div className="co1-FARC-Hstat-chart2-wrap">
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
                    <div className="co1-FARC-Hfilter-wrap">

                    </div>
                </div>
                <div className="c01-FARC-HClose-wrap">
                    X
                </div>
            </div>
            <div className="c01-FARC-Reports-wrap">

            </div>
        </div>
    </div>
)
}


export default AdminFoundReports;