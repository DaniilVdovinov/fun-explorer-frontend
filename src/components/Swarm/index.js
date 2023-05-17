import {Button, Divider} from "antd";
import {Link} from "react-router-dom";
import SwarmList from "./list";

function GeneticPage() {
    return (
        <>
            <Link to={'/swarm/create'}>
                <Button type="primary">Create swarm</Button>
            </Link>
            <Divider/>
            <SwarmList/>
        </>
    );
}

export default GeneticPage;