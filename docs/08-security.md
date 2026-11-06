# 8. Security

### What it is

A summary of the page's **HTTPS / TLS** status and whether every resource is loaded securely. In newer Chrome it is also called **Privacy and security**, and the icons at the top (lock, cookie icon, warning) switch between the security overview and privacy controls such as **third-party cookie** settings and issues.

### Why it exists / problems it solves

- "Why does the address bar show 'Not secure'?"
- **Mixed content**: an HTTPS page loading something over HTTP (blocked or warned).
- Certificate problems: expired, wrong domain, untrusted issuer, missing intermediate.
- Checking which TLS version/cipher a server negotiates (compliance, security reviews).
- Testing how the site behaves with third-party cookies restricted.

### Reading a typical result

- **"This page is secure (valid HTTPS)"**.
- **Certificate – valid and trusted**, issued by **Amazon RSA 2048 M04** (AWS Certificate Manager). **View certificate** shows subject, SANs (domains covered), validity dates, chain.
- **Connection – TLS 1.3, X25519MLKEM768, AES_128_GCM**:
  - *TLS 1.3*: latest TLS version.
  - *X25519MLKEM768*: key exchange. It's a **hybrid post-quantum** scheme: classic X25519 combined with ML-KEM-768 (a quantum-resistant algorithm), so recorded traffic stays safe even against future quantum computers.
  - *AES_128_GCM*: the cipher encrypting the data.
- **Resources – all served securely**: no mixed content.
- **Main origin → "Reload to view details"**: reload with the panel open to get a per-origin list (each third-party domain with its own certificate/connection info). Useful to spot one insecure third-party.
