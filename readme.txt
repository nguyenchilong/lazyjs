Demo:

http://ajax.artnazarov.ru/index/jquerydemo

Library allows you to:
 - attach serverside event ajax listeners to any dom nodes
 - process server json responce as queue of commands (for creating, updating or removing dom nodes)

1. Server side PHP script

// JSON responce as commands

 $answer = array(
                      array(
                        'type' => 'update', // update dom node
                        'nodes' => array(
                      
                            'target1' => $x,
                            'target2' => $y
                          )
                       ),
                      array(
                        'type' => 'remove', // remove dom node
                        'nodes' => array( "delete_node"  )                         
                            ),
                      // insert dom node
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
                          ),
					// execute javascript function on client side
					array(
						'type' => "fx",
						'fx' => "sum",
						'args' => array("x" => $x, "y" => $y)
						)
		  );
                  // send responce to client 
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

3. If the controls do not exist at the time of announcement, or can be removed, use the following

...

	function events()
	{
	U.watch(my_ui);
	};
	
	setInterval(events, 50);
...
	
	Demo: 

http://viktorina.artnazarov.ru