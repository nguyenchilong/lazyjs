<?php
class LazyJS
{
	var $commands;
	function updateNodes($targets)
			{
	return array(
		'type'=>'update',
		'nodes'=>$targets
		);
			}
function insertNodes($nodes)
		{
	return array(
	'type'=>'insert',
    'nodes' => $nodes);
		}
function removeNodes($nodes)
		{
return array(
          'type' => 'remove', // remove dom node
         'nodes' => $nodes                         
                            );
		}
function callJs($fx, $args)
		{
	return 	array(
						'type' => "fx",
						'fx' => $fx,
						'args' => $args
				 );
		}
function addCommand($command)
{
	$this->commands[] = $command;
}
function sendResponce()
{
	echo json_encode($this->commands);
}
}

/*
*	$Server = new LazyPHP();
*   $Server->addCommand(
*		$this->updateNodes(	
*						array(
*								'someid' => 'NewContent',
*						  	    'someid2'=> 'NewContent2'
*				   )));
*	$Server->addCommand(
			$this->removeNodes(
*					array('node1', 'node2', 'node3')
*			 ));
*	$Server->addCommand(
		$this->callJS(
*		'some_function', 
		array('arg1'=>'val1', 'arg2'=>'val2')
* 			));
* 	$Server->addCommand($this->insertNode(
*		array('newId'=> array('where'=>'after|before', 
*			'content'=>" Hello, world! "))));
*	$Server->sendResponce();	
*
*/
?>
