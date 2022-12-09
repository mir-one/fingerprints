![Banner](/f_banner.svg)

# TON Fingerprints
This is a set of unique digital fingerprints created based on the algorithm for generating basic rings using a noise texture. Like human fingerprints, you can now use them for the Web 3.0 and metaverse era as digital biometric information on The Open Network.

## Domain fingerprints.ton

[fingerprints.ton](http://fingerprints.ton)

![img](/fingerprints.ton.png)

TON DNS is a service that allows users to assign a human-readable name to crypto wallets, smart contracts, and websites. With TON DNS, access to decentralized services is analogous to access to websites on the internet.

## Public entry proxies

For familiarization with TON Sites you can use one of the public entry proxies:

* **in1.ton.org** port 8080
* **in2.ton.org** port 8080
* **in3.ton.org** port 8080

You can set them in the settings of a regular browser as HTTP proxy server.

[TON DOCS](https://ton.org/docs/#/web3/sites-and-proxy)

[TON DNS](https://telegra.ph/TON-DNS-06-30)

[TON Sites, TON WWW, and TON Proxy](https://telegra.ph/TON-Sites-TON-WWW-and-TON-Proxy-09-29-2)

## TON Site
```bash
fingerprints@ton:~$

apt-get update && apt-get upgrade -y
apt-get install -y nginx
apt-get clean all

apt-get install -y systemd

# echo "daemon off;" >> /etc/nginx/nginx.conf
rm /var/www/html/index.nginx-debian.html
cp fingerprints.ton/index.html /var/www/html/index.nginx-debian.html
cp fingerprints.ton/images/03-logo_blue-2.svg /var/www/html/images/
cp fingerprints.ton/images/03-ton_logo_dark_background.svg /var/www/html/images/
...

mkdir -p /var/cache/swap/
dd if=/dev/zero of=/var/cache/swap/swap0 bs=64M count=64
chmod 0600 /var/cache/swap/swap0
mkswap /var/cache/swap/swap0
swapon /var/cache/swap/swap0
swapon -s

cd /root
mkdir TON
cd TON
apt-get update
apt install -y build-essential cmake clang openssl libssl-dev zlib1g-dev gperf wget git curl libreadline-dev ccache libmicrohttpd-dev
git clone --recurse-submodules https://github.com/SpyCheese/ton.git
mkdir build
cd build
cmake ../ton
wget https://ton-blockchain.github.io/global.config.json
cmake --build . --target lite-client
cmake --build . --target func
cmake --build . --target fift
cmake --build . --target tonlib-cli
cmake --build . --target rldp-http-proxy
cmake --build . --target generate-random-id

```

```bash
fingerprints@ton:~$
cd /root/TON
mkdir keyring
cd keyring
/root/TON/build/utils/generate-random-id -m adnlid
```
Copy key + adnlid

```bash
echo "adnl: "  
read adnl_address

echo "IP: " 
read ip_address_host

cd /root/TON
/root/TON/build/rldp-http-proxy/rldp-http-proxy -p 8080 -a $ip_address_host:3333 -A $adnl_address -L '*' -C /root/TON/build/global.config.json --verbosity 3
```

## Histogram
## Owner list
If nft has owner address on presale stage - it will be minted with that owner, if not it will be minted with minter as owner.
List [here](nfts.csv)

Example:
```
0
1
2,EQCjNf6y_RhVATipbgKpCBAa8h5z6mwIXv3oDY7UZRyv0w3m
```
This will create 3 NFTs. NFTs with index `0` and `1` will be owned by you wallet, while NFT with index `2` will be owned by `EQCjNf6y_RhVATipbgKpCBAa8h5z6mwIXv3oDY7UZRyv0w3m`

# Collection
Content: ipfs://bafkreidikvhz6epgy43qohc3bmqhz4rqekcvzguqebtbpgkw2qo36jr56y

```json
{
  "name": "TON Fingerprints",
  "description": "This is a collection of 10 000 unique digital fingerprints created based on the algorithm for generating basic rings using a noise texture. Like human fingerprints, you can now use them for the Web3 and Metaverse era as digital biometric information on The Open Network.",
  "image": "ipfs://bafkreigdf236ojpw3gyp7pgmbkfdfzok4odwpqkhvmvhpssxhujnhpqaam",
  "external_link": "https://nft.mir.one/fingerprints",
  "fee_recipient": "EQCjNf6y_RhVATipbgKpCBAa8h5z6mwIXv3oDY7UZRyv0w3m"
}
```

## Algorithm for generating basic rings using a noise texture

```glsl
vec2 hash2( vec2 p )
{
    p = vec2( dot(p,vec2(63.31,127.63)), dot(p,vec2(395.467,213.799)) );
    return -1.0 + 2.0*fract(sin(p)*43141.59265);
}

void main(void)
{
    float invzoom = 64.;
    vec2 uv = invzoom*((gl_FragCoord.xy-0.5*resolution.xy)/resolution.x);
    float bounds = smoothstep(9.,10.,length(uv*vec2(0.74,0.55)));

    float a=0.;
    vec2 h = vec2(floor(7.*time), 0.);
    for(int i=0; i<50; i++){
        float s=sign(h.x);
        h = hash2(h)*vec2(15.,20.);
        a += s*atan(uv.x-h.x, uv.y-h.y);
    }
    
    uv += (3-5.).*abs(hash2(h));
    
    a+=atan(uv.y, uv.x);

    float w = 0.8;
    float p=(1.-bounds)*w; 
    float s = min(0.3,p);
    float l = length(uv)+0.319*a; 
    
    float m = mod(l,2.);
    float v = (1.-smoothstep(2.-s,2.,m))*smoothstep(p,p+s,m);
    
    glFragColor = vec4(v,v,v,1.);
}
```
### Variations
Every Fingerprint can be composed of up to 10 properties:

1. Count - Line counter
2. Area - %Area of fingerprint
3. Perimeter - The length of the outside boundary of the fingerprint
4. Ellipse Major - Primary axis of the fingerprint ellipse
5. Minor -  Secondary axis of the fingerprint ellipse
6. Angle - Angle is the angle between the primary axis and a line parallel to the X-axis of the fingerprint
7. Circularity - 4π ×[Area]/[Perimeter]² with a value of 1.0 indicating a perfect circle. As the value approaches 0.0, it indicates an increasingly elongated shape
8. Integrated density - The sum of the values of the pixels in the image fingerprint. This is equivalent to the product of Area and Mean Gray Value
9. Skewness - The third order moment about the mean
10. Kurtosis - The fourth order moment about the mean

### Metadata
SVG files include:

```xml
<metadata>
  <rdf:RDF
    xmlns:rdf = "http://www.w3.org/1999/02/22-rdf-syntax-ns#"
    xmlns:rdfs = "http://www.w3.org/2000/01/rdf-schema#"
    xmlns:dc = "http://purl.org/dc/elements/1.1/"
    xmlns:cc = "http://creativecommons.org/ns#">
    <cc:license rdf:resource="http://creativecommons.org/publicdomain/zero/1.0/deed.en"/>
    <cc:permits rdf:resource="http://creativecommons.org/ns#Reproduction"/>
    <rdf:Description about="https://nft.mir.one/fingerprints"
      dc:title="TON Fingerprints"
      dc:description="This is a unique digital fingerprint created based on the algorithm for generating basic rings using a noise texture. Like human fingerprints, you can now use it for the Web3 and Metaverse era as digital biometric information."
      dc:publisher="MIR | Machine Intelligence Research"
      dc:date="2022-02-22"
      dc:format="image/svg+xml"
      dc:language="en" >
      <dc:creator>
      <rdf:Bag>
        <rdf:li>EQBondcvD2_aOFADXSWJHs4ZazQDuEl9_wNvGGPxI8hGuOFU</rdf:li>
        <rdf:li>ipfs://bafkreihj7iub3fhmhq6jn62noukt5wxn3gv6bvcg7wmt6ywvlurefezckq</rdf:li>
      </rdf:Bag>
      </dc:creator>
    </rdf:Description>
  </rdf:RDF>
</metadata>
```
### License
1. CC0
2. Universal NFT License
### Attribution

```json
{
    "attributes": [
        {
          "trait_type": "Count", 
          "value": 1
        }, 
        {
          "trait_type": "Area", 
          "value": 2
        }, 
        {
          "trait_type": "Perimeter", 
          "value": 3
        }, 
        {
          "trait_type": "Major", 
          "value": 4
        }, 
        {
          "trait_type": "Minor", 
          "value": 5
        }, 
        {
          "trait_type": "Angle", 
          "value": 6
        }, 
        {
          "trait_type": "Circularity", 
          "value": 7
        }, 
        {
          "trait_type": "Integrated density", 
          "value": 8
        }, 
        {
          "trait_type": "Skewness", 
          "value": 9
        },
        {
          "trait_type": "Kurtosis", 
          "value": 10
        }
      ]
    }

```

# Donation

[Fingerprints.ton](https://tonapi.io/account/EQCjNf6y_RhVATipbgKpCBAa8h5z6mwIXv3oDY7UZRyv0w3m)


Jetton Donation

[EQDEcJlTPBymzUqOJ15QR44vIlPIHhsWllrIafWpPdeHiuNR](https://tonapi.io/account/EQDEcJlTPBymzUqOJ15QR44vIlPIHhsWllrIafWpPdeHiuNR)
