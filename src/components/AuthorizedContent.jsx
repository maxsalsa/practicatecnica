import { useQuery } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { Link } from '@tanstack/react-router';
import { forwardRef } from 'react';
import { getAuthorizedContent } from '@/lib/content.functions';
import { useAccount } from './AccountProvider';
import { useEffect, useState } from 'react';
import { QUESTION_FORM_COUNT, questionFormId, splitQuestionForm } from '@/lib/question-forms';
import { draftKey, readDraft } from '@/lib/assessment-draft';
function AuthorizedContentBody({ id, lang = 'es', exam = false, children }) {
    const { user } = useAccount();
    const load = useServerFn(getAuthorizedContent);
    const [request, setRequest] = useState('');
    useEffect(() => { if (!user) {
        setRequest('');
        return;
    } const draft = readDraft(draftKey(user.id, id, exam ? 'exam' : 'practice', lang)); if (draft?.request) {
        setRequest(draft.request);
        return;
    } if (splitQuestionForm(id).form || id === 'mixto-60' || id.startsWith('gen-')) {
        setRequest(id);
        return;
    } const key = `pt-form-${user.id}-${id}`; const prior = Number(sessionStorage.getItem(key) ?? 0); const form = Number.isInteger(prior) && prior >= 1 && prior <= QUESTION_FORM_COUNT ? prior % QUESTION_FORM_COUNT + 1 : Math.floor(Math.random() * QUESTION_FORM_COUNT) + 1; sessionStorage.setItem(key, String(form)); setRequest(questionFormId(id, form)); }, [id, user?.id, exam, lang]);
    const query = useQuery({ queryKey: ['authorized-content', user?.id, request, lang, exam], enabled: !!user && !!request, queryFn: () => load({ data: { id, lang, exam } }), gcTime: 0, staleTime: 0, retry, refetchOnWindowFocus, refetchOnReconnect: false });
    if (!user)
        return <p className="py-6">Ingrese a su cuenta para practicar. <Link to="/auth" className="text-primary underline">Ingresar</Link></p>;
    if (query.isPending)
        return <p role="status" className="py-6">Comprobando acceso…</p>;
    if (query.error || !query.data)
        return <p role="alert" className="py-6">{query.error instanceof Error ? query.error.message : 'No se autorizó el contenido.'} <Link to="/pagos" className="text-primary underline">Consultar plan y pagos</Link></p>;
    return children(query.data);
}
export const AuthorizedContent = forwardRef(({ className, children, id, lang, exam, ...rest }, ref) => <div ref={ref} className={className} {...rest}><AuthorizedContentBody id={id} lang={lang ?? 'es'} exam={exam ?? false}>{children}</AuthorizedContentBody></div>);
AuthorizedContent.displayName = "AuthorizedContent";
