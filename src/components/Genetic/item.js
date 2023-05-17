import {useParams} from "react-router-dom";
import {useEffect, useLayoutEffect, useMemo, useState} from "react";
import {Button, Card, Descriptions, Divider, Input, Row, Space} from "antd";

const {Search} = Input;

function PopulationItem() {

    const {id} = useParams()
    const [population, setPopulation] = useState(null);
    const [isCalculating, setCalculating] = useState(false)
    const [calculatingResult, setCalculatingResult] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:8080/api/genetic/${id}`)
            .then(r => r.json())
            .then(r => {
                setPopulation(r);
            })
    }, [id])

    const calculate = (e) => {
        setCalculating(true);
        fetch(`http://localhost:8080/api/genetic/${id}/calculate`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({expression: e}),
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
        <h2>Population</h2>
        {population && <Descriptions title="Configuration">
            <Descriptions.Item label="Id">{population.id}</Descriptions.Item>
            <Descriptions.Item label="Min range">{population.min[0]} {population.min[1]}</Descriptions.Item>
            <Descriptions.Item label="Max range">{population.max[0]} {population.max[1]}</Descriptions.Item>
            <Descriptions.Item label="Population Size">{population.config.populationSize}</Descriptions.Item>
            <Descriptions.Item label="Hall of fame size">{population.config.hallOfFameSize}</Descriptions.Item>
            <Descriptions.Item
                label="Mutation Probability">{population.config.mutationProbability}</Descriptions.Item>
            <Descriptions.Item
                label="Crossing Probability">{population.config.crossingProbability}</Descriptions.Item>
            <Descriptions.Item label="Generation Count">{population.config.generationCount}</Descriptions.Item>
        </Descriptions>}
        <Divider/>
        <h2>Run population</h2>
        <p>Set equation with <b>x0</b> and <b>x1</b>.
            Example <i>-(-(x1+47)*sin(sqrt(abs((x0/2)+(x1+47))))-x0*sin(sqrt(abs(x0-(x1+47)))))</i></p>
        <Search placeholder="x" enterButton="Calculate" size="large" loading={isCalculating} onSearch={calculate}/>
        {
            calculatingResult &&
            <Card title="Result" style={{marginTop: '16px'}}>
                <Card type={'inner'} title={'Best Fitness'} style={{marginBottom: '16px'}}>
                    {calculatingResult.bestFitness}
                </Card>
                <Card type={'inner'} title={'Best Chromosome'}>
                    [{calculatingResult.bestChromosome[0]} , {calculatingResult.bestChromosome[1]}]
                </Card>
            </Card>
        }
    </>);

}

export default PopulationItem;