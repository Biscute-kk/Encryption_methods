#include "pgm.h"
cpp_int encrypt_message(const cpp_int &message,const cpp_int &e,const cpp_int &n){
    if(message>=n){
        throw runtime_error("message too large for n!!1");
    }
    return powm(message,e,n);
}

cpp_int decrypt_message(const cpp_int &ciphertext,const  cpp_int &d,const cpp_int &n){
    return powm(ciphertext,d,n);
}

cpp_int str_to_int(const string &str){
    cpp_int val=0;
    for(char c:str){
        val=(val<<8) + static_cast<unsigned char>(c);
    }
    return val;
}

string int_to_str( cpp_int val){
    string str="";
    while(val>0){
        // cout<<val<<endl;
        unsigned char c = static_cast<unsigned char>(val & 0xFF);
        str+=c;
        val >>= 8;
    }
    reverse(str.begin(),str.end());
    return str;
}

void RSA(string a){
   
    vector<cpp_int> b= rsa_key_generate();

    cpp_int message,dec;
    string str;
    message=str_to_int(a);

    cpp_int enc=encrypt_message(message,b[0],b[1]);


    dec=decrypt_message(enc,b[2],b[1]);

    str=int_to_str(dec);
  
    // cout << "--- RSA WEB BRIDGE OUTPUT ---\n";
    cout << "MODULUS_N:" << b[1] << "\n";
    cout << "PUBLIC_E:" << b[0] << "\n";
    cout << "PRIVATE_D:" << b[2] << "\n";
    cout << "CIPHERTEXT:" << enc << "\n";
    cout << "DECRYPTED_TEXT:" << str << "\n";
    // cout<< "\nenter anything to exit";
    // cin>>str;


}