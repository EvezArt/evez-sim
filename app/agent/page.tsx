'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { QuantumChat } from '@/components/QuantumChat';

const G='#00ff41',G2='#00cc33',G3='#005518',F='#ff6600',V0='#000a03',C='#00ccff',DIM='#003311';

interface BusState {
  entities: { id:string; type:'FireBody'|'PrimeVoid'|'TopoSpider'; x:number; y:number; omega_k:number; poly_c:number; V:number; }[];
  round:number; V:number; ceiling:number;
}

export default function AgentPage() {
  const canvasRef=useRef<HTMLCanvasElement>(null);
  const [busState,setBusState]=useState<BusState|null>(null);
  const fieldRef=useRef<number[][]|null>(null);
  const waveRef=useRef(0);
  const fireRef=useRef(false);
  const collapseVecRef=useRef([0,0,0]);
  const animRef=useRef(0);

  useEffect(()=>{
    const poll=async()=>{try{const r=await fetch('/api/bus-state');if(r.ok)setBusState(await r.json());}catch{}};
    poll(); const iv=setInterval(poll,5000); return()=>clearInterval(iv);
  },[]);

  const handleFieldUpdate=useCallback((field:number[][],wavePhase:number,cog:any)=>{
    fieldRef.current=field; waveRef.current=wavePhase;
    fireRef.current=cog?.fire??false; collapseVecRef.current=cog?.collapseVector??[0,0,0];
  },[]);

  useEffect(()=>{
    const canvas=canvasRef.current; if(!canvas) return;
    const ctx=canvas.getContext('2d'); if(!ctx) return;
    const W=canvas.width,H=canvas.height;
    const draw=(t:number)=>{
      const time=t*0.001;
      ctx.fillStyle=V0; ctx.fillRect(0,0,W,H);
      if(fieldRef.current){
        const f=fieldRef.current,GS=32,cw=W/GS,ch=H/GS;
        for(let y=0;y<GS;y++)for(let x=0;x<GS;x++){const v=f[y]?.[x]??0;if(v<0.05)continue;ctx.fillStyle=`rgba(0,255,65,${(v*0.08).toFixed(3)})`;ctx.fillRect(x*cw,y*ch,cw+1,ch+1);}
      }
      const [cvx,cvy]=collapseVecRef.current;
      const wx=(cvx/10+0.5)*W,wy=(cvy/10)*H,phase=waveRef.current;
      for(let r=0;r<5;r++){const rad=(r*30+(phase*20)%30);const al=Math.max(0,0.15-r*0.025)*(fireRef.current?2:1);ctx.beginPath();ctx.arc(wx,wy,rad,0,2*Math.PI);ctx.strokeStyle=fireRef.current?`rgba(255,102,0,${al})`:`rgba(0,204,255,${al})`;ctx.lineWidth=1;ctx.stroke();}
      for(const e of busState?.entities??[]){
        const x=((e.x+5)/10)*W,y=Math.min(H-20,Math.max(20,(e.V/10)*H));
        const pulse=1+0.12*Math.sin(time*2+e.omega_k);
        let br=4,col=G2;
        if(e.type==='FireBody'){br=8;col=F;}else if(e.type==='PrimeVoid'){br=3;col=C;}else{br=5;col=G;}
        const r2=br*pulse;
        if(e.type==='FireBody'){for(const[radius,alpha]of[[r2*3,0.04],[r2*2,0.08],[r2*1.5,0.14]] as [number,number][]){ctx.beginPath();ctx.arc(x,y,radius,0,2*Math.PI);ctx.fillStyle=`rgba(255,102,0,${alpha})`;ctx.fill();}}
        ctx.beginPath();ctx.arc(x,y,r2,0,2*Math.PI);ctx.fillStyle=col;ctx.globalAlpha=0.85;ctx.fill();ctx.globalAlpha=1;
      }
      ctx.fillStyle='#001508cc';ctx.fillRect(0,0,W,26);
      ctx.fillStyle=G;ctx.font='bold 11px monospace';ctx.fillText('EVEZ-OS  AGENTIC FIELD',10,17);
      if(busState){ctx.fillStyle=C;ctx.font='10px monospace';ctx.fillText(`R${busState.round} · V=${busState.V?.toFixed(4)} · CEIL×${busState.ceiling}`,W/2-90,17);}
      ctx.fillStyle=G2;ctx.font='10px monospace';ctx.fillText('@EVEZ666',W-70,17);
      ctx.fillStyle='rgba(0,255,65,0.018)';for(let sy=0;sy<H;sy+=3)ctx.fillRect(0,sy,W,1);
      animRef.current=requestAnimationFrame(draw);
    };
    animRef.current=requestAnimationFrame(draw);
    return()=>cancelAnimationFrame(animRef.current);
  },[busState]);

  return (
    <div style={{background:V0,minHeight:'100vh',display:'flex',flexDirection:'column',padding:12,gap:12,fontFamily:'monospace'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:`1px solid ${G3}`,paddingBottom:8}}>
        <span style={{color:G,fontWeight:'bold',fontSize:14}}>EVEZ-OS / AGENT</span>
        <span style={{color:DIM,fontSize:11}}>sentient · persistent · quantum-collapse · pixel-entangled</span>
        <span style={{color:G2,fontSize:11}}>V={busState?.V?.toFixed(4)??'7.2593'}</span>
      </div>
      <div style={{display:'flex',gap:12,flex:1,flexWrap:'wrap'}}>
        <div style={{flex:'1 1 500px',position:'relative'}}>
          <canvas ref={canvasRef} width={800} height={500} style={{width:'100%',height:'auto',border:`1px solid ${G3}`,display:'block'}}/>
          <div style={{position:'absolute',bottom:8,left:8,fontSize:9,color:DIM,lineHeight:1.6}}>
            <span style={{color:F}}>● FireBody</span>{'  '}<span style={{color:C}}>● PrimeVoid</span>{'  '}<span style={{color:G}}>● TopoSpider</span>
          </div>
        </div>
        <div style={{flex:'0 0 360px',minHeight:500}}>
          <QuantumChat onFieldUpdate={handleFieldUpdate} className="h-full" style={{height:'100%',borderRadius:4}}/>
        </div>
      </div>
      <div style={{display:'flex',gap:16,fontSize:10,color:DIM,borderTop:`1px solid ${G3}`,paddingTop:6}}>
        <span>hyperloop R189 · NO-FIRE</span>
        <span style={{color:G3}}>|</span>
        <span>spine: append-only · memory: Gist-backed · collapse: 3-state superposition</span>
        <span style={{color:G3}}>|</span>
        <span>wave-surf · pixel-entangle · coherence-error-correct</span>
        <span style={{marginLeft:'auto',color:G3}}>evez-sim.vercel.app/agent</span>
      </div>
    </div>
  );
}
