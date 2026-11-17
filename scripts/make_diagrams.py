"""Generates the four dark-theme capstone diagrams (inline SVG) and splices them into index.html.
Numbers come from the capstone report: EMA alpha=0.75 and 10-sample moving average at 50 Hz (Fig 4.1),
control-source handoff (Fig 4.2), flight phases (Fig 4.3), architecture (Fig 3.1)."""
import re,sys
H='index.html'

def arrow(d,cls='l',marker=True,extra=''):
    m='marker-end="url(#ah)"' if marker else ''
    return f'<path d="{d}" class="{cls}" {m} {extra}/>'

DEFS='''<defs>
<marker id="ah" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 8 4 0 8z" fill="#a8c7ff"/></marker>
<marker id="ahd" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 8 4 0 8z" fill="#ff8d8d"/></marker>
</defs>'''

# ---------- shared: multi-line subtitles use "|" ----------
def node(x,y,w,h,t,s='',hi=False,cls=''):
    c='nh' if hi else 'n'
    out=f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="10" class="{c} {cls}"/>'
    cx=x+w/2
    lines=[l for l in s.split('|') if l]
    if lines:
        top=y+h/2-4-(len(lines)-1)*6
        out+=f'<text x="{cx}" y="{top}" class="t" text-anchor="middle">{t}</text>'
        for i,l in enumerate(lines):
            out+=f'<text x="{cx}" y="{top+15+i*12}" class="s" text-anchor="middle">{l}</text>'
    else:
        out+=f'<text x="{cx}" y="{y+h/2+4}" class="t" text-anchor="middle">{t}</text>'
    return out

# ---------- 1. system architecture ----------
arch=DEFS+f'''
<rect x="174" y="98" width="292" height="148" rx="14" class="reg"/>
<text x="186" y="116" class="s hi">TILT-COMPENSATION LOOP</text><text x="186" y="234" class="s">outer loop around PX4</text>
{node(20,16,140,40,'RC receiver')}
{node(20,130,140,84,'Pixhawk 6C Mini','PX4 · IMU|estimator')}
{node(190,130,140,84,'Raspberry Pi 5','Ubuntu 24.04|ROS 2 + MAVROS',True)}
{node(360,130,92,84,'PCA9685','16-ch PWM',True)}
{node(490,48,100,56,'Roll servos','4 × MG995')}
{node(490,236,100,56,'Pitch servos','4 × MG995')}
{node(360,268,92,36,'Servo PSU','5–6 V')}
{arrow('M90 58V128','l flow')}<text x="100" y="98" class="s">RC link</text>
{arrow('M162 172H188','l la',True,'marker-start="url(#ah)"')}<text x="175" y="162" class="s" text-anchor="middle">UART</text>
{arrow('M332 172H358','l la flow')}<text x="345" y="162" class="s" text-anchor="middle">I²C</text>
{arrow('M454 160C474 160 474 76 488 76','l la flow')}
{arrow('M454 184C474 184 474 264 488 264','l la flow')}<text x="478" y="176" class="s hi" text-anchor="middle">PWM</text>
{arrow('M406 268V216','l')}'''

# ---------- 2. hybrid controller ----------
hyb=DEFS+f'''
{node(20,14,170,52,'IMU message','attitude · rates')}
{node(215,14,180,52,'Flight phase','GROUND · TAKEOFF|FLIGHT · LANDING')}
{node(430,14,130,52,'rel_alt','lockout?')}
{node(20,150,170,66,'Source A','IMU · P-only|+ rate damping',True)}
{node(215,150,170,66,'Source B','PX4 control × scale|+ rate damping',True)}
{node(410,150,170,66,'Lockout','IMU tilt off|pitch hold only')}
{arrow('M105 68V148','l la')}
{arrow('M252 68V130H150V148','l')}<text x="196" y="86" class="s bg" text-anchor="middle">GROUND · TAKEOFF</text><text x="196" y="98" class="s bg" text-anchor="middle">LANDING, or</text><text x="196" y="110" class="s bg" text-anchor="middle">stream stale</text>
{arrow('M300 68V148','l la')}<text x="308" y="100" class="s bg">FLIGHT · armed</text><text x="308" y="112" class="s bg">stream &lt; 0.30 s</text>
{arrow('M495 68V148','l')}<text x="503" y="112" class="s bg">above 2.0 m</text>
{node(150,254,300,40,'Axis clamp 40° → vector clamp 40°')}
{arrow('M105 218C105 238 230 238 230 252','l la')}
{arrow('M300 218V252','l la')}
{arrow('M495 218C495 238 370 238 370 252','l')}
{node(210,320,180,38,'8 servos on the PCA9685','',True)}
{arrow('M300 296V318','l la flow')}'''

