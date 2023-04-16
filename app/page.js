"use client"
import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import MainForm from "./components/MainForm";
import { fetchEmailData } from './assets/petitions/fetchEmailData';
import { fetchStatesData } from './assets/petitions/fetchStatesData';
import { fetchTweet } from './assets/petitions/fetchTweet';
//require('dotenv').config()
function Home() {
  const [emailData, setEmailData] = useState({
    userName: ''
  })
  const [dataUser, setDataUser] = useState({
    userName: '',
    zipCode: '',
    emailUser: '',
    subject:'',//'The Subject Line is Pre-Filled and can be Edited',
        text:'',//'Users will see a pre-filled email and can edit it before sending. If the system administrator prefers, subject line and/or body text can made uneditable.'
        state:''
    })
    const [mp, setMp] = useState([])
    const [senator, setSenator] = useState([])
    const [states, setStates] = useState([])
    const [tweet, setTweet] = useState('')
    const [clientId] = useState('63cef5b73a7ef024f7ec6b00')
    const [backendURLBase] = useState('https://payload-demo-tpm.herokuapp.com')
    const [endpoints] = useState({
      toGetAllRepresentatives:'/all-representatives/',
      toGetEmailsContent:'/emails-content/',
      toGetTweets:'/tweets/',
      toSendEmails:'/send-email?',
      toSaveLeads:'/leads?',

    })
   // const adanCID ='636dadcf2626f92aade6664a'
    const fetchData = async () => {
      await fetchEmailData('POST', backendURLBase, endpoints.toGetEmailsContent, clientId, "", setDataUser)
    
    }
    const representativesBatch = async () => {
    await fetchStatesData('GET', backendURLBase, endpoints.toGetAllRepresentatives, clientId, '', setStates)
          //console.log(uniq, "states");
  };
    const getTweets = async ()=> {
      await fetchTweet('POST', backendURLBase, endpoints.toGetTweets, clientId, '', setTweet)
    }
    useEffect(() => {
        fetchData()
        .catch((error)=>console.error(error))
        representativesBatch()
        .catch((error)=>console.error(error))
        getTweets()
        .catch((error)=>console.error(error))
        
        //console.log(dataUser)
    },[])
    
    

    return(
        <MainForm
            setEmailData={setEmailData}
            emailData={emailData}
            dataUser={dataUser}
            setDataUser={setDataUser}
            mp={mp}
            setMp={setMp}
            senator={senator}
            setSenator={setSenator}
            clientId={clientId}
            states={states}
            endpoints={endpoints}
            tweet={tweet}
        />
    )

}

export default Home
