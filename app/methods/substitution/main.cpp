#include "pgm.h"
// subs
string enc(string a, string text){
    string ret="";
    for(int i=0;i<text.length();i++){
        int temp= static_cast<char>(text[i]);
        if(temp==32){
            ret+=a[a.length()-1];
            continue;
        }else{
            temp-=97;
            ret+=a[temp];
            // cout<<temp <<"\t"<< a[temp]<<"\n";    
        }   
    }
    return ret;
}
string dec(string a,string text){
    string ret="";
    for(int i=0;i<text.length();i++){
        for(int j=0;j<a.length();j++){
            if(a[j]==text[i]){
                int temp=97+j;
                if(temp== 123){
                    ret+=static_cast<char>(32);
                   
                    break;
                }
                ret+=static_cast<char>(97+j);
                //  cout<< ret<<endl;
                break;
            }
        }
    }
    return ret;
}

int main(int argc , char* argv[]){
    string mode= argv[1];
    string mapping=  argv[2];
    string input_key=argv[3];
    if(mapping.length()<27){
        mapping="likujyhtgrfedwsqamnpbovzcx1";
    }
    
    if(mode=="encrypt"){
        
        cout<< "SUBSTITUTION_IS:"<< enc(mapping,input_key);
    }else{
        cout<< "DEC_IS:"<< dec(mapping,input_key);
    }
    
    return 0;
}