#include<iostream>
#include<string>
#include<limits>
#include<boost/multiprecision/cpp_int.hpp>
using namespace std;
#include<boost/random.hpp>
#include<random>
using namespace boost::multiprecision;
uint512_t pgenerator();
vector<cpp_int> rsa_key_generate();
void RSA(string);

// function 