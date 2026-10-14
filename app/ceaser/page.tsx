"use client"

import { useState } from "react"
import Textbox from "../componenets/Textbox"
import ConvertButton from "../componenets/ConvertButton";

export default function Page(){
    const [from,setFrom]=useState('');
    const [to,setTo]=useState('');
    const [key,setKey]=useState(3);
    function handleConvert(e:any){
        // console.log(e)
        let res="";
        let temp=0;
        for(let i=0;i<e.length;i++){
            console.log(i)
            temp=(e.charCodeAt(i)+key);
            
            if(temp>126 ){
                temp%=127;
                if(temp<=32)
                 temp+=32;
                }
            res+=String.fromCharCode(temp);
        }
        // setTo(res);
        return res;

    }
    return (
        <div>
            
            <p>ceaser page</p>
            
            <Textbox
                label="Key"
                placeholder="Key"
                value={key}
                onChange={(e)=>
                    {
                    setKey(Number(e.target.value))
                }
                }
            />
            <Textbox 
                label="From" 
                placeholder="Enter your username" 
                value={from}
                onChange={(e) => {
                    
                    setFrom(e.target.value)
                    setTo(handleConvert(e.target.value))}

                }
            />
            <Textbox
                label="To" 
                placeholder="Enter your username" 
                value={to}
                onChange={(e)=>setTo(e.target.value)}
            />
            
        </div>
    )
}