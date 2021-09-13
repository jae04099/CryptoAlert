import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import * as _ from "lodash";

export const CoinApiContext = createContext();
export const CoinApiProvider = props => {
    const [coinNameList, setCoinNameList] = useState('');
    const [coinIdx, setCoinIdx] = useState('');
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCoinNames = async () => {
            try {
                setCoinNameList([])
                setIsLoading(true)
                const res = await axios.get('https://api.upbit.com/v1/market/all')
                setCoinNameList(_.sortBy(res.data, 'korean_name'))
            }
            catch (error) {
                setIsError(true)
            }
            setIsLoading(false)
        }
        fetchCoinNames()
    }, [])

    return (
        <CoinApiContext.Provider value={{ coinNameList, coinIdx, setCoinIdx, isError, isLoading }}>
            {props.children}
        </CoinApiContext.Provider>
    )

}