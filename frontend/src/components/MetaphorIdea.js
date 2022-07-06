import React from "react";

import MetaphorCluster from './MetaphorCluster';

const MetaphorIdea = ({ concept, property, cluster }) => {

    return (
        <div>
            <h2>Explore metaphor ideas</h2>
            
            <div className="row my-3">
                <div className="col-2"><b>Concept</b></div>
                <div className="col bg-shadow text-uppercase">{concept}</div>
                <div className="col-2"><b>Vehicle</b></div>
                <div className="col bg-shadow"></div>
            </div>
            <div className="row my-3">
                <div className="col-2"><b>Propetry</b></div>
                <div className="col bg-shadow">{property}</div>
            </div>
            <div className="row my-3">
                <div className="col-2"><b>Goals</b></div>
                <div className="col bg-shadow"></div>
            </div>
            
            <div className="my-3">
                <MetaphorCluster {...{concept, cluster}} />
            </div>
        </div>
    )
};

export default MetaphorIdea;
