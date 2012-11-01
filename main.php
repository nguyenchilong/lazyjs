<?php
	require_once 'lazyjsonserver.php';
	$server = new LazyJS();
	switch ($_GET['action'])
	{
		case 'update' : {
							$server->addCommand(
								$server->updateNodes(
									array(
									'upd' => 'NEW CONTENT'
										 )));
							break;
						};
		case 'remove' : {
							$server->addCommand(
								$server->removeNodes(
									array(
									'rm'
										 )));
							break;
						};				
		case 'insert' :				
		 {
							$server->addCommand(
								$server->insertNodes(
									array(
										'list' => array('where'=>'after', 
										'content'=>'<div class="post">Post Example</div>'),										
										 )));
							break;
		 };				
						
	};
	
	$server->sendResponce();
?>