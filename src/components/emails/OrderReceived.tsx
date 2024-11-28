import { Configuration, ShippingAddress } from '@prisma/client';
import {
    Body,
    Container,
    Column,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Text,
} from '@react-email/components';

export const OrderReceived = ({
    orderId,
    orderDate,
    amount,
    config,
    orderStatus,
    shippingAddress,
}: {
    shippingAddress: ShippingAddress;
    config: Configuration;
    orderId: string;
    orderDate: string;
    amount: number;
    orderStatus: string;
}) => {
    const baseUrl =
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000'
            : `https://${process.env.VERCEL_URL}`;

    const getYear = () => {
        const date = new Date();
        return date.getFullYear();
    };

    return (
        <Html>
            <Head />
            <Preview>
                Get your order summary, estimated delivery date and more
            </Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section style={track.container}>
                        <Row>
                            <Column>
                                <Text style={global.paragraphWithBold}>
                                    Order Number
                                </Text>
                                <Text style={track.number}>
                                    1ZV218970300071628
                                </Text>
                            </Column>
                        </Row>
                    </Section>
                    <Hr style={global.hr} />
                    <Section style={message}>
                        <Img
                            src={`${baseUrl}/images/snake-1.png`}
                            width='66'
                            height='70'
                            alt='Case Craft'
                            style={{ margin: 'auto' }}
                        />
                        <Heading style={global.heading}>
                            It's On Its Way.
                        </Heading>
                        <Text style={global.text}>
                            We're preparing everything for delivery and will
                            notify you once your package has been shipped.
                            Delivery usually takes 2 days.
                        </Text>
                        <Text style={{ ...global.text, marginTop: 24 }}>
                            If you have any questions regarding your order,
                            please feel free to contact us with your order
                            number and we're here to help.
                        </Text>
                    </Section>
                    <Hr style={global.hr} />
                    <Section style={global.defaultPadding}>
                        <Text style={addressTitle}>
                            Shipping to: {shippingAddress.name}
                        </Text>
                        <Text style={{ ...global.text, fontSize: 14 }}>
                            {shippingAddress.street}, {shippingAddress.city},{' '}
                            {shippingAddress.state}, {shippingAddress.country}{' '}
                            {shippingAddress.postalCode}
                        </Text>
                    </Section>
                    <Hr style={global.hr} />
                    <Section
                        style={{
                            ...paddingX,
                            paddingTop: '40px',
                            paddingBottom: '40px',
                        }}
                    >
                        <Row>
                            <Column>
                                <Img
                                    src={`${config.originalImageUrl}`}
                                    alt='Order Case Design Image'
                                    style={{ float: 'left' }}
                                    width='260px'
                                />
                            </Column>
                            <Column
                                style={{
                                    verticalAlign: 'top',
                                    paddingLeft: '12px',
                                }}
                            >
                                <Text
                                    style={{ ...paragraph, fontWeight: '500' }}
                                >
                                    Custom {config.model} case
                                </Text>
                                <Text style={global.text}>
                                    Color {config.color?.toLocaleUpperCase()}
                                </Text>
                            </Column>
                        </Row>
                    </Section>
                    <Hr style={global.hr} />
                    <Section style={global.defaultPadding}>
                        <Row
                            style={{ display: 'inline-flex', marginBottom: 40 }}
                        >
                            <Column style={{ width: '170px' }}>
                                <Text style={global.paragraphWithBold}>
                                    Order Number
                                </Text>
                                <Text style={track.number}>{orderId}</Text>
                            </Column>
                            <Column>
                                <Text style={global.paragraphWithBold}>
                                    Order Date
                                </Text>
                                <Text style={track.number}>{orderDate}</Text>
                            </Column>
                            <Column>
                                <Text style={global.paragraphWithBold}>
                                    Order Amount
                                </Text>
                                <Text style={track.number}>₹{amount}</Text>
                            </Column>
                            <Column>
                                <Text style={global.paragraphWithBold}>
                                    Payment Status
                                </Text>
                                <Text style={track.number}>{orderStatus}</Text>
                            </Column>
                        </Row>
                    </Section>
                    <Hr style={global.hr} />
                    <Section style={menu.container}>
                        <Row>
                            <Text style={menu.title}>Get Help</Text>
                        </Row>
                        <Row style={menu.content}>
                            <Column style={{ width: '33%' }} colSpan={1}>
                                <Link href='/' style={menu.text}>
                                    Shipping Status
                                </Link>
                            </Column>
                            <Column style={{ width: '33%' }} colSpan={1}>
                                <Link href='/' style={menu.text}>
                                    Shipping & Delivery
                                </Link>
                            </Column>
                            <Column style={{ width: '33%' }} colSpan={1}>
                                <Link href='/' style={menu.text}>
                                    Returns & Exchanges
                                </Link>
                            </Column>
                        </Row>
                        <Row style={{ ...menu.content, paddingTop: '0' }}>
                            <Column style={{ width: '33%' }} colSpan={1}>
                                <Link href='/' style={menu.text}>
                                    How to Return
                                </Link>
                            </Column>
                            <Column style={{ width: '66%' }} colSpan={2}>
                                <Link href='/' style={menu.text}>
                                    Contact Options
                                </Link>
                            </Column>
                        </Row>
                        <Hr style={global.hr} />
                        <Row style={menu.tel}>
                            <Column>
                                <Row>
                                    <Column style={{ width: '16px' }}>
                                        <Img
                                            src={`${baseUrl}/images/phone.png`}
                                            width='16px'
                                            height='26px'
                                            style={{ paddingRight: '14px' }}
                                        />
                                    </Column>
                                    <Column>
                                        <Text
                                            style={{
                                                ...menu.text,
                                                marginBottom: '0',
                                            }}
                                        >
                                            +91 1234 567 8901
                                        </Text>
                                    </Column>
                                </Row>
                            </Column>
                            <Column>
                                <Text
                                    style={{
                                        ...menu.text,
                                        marginBottom: '0',
                                    }}
                                >
                                    9 am - 7 pm IST
                                </Text>
                            </Column>
                        </Row>
                    </Section>
                    <Hr style={global.hr} />
                    <Section style={paddingY}>
                        <Row>
                            <Text style={global.heading}>Case Craft</Text>
                        </Row>
                    </Section>
                    <Hr style={{ ...global.hr, marginTop: '12px' }} />
                    <Section style={paddingY}>
                        <Row style={footer.policy}>
                            <Column>
                                <Text style={footer.text}>Web Version</Text>
                            </Column>
                            <Column>
                                <Text style={footer.text}>Privacy Policy</Text>
                            </Column>
                        </Row>
                        <Row>
                            <Text
                                style={{
                                    ...footer.text,
                                    paddingTop: 30,
                                    paddingBottom: 30,
                                }}
                            >
                                Please contact us if you have any questions. (If
                                you reply to this email, we won't be able to see
                                it.)
                            </Text>
                        </Row>
                        <Row>
                            <Text style={footer.text}>
                                © {getYear()} Case Craft, Inc. All Rights
                                Reserved.
                            </Text>
                        </Row>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

export default OrderReceived;

const paddingX = {
    paddingLeft: '40px',
    paddingRight: '40px',
};

const paddingY = {
    paddingTop: '22px',
    paddingBottom: '22px',
};

const paragraph = {
    margin: '0',
    lineHeight: '2',
};

const global = {
    paddingX,
    paddingY,
    defaultPadding: {
        ...paddingX,
        ...paddingY,
    },
    paragraphWithBold: { ...paragraph, fontWeight: 'bold' },
    heading: {
        fontSize: '32px',
        lineHeight: '1.3',
        fontWeight: '700',
        textAlign: 'center',
        letterSpacing: '-1px',
    } as React.CSSProperties,
    text: {
        ...paragraph,
        color: '#747474',
        fontWeight: '500',
    },
    button: {
        border: '1px solid #929292',
        fontSize: '16px',
        textDecoration: 'none',
        padding: '10px 0px',
        width: '220px',
        display: 'block',
        textAlign: 'center',
        fontWeight: 500,
        color: '#000',
    } as React.CSSProperties,
    hr: {
        borderColor: '#E5E5E5',
        margin: '0',
    },
};

const main = {
    backgroundColor: '#ffffff',
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: '10px auto',
    width: '600px',
    maxWidth: '100%',
    border: '1px solid #E5E5E5',
};

const track = {
    container: {
        padding: '22px 40px',
        backgroundColor: '#F7F7F7',
    },
    number: {
        margin: '12px 0 0 0',
        fontWeight: 500,
        lineHeight: '1.4',
        color: '#6F6F6F',
    },
};

const message = {
    padding: '40px 74px',
    textAlign: 'center',
} as React.CSSProperties;

const addressTitle = {
    ...paragraph,
    fontSize: '15px',
    fontWeight: 'bold',
};

const menu = {
    container: {
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '20px',
        backgroundColor: '#F7F7F7',
    },
    content: {
        ...paddingY,
        paddingLeft: '20px',
        paddingRight: '20px',
    },
    title: {
        paddingLeft: '20px',
        paddingRight: '20px',
        fontWeight: 'bold',
    },
    text: {
        fontSize: '13.5px',
        marginTop: 0,
        fontWeight: 500,
        color: '#000',
    },
    tel: {
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '32px',
        paddingBottom: '22px',
    },
};

const footer = {
    policy: {
        width: '166px',
        margin: 'auto',
    },
    text: {
        margin: '0',
        color: '#AFAFAF',
        fontSize: '13px',
        textAlign: 'center',
    } as React.CSSProperties,
};
