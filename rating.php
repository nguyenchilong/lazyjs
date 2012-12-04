<?php
        session_start();
	require_once 'lazyjsonserver.php';
        function get_arr($arr, $item, $def)
        {             
            isset($arr[$item]) ? $result = $arr[$item] : $result = $def;
            return $result;
        }
	$server = new LazyJS();      
	switch ($_GET['action'])
	{
		case 'rating' : {
                $rating = get_arr($_SESSION, 'rating', 0);                    
							$server->addCommand(
								$server->updateNodes(
									array(
									'current_rating' => $rating                                                                        
										 )));
						break;                                                        
                                                };
		case 'vote' : {
                             
                    $rating = get_arr($_SESSION, 'rating', 0);
                    $vote = get_arr($_GET, 'vote', 0);
                    $rating += $vote;
                    $_SESSION['rating'] = $rating;
							$server->addCommand(
								$server->updateNodes(
									array(
									'current_rating' => $rating,
                                                                        'frmVote' => 'Ваш голос принят'
										 )));
							break;
						};				
					
						
	};
	
	$server->sendResponce();
?>