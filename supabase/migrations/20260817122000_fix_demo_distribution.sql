do $$ declare p uuid; claim_ids uuid[]; begin
select id into p from skillswipe.profiles where profile_slug='noor-van-dijk';
select array_agg(id order by bucket) into claim_ids from (
 select c.id,case d.name when 'Account Management' then 1 when 'Leadership' then 2 else 3 end bucket
 from skillswipe.skill_claims c join skillswipe.skill_domains d on d.id=c.skill_domain_id
 where (d.name='Account Management' and c.sort_order=1) or (d.name='Leadership' and c.sort_order=1) or (d.name='Communication' and c.sort_order=2)
) q;
with ranked as (select id,row_number() over(order by created_at) n from skillswipe.skill_signals where profile_id=p)
update skillswipe.skill_signals s set skill_claim_id=claim_ids[case when r.n<=4 then 1 when r.n<=8 then 2 else 3 end] from ranked r where s.id=r.id;
delete from skillswipe.claim_confidence_snapshots where profile_id=p;
insert into skillswipe.claim_confidence_snapshots(profile_id,skill_claim_id,confidence_score,contributor_count,independent_relationship_count,recognised_count,seen_in_practice_count,would_call_count,public_status)
select p,skill_claim_id,78,count(*),count(distinct relationship_type),count(*) filter(where response_type='recognised'),count(*) filter(where response_type='seen_in_practice'),count(*) filter(where response_type='would_call'),'validated'
from skillswipe.skill_signals where profile_id=p group by skill_claim_id;
end $$;
