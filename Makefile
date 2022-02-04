dev:
	docker build --network=host -t dogecoind provision/dogecoind/
	docker run --rm -d --network=host --mount type=bind,source=${PWD}/provision/dogecoind/dogecoin.conf,target=/root/.dogecoin/dogecoin.conf --name dogecoind_regtest dogecoind
	sleep 5
	docker exec dogecoind_regtest dogecoin-cli generate 250

stop:
	docker stop dogecoind_regtest

sendtoaccount:
	docker exec dogecoind_regtest dogecoin-cli move "" $(account) $(amount)

listaccounts:
	docker exec dogecoind_regtest dogecoin-cli listaccounts