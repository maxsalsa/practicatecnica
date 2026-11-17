"""Prebuild concept-map + flowchart PDFs per MEP topic; never run in the app."""
import json, subprocess, sys
from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4, landscape
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.lib.utils import simpleSplit

out = Path(sys.argv[1]); out.mkdir(parents=True, exist_ok=True)
root = Path(__file__).resolve().parent.parent
books = json.loads((root/'src/lib/mep-book-content.json').read_text())
for n,q in [('S','DejaVu Sans'),('B','DejaVu Sans:bold')]:
    pdfmetrics.registerFont(TTFont(n, subprocess.check_output(['fc-match','-f','%{file}',q],text=True).strip()))
W,H = landscape(A4)
BLUE=colors.HexColor('#0072cb'); MINT=colors.HexColor('#2bb58a'); NAVY=colors.HexColor('#0b1a33'); PALE=colors.HexColor('#eef5fc'); PMINT=colors.HexColor('#e9f8f2')

def box(c,x,y,w,h,text,fill,stroke,size=9,bold=False,maxlines=7):
    c.setFillColor(fill); c.setStrokeColor(stroke); c.setLineWidth(1.4); c.roundRect(x,y,w,h,8,fill=1,stroke=1)
    lines=simpleSplit(text,'B' if bold else 'S',size,w-14)[:maxlines]
    c.setFillColor(NAVY); c.setFont('B' if bold else 'S',size)
    ty=y+h/2+(len(lines)-1)*(size+2)/2-size/3
    for l in lines: c.drawCentredString(x+w/2,ty,l); ty-=size+2

def header(c,book,ch,label):
    c.setFillColor(BLUE); c.setFont('B',11); c.drawString(36,H-34,'pracTICAtecnica.com · Repase. Practique. Prepárese.')
    c.setFillColor(NAVY); c.setFont('B',17); c.drawString(36,H-58,f"{label}: {ch['title']}")
    c.setFont('S',9); c.drawString(36,H-73,f"{book['title']} · {book['grade']}.º CTP · {ch['unit']}")
    c.setFont('S',7.5); c.setFillColor(colors.grey)
    c.drawString(36,20,f"Preparación independiente, sin afiliación oficial. Fuente curricular: MEP, programa {book['title']} {book['grade']}.º, pp. {ch['pages']} · {book['source']}")

def arrow(c,x1,y1,x2,y2):
    c.setStrokeColor(BLUE); c.setLineWidth(1.3); c.line(x1,y1,x2,y2)

for book in books:
    for ch in book['chapters']:
        f=out/f"{book['id']}-{ch['id']}-mapa.pdf"; c=canvas.Canvas(str(f),pagesize=(W,H)); c.setTitle(f"Mapa y diagrama · {ch['title']}")
        header(c,book,ch,'Mapa conceptual')
        cx,cy=W/2,H/2-10; cw,chh=220,64
        nodes=[('Objetivo',ch['objective'])]+[(f'Idea {i+1}',s) for i,s in enumerate(ch['summary'])]+[('Vocabulario ES/EN',' · '.join(ch['terms']))]
        pos=[(60,H-200),(W-300,H-200),(60,90),(W-300,90),(W/2-120,H-190),(W/2-120,60)][:len(nodes)]
        for (t,txt),(x,y) in zip(nodes,pos):
            arrow(c,cx,cy,x+120,y+50)
        box(c,cx-cw/2,cy-chh/2,cw,chh,ch['title'],PALE,BLUE,12,True,3)
        for (t,txt),(x,y) in zip(nodes,pos):
            box(c,x,y,240,100,f"{t}: {txt}",PMINT,MINT,8,False,8)
        c.showPage()
        header(c,book,ch,'Diagrama de flujo')
        steps=['Inicio: lea el objetivo',*[f'Paso {i+1}: {s}' for i,s in enumerate(ch['summary'])],f"Aplique: {ch['example']}",'Compruebe con la práctica y la respuesta razonada','Fin']
        bw,bh=W-200,(H-130)/len(steps)-12; y=H-95-bh
        for i,s in enumerate(steps):
            edge = i in (0,len(steps)-1)
            box(c,100,y,bw,bh,s,PALE if edge else PMINT,BLUE if edge else MINT,8.5,edge,4)
            if i<len(steps)-1: arrow(c,W/2,y,W/2,y-12)
            y-=bh+12
        c.showPage(); c.save(); print(f.name)