# ---------- 3. latency chart (computed from the filter formulas) ----------
X0,X1,Y0,Y1=56,540,20,230
def px(t): return X0+(X1-X0)*t/400
def py(v): return Y1-(Y1-Y0)*v
step=60
def stair(vals):
    path=f'M{px(0):.1f} {py(0):.1f}'
    seq=[(step,vals[0])]+[(step+20*k,vals[k]) for k in range(1,len(vals))]
    for t,v in seq: path+=f'H{px(t):.1f}V{py(v):.1f}'
    return path+f'H{px(400):.1f}'
n=20
ma=[min(k+1,10)/10 for k in range(n)]
ema=[1-0.25**(k+1) for k in range(n)]
grid=''.join(f'<line x1="{px(t):.1f}" y1="{Y0}" x2="{px(t):.1f}" y2="{Y1}" class="gr"/><text x="{px(t):.1f}" y="{Y1+16}" class="s" text-anchor="middle">{t}</text>' for t in range(0,401,100))
grid+=''.join(f'<line x1="{X0}" y1="{py(v):.1f}" x2="{X1}" y2="{py(v):.1f}" class="gr"/><text x="{X0-8}" y="{py(v)+3:.1f}" class="s" text-anchor="end">{v:g}</text>' for v in (0,0.5,1))
lat=f'''{grid}
<line x1="{X0}" y1="{py(.9):.1f}" x2="{X1}" y2="{py(.9):.1f}" stroke="#a8c7ff" stroke-opacity=".35" stroke-dasharray="2 4"/><text x="{X1}" y="{py(.9)+13:.1f}" class="s hi" text-anchor="end">90 %</text>
<path d="M{px(0):.1f} {py(0):.1f}H{px(step):.1f}V{py(1):.1f}H{px(400):.1f}" class="l" style="stroke:#8794a8;opacity:.6"/>
<path d="{stair(ma)}" class="l" style="stroke:#7f9cc7;stroke-dasharray:6 4;stroke-width:1.8"/>
<path d="{stair(ema)}" class="l la" style="stroke-width:2.6"/>
<text x="{X0+4}" y="{Y1+34}" class="s">time (ms) at 50 Hz</text>
<g transform="translate({px(228):.1f} {py(0.46):.1f})"><circle cx="-10" cy="-4" r="4" fill="#7f9cc7"/><text class="t" style="fill:#7f9cc7">10-sample average</text><text y="14" class="s">avg delay 90 ms</text></g>
<g transform="translate({px(176):.1f} {py(0.17):.1f})"><circle cx="-10" cy="-4" r="4" fill="#a8c7ff"/><text class="t" style="fill:#a8c7ff">EMA · α = 0.75</text><text y="14" class="s">avg delay 6.7 ms</text><text y="26" class="s">90 % in 2 samples</text></g>
<text x="{px(step)-8:.1f}" y="{py(1)+14:.1f}" class="s" text-anchor="end">input step</text>'''

