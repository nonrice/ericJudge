#include <bits/stdc++.h>
using namespace std;

int main(){
    int n; cin >> n;
    while (n--){
        long long l, r;
        cin >> l >> r;
        cout << (l+r)*(r-l+1)/2 << '\n';
    }
}