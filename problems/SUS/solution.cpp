#include <bits/stdc++.h>
using namespace std;

const long long M = 998244353;
const int MAXN = 200000;

long long f[200001], fi[200001];

// https://cp-algorithms.com/algebra/binary-exp.html#algorithm
long long binpow(long long a, long long b) {
	a %= M;
	long long res = 1;
	while (b > 0) {
		if (b & 1)
			res = res * a % M;
		a = a * a % M;
		b >>= 1;
	}
	return res;
}

void solve(){
	long long n, k; cin >> n >> k;

	// 5 * 4^(n-1-k) * C(n-1, k)
	
	cout << 5 * binpow(4, n-1-k) % M * (f[n-1] * fi[k] % M * fi[n-1-k] % M) % M << '\n';
}

int main(){
	cin.tie(0)->ios_base::sync_with_stdio(false);

	f[0] = fi[0] = f[1] = fi[1] = 1;
	for (int i=2; i<=MAXN; ++i){
		f[i] = f[i-1]*i%M;
		fi[i] = binpow(f[i], M-2);
	}
	
	int t; cin >> t;
	while (t--) solve();
}