# ---------- 4. flight phases ----------
FS='#ff8d8d'
BW=90;XS=[10,173,337,500]
def gx(i): return XS[i]+BW+2, XS[i+1]-2          # arrow x-range in gap i
def gc(i): return (XS[i]+BW+XS[i+1])/2            # gap centre
ph=DEFS+f'''
{node(XS[0],60,BW,60,'GROUND','',True)}
{node(XS[1],60,BW,60,'TAKEOFF','')}
{node(XS[2],60,BW,60,'FLIGHT','',True)}
{node(XS[3],60,BW,60,'LANDING','')}
{arrow(f'M{gx(0)[0]} 80H{gx(0)[1]}','l la flow')}<text x="{gc(0)}" y="70" class="s" text-anchor="middle">thr &gt; 1550</text>
{arrow(f'M{gx(1)[0]} 80H{gx(1)[1]}','l la flow')}<text x="{gc(1)}" y="56" class="s" text-anchor="middle">&gt; 1 s and</text><text x="{gc(1)}" y="68" class="s" text-anchor="middle">thr &gt; 1550</text>
{arrow(f'M{gx(2)[0]} 80H{gx(2)[1]}','l la flow')}<text x="{gc(2)}" y="70" class="s" text-anchor="middle">thr &lt; 1450</text>
{arrow(f'M{gx(2)[1]} 102H{gx(2)[0]}','l')}<text x="{gc(2)}" y="118" class="s" text-anchor="middle">thr &gt; 1550</text>
{arrow(f'M{gx(0)[1]} 102H{gx(0)[0]}','l')}<text x="{gc(0)}" y="118" class="s" text-anchor="middle">thr at min</text>
<g stroke="{FS}" stroke-opacity=".55" stroke-dasharray="3 4" fill="none"><path d="M{XS[0]+BW/2} 122V180M{XS[1]+BW/2} 122V180M{XS[2]+BW/2} 122V180M{XS[3]+BW/2} 122V180"/></g>
<rect x="10" y="180" width="580" height="44" rx="22" class="fs"/><text x="300" y="206" class="t" text-anchor="middle" style="fill:{FS}">FAILSAFE · reachable from any state · a watchdog trip latches it</text>
<text x="10" y="252" class="s">thr = throttle pulse width (µs)  ·  RC signal lost &gt; 0.5 s → back to GROUND</text>'''

# =====================================================================
# Portrait (phone) versions — drawn for a 360-wide viewBox so they fit the screen
# =====================================================================
m_arch = DEFS + f"""
<rect x="14" y="178" width="332" height="236" rx="14" class="reg"/>
<text x="28" y="198" class="s hi">TILT-COMPENSATION LOOP</text><text x="28" y="404" class="s">outer loop around PX4</text>
{node(110,8,140,38,'RC receiver')}
{node(50,84,260,64,'Pixhawk 6C Mini','PX4 · IMU · estimator')}
{node(50,214,260,64,'Raspberry Pi 5','Ubuntu 24.04 · ROS 2 + MAVROS',True)}
{node(50,324,260,56,'PCA9685','16-ch PWM',True)}
{node(14,452,150,52,'Roll servos','4 × MG995')}
{node(196,452,150,52,'Pitch servos','4 × MG995')}
{node(100,540,160,38,'Servo PSU','5–6 V')}
{arrow('M180 46V82','l flow')}<text x="192" y="68" class="s">RC link</text>
{arrow('M180 150V212','l la',True,'marker-start="url(#ah)"')}<text x="192" y="186" class="s">UART</text>
{arrow('M180 280V322','l la flow')}<text x="192" y="306" class="s">I²C</text>
{arrow('M120 382C120 420 90 420 90 450','l la flow')}
{arrow('M240 382C240 420 270 420 270 450','l la flow')}<text x="180" y="426" class="s hi" text-anchor="middle">PWM</text>
{arrow('M140 538L110 506','l')}{arrow('M220 538L250 506','l')}"""

m_hyb = DEFS + f"""
{node(8,8,108,50,'IMU','attitude|rates')}
{node(126,8,108,50,'Flight phase','GROUND · TAKEOFF|FLIGHT · LANDING')}
{node(244,8,108,50,'rel_alt','lockout?')}
{node(8,132,108,70,'Source A','IMU · P-only|+ rate damping',True)}
{node(126,132,108,70,'Source B','PX4 × scale|+ rate damping',True)}
{node(244,132,108,70,'Lockout','IMU tilt off|pitch hold')}
{arrow('M62 60V130','l la')}
{arrow('M146 60V96H90V130','l')}<circle cx="118" cy="96" r="9" class="bdg"/><text x="118" y="100" class="s bd" text-anchor="middle">1</text>
{arrow('M180 60V130','l la')}<circle cx="180" cy="96" r="9" class="bdg"/><text x="180" y="100" class="s bd" text-anchor="middle">2</text>
{arrow('M298 60V130','l')}<circle cx="298" cy="96" r="9" class="bdg"/><text x="298" y="100" class="s bd" text-anchor="middle">3</text>
{node(30,256,300,42,'Axis clamp 40° → vector clamp 40°')}
{arrow('M62 204C62 232 110 232 110 254','l la')}
{arrow('M180 204V254','l la')}
{arrow('M298 204C298 232 250 232 250 254','l')}
{node(80,328,200,38,'8 servos on the PCA9685','',True)}
{arrow('M180 300V326','l la flow')}
<text x="8" y="402" class="s hi">WHEN EACH SOURCE IS USED</text>
<text x="8" y="420" class="s"><tspan class="bd2">1</tspan>  GROUND · TAKEOFF · LANDING, or</text><text x="25" y="433" class="s">stream stale</text>
<text x="8" y="452" class="s"><tspan class="bd2">2</tspan>  FLIGHT · armed · stream &lt; 0.30 s</text>
<text x="8" y="470" class="s"><tspan class="bd2">3</tspan>  above 2.0 m: IMU tilt off</text>"""


