<?php

/**
 * Return list of cities by district
 *
 * @param $databaseLink
 * @return array of cities
 */
function getCities($databaseLink, $district)
{
    $response = [];
    $district = intval($district);

    $sql = "
    select t.name name_city,t.term_id term_city_id
    from wpc_terms as t
    join wpc_term_taxonomy as tt on tt.term_id=t.term_id
    and tt.taxonomy='administrative-units'
    and parent='{$district}';
    ";

    // $stmt = mysqli_prepare($databaseLink, $sql);
    // mysqli_stmt_bind_param($stmt, 'd', $district);
    // $response = mysqli_stmt_execute($stmt);

    if ($res = mysqli_query($databaseLink, $sql)) {
        $response = mysqli_fetch_all($res, MYSQLI_ASSOC);
    }
    return $response;
}

;

/**
 * Return list of districts
 *
 * @param $databaseLink
 * @return array of districts
 */
function getDistricts($databaseLink)
{
    $response = [];

    $sql = "
    select t.name name_district,t.term_id term_district_id
    from wpc_terms as t
    join wpc_term_taxonomy as tt on tt.term_id=t.term_id
    and tt.taxonomy='administrative-units'
    and parent=0;
    ";

    if ($res = mysqli_query($databaseLink, $sql)) {
        $response = mysqli_fetch_all($res, MYSQLI_ASSOC);
    }
    return $response;
}

;

/**
 * Return list of orgs by city
 *
 * @param $databaseLink
 * @return array of orgs
 */
function getGeoOrgs($databaseLink, $city)
{
    $response = [];
    $city = intval($city);

    $sql = "
    select p.*,t.name name_city,t.term_id term_city_id
    ,(select meta_value from wpc_postmeta tma where tma.meta_key ='address_ru' and tma.post_id=p.id) address
    ,(select meta_value from wpc_postmeta tmlat where tmlat.meta_key ='latitude' and tmlat.post_id=p.id) latitude
    ,(select meta_value from wpc_postmeta tmlng where tmlng.meta_key ='longitude' and tmlng.post_id=p.id) longitude
    ,(select meta_value from wpc_termmeta mklat where mklat.meta_key ='latitude' and mklat.term_id=tt.term_id) latitude_city
    ,(select meta_value from wpc_termmeta mklng where mklng.meta_key ='longitude' and mklng.term_id=tt.term_id) longitude_city
    ,(select meta_value from wpc_termmeta status where status.meta_key ='status' and status.term_id=tt.term_id) status_city
    ,(select meta_value from wpc_postmeta phone where phone.meta_key ='phone' and phone.post_id=p.id) phone
    ,(select meta_value from wpc_postmeta email where email.meta_key ='email' and email.post_id=p.id) email
    ,(select meta_value from wpc_postmeta site where site.meta_key ='site_url' and site.post_id=p.id) site
    ,(select meta_value from wpc_postmeta rabbi where rabbi.meta_key ='name_ru' and rabbi.post_id=p.id) rabbi
    from wpc_posts p
    join wpc_term_relationships as tr on tr.object_id = p.id
    join wpc_term_taxonomy as tt on tt.term_taxonomy_id=tr.term_taxonomy_id
    join wpc_terms as t on t.term_id=tt.term_id
    where p.post_type='organizations'
    and p.post_status='publish'
    and tt.term_taxonomy_id='{$city}'
    and tt.taxonomy='administrative-units';
    ";

    if ($res = mysqli_query($databaseLink, $sql)) {
        $response = mysqli_fetch_all($res, MYSQLI_ASSOC);
    }
    return $response;
}

;

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
    ,(select meta_value from wpc_postmeta phone where phone.meta_key ='phone' and phone.post_id=p.id) phone
    ,(select meta_value from wpc_postmeta email where email.meta_key ='email' and email.post_id=p.id) email
    ,(select meta_value from wpc_postmeta site where site.meta_key ='site_url' and site.post_id=p.id) site
    ,(select meta_value from wpc_postmeta rabbi where rabbi.meta_key ='name_ru' and rabbi.post_id=p.id) rabbi
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