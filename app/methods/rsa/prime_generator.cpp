#include "pgm.h"

int p_upto_200[] ={2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199,65537};
    
uint512_t generate_random(){
    random_device rd;
    boost::random::mt19937_64 generator(rd());
    boost::random::uniform_int_distribution<uint512_t> dist(0, (uint512_t(1) << 512) - 1);
    uint512_t random_num = dist(generator);
    return random_num;
}
uint512_t base_check(uint512_t p){
    for(int i=0;i<46;i++){
        if(p%p_upto_200[i]==0){
            p+=2;
            i=0;
        }
    }
    return p;
}
uint512_t generate_witness(uint512_t n){
    uint512_t lower= 2 ;
    uint512_t upper= n-2 ;
    random_device rd;
    boost::random::mt19937_64 generator(rd());
    boost::random::uniform_int_distribution<uint512_t> dist(lower, upper);

    uint512_t witness=dist(generator);

    return witness;
    

}
bool miller_rabin_test(uint512_t n, int k = 5) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 == 0) return false;

    uint512_t d = n - 1;
    unsigned s = lsb(d);
    d >>= s;
    random_device rd;

    boost::random::mt19937_64 generator(rd()); // Or use random_device directly per iteration

    for (int i = 0; i < k; ++i) {
        uint512_t a = generate_witness(n);
        uint512_t x = powm(a, d, n);
        
        if (x == 1 || x == n - 1) continue;

        bool composite = true;
        for (unsigned r = 1; r < s; r++) {
            x = powm(x, 2, n);
            if (x == n - 1) {
                composite = false;
                break;
            }
        }
        if (composite) return false;
    }
    return true;
}
uint512_t pgenerator(){


        uint512_t p = generate_random();
        if (p % 2 == 0) p += 1;
        p = base_check(p);

        while (!miller_rabin_test(p, 10)) {
            p += 2;
        }

    return p;

}