def chart_m():
    X0, X1, Y0, Y1 = 40, 348, 14, 190
    px = lambda t: X0 + (X1 - X0) * t / 400
    py = lambda v: Y1 - (Y1 - Y0) * v

    def stair(vals):
        path = f'M{px(0):.1f} {py(0):.1f}'
        for t, v in [(60, vals[0])] + [(60 + 20 * k, vals[k]) for k in range(1, len(vals))]:
            path += f'H{px(t):.1f}V{py(v):.1f}'
        return path + f'H{px(400):.1f}'
    ma = [min(k + 1, 10) / 10 for k in range(20)]
    ema = [1 - 0.25 ** (k + 1) for k in range(20)]
    g = ''.join(f'<line x1="{px(t):.1f}" y1="{Y0}" x2="{px(t):.1f}" y2="{Y1}" class="gr"/><text x="{px(t):.1f}" y="{Y1+15}" class="s" text-anchor="middle">{t}</text>' for t in range(0, 401, 100))
    g += ''.join(f'<line x1="{X0}" y1="{py(v):.1f}" x2="{X1}" y2="{py(v):.1f}" class="gr"/><text x="{X0-6}" y="{py(v)+3:.1f}" class="s" text-anchor="end">{v:g}</text>' for v in (0, 0.5, 1))
    return DEFS + f"""{g}
<line x1="{X0}" y1="{py(.9):.1f}" x2="{X1}" y2="{py(.9):.1f}" stroke="#a8c7ff" stroke-opacity=".35" stroke-dasharray="2 4"/><text x="{X1}" y="{py(.9)+13:.1f}" class="s hi" text-anchor="end">90 %</text>
<path d="M{px(0):.1f} {py(0):.1f}H{px(60):.1f}V{py(1):.1f}H{px(400):.1f}" class="l" style="stroke:#8794a8;opacity:.6"/>
<path d="{stair(ma)}" class="l" style="stroke:#7f9cc7;stroke-dasharray:6 4;stroke-width:1.8"/>
<path d="{stair(ema)}" class="l la" style="stroke-width:2.6"/>
<text x="{X0}" y="{Y1+32}" class="s">time (ms) at 50 Hz</text>
<line x1="8" y1="252" x2="30" y2="252" class="l la" style="stroke-width:2.6"/><text x="38" y="256" class="t">EMA · α = 0.75</text><text x="38" y="271" class="s">avg delay 6.7 ms · 90 % in 2 samples</text>
<line x1="8" y1="296" x2="30" y2="296" class="l" style="stroke:#7f9cc7;stroke-dasharray:6 4;stroke-width:1.8"/><text x="38" y="300" class="t" style="fill:#7f9cc7">10-sample average</text><text x="38" y="315" class="s">avg delay 90 ms</text>
<line x1="8" y1="340" x2="30" y2="340" class="l" style="stroke:#8794a8;opacity:.7"/><text x="38" y="344" class="t" style="fill:#8794a8">input step</text>"""


m_lat = chart_m()

# the portrait SVGs must not borrow the arrowhead from the (hidden) wide SVG: give them their own marker id
def _own(x): return x.replace('id="ah"','id="ahm"').replace('url(#ah)','url(#ahm)')

