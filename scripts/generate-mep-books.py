"""Prebuild the independent MEP-aligned study guides; never run in the app."""
import argparse, json, subprocess
from pathlib import Path
from xml.sax.saxutils import escape
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak

parser = argparse.ArgumentParser()
parser.add_argument('--output', required=True)
args = parser.parse_args()
out = Path(args.output); out.mkdir(parents=True, exist_ok=True)
root = Path(__file__).resolve().parent.parent
books = json.loads((root / 'src/lib/mep-book-content.json').read_text())
for name, query in [('Study','DejaVu Sans'),('StudyBold','DejaVu Sans:bold')]:
    font = subprocess.check_output(['fc-match','-f','%{file}',query], text=True).strip()
    pdfmetrics.registerFont(TTFont(name,font))
styles = getSampleStyleSheet()
for s in styles.byName.values(): s.fontName = 'Study'
styles.add(ParagraphStyle(name='Brand',fontName='StudyBold',fontSize=12,leading=17,textColor=colors.HexColor('#0072cb'),spaceAfter=14))
styles['Title'].fontName='StudyBold'; styles['Title'].fontSize=22; styles['Title'].leading=28
styles['Heading2'].fontName='StudyBold'; styles['Heading2'].fontSize=12; styles['Heading2'].leading=17; styles['Heading2'].spaceBefore=12
styles['BodyText'].fontSize=10; styles['BodyText'].leading=15; styles['BodyText'].spaceAfter=7

def p(text, style='BodyText'): return Paragraph(escape(text),styles[style])
def footer(canvas, doc):
    canvas.setFont('Study',8)
    canvas.drawString(36,25,'pracTICAtecnica.com · Preparación independiente, sin afiliación oficial.')
    canvas.drawRightString(A4[0]-36,25,str(doc.page))

def chapter(book,c):
    story=[p('pracTICAtecnica.com · Repase. Practique. Prepárese.','Brand'),p(c['title'],'Title'),p(f"{book['title']} · {book['grade']}.º CTP · {c['unit']}"),p('Objetivo','Heading2'),p(c['objective']),p('Resumen','Heading2')]
    story.extend(p(s) for s in c['summary'])
    story.extend([p('Vocabulario técnico ES / EN','Heading2'),p(' · '.join(c['terms'])),p('Ejemplo resuelto','Heading2'),p(c['example']),p('Práctica','Heading2'),p(c['exercise']),p('Respuesta razonada','Heading2'),p(c['answer']),p('Fuente curricular','Heading2'),p(f"Ministerio de Educación Pública. Programa de estudio: {book['title']}, {book['grade']}.º. Páginas impresas {c['pages']}. Consulta: 13 de noviembre de 2026."),Paragraph(f'<link href="{escape(book["source"])}" color="#0072cb">Consultar programa oficial MEP</link>',styles['BodyText']),p('Resumen y ejemplos originales de GICM Desarrollo de Sistemas Digitales y Constructivos ICM. No es una publicación del MEP ni de Editorial Océano. Primer bloque de repaso: no sustituye el programa completo.')])
    return story

def build(path,story,title):
    doc=SimpleDocTemplate(str(path),pagesize=A4,rightMargin=40,leftMargin=40,topMargin=35,bottomMargin=45,title=title,author='GICM Desarrollo de Sistemas Digitales y Constructivos ICM')
    doc.build(story,onFirstPage=footer,onLaterPages=footer)

for b in books:
    combined=[]
    for i,c in enumerate(b['chapters']):
        content=chapter(b,c)
        build(out/f"{b['id']}-{c['id']}.pdf",content,c['title'])
        if i: combined.append(PageBreak())
        combined.extend(chapter(b,c))
    build(out/f"{b['id']}-compendio.pdf",combined,b['title']+f" · Resúmenes {b['grade']}.º")
print(f"Built {sum(len(b['chapters']) for b in books)} chapter PDFs and {len(books)} compendiums")
