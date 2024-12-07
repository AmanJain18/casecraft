import { redirect } from 'next/navigation';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import client from '@/db';
import { formatPrice } from '@/lib/utils';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Dropdown from './Dropdown';
import MaxWidthWrapper from '@/components/custom/MaxWidthWrapper';

const Page = async () => {
    try {
        const { getUser } = getKindeServerSession();
        const user = await getUser();

        if (!user) {
            console.log('No user found, redirecting...');
            redirect('/');
        } else if (
            user.email?.toLowerCase() !== process.env.ADMIN_EMAIL?.toLowerCase()
        ) {
            console.log('Unauthorized user, redirecting...');
            redirect('/');
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        redirect('/');
    }

    const [orders, lastWeekSum, lastMonthSum] = await Promise.all([
        client.order.findMany({
            where: { isPaid: true },
            orderBy: { createdAt: 'desc' },
            include: { user: true, shippingAddress: true },
        }),
        client.order.aggregate({
            where: {
                isPaid: true,
                createdAt: {
                    gte: new Date(new Date().setDate(new Date().getDate() - 7)),
                },
            },
            _sum: { amount: true },
        }),
        client.order.aggregate({
            where: {
                isPaid: true,
                createdAt: {
                    gte: new Date(
                        new Date().setDate(new Date().getDate() - 30),
                    ),
                },
            },
            _sum: { amount: true },
        }),
    ]);

    const WEEKLY_GOAL = 5000;
    const MONTHLY_GOAL = 25000;

    return (
        <MaxWidthWrapper className='flex min-h-screen w-full bg-muted/40'>
            <div className='mx-auto flex w-full flex-col sm:gap-4 sm:py-6 md:py-8 lg:py-10'>
                <div className='flex flex-col gap-16'>
                    <div className='grid gap-4 sm:grid-cols-2'>
                        <Card>
                            <CardHeader className='pb-2'>
                                <CardDescription>Last Week</CardDescription>
                                <CardTitle className='text-3xl md:text-4xl'>
                                    {formatPrice(lastWeekSum._sum.amount ?? 0)}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className='text-sm text-muted-foreground'>
                                    of {formatPrice(WEEKLY_GOAL)} goal
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Progress
                                    value={
                                        ((lastWeekSum._sum.amount ?? 0) * 100) /
                                        WEEKLY_GOAL
                                    }
                                />
                            </CardFooter>
                        </Card>
                        <Card>
                            <CardHeader className='pb-2'>
                                <CardDescription>Last Month</CardDescription>
                                <CardTitle className='text-3xl md:text-4xl'>
                                    {formatPrice(lastMonthSum._sum.amount ?? 0)}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className='text-sm text-muted-foreground'>
                                    of {formatPrice(MONTHLY_GOAL)} goal
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Progress
                                    value={
                                        ((lastMonthSum._sum.amount ?? 0) *
                                            100) /
                                        MONTHLY_GOAL
                                    }
                                />
                            </CardFooter>
                        </Card>
                    </div>

                    <h1 className='text-3xl font-bold tracking-tight md:text-4xl'>
                        Incoming orders
                    </h1>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead className='hidden sm:table-cell'>
                                    Status
                                </TableHead>
                                <TableHead className='hidden sm:table-cell'>
                                    Purchase date
                                </TableHead>
                                <TableHead className='text-right'>
                                    Amount
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.id} className='bg-accent'>
                                    <TableCell>
                                        <div className='font-medium'>
                                            {order.shippingAddress?.name}
                                        </div>
                                        <div className='hidden text-sm text-muted-foreground md:block'>
                                            {order.user.email}
                                        </div>
                                    </TableCell>
                                    <TableCell className='hidden sm:table-cell'>
                                        <Dropdown
                                            id={order.id}
                                            orderStatus={order.orderStatus}
                                        />
                                    </TableCell>
                                    <TableCell className='hidden md:table-cell'>
                                        {order.createdAt.toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className='text-right'>
                                        {formatPrice(order.amount)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </MaxWidthWrapper>
    );
};

export default Page;
