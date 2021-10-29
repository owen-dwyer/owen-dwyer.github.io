function getOPCSLevel(neo4jObject) {
    title = neo4jObject.properties["name"]
    console.log(title)
    console.log(title.length)
    length = title.length

    if (title=='procedures') {
        level = 6
    } else if (length>=5) {
        level = 5
    } else {
        level = 7-length
    }
    return level
}

var viz;

// tooltip
//const element = document.createElement("div");   

function createHTMLTitle(html, props) {
    var element = document.createElement("div");
    element.innerHTML = html;
    element.innerHTML += props.properties["name"]
    return element;
}

const testElement = document.createElement("div");

function draw() {

    var config = {
        containerId: "viz",
        neo4j: {
            serverUrl: "bolt://1069e392.databases.neo4j.io",
            serverUser: "neo4j",
            serverPassword: "C315QwpDKsTlYkp1vC78I0kZTvO5x8RuHcHPhyUla7Y",
            driverConfig: {
                encrypted: "ENCRYPTION_ON",
                trust: "TRUST_SYSTEM_CA_SIGNED_CERTIFICATES"
            }
        },

        visConfig: {
            // https://visjs.github.io/vis-network/docs/network/
            edges: {
                arrows: {
                    to:{enabled:true}
                }
            },
            layout: {
                hierarchical: {
                    enabled: true,
                    sortMethod: 'directed',
                    shakeTowards: 'roots',
                    edgeMinimization: false,
                    levelSeparation:300
                }
            },
            nodes : {
                shape: 'dot'            },
            interaction: {
                hoverConnectedEdges:true,
                navigationButtons:false,
                selectable:true,
                tooltipDelay:0
            },
            configure: {
                enabled:false
            }
            //hierarchical:true,
            //hierarchical_sort_method:'directed',
            //consoleDebug:true

        },

        
        
        labels: {
            //"Character": "name",
            "event": {

                [NeoVis.NEOVIS_ADVANCED_CONFIG]: {// here you put node properties that aren't mapped directly from the neo4j node
                    function: {
                        
                    },
                    static: { // everything here will be copied directly to the vis.js's node object
                        font: {
                            color: "#000000"
                        },
                        level: 2,
                        color:"#005EB8",
                    },
                }

                //"size": "pagerank",
                //"community": "community"
                //"sizeCypher": "MATCH (n) WHERE id(n) = {id} MATCH (n)-[r]-() RETURN sum(r.weight) AS c"
            },

            "patient": {
                [NeoVis.NEOVIS_ADVANCED_CONFIG]: {// here you put node properties that aren't mapped directly from the neo4j node
                    static: { // everything here will be copied directly to the vis.js's node object
                        level:1,
                        color:'#768692'
                    },
                }
            },
            "opcs4": {
                [NeoVis.NEOVIS_ADVANCED_CONFIG]: {// here you put node properties that aren't mapped directly from the neo4j node
                    static: { // everything here will be copied directly to the vis.js's node object
                        level:3,
                        color:'#78BE20'
                    },
                    function: {
                        level: (props) => getOPCSLevel(props)

                    }
                }
            },
            "diagnosis": {
                [NeoVis.NEOVIS_ADVANCED_CONFIG]: {// here you put node properties that aren't mapped directly from the neo4j node
                    static: { // everything here will be copied directly to the vis.js's node object
                        level:3,
                        color:'#AE2573'
                    },
                    function: { // same as label advance function
                        //label: NeoVis.objectToTitleString // putting caption on the title
                        //label: (props) => NeoVis.objectToTitleString(props, ["name"])
                    }
                }
            },
            [NeoVis.NEOVIS_DEFAULT_CONFIG]: {
                 label: "name",
                 [NeoVis.NEOVIS_ADVANCED_CONFIG]: {// here you put node properties that aren't mapped directly from the neo4j node
                    static: { // everything here will be copied directly to the vis.js's node object
                        level:4
                    },
                    function: {
                        title: (props) => createHTMLTitle("<span style='color:red'>TEEEEST</span>", props)

                    }
                 }

            }
        },
        relationships: {
            [NeoVis.NEOVIS_DEFAULT_CONFIG]: {
                 "thickness": "defaultThicknessProperty",
                 //"caption": true
            },
            "precedes": {
                "thickness": 1,
                value: "name"
            }
        },


        initialCypher: "MATCH (n)-[r]->(m) RETURN n,r,m",

    };

    viz = new NeoVis.default(config);
    viz.render();
    console.log(viz);



    $(function () {
        InitializeToolTip();
    });

    function InitializeToolTip() {    
        $(".gridViewToolTip").tooltip({        
           track: true,        
           delay: 0,        
           showURL: false,        
           fade: 100,        
           bodyHandler: function () {            
              return $($(this).next().html());        
           },        showURL: false    
         });
     }

}