![Banner](/f_banner.svg)

# TON Fingerprints
This is a set of unique digital fingerprints created based on the algorithm for generating basic rings using a noise texture. Like human fingerprints, you can now use them for the Web 3.0 and metaverse era as digital biometric information on The Open Network.

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

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    float invzoom = 100.;
    vec2 uv = invzoom*((fragCoord-0.5*iResolution.xy)/iResolution.x);
    float bounds = smoothstep(9.,10.,length(uv*vec2(0.7,0.5)));

    float a=0.;
    vec2 h = vec2(floor(7.*iTime), 0.);
    for(int i=0; i<50; i++){
        float s=sign(h.x);
        h = hash2(h)*vec2(15.,20.);
    	a += s*atan(uv.x-h.x, uv.y-h.y);
    }
    
    uv += 20.*abs(hash2(h));
    
    a+=atan(uv.y, uv.x);

    float w = 0.8;
    float p=(1.-bounds)*w;
    float s = min(0.3,p);
    float l = length(uv)+0.319*a;
    
    float m = mod(l,2.);
    float v = (1.-smoothstep(2.-s,2.,m))*smoothstep(p,p+s,m);
    
	fragColor = vec4(v,v,v,1.);
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
        <rdf:li>https://ipfs.io/ipfs/bafkreiay6blazeqosvbtmrugmo77nzalroek7js5fiqe2iwo4jvlx5pnfa</rdf:li>
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

