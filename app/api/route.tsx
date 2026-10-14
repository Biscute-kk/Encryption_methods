import { NextResponse } from "next/server";
import {execFile} from "child_process";
import path from "path";
import { stdout } from "process";
import fs from "fs";
import util from "util"

// Promisify execFile so it works natively with async/await and correct types
const execFileAsync = util.promisify(execFile);
export async function POST(request:Request){
    try{
        const {mode,message}= await request.json();
        // console.log(message,mode);

        //path to exe file rsa ko
        // const exePath= path.join(process.cwd(),"..","methods","rsa","main.exe");
        // "E:\new_node\rsa-visualizer\app\methods\rsa\main.exe"
        //main need dependencies mainv2 is burned with dependencies
        const exePath= "E:\\new_node\\rsa-visualizer\\app\\methods\\rsa\\mainv2.exe";
        
        const workingdir= path.dirname(exePath);
        // {cwd:workingdir,timeout:5000}
        
        return new Promise ((resolve)=> {
            // console.log(message)
            execFile(exePath, ["run",message],{cwd:workingdir,timeout:5000}, (error,stdout,stderr)=>{
                console.log(error)
                if(error){
                    resolve(NextResponse.json({error: stderr || error.message },{status:500}));
                    return;
                }

                // parse cpp output to format (display garna lai ui ma)
                const lines=stdout.split("\n");
                // console.log(lines);
                let n="",e="",d="",ciphertext="",decrypted="";

                lines.forEach(line=>{
                    if(line.startsWith("MODULUS_N:")) n=line.replace("MODULUS_N:","").trim();
                    if(line.startsWith("PUBLIC_E:")) e=line.replace("PUBLIC_E:","").trim();
                    if(line.startsWith("PRIVATE_D:")) d=line.replace("PRIVATE_D:","").trim();
                    if(line.startsWith("CIPHERTEXT:")) ciphertext=line.replace("CIPHERTEXT:","").trim();
                    if(line.startsWith("DECRYPTED_TEXT:")) decrypted=line.replace("DECRYPTED_TEXT:","").trim();
                });

                resolve(NextResponse.json({n,e,ciphertext,decrypted}));
            } );
        });

    }catch(err:any){
        return NextResponse.json({error:err.message},{status:505});
    }
}
