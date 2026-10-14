import { NextResponse } from "next/server";
import {execFile} from "child_process";
import { error } from "console";

export default async function POST(request:Request){

    try{
        const {mode,subs,message}=await request.json();

        if(subs.length<26) {
            return NextResponse.json({error:"substitutions are less than 26"},{status:500})
        }


    }catch(err:any){
        return NextResponse.json({error:err.message},{status:500})
    }
}