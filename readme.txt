Demo:

http://ajax.artnazarov.ru/index/jquerydemo

Library allows you to:
 - attach serverside event ajax listeners to any dom nodes
 - process server json responce as queue of commands (for creating, updating or removing dom nodes)

1. Server side script

// Server response determines
// What DOM nodes are created, updated or deleted
		  $answer = array(
                      array(
                        'type' => 'update', // Update DOM nodes
                        'nodes' => array(
                      
                            'target1' => rand(0, 99),
                            'target2' => rand(0, 99)
                          )
                       ),
                      array(
                        'type' => 'remove', // remove DOM nodes
                        'nodes' => array( "delete_node"  )                         
                            ),
                      // Insert DOM Nodes
                      array(
                          'type'=>'insert',
                          'nodes' => 
                             array(
                                  'debuginfo'=> array('where'=>'after', 'content'=>"
Hello

"),
                                  'target1'=> array('where'=>'before', 'content'=>"
Wow

")
                                    )
                          )
		  );
                  // Send response to js-client
		  echo json_encode($answer);
		  
2. Client javascript


$(document).ready(
function()
{
var U = new LAZY();

var ev1 = new SCHEME();
var ev2 = new SCHEME();

ev1.item = '#button1';
ev1.url = '/index/reqrandjq';

ev2.item = '#button2';
ev2.url = '/index/nomethod'; 


var my_ui = [ ev1, ev2 ];

U.watch(my_ui); 
}
);