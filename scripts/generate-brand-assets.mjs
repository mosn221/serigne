import { mkdirSync, writeFileSync } from 'node:fs';
import { deflateSync } from 'node:zlib';

const out = new URL('../public/assets/img/', import.meta.url);
mkdirSync(out, { recursive: true });

const C = {
  bg:[11,16,32,255],
  white:[244,247,250,255],
  cyan:[0,191,214,255],
  mint:[63,230,168,255],
  transparent:[0,0,0,0]
};

const polys = {
  left:[[20,104],[20,24],[64,57],[58,69],[38,54],[38,104]],
  top:[[58,55],[101,22],[108,22],[108,34],[64,67]],
  middle:[[64,69],[101,41],[108,41],[108,53],[70,81]],
  lower:[[70,84],[94,66],[94,56],[108,45],[108,103],[94,103],[94,78],[76,91]]
};

function crc32(buf){let c=0xffffffff;for(const b of buf){c^=b;for(let k=0;k<8;k++)c=(c>>>1)^((c&1)?0xedb88320:0);}return (c^0xffffffff)>>>0;}
function chunk(type,data){const t=Buffer.from(type);const len=Buffer.alloc(4);len.writeUInt32BE(data.length);const crc=Buffer.alloc(4);crc.writeUInt32BE(crc32(Buffer.concat([t,data])));return Buffer.concat([len,t,data,crc]);}
function png(w,h,pixels){const sig=Buffer.from([137,80,78,71,13,10,26,10]);const ihdr=Buffer.alloc(13);ihdr.writeUInt32BE(w,0);ihdr.writeUInt32BE(h,4);ihdr[8]=8;ihdr[9]=6;const rows=[];for(let y=0;y<h;y++){rows.push(Buffer.from([0]));rows.push(pixels.subarray(y*w*4,(y+1)*w*4));}return Buffer.concat([sig,chunk('IHDR',ihdr),chunk('IDAT',deflateSync(Buffer.concat(rows),{level:9})),chunk('IEND',Buffer.alloc(0))]);}
function inside(x,y,p){let c=false;for(let i=0,j=p.length-1;i<p.length;j=i++){const [xi,yi]=p[i],[xj,yj]=p[j];if(((yi>y)!=(yj>y))&&(x<(xj-xi)*(y-yi)/(yj-yi)+xi))c=!c;}return c;}
function mix(a,b,t){return a.map((v,i)=>Math.round(v+(b[i]-v)*t));}
function dataColor(x,y,w,h){const tx=Math.max(0,Math.min(1,x/Math.max(1,w-1)));const ty=Math.max(0,Math.min(1,1-y/Math.max(1,h-1)));return mix(C.cyan,C.mint,Math.max(0,Math.min(1,.62*tx+.38*ty)));}
function fillPoly(px,w,h,p,color){const xs=p.map(v=>v[0]),ys=p.map(v=>v[1]);const minX=Math.max(0,Math.floor(Math.min(...xs))),maxX=Math.min(w-1,Math.ceil(Math.max(...xs)));const minY=Math.max(0,Math.floor(Math.min(...ys))),maxY=Math.min(h-1,Math.ceil(Math.max(...ys)));for(let y=minY;y<=maxY;y++)for(let x=minX;x<=maxX;x++)if(inside(x+.5,y+.5,p)){const i=(y*w+x)*4;px.set(typeof color==='function'?color(x,y,w,h):color,i);}}
function make(w,h,{background=true,scale=1,ox=0,oy=0}={}){const px=Buffer.alloc(w*h*4);for(let i=0;i<px.length;i+=4)px.set(background?C.bg:C.transparent,i);const map=p=>p.map(([x,y])=>[ox+x*scale,oy+y*scale]);fillPoly(px,w,h,map(polys.left),C.white);for(const key of ['top','middle','lower'])fillPoly(px,w,h,map(polys[key]),dataColor);return px;}
function save(name,w,h,opts){writeFileSync(new URL(name,out),png(w,h,make(w,h,opts)));}

for(const s of [16,32]) save(`favicon-${s}x${s}.png`,s,s,{background:true,scale:s/128});
save('apple-touch-icon.png',180,180,{background:true,scale:180/128});
save('m221tech-mark-512.png',512,512,{background:false,scale:4});
save('m221tech-social-card.png',1200,630,{background:true,scale:3.6,ox:(1200-128*3.6)/2,oy:(630-128*3.6)/2});
console.log('Generated M221Tech data-ribbon raster brand assets.');
