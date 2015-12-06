#!/usr/bin/env bash
SSL_PATH=/home/maze/ssl
CHALLENGE_PATH=/maze/public/challenges
ACCOUNT_KEY=blei-dnmaze.key
DOMAIN_NAME=dnmaze
python ${SSL_PATH}/acme_tiny.py --account-key ${SSL_PATH}/${ACCOUNT_KEY} --csr ${SSL_PATH}/${DOMAIN_NAME}.csr --acme-dir ${CHALLENGE_PATH} > ${SSL_PATH}/${DOMAIN_NAME}.crt || exit
wget -O - https://letsencrypt.org/certs/lets-encrypt-x1-cross-signed.pem > intermediate.pem
cat ${SSL_PATH}/${DOMAIN_NAME}.crt intermediate.pem > ${SSL_PATH}/chained.pem
