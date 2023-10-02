import React from "react";
import './This.scss';

const AdminReports = () =>{


  return(
    <div className="admin-Reports-wrap AA-After">
        <div className="c01-ARC-inner-wrap">
            <div className="c01-ARC-header-wrap">
                <div classname="c01-ARC-Hcontent-wrap">
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
                                
                            </div>
                            <div className="co1-ARC-Hstat-chart2-wrap">
                                
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