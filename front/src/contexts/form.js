// import { useState, createContext } from 'react';
// import axios from 'axios';

// export const FormContext = createContext();
// export const FormContextProvider = props => {
//     const [coin_name, setCoinName] = useState('');
//     const [coin_code, setCoinCode] = useState('');
//     const [formInfo, setFormInfo] = useState({
//         alert_price: '',
//         nickname: "",
//         phone_number: "",
//         agreement: false
//     });


//     const { alert_price, nickname, phone_number, agreement } = formInfo

//     const handleChange = e => {
//         const { value, name } = e.target;
//         setFormInfo({
//             ...formInfo,
//             [name]: value
//         })

//     }
//     const handleReset = () => {
//         setFormInfo({
//             alert_price: '',
//             nickname: "",
//             phone_number: "",
//             agreement: false
//         })
//         setCoinCode('')
//         setCoinName('')
//     }

//     const handleSubmit = async e => {
//         e.preventDefault();
//         axios.post('http://localhost:5000/submit', {
//             coin_name,
//             coin_code,
//             alert_price,
//             nickname,
//             phone_number,
//             agreement
//         })
//         try {
//             alert('submitted!')
//             handleReset()
//         }
//         catch (err) {
//             console.log(err)
//         }

//     }

//     return(
//         <FormContext.Provider value ={{handleChange, alert_price, nickname, phone_number, agreement, handleSubmit}}>
//             {props.children}
//         </FormContext.Provider>
//     )
// }