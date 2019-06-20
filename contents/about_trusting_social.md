---
index: true
date: 3rd May 2019
title: "Introduction"
priority: 3
---

## About Trusting Social

Trusting Social (TS) is a data science company that develops predictive models using proprietary machine learning techniques and artificial intelligence algorithms. Our core products are the Lead Generation and Credit Insight Services which provide our clients - regulated lenders and financial institutions - with real-time intelligence on mobile subscribers’ borrowing needs and creditworthiness. We do this by analysing mobile usage data from Mobile Network Operators (MNOs). Through our services, our clients are able to offer financial services to individuals with no bank accounts or very little financial history.

## About the Credit Insight Service

Our Credit Insight Service provides lenders with information such as the probability of default on a loan or fraud propensity of a mobile subscriber. We deliver this Credit Insight to lenders via our API server, making it an automated, easily deployed and highly scalable service.

Our Credit Insight request and return process upholds data privacy by ensuring that borrowers’ give their consent for sharing their TS Credit Insights with the lender before we release the information.

We employ three service types for lenders to seek consent from borrowers:

1. Sending borrowers an OTP SMS
2. Sending borrowers a Consent SMS
3. Submitting an external_source_id to us

## Encryption Policy
{title="Encryption Policy", id="encryption-policy"}

We require all Credit Insights to be encrypted during transmission. The details for encryption are provided in this section. We also provide the option to encrypt the MSISDN if it is necessary due to regulatory or organisational requirements.

### Encrypting the Credit Insight
{title="Encrypting the Credit Insight", id="encrypting-the-credit-insight"}

**Step 1**: You provide us your RSA public key (YOUR_RSA_PUBLIC_KEY) when you first register an account with us.

```bash
openssl genrsa -out private.key.rsa 2048
openssl rsa -in private.key.rsa -pubout > public.key.rsa.pub
```

**Step 2**: We will encrypt the Credit Insight before sending it to you using the following formula.

```bash
ENCRYPTED_SCORE = EncodeBase64(EncryptRSAOAEP(CREDIT_SCORE, YOUR_RSA_PUBLIC_KEY))
```

> [RSA\_(cryptosystem)](<https://en.wikipedia.org/wiki/RSA_(cryptosystem)/>)\
> [Optimal_asymmetric_encryption_padding](https://en.wikipedia.org/wiki/Optimal_asymmetric_encryption_padding)\
> [Base64](https://en.wikipedia.org/wiki/Base64)

In this formula, first the credit score is encrypted using RSA with optimal asymmetric encryption padding scheme (OAEP). Then, the result will be encoded using base64.

**Step 3**: You can decrypt the Credit Insight using the following formula.

```bash
RAW_SCORE = DecryptRSAOAEP(DecodeBase64(ENCRYPTED_SCORE), YOUR_RSA_PRIVATE_KEY)
```

It is actually the reverse process of step 2, where we first decode base64, then decrypt the result using RSA with OAEP scheme.