<?php

/**
 * Return list of organizations
 *
 * @param $databaseLink
 * @return array of organizations
 */
function getOrgs($databaseLink)
{
    $response = [];

    $sql = "
    select p.*,t.name name_city,t.term_id term_city_id
    ,(select meta_value from wpc_postmeta tma where tma.meta_key ='address_ru' and tma.post_id=p.id) address
    ,(select meta_value from wpc_postmeta tmlat where tmlat.meta_key ='latitude' and tmlat.post_id=p.id) latitude
    ,(select meta_value from wpc_postmeta tmlng where tmlng.meta_key ='longitude' and tmlng.post_id=p.id) longitude
    ,(select meta_value from wpc_termmeta mklat where mklat.meta_key ='latitude' and mklat.term_id=tt.term_id) latitude_city
    ,(select meta_value from wpc_termmeta mklng where mklng.meta_key ='longitude' and mklng.term_id=tt.term_id) longitude_city
    ,(select meta_value from wpc_termmeta status where status.meta_key ='status' and status.term_id=tt.term_id) status_city
    from wpc_posts p
    join wpc_term_relationships as tr on tr.object_id = p.id
    join wpc_term_taxonomy as tt on tt.term_taxonomy_id=tr.term_taxonomy_id
    join wpc_terms as t on t.term_id=tt.term_id
    where p.post_type='organizations'
    and p.post_status='publish'
    and tt.taxonomy='administrative-units'
    and parent<>0;
    ";
    if ($res = mysqli_query($databaseLink, $sql)) {
        $response = mysqli_fetch_all($res, MYSQLI_ASSOC);
    }
    return $response;
}

;