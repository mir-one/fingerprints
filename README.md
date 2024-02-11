![cover](/tf_cover_rev2023v.png)

# TON Fingerprints

This is a set of unique digital fingerprints created based on the algorithm for generating basic rings using a noise texture. Like human fingerprints, you can now use them for the Web 3.0 and metaverse era as digital biometric information on The Open Network.

## Domain fingerprints.ton

[fingerprints.ton](http://fingerprints.ton)

![img](/fingerprints.ton.png)

TON DNS is a service that allows users to assign a human-readable name to crypto wallets, smart contracts, and websites. With TON DNS, access to decentralized services is analogous to access to websites on the internet.

## Public entry proxies

For familiarization with TON Sites you can use one of the public entry proxies:

- **in1.ton.org** port 8080
- **in2.ton.org** port 8080
- **in3.ton.org** port 8080

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
5. Minor - Secondary axis of the fingerprint ellipse
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

### Scan

Open [Fingerprint Scanner](https://t.me/fingerprint_scanner_bot/scan)
| | | | |
|-|-|-|-|
|![image](https://github.com/mir-one/fingerprints/assets/24755187/d1a6cfc4-51ef-4835-8361-0119a00f186e) |![image](https://github.com/mir-one/fingerprints/assets/24755187/24385c99-c42c-4b0b-9d5e-e4ff4d1f215c) |![image](https://github.com/mir-one/fingerprints/assets/24755187/457bae64-1307-491e-a72d-a1468f2181a0) | ![image](https://github.com/mir-one/fingerprints/assets/24755187/b6d4bff2-c94d-472e-a138-c45533ace73f) |


FS is an exciting WebApp in which you have to scan digital fingerprints and earn bulbs and keys. Using an incredibly accurate scanner, your task is to recognize and collect fingerprints in order to get the maximum amount of game resources.

The main feature of the game is the motivation of players through the achievement standings. You will be able to compete with other players, comparing your results and rising in the ranking. Be the best and become the real masters of fingerprint scanning!

"Scanner" is based on the NFT collection of open source with [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) Universal license - [TON Fingerprints](https://getgems.io/collection/fingerprints). Unique and impressive fingerprints are waiting for you, which you can collect and use for your own purposes.

Immerse yourself in the fascinating world of fingerprint scanning, compete with friends and reach new heights in the "Scanner"!

#### Level system

```typescript
export const getXpForNextLevel = (currentLevel: number) =>
  currentLevel ** 2 + currentLevel + 33;
```

This is a function that calculates the amount of experience needed to reach the next level in a game or progress system. The function takes the current level (as a number) and uses it to calculate the required experience.

The mathematical expression `currentLevel ** 2 + currentLevel + 33` is used inside the function, which consists of three parts:

1. `currentLevel ** 2` is squaring the current level. This value is added to the total amount of experience to increase it with each level.

2. `currentLevel` is the current level. It is added to the result of the first part of the expression to increase the amount of experience even more.

3. `33` is a constant value that is added to the result of the first two parts of the expression. It may represent some basic need for experience or an additional reward for reaching the next level.

As a result, the function returns the total amount of experience needed to reach the next level, based on the current level.

#### Weighted Random

This function takes an array of items as input and returns a randomly selected item based on their weights.

```typescript
interface Item {
  weight: number;
  [key: string]: any;
}

export function getWeightedRandomItem<T extends Item>(items: T[]): T {
  const weights = items.reduce((acc, item, i) => {
    acc.push(item.weight + (acc[i - 1] ?? 0));
    return acc;
  }, [] as number[]);
  const random = Math.random() * (weights.at(-1) ?? 0);
  return items[weights.findIndex((weight) => weight > random)];
}
```

The function starts by calculating the cumulative weights of the items. It uses the reduce method to iterate over the items array and calculate the cumulative weight for each item. The acc parameter represents the accumulator array, which starts with an empty array. For each item, the function calculates the cumulative weight by adding the item's weight to the previous cumulative weight in the accumulator array `(acc[i - 1] ?? 0)`. The `??` operator is used to handle the case when there is no previous cumulative weight, in which case it defaults to 0. The calculated cumulative weight is then pushed into the accumulator array `(acc.push(item.weight + (acc[i - 1] ?? 0)))`.

After calculating the cumulative weights, the function generates a random number between 0 and the last cumulative weight in the weights array `(weights.at(-1) ?? 0)`. The at method is used to access the element at the specified index, with negative values representing the position from the end of the array. The `??` operator is used to handle the case when there are no items in the array, in which case it defaults to `0`.

Finally, the function finds the index of the first cumulative weight in the weights array that is greater than the random number. It uses the findIndex method to iterate over the weights array and returns the index of the first element that satisfies the provided condition (weight > random).

The function then returns the item at the found index in the items array `(items[weights.findIndex((weight) => weight > random)])`, which represents the randomly selected item based on their weights.

```typescript
export const scanDrop: ScanDrop[] = [
  {
    itemId: "Unique",
    weight: 0.01, // = 0.01% or 1 / 10 000 Fingerprints
  },
  {
    itemId: "Rare",
    weight: 0.01,
  },
  {
    itemId: "Uncommon",
    weight: 0.01,
  },
  {
    itemId: "Scarce",
    weight: 0.01,
  },
  {
    itemId: "Amazing",
    weight: 0.02,
  },
  {
    itemId: "Exceptional",
    weight: 0.07,
  },
  {
    itemId: "Unusual",
    weight: 0.08,
  },
  {
    itemId: "Singular",
    weight: 0.12,
  },
  {
    itemId: "Unprecedented",
    weight: 0.13,
  },
  {
    itemId: "Exclusive",
    weight: 0.19,
  },
  {
    itemId: "Precious",
    weight: 0.21,
  },
  {
    itemId: "Distinctive",
    weight: 0.31,
  },
  {
    itemId: "Unmatched",
    weight: 0.34,
  },
  {
    itemId: "Peculiar",
    weight: 0.5,
  },
  {
    itemId: "Exceptionable",
    weight: 0.55,
  },
  {
    itemId: "Curious",
    weight: 0.81,
  },
  {
    itemId: "Abnormal",
    weight: 0.89,
  },
  {
    itemId: "Outstanding",
    weight: 1.31,
  },
  {
    itemId: "Rarefied",
    weight: 1.44,
  },
  {
    itemId: "Remarkable",
    weight: 2.12,
  },
  {
    itemId: "Unparalleled",
    weight: 2.33,
  },
  {
    itemId: "Uncommonplace",
    weight: 2.38,
  },
  {
    itemId: "Unconventional",
    weight: 3.43,
  },
  {
    itemId: "Inimitable",
    weight: 3.77,
  },
  {
    itemId: "Unheard",
    weight: 6.1,
  },
  {
    itemId: "Quirky",
    weight: 8.98,
  },
  {
    itemId: "Specialized",
    weight: 9.87,
  },
  {
    itemId: "Extraordinary",
    weight: 14.53,
  },
  {
    itemId: "Infrequent",
    weight: 15.97,
  },
  {
    itemId: "Common",
    weight: 23.51,
  },
  {
    itemId: "facquire", // failure acquire
    weight: 20, // = 20%
    isFailure: true,
  },
  {
    itemId: "fenroll", // failure enroll
    weight: 20,
    isFailure: true,
  },
];
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
