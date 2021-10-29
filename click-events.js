$("#reload").click(function() {

    var cypher = $("#cypher").val();

    if (cypher.length > 3) {
        viz.renderWithCypher(cypher);
    } else {
        console.log("reload");
        viz.reload();

    }
});

$("#stabilize").click(function() {
    viz.stabilize();
})


$("#all_patients").click(function() {
    var query = "MATCH (n:patient) RETURN n"
    update(query)
})
$("#full_graph").click(function() {
    var query = "MATCH (n)-[r]->(m) RETURN n,r,m"
    update(query)
})
$("#pathways").click(function() {
    var query = "MATCH (n)-[r:precedes]->(m) RETURN n,r,m"
    update(query)
})
$("#pathways_events").click(function() {
    var query = "MATCH (e1)-[r1:precedes]->(e2)-[r2]->(o:opcs4) RETURN e1,r1,e2,r2,o"
    update(query)
})
$("#pathways_events_hierarchy").click(function() {
    var query = "MATCH (e1)-[r1:precedes]->(e2)-[r2*]->(o:opcs4) RETURN e1,r1,e2,r2,o"
    update(query)
})

function update(query){
    $("textarea#cypher").val(query);
    viz.renderWithCypher(query);
}

// Tooltip popups

    