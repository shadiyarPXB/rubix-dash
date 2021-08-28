import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Countdown from 'react-countdown';
import PlayLotteryCard from 'views/dashboard/PlayLotterySection/PlayLotteryCard';
import useContract from 'hooks/useContract';
import fixedNumber from 'utils/fixedNumber';
import toast from 'utils/toast';
import abis from 'rubix/abi';

interface PlayLotteryCardShortTermProps {
    availableRbx: string | number;
    getEvents: () => Promise<void>;
}

const PlayLotteryCardShortTerm: React.FC<PlayLotteryCardShortTermProps> = ({ availableRbx, getEvents }) => {
    const { web3, web3React, contract: lotteryContract } = useContract('lottery');
    const { contract: rubixTokenContract } = useContract('rubixToken');
    const [value, setValue] = useState<number>(1);
    const [lotteryInfo, setLotteryInfo] = useState<any>(null);
    const [lotteryInfoLoading, setLotteryInfoLoading] = useState(true);
    const [lotteryPoolLoading, setLotteryPoolLoading] = useState(true);
    const [activePool, setActivePool] = useState<any>(null);
    const [lotteryPool, setLotteryPool] = useState<any>(null);
    const [paymentMethod, setPaymentMethod] = useState('RBX');
    const [loading, setLoading] = useState(false);
    const [bnbPrice, setBnbPrice] = useState(0);
    const [allowance, setAllowance] = useState<number>(0);

    const isApprovable = allowance < +web3?.utils.toWei('15000');

    const maxBtnClickHandler = (): void => {
        setValue(50);
    };

    const onSubmitHandler = async (): Promise<void> => {
        setLoading(true);

        if (paymentMethod === 'RBX') {
            if (isApprovable) {
                rubixTokenContract.methods
                    .increaseAllowance(abis.lottery.address, web3?.utils.toWei('9999999'))
                    .send({ from: web3React.account })
                    .once('confirmation', async function (confirmationNumber, receipt) {
                        const link = `https://bscscan.com/tx/${receipt.transactionHash}`;
                        toast(
                            <>
                                Your transaction is confirmed! <a href={link}>TxID</a>
                            </>,
                            null,
                        );
                        getEvents();
                        await getAllowance();
                        setLoading(false);
                    })
                    .once('error', function () {
                        toast('Error! Please try sending again with higher gas fees', 'error');
                        setLoading(false);
                    });
            } else {
                await lotteryContract.methods
                    .buyWithDiscount(value)
                    .send({ from: web3React.account })
                    .once('confirmation', async function (confirmationNumber, receipt) {
                        const link = `https://bscscan.com/tx/${receipt.transactionHash}`;
                        toast(
                            <>
                                You have successfully purchased {value} tickets! <a href={link}>TxID</a>
                            </>,
                            null,
                        );
                        getEvents();
                        await getLotteryInfo();
                        setLoading(false);
                    })
                    .once('error', function () {
                        toast('Error! Please, transaction run out of gas.', 'error');
                        setLoading(false);
                    });
            }
        } else {
            // If user selected BNB
            await lotteryContract.methods
                .buyWithoutDiscount(value)
                .send({ from: web3React.account, value: +web3.utils.toWei('0.015') * value })
                .once('confirmation', async function (confirmationNumber, receipt) {
                    const link = `https://bscscan.com/tx/${receipt.transactionHash}`;
                    toast(
                        <>
                            You have successfully purchased {value}tickets! <a href={link}>TxID</a>
                        </>,
                        null,
                    );
                    getEvents();
                    await getLotteryInfo();
                    setLoading(false);
                })
                .once('error', function () {
                    toast('Error! Please, transaction run out of gas.', 'error');
                    setLoading(false);
                });
        }
    };

    const getLotteryInfo: () => Promise<void> = async () => {
        try {
            setLotteryInfoLoading(true);
            const activePool = await lotteryContract.methods.getActivePool().call();
            setActivePool(activePool);
            const res = await lotteryContract.methods.getlotteryInfo(activePool).call();

            setLotteryInfo(res);
            setLotteryInfoLoading(false);
        } catch (error) {
            setLotteryInfoLoading(false);
        }
    };
    // @ts-ignore
    const getLotteryPool: () => Promise<void> = async () => {
        try {
            const res = await lotteryContract.methods.getFullPot().call();

            setLotteryPool(
                `${fixedNumber(web3.utils.fromWei(res?._RBX, 'ether'))} RBX + ${fixedNumber(
                    web3.utils.fromWei(res?.BNB, 'ether'),
                )} BNB `,
            );
        } catch (error) {
            //
        }
    };

    const getAllowance: () => Promise<void> = async () => {
        try {
            const res = await rubixTokenContract.methods.allowance(web3React.account, abis.lottery.address).call();

            setAllowance(res);
        } catch (error) {}
    };
    useEffect(() => {
        if (web3React.active) {
            getLotteryInfo();
            getLotteryPool();
            getAllowance();
        } else {
            setLotteryInfo(null);
            setLotteryPool(null);
        }
    }, [web3React.active, web3React.account]);

    const fetchMarketData: () => void = async () => {
        try {
            const { data } = await axios.get(
                'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=binancecoin&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h',
            );
            setBnbPrice(data[0].current_price);
        } catch (error) {
            // toast('Some error occurred. Please try again later...', 'error');
        }
    };

    useEffect(() => {
        fetchMarketData();
    }, []);
    // @ts-ignore
    const jackpot = lotteryPool;
    return (
        <PlayLotteryCard
            bordered
            // heading="1 Day"
            title="LOTTERY"
            secondTitle="PLAY TO WIN RBX & BNB"
            availableRbx={availableRbx}
            jackpot={jackpot}
            activePool={activePool}
            totalDue={paymentMethod === 'RBX' ? (value * 5).toFixed(2) + ' RBX' : (value * 0.0059).toFixed(4) + ' BNB'}
            TextFieldProps={{
                value,
                onChange: (e) => setValue(+e.target?.value < 0 ? 0 : +e.target?.value),
                type: 'number',
                // helperText: 'Max 50 tickets in one transaction.',
                error: value > 50,
            }}
            submitButtonTitle={isApprovable && paymentMethod === 'RBX' ? 'Approve' : 'BUY'}
            submitButtonProps={{
                onClick: onSubmitHandler,
                disabled: !web3React.active || loading || value > 50,
                loading,
            }}
            maxButtonProps={{ onClick: maxBtnClickHandler }}
            RadioGroupProps={{ onChange: (e) => setPaymentMethod(e.target.value), value: paymentMethod }}
            earnPercentage="15+"
            ticketSold={lotteryInfoLoading ? 'Loading' : lotteryInfo?._TICKETS_SOLD}
            // winLogo="/rbx-plus-bnb.svg"
        />
    );
};

export default PlayLotteryCardShortTerm;
