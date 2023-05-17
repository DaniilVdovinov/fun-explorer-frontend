import {useParams} from "react-router-dom";
import {useEffect, useLayoutEffect, useMemo, useState} from "react";
import {Button, Card, Descriptions, Divider, Input, InputNumber, Row, Space} from "antd";

const {Search} = Input;

function SwarmItem() {

    const {id} = useParams()
    const [swarm, setSwarm] = useState(null);
    const [isCalculating, setCalculating] = useState(false)
    const [calculatingResult, setCalculatingResult] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:8080/api/swarm/${id}`)
            .then(r => r.json())
            .then(r => {
                setSwarm(r);
            })
    }, [id])

    const calculate = (e) => {
        setCalculating(true);
        fetch(`http://localhost:8080/api/swarm/${id}/calculate`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({loopCount: e}),
        })
            .then(r => r.json())
            .then(r => {
                console.log(r)
                setCalculating(false)
                setCalculatingResult(r);
            })
            .catch(e => setCalculating(false));
    }


    return (<>
        <h2>Swarm</h2>
        {swarm && <Descriptions title="Configuration">
            <Descriptions.Item label="Id">{swarm.id}</Descriptions.Item>
            <Descriptions.Item label="Min range">{swarm.min[0]} {swarm.min[1]}</Descriptions.Item>
            <Descriptions.Item label="Max range">{swarm.max[0]} {swarm.max[1]}</Descriptions.Item>
            <Descriptions.Item label="Number of swarms">{swarm.numSwarms}</Descriptions.Item>
            <Descriptions.Item label="Particles Per Swarm">{swarm.particlesPerSwarm}</Descriptions.Item>
        </Descriptions>}
        <Divider/>
        <h2>Run swarm</h2>
        <p>Set loop count</p>
        <Space>
            <Search placeholder="10" enterButton="Calculate" size="large" loading={isCalculating} onSearch={calculate}/>
        </Space>
        {
            calculatingResult &&
            <Card title="Result" style={{marginTop: '16px'}}>
                <Card type={'inner'} title={'Best Fitness'} style={{marginBottom: '16px'}}>
                    {calculatingResult.bestFitness}
                </Card>
                <Card type={'inner'} title={'Best Position'}>
                    [{calculatingResult.bestPosition[0]} , {calculatingResult.bestPosition[1]}]
                </Card>
            </Card>
        }
    </>);

}

export default SwarmItem;