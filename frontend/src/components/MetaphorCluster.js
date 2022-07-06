import React, { useState } from "react";
import Diagram, { createSchema, useSchema } from 'beautiful-react-diagrams';

const CONTENT_SEPARATOR = ' | ';

const chartsCoords = {
    0: [400, 10],
    1: [10, 200],
    2: [400, 350],
}

const MainNode = (props) => (
    <div className="p-3 bg-dark main-chart-block">
        <div className="text-white text-uppercase">
            {props.content}
        </div>
    </div>
)

const CustomNode = (props) => {
    return (
        <div className="px-3 py-3 bg-dark cluster-chart-block" onClick={() => props.data.setOpenDetails(true)}>
            <div className="text-white">
                {
                    props.data.cluster_label.map(
                        (item, index) => (
                            <div key={`cluster-item-${index}`} className="d-flex text-center">
                                <p className="m-1 cluster-item" data-toggle="tooltip" data-placement="bottom" title={props.data.meaning[item]}>{item}</p>
                                <p className="m-1 cluster-item-plus">+</p>
                            </div>
                        )
                    )
                }
            </div>
        </div>
    )
}


const createInitialSchema = (concept, cluster, openDetails, setOpenDetails) => {
    const nodes = [
        {
            id: 'main',
            content: concept,
            coordinates: [280, 280],
            render: MainNode,
        },
    ];
    const links = [];

    cluster.forEach((item, index) => {
        const id = `cluster-${index}`
        nodes.push({
            id,
            data: {...item, setOpenDetails},
            coordinates: chartsCoords[index],
            render: CustomNode,
        })
        links.push({
            input: 'main',  output: id,
        })
    })

    return createSchema({ nodes, links })
} 

const MetaphorCluster = ({ concept, cluster }) => {
    const [openDetails, setOpenDetails] = useState(false);

    const initialSchema = createInitialSchema(concept, cluster, openDetails, setOpenDetails);
    const [schema, { onChange }] = useSchema(initialSchema);

    console.log(openDetails)
    return (
        <div className="cluster-diagram">
            <Diagram schema={schema} onChange={onChange} />
        </div>
    )
}

export default MetaphorCluster;
