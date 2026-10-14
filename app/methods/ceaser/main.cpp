#include<iostream>
using namespace std;

string ceaser(int k,string text){
    string ret="";
    int temp=0;
    for(int i=0;i<text.length();i++){
        temp=static_cast<int>(text[i])+k;
        if(temp>126){
            temp%=127;
                if(temp<=32)
                 temp+=32;
        }
        ret+=static_cast<char>(temp);
    }
    return ret;
}
string dec(int k,string text){
    string ret="";
    k=k%126;
    int temp=0;
    for(int i=0;i<text.length();i++){
        temp=static_cast<int>(text[i])-k;
        if(temp<32){
            temp=32-temp;
            // temp%=32;
                // if(temp<=126)
                 temp=126-temp;
        }
        ret+=static_cast<char>(temp);
    }
    return ret;
}


int main(int argc , char* argv[]){
    string mode= argv[1];
    int key=  stoi(argv[2]);
    string input_key=argv[3];
    if(mode=="encrypt"){
        cout<< "CEASER_IS:"<< ceaser(key,input_key);
    }else{
        cout<< "CEASER_IS:"<< dec(key,input_key);
    }
    
    return 0;
}