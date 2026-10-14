#include "pgm.h"
// subs

int main(int argc, char* argv[]){
    string input_str;
    if(argc<2){
        cout<< "Usage: ./main run \"your secret message\"\n";
        return 0;
    }
    string command=argv[1];
    
    if(command=="run"){
        if(argc<3){
            cout<< "[ERROR] Please provide a message to encrypt.\n";
        }
         input_str=argv[2];
        

    }else{
        cout<< "qrong command!!!!!";
        return 1;
    }


    // RSA(input_str);
    // return 0;

}