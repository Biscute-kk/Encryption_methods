#include "pgm.h"


cpp_int extended_gcd(cpp_int a, cpp_int b, cpp_int &x, cpp_int &y){
    if(b==0){
        x=1;
        y=0;
        return a;
    }

    cpp_int x1,y1;
    cpp_int gcd= extended_gcd(b,a%b,x1,y1);
    x=y1;
    y=x1-(a/b)*y1;
    return gcd;

}

cpp_int mod_inverse(cpp_int e, cpp_int phi){
    cpp_int x,y;
    cpp_int gcd=extended_gcd(e,phi,x,y);
    if(gcd!=1){
        __throw_runtime_error("Inverse does not exists!!");
    }
    return (x % phi + phi ) % phi;
}
vector<cpp_int> rsa_key_generate(){
    cpp_int p=pgenerator();
    cpp_int q=pgenerator();
    vector<cpp_int> k(3,0);
    cpp_int n= p*q;
    cpp_int phi = (p-1) * (q-1);

    cpp_int e= 65537;

    cpp_int d= mod_inverse(e,phi);

    k[0]=e;
    k[1]=n;
    k[2]=d;

    return k;

}