m_ph = DEFS + f"""
<path d="M54 32V362" class="l" style="stroke:{FS};opacity:.5" stroke-dasharray="3 4"/>
<g stroke="{FS}" stroke-opacity=".5" stroke-dasharray="3 4" fill="none"><path d="M54 32H110M54 142H110M54 252H110M54 362H110"/></g>
{node(110,10,140,44,'GROUND','',True)}
{node(110,120,140,44,'TAKEOFF','')}
{node(110,230,140,44,'FLIGHT','',True)}
{node(110,340,140,44,'LANDING','')}
{arrow('M200 56V118','l la flow')}<text x="210" y="92" class="s">thr &gt; 1550</text>
{arrow('M160 118V56','l')}<text x="150" y="92" class="s" text-anchor="end">thr at min</text>
{arrow('M200 166V228','l la flow')}<text x="210" y="196" class="s">&gt; 1 s and</text><text x="210" y="209" class="s">thr &gt; 1550</text>
{arrow('M200 276V338','l la flow')}<text x="210" y="312" class="s">thr &lt; 1450</text>
{arrow('M160 338V276','l')}<text x="150" y="312" class="s" text-anchor="end">thr &gt; 1550</text>
<rect x="14" y="430" width="332" height="58" rx="29" class="fs"/><text x="180" y="455" class="t" text-anchor="middle" style="fill:{FS}">FAILSAFE · any state</text><text x="180" y="472" class="s" text-anchor="middle" style="fill:{FS}">a watchdog trip latches it</text>
<path d="M54 362V430" class="l" style="stroke:{FS};opacity:.5" stroke-dasharray="3 4"/>
<text x="14" y="512" class="s">thr = throttle pulse width (µs)</text><text x="14" y="526" class="s">RC signal lost &gt; 0.5 s → back to GROUND</text>"""


m_ph = m_ph  # (defined above)
m_arch,m_hyb,m_lat,m_ph=[_own(x) for x in (m_arch,m_hyb,m_lat,m_ph)]

def card(n, title, tag, vb, svg, mvb, msvg, cap, delay=''):
    return f"""      <figure class="card reveal {delay} flex flex-col p-5 md:p-6">
        <div class="flex items-center justify-between font-mono text-[10px] uppercase tracking-[.18em]"><span class="text-dim">Fig. {n} — {title}</span><span class="text-ice">{tag}</span></div>
        <div class="mt-4 hidden overflow-x-auto md:block"><svg viewBox="{vb}" class="dg w-full" role="img" aria-label="{title}: {cap}">{svg}</svg></div>
        <svg viewBox="{mvb}" class="dg dgm mt-4 w-full md:hidden" role="img" aria-label="{title}: {cap}">{msvg}</svg>
        <figcaption class="mt-3 text-[.82rem] leading-relaxed text-dim">{cap}</figcaption>
      </figure>"""


block = '''    <div class="mt-4 grid gap-4 md:grid-cols-2" id="capstone-figs">
''' + '\n'.join([
    card('A', 'System architecture', 'Fig 3.1', '0 0 600 316', arch, '0 0 360 590', m_arch, 'PX4 keeps attitude and motor speed. The Pi only drives the eight servos, in an outer loop around it.', ''),
    card('B', 'Hybrid controller', 'Fig 4.2', '0 0 600 370', hyb, '0 0 360 480', m_hyb, 'Two sources with a defined handoff; PX4 control is used only while armed and its stream is under 0.30 s old.', 'd1'),
    card('C', 'Latency fix', 'Fig 4.1', '0 0 560 270', lat, '0 0 360 356', m_lat, 'EMA filter vs 10-sample moving average at 50 Hz — average delay cut from 90 ms to 6.7 ms.', ''),
    card('D', 'Flight phases', 'Fig 4.3', '0 0 600 270', ph, '0 0 360 540', m_ph, 'Throttle-driven state machine with an any-state failsafe that a watchdog trip latches.', 'd1'),
]) + '\n    </div>\n'
s = open(H, encoding='utf8').read()
pat2 = re.compile(r'    <div class="mt-4 grid gap-4 md:grid-cols-2" id="capstone-figs">.*?\n    </div>\n(?=  </div>\n</section>)', re.S)
if not pat2.search(s):
    sys.exit('block not found')
s = pat2.sub(lambda m: block, s, 1)
open(H, 'w', encoding='utf8').write(s)
print('spliced', len(block), 'bytes')
