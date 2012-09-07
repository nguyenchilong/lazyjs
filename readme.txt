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


3. Additional notes

Use LAZY_CLIENT_ONLY listener and SCHEME_CLIENT_ONLY containters to control clientside events
For example, we can write simplest calculator:


	var cl_Listener = new LAZY_CLIENT_ONLY(); 

	var cl_ButtonPlus = new SCHEME_CLIENT_ONLY();
	var cl_ButtonMinus = new SCHEME_CLIENT_ONLY();
	var cl_ButtonMult = new SCHEME_CLIENT_ONLY();
	var cl_ButtonDivide = new SCHEME_CLIENT_ONLY();
	
	cl_ButtonPlus.item = '#button_plus';
	cl_ButtonPlus.slot = function() {
						$('#result').html(
					parseFloat($('#num1').attr('value'))+parseFloat($('#num2').attr('value'))
										 );
							};
	...
   						
						
        var client_interface = [cl_ButtonPlus, cl_ButtonMinus, cl_ButtonMult, cl_ButtonDivide];    						
	
	function client_events()
	{
			cl_Listener.watch(client_interface);
	};
	
	setInterval(client_events, 300);
