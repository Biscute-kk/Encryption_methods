import { NextResponse } from "next/server";
import {execFile} from "child_process";

export async function POST(request:Request){
    try{
        const {mode,key,message} = await request.json();
        // console.log(key,message);

        const exePath="E:\\new_node\\rsa-visualizer\\app\\methods\\ceaser\\main.exe";

        return new Promise((resolve)=>{
            execFile(exePath,[mode, key, message],(error,stdout,stderr)=>{
                if(error){
                    resolve(NextResponse.json({error:error},{status:500}));
                    return;
                }
                // console.log(key,message,stdout)
                
                const res= stdout.replace("CEASER_IS:","").trim();
                // console.log(res)

                resolve(NextResponse.json({res}));
                
            })
        })

    }catch(err:any){
        return NextResponse.json({error:err.message},{status:500});
    }

}