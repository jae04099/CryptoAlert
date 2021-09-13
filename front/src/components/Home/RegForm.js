import axios from 'axios';
import React, { useState } from 'react'
import CurrencySelectForm from './RegForm/CurrencySelectForm';

const RegForm = () => {

    // const [submitted, setSubmitted] = useState(false);
    // const [errors, setErrors] = useState({});
    const [coin_name, setCoinName] = useState('');
    const [coin_code, setCoinCode] = useState('');
    const [formInfo, setFormInfo] = useState({
        alert_price: '',
        nickname: "",
        phone_number: "",
        agreement: false
    });


    const { alert_price, nickname, phone_number, agreement } = formInfo

    const handleChange = e => {
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
        <div className="min-h-full p-0 sm:p-12">
            <div className="mx-auto max-w-lg px-6 py-12 bg-white border-0 shadow-lg sm:rounded-3xl">
                <h1 className="text-2xl font-bold mb-8">알림신청</h1>
                <form id="form" noValidate>
                    <label className="font-bold text-sm mb-2 ml-1">가상화폐 종류</label>
                    <CurrencySelectForm setCoinName={setCoinName} setCoinCode={setCoinCode} />
                    <div className="relative z-0 w-full mb-5">
                        <input
                            type="number"
                            name="alert_price"
                            placeholder=" "
                            className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                            onChange={handleChange}
                            value={alert_price}
                        />
                        {/* <div className="absolute top-0 left-0 mt-3 ml-1 text-gray-400"></div> */}
                        <label htmlFor="money" className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">희망 가격</label>
                        <span className="text-sm text-red-600 hidden" id="error">Amount is required</span>
                    </div>
                    <div className="relative z-0 w-full mb-5">
                        <input
                            type="nickname"
                            name="nickname"
                            placeholder=" "
                            className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                            onChange={handleChange}
                            value={nickname}
                        />
                        <label htmlFor="nickname" className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">닉네임</label>
                        <span className="text-sm text-red-600 hidden" id="error">닉네임을 입력해주세요.</span>
                    </div>
                    <div className="relative z-0 w-full mb-5">
                        <input
                            type="number"
                            name="phone_number"
                            placeholder=" "
                            className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                            onChange={handleChange}
                            value={phone_number}
                        />
                        <label htmlFor="phone" className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">전화 번호</label>
                        <span className="text-sm text-red-600 hidden" id="error">전화번호를 입력해주세요.</span>
                    </div>

                    <fieldset className="relative z-0 w-full p-px mb-5">
                        <label className="font-bold text-sm mb-2 ml-1">개인정보 수집 동의</label>
                        <div className="block pt-3 pb-2 space-x-4">
                            <label>
                                <input
                                    type="radio"
                                    name="agreement"
                                    value='1'
                                    checked={agreement === '1' ? true : false}
                                    onChange={handleChange}
                                    className="mr-2 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black"
                                />
                                동의
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="agreement"
                                    value='2'
                                    checked={agreement === '2' ? true : false}
                                    onChange={handleChange}
                                    className="mr-2 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black"
                                />
                                미동의
                            </label>
                        </div>
                        <span className="text-sm text-red-600 hidden" id="error">Option has to be selected</span>
                    </fieldset>
                    <button
                        id="button"
                        type="button"
                        className="w-full px-6 py-3 mt-3 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-blue-500 hover:bg-blue-600 hover:shadow-lg focus:outline-none"
                        onClick={handleSubmit}
                    >
                        제출하기
                    </button>
                </form>
            </div>
        </div>

        // <script>
        //   'use strict'

        //   document.getElementById('button').addEventListener('click', toggleError)
        //   const errMessages = document.querySelectorAll('#error')

        //   function toggleError() {
        //     // Show error message
        //     errMessages.forEach((el) => {
        //       el.classList.toggle('hidden')
        //     })

        //     // Highlight input and label with red
        //     const allBorders = document.querySelectorAll('.border-gray-200')
        //     const allTexts = document.querySelectorAll('.text-gray-500')
        //     allBorders.forEach((el) => {
        //       el.classList.toggle('border-red-600')
        //     })
        //     allTexts.forEach((el) => {
        //       el.classList.toggle('text-red-600')
        //     })
        //   }
        // </script>
    )
}

export default RegForm;
