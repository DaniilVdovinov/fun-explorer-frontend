import PopulationList from "./list";
import {Button, Divider} from "antd";
import {Link} from "react-router-dom";

function GeneticPage() {
    return (
        <>
            <Link to={'/genetic/create'}>
                <Button type="primary">Create population</Button>
            </Link>
            <Divider/>
            <PopulationList/>
        </>
    );
}

export default GeneticPage;