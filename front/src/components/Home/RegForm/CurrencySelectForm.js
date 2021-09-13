import React, {useState, useEffect} from 'react'
import axios from 'axios'
import * as _ from "lodash";

// https://api.upbit.com/v1/market/all
function CurrencySelectForm(props){
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
            catch (error){
                setIsError(true)
            }
            setIsLoading(false)
        }
        fetchCoinNames()
    }, [])

    useEffect(()=> {
        console.log(coinIdx)
    },[coinIdx])

    const handleChange = async e => {
        const selectedIndex = e.target.options.selectedIndex;
        setCoinIdx({
            ...coinIdx,
            selectedIndex
        })
        await props.setCoinCode(coinNameList[selectedIndex]['market'])
        await props.setCoinName(coinNameList[selectedIndex]['korean_name'])
    }

    if (isLoading) return <div>로딩중..</div>;
    if (isError) return <div>에러가 발생했습니다</div>;
    return (
        <>
            <div className="relative z-0 w-full mb-5">
                        <div className="px-0">
                            <select name= "coinIdx" className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer" key={coinIdx} onChange={handleChange}>
                                {coinNameList.map((coin, index) => (<option key={index} value={coin.market}>{coin.korean_name}({coin.market})</option>))}
                            </select>
                        </div>
                    </div>
        </>
    )
}

export default CurrencySelectForm
