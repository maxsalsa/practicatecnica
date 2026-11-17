import type {Attempt} from './progress-data';
export type InstitutionResult={id:string;publication_id:string;publication_version:string;subject:string;title:string;score:number;question_count:number;created_at:string};
// Separate verified institutional results from academic XP, streaks and certificates.
export function institutionResultAttempts(rows:InstitutionResult[]):Attempt[]{
 return rows.map(r=>({id:r.id,deck_id:`institution:${r.publication_id}:${r.publication_version}`,title:r.title,score:r.score,question_count:r.question_count,created_at:r.created_at,verified_scoring:true,assessment_mode:'institution',institution_subject:r.subject,earned_points:0}));
}