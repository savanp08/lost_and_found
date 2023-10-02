import React from "react";
import './AdminClaims.scss';

const AdminClaims = () => {


    return(
        <div className="admin-claims-wrap">
            <div className="c01-ACD-inner-wrap">
                <div className="c01-ACD-header-wrap">
                    <div classname="c01-ACD-Hcontent-wrap">
                        <div className="c01-ACD-Hstat-wrap">
                            <div className="c01-ACD-Hstat-text-wrap">
                                <span className="c01-ACD-Hstat-text">
                                    Unseen Claims
                                </span>
                                <span className="c01-ACD-Hstat-text">
                                    In Process Claims
                                </span>
                                <span className="c01-ACD-Hstat-text">
                                    Unclaimed Things
                                </span>
                                <span className="c01-ACD-Hstat-text">
                                    Completed Claims
                                </span>
                            </div>
                            <div className="c01-ACD-Hstat-charts-wrap">
                                <div className="co1-ACD-Hstat-chart1-wrap">
                                    
                                </div>
                                <div className="co1-ACD-Hstat-chart2-wrap">
                                    
                                </div>
                            </div>
                        </div>
                        <div className="co1-ACD-Hfilter-wrap">

                        </div>
                    </div>
                    <div className="c01-ACD-HClose-wrap">
                        
                    </div>
                </div>
                <div className="c01-ACD-claims-wrap">

                </div>
            </div>
        </div>
    )
}

export default AdminClaims;