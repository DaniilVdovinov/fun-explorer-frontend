import {useEffect, useState} from "react";
import {Table} from "antd";
import {Link} from "react-router-dom";

function SwarmList() {

    const [swarms, setSwarms] = useState([])

    useEffect(() => {
        fetch('http://localhost:8080/api/swarm')
            .then(r => r.json())
            .then(r => {
                console.log(r);
                setSwarms(
                    r.map(dto => {
                        return {
                            id: dto.id,
                            numSwarms: dto.numSwarms,
                            particlesPerSwarm: dto.particlesPerSwarm,
                            expression: dto.expression,
                        }
                    })
                )
            })
    }, []);


    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: (_, record) =>
                <Link
                    to={`/swarm/${record.id}`}>{record.id}</Link>
            ,
        },
        {
            title: 'Count of Swarms',
            dataIndex: 'numSwarms',
            key: 'numSwarms',
        },
        {
            title: `Particles Per Swarm`,
            dataIndex: 'particlesPerSwarm',
            key: 'particlesPerSwarm',
        },
        {
            title: `Expression`,
            dataIndex: 'expression',
            key: 'expression',
        },
    ];

    return (
        <>
            <Table dataSource={swarms} columns={columns}>

            </Table>
        </>
    );
}

export default SwarmList;