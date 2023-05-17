import {Button, Form, Input, InputNumber, message, Space} from 'antd';
import {useRef} from "react";

function SwarmCreate() {

    const [form] = Form.useForm();
    const formRef = useRef(null);

    const onSubmit = (values) => {
        let data = {'min': [values.minFrom, values.minTo], 'max': [values.maxFrom, values.maxTo], ...values}
        console.log(values)
        fetch('http://localhost:8080/api/swarm', {
            method: 'POST', body: JSON.stringify(data), headers: {'Content-Type': 'application/json'},
        }).then(r => {
            if (r.status > 200) {
                messageApi.open({
                    type: 'error', content: "Error",
                });
            } else {
                messageApi.open({
                    type: 'success', content: 'Population created',
                });
                // formRef.current?.resetFields();
            }
        })
    };

    const onFill = () => {
        form.setFieldsValue({
            numSwarms: 10,
            particlesPerSwarm: 100,
            expression: '-(-(x1+47)*sin(sqrt(abs((x0/2)+(x1+47))))-x0*sin(sqrt(abs(x0-(x1+47)))))',
            minFrom: -512,
            minTo: -512,
            maxFrom: 512,
            maxTo: 512,
        });
    }

    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16,
        },
    };

    const [messageApi, contextHolder] = message.useMessage();

    return (<>
        {contextHolder}
        <div>
            <h2>Swarm algorithm</h2>
            <Form
                form={form}
                ref={formRef}
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onSubmit}
                autoComplete="off"
            >
                <Form.Item
                    label="Number of swarms"
                    name="numSwarms"
                    rules={[{
                        required: true, message: 'Please input Number of swarms!',
                    },]}
                >
                    <InputNumber/>
                </Form.Item>

                <Form.Item
                    label="Particles Per Swarm"
                    name="particlesPerSwarm"
                    rules={[{
                        required: true, message: 'Please input Particles Per Swarm!',
                    },]}
                >
                    <InputNumber/>
                </Form.Item>

                <Form.Item
                    label="Min range"
                    rules={[{required: true}]}
                >
                    <Space.Compact style={{width: "200px", marginBottom: 0}}>
                        <Form.Item name={['minFrom']} rules={[{required: true}]}>
                            <Input placeholder="From"/>
                        </Form.Item>
                        <Form.Item name={['minTo']} rules={[{required: true}]}>
                            <Input placeholder="To"/>
                        </Form.Item>
                    </Space.Compact>
                </Form.Item>

                <Form.Item
                    label="Max range"
                    rules={[{required: true}]}
                >
                    <Space.Compact style={{width: "200px", marginBottom: 0}}>
                        <Form.Item name={['maxFrom']} rules={[{required: true}]}>
                            <Input placeholder="From"/>
                        </Form.Item>
                        <Form.Item name={['maxTo']} rules={[{required: true}]}>
                            <Input placeholder="To"/>
                        </Form.Item>
                    </Space.Compact>
                </Form.Item>

                <Form.Item
                    label={'Expression'}
                    rules={[{required: true, message: 'Please input expression!'}]}
                    name={'expression'}>
                    <Input/>
                </Form.Item>

                <Form.Item {...tailLayout}
                           wrapperCol={{
                               offset: 8, span: 16,
                           }}
                >
                    <Button type="primary" htmlType="submit">
                        Create population
                    </Button>
                    <Button type="link" htmlType="button" onClick={onFill}>
                        Fill form
                    </Button>
                </Form.Item>
            </Form>
        </div>
    </>);
}

export default SwarmCreate;