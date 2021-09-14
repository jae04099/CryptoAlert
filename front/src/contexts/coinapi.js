import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import * as _ from "lodash";

export const CoinApiContext = createContext();
export const CoinApiProvider = props => {
    const [coinNameList, setCoinNameList] = useState('');
    const [coinIdx, setCoinIdx] = useState('');
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [coin_name, setCoinName] = useState('');
    const [coin_code, setCoinCode] = useState('');
    const [formInfo, setFormInfo] = useState({
        alert_price: '',
        nickname: "",
        phone_number: "",
        agreement: false
    });

    const { alert_price, nickname, phone_number, agreement } = formInfo

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

    const handleCoinChange = async e => {
        const selectedIndex = e.target.options.selectedIndex;
        setCoinIdx({
            ...coinIdx,
            selectedIndex
        })
        await setCoinCode(coinNameList[selectedIndex]['market'])
        await setCoinName(coinNameList[selectedIndex]['korean_name'])
    }
    const handleFormChange = e => {
        const { value, name } = e.target;
        setFormInfo({
            ...formInfo,
            [name]: value
        })

    }
    const handleReset = () => {
        setFormInfo({
            alert_price: '',
            nickname: "",
            phone_number: "",
            agreement: false
        })
        setCoinCode('')
        setCoinName('')
    }

    const handleSubmit = async e => {
        e.preventDefault();
        axios.post('http://localhost:5000/submit', {
            coin_name,
            coin_code,
            alert_price,
            nickname,
            phone_number,
            agreement
        })
        try {
            alert('submitted!')
            handleReset()
        }
        catch (err) {
            console.log(err)
        }

    }


    return (
        <CoinApiContext.Provider value={{ coinNameList, coinIdx, setCoinIdx, isError, isLoading, handleFormChange, handleCoinChange, alert_price, nickname, phone_number, agreement, handleSubmit }}>
            {props.children}
        </CoinApiContext.Provider>
    )

}
