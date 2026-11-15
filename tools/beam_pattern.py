"""Far-field pattern of the filled (carriage) and petal arrays at 10 GHz.
Uniform illumination, all tiles in phase. Needs numpy.   python3 tools/beam_pattern.py
"""
import numpy as np
lam=0.03; k=2*np.pi/lam; s3=3**.5
# filled: 19-hex cluster
filled=[(q+r/2, r*s3/2) for q in range(-2,3) for r in range(-2,3) if abs(q+r)<=2]
# petal layout: flattened tile centres from the hinged model, all 20 tiles (aft cap included)
petal=[[0,0],[0.5,0.866],[0.5,-0.866],[-1,0],[1.5,0.866],[0,1.7321],[1.5,-0.866],[0,-1.7321],[-1.5,0.866],[-1.5,-0.866],[2,1.7321],[0.5,2.5981],[2,-1.7321],[0.5,-2.5981],[-2.5,0.866],[-2.5,-0.866],[3,-1.7321],[0,3.4641],[-3,-1.7321],[0.5,4.3301]]
# hex tile sample points (vertex at 30deg => flat-to-flat 1 m along x)
g=0.04; R=1/s3; pts=[]
ax=np.arange(-0.6,0.6,g)+g/2
for x in ax:
    for y in ax:
        if abs(x)<=0.5 and abs(x)+s3*abs(y)<=1.0: pts.append((x,y))
pts=np.array(pts); print('pts/tile',len(pts),'area',len(pts)*g*g)
th=np.arange(-100e-3,100e-3+1e-9,0.4e-3); U,V=np.meshgrid(th,th); u=U.ravel(); v=V.ravel()
tile=np.zeros(u.size,complex)
for i in range(0,len(pts),64):
    P=pts[i:i+64]; tile+=np.exp(1j*k*(np.outer(u,P[:,0])+np.outer(v,P[:,1]))).sum(1)
for name,c in (('filled',filled),('petal',petal)):
    c=np.array(c); AF=np.exp(1j*k*(np.outer(u,c[:,0])+np.outer(v,c[:,1]))).sum(1)
    I=(abs(tile*AF)**2).reshape(U.shape); pk=I.max(); n=len(th)//2
    rad=np.hypot(U,V)
    # half-power width along x and y cuts
    def hp(cut):
        j=n
        while cut[j]>pk/2: j+=1
        return 2*(th[j]-th[n])*1e3
    # main lobe: flood region connected to peak above -15 dB
    m=I>pk*10**-1.5; main=np.zeros_like(m); st=[(n,n)]; main[n,n]=True
    while st:
        a,b=st.pop()
        for da,db in ((1,0),(-1,0),(0,1),(0,-1)):
            x,y=a+da,b+db
            if 0<=x<m.shape[0] and 0<=y<m.shape[1] and m[x,y] and not main[x,y]: main[x,y]=True; st.append((x,y))
    side=I.copy(); side[main]=0
    print(name,'peak(rel)',round(pk/ (len(pts)*len(c))**2,3),'HPBW x/y mrad',round(hp(I[n,:]),2),round(hp(I[:,n]),2),
          'mainlobe power frac',round(I[main].sum()/I.sum(),3),'peak sidelobe dB',round(10*np.log10(side.max()/pk),1),
          'at mrad',round(rad.ravel()[side.argmax()]*1e3,1),'main lobe max radius mrad',round(rad[main].max()*1e3,1))
