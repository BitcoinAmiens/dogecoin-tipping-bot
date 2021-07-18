dev:
	docker build --network=host -t dogecoind provision/dogecoind/
	docker run --rm -d --network=host -p 18444:18444 --name dogecoind_regtest dogecoind
	sleep 5
	docker exec dogecoind_regtest dogecoin-cli generate 250

stop:
	docker stop dogecoind_regtest

sendtoaccount:
	docker exec dogecoind_regtest dogecoin-cli move "" $(account) $(amount)

listaccounts:
	docker exec dogecoind_regtest dogecoin-cli listaccounts