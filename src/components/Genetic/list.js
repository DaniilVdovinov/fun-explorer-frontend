import {useEffect, useState} from "react";
import {Table} from "antd";
import {Link} from "react-router-dom";

function PopulationList() {

    const [pops, setPops] = useState([])

    useEffect(() => {
        fetch('http://localhost:8080/api/genetic')
            .then(r => r.json())
            .then(r => {
                setPops(
                    r.map(dto => {
                        return {
                            id: dto.id,
                            populationSize: dto.config.populationSize,
                            generationCount: dto.config.generationCount,
                            hallOfFameSize: dto.config.hallOfFameSize
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
                    to={`/genetic/${record.id}`}>{record.id}</Link>
            ,
        },
        {
            title: 'Population Size',
            dataIndex: 'populationSize',
            key: 'populationSize',
        },
        {
            title: `Generation Count`,
            dataIndex: 'generationCount',
            key: 'generationCount',
        },
        {
            title: 'Hall Of Fame Size',
            dataIndex: 'hallOfFameSize',
            key: 'hallOfFameSize',
        }
    ];

    return (
        <>
            <Table dataSource={pops} columns={columns}>

            </Table>
        </>
    );
}

export default PopulationList;