"""Build a source release, excluding secrets, dependencies and runtime output."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import hashlib, json

root = Path(__file__).resolve().parent.parent
out = root.parent / 'PracTICAtecnica_Next_Supabase_V11.zip'
required = ['package.json','pnpm-lock.yaml','README.md','.env.example','src/components/platform.tsx','src/app/globals.css','src/lib/server/auth.ts','supabase/migrations/202609240004_operations.sql','qa/local-test-results.json']
for name in required:
    if not (root / name).is_file():
        raise SystemExit('Falta un archivo obligatorio: ' + name)
files = []
for file in sorted(root.rglob('*')):
    if not file.is_file() or file.is_symlink():
        continue
    rel = file.relative_to(root)
    if any(part in {'node_modules','.next','.git','.vercel','.supabase','backups','browser-results','playwright-report','.temp'} for part in rel.parts):
        continue
    if rel.name.startswith('.env') and rel.name != '.env.example':
        continue
    if rel.suffix in {'.tsbuildinfo','.zip','.log'} or rel.name in {'package-lock.json','AGENTS.md','CLAUDE.md','IMPLEMENTATION_CONTRACT.md'} and len(rel.parts)==1:
        continue
    files.append((file, str(rel)))
assert sum(name.endswith('.pdf') for _,name in files) == 14
manifest = {name:hashlib.sha256(file.read_bytes()).hexdigest() for file,name in files}
with ZipFile(out,'w',ZIP_DEFLATED,compresslevel=7) as archive:
    for file,name in files:
        archive.write(file,'PracTICAtecnica_V11/'+name)
    archive.writestr('PracTICAtecnica_V11/MANIFIESTO_SHA256.json',json.dumps(manifest,ensure_ascii=False,indent=2))
with ZipFile(out) as archive:
    assert archive.testzip() is None
    assert len(archive.namelist()) == len(set(archive.namelist()))
print(json.dumps({'file':str(out),'bytes':out.stat().st_size,'files':len(files)+1,'sha256':hashlib.sha256(out.read_bytes()).hexdigest()},indent=2))
