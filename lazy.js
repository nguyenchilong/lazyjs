function fapply(f, x)
{
	eval(f)(x);
}

/*
 Виртуальная машина - интерпретирует ответ сервера как команду
и обновляет интерфейс
 JS engine - proccess server responce as queue of commands and updates interface
 */

 
var JSVM = function(){};
JSVM.prototype =
    {
        json_worker : function(data)
{   		
    
					try 
					{ 								
									var actions = $.parseJSON(data);
                                                                                // Обновление узлов DOM     
                                                                        for (nom in actions)               
                                                                            {
                                                                               
                                                                            var obj = actions[nom];
                                                                            console.log(obj);
                                                                        if (obj.type == 'update')
									      {
                                                                                for (key in obj.nodes)
                                                                                  {
                                                                                      $('#' + key).html(obj.nodes[key]);
                                                                                  };
                                                                              };
                                                                               // Удаление узлов DOM
                                                                        if (obj.type == 'remove')
									      {
                                                                                  
                                                                                for (key in obj.nodes)
                                                                                  {
                                                                                      $('#' + obj.nodes[key]).remove();
                                                                                  };
                                                                              };
                                                                              // Вставка узлов DOM
                                                                                if (obj.type == 'insert')
									      {
                                                                                  
                                                                                for (key in obj.nodes)
                                                                                  {
                                                                                      console.log(obj.nodes[key]);
                                                                                      if (obj.nodes[key].where == 'after')
                                                                                          {
                                                                                            $('#' + key).after(obj.nodes[key].content);
                                                                                          } else
                                                                                          {
                                                                                            $('#' + key).before(obj.nodes[key].content);
                                                                                          }
                                                                                          
                                                                                  };
                                                                              };
																			  // Выполнение функции на клиенте
																			  if (obj.type=="fx")
																			  {
																					var f = obj.fx;
																					var x = obj.args;
																					fapply(f, x);
																			  };
                                                              }
									
					}
						catch (e)
							{ 
									$('#debuginfo').html(data); 
							};
									
		
}
    }
var SCHEME = function(){};
SCHEME.prototype =
    {
     item  : '#id',
     event : 'click',
     url   : '/index/index/',
     type  : 'GET',
     data  : null
    };
/*
Назначает элементам интерфейса обработчики событий на сервере
 */
var LAZY = function(){};

LAZY.prototype = 
{
/*
scheme.item - event source
scheme.event - event type
scheme.data - request params
scheme.type - type (GET or POST)
scheme.url - ajax request
*/
			addcontrol 	: function(scheme)
				{    
					$(scheme.item).bind( scheme.event, function () 
						{
  
							$.ajax( 
										{ 
											'type' : scheme.type,
											'url' : scheme.url,
											'data' : scheme.data
										}
									).success(
											function (data)
												{		
													var vm = new JSVM();
                                                                                                        vm.json_worker(data);
												} 
											);
	  	  
						} );		
				},
			
			watch : function(data)
				{
					for (key in data)
						{
							this.addcontrol(data[key]);
						};
				}

}

/*
CASE OF USE
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
*/