# TON Fingerprints
This is a set of unique digital fingerprints created based on the algorithm for generating basic rings using a noise texture. Like human fingerprints, you can now use them for the Web 3.0 and metaverse era as digital biometric information on The Open Network.

### Algorithm for generating basic rings using a noise texture
```
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
