var main = function (toDoObjects) {
	"use strict";
	// как main имеет доступ к списку задач!
	var toDos = toDoObjects.map(function (toDo) {
		// просто возвращаем описание этой задачи
		return toDo.description;
	});
	// сейчас весь старый код должен работать как раньше!
	$("document").ready( function(){
		$(".tabs a span").toArray().forEach(function (element) { 
			$(element).on("click", function () {
				var $element = $(element);
				$(".tabs a span").removeClass("active"); 
				$(element).addClass("active");
				$("main .content").empty();

				if ($element.parent().is(":nth-child(1)")) { 
					for (var i = toDos.length-1; i > -1; i--) { 
						$(".content").append($("<li>").text(toDos[i]));
					}
				} 
				else if ($element.parent().is(":nth-child(2)")) { 
					toDos.forEach(function (todo) { 
						$(".content").append($("<li>").text(todo));
					});
				} 
				
				else if ($element.parent().is(":nth-child(3)")) { 
					// ЭТО КОД ДЛЯ ВКЛАДКИ ТЕГИ
					console.log("Щелчок на вкладке Теги");

					var organizedByTag = 
					[
					{
					"name": "покупки",
					"toDos": ["Купить продукты"]
					},
					{
					"name": "рутина",
					"toDos": ["Купить продукты", "Вывести Грейси на прогулку в парк"]
					},
					{
					"name": "писательство",
					"toDos": ["Сделать несколько новых задач", "Закончить писать книгу"]
					},
					{
					"name": "работа",
					"toDos": ["Сделать несколько новых задач", "Подготовиться к лекции в понедельник",
					"Ответить на электронные письма", "Закончить писать книгу"]
					},
					{
					"name": " преподавание",
					"toDos": ["Подготовиться к лекции в понедельник"]
					},
					{
					"name": "питомцы",
					"toDos": ["Вывести Грейси на прогулку в парк "]
					}
					]

					organizedByTag.forEach(function (tag) { 
						var $tagName = $("<h3>").text(tag.name), 
						$content = $("<ul>"); 
						tag.toDos.forEach(function (description) { 
							var $li = $("<li>").text(description); 
							$content.append($li);
						});
						$("main .content").append($tagName); 
						$("main .content").append($content);
					});

				}

				else if ($element.parent().is(":nth-child(4)")) { 
					$(".content").append(
						'<input type="text" class="inp">'+
						'<button class="btn">Добавить</button>'
					);
					var newToDo;
					$('.btn').on('click',function(){
						newToDo= $('.inp').val();
						if (newToDo!='') {
							toDos.push( newToDo);
							alert('Новое задание "'+newToDo+'" успешно добавлено!');
							$('.inp').val("");
						}
					})
				}
				return false;
			})
		})
	$(".tabs a:first-child span").trigger("click");
	})
};	

$(document).ready(function () {
	$.getJSON("./scripts/todos.json", function (toDoObjects) {
	// вызов функции main с аргументом в виде объекта toDoObjects 
		main(toDoObjects);
	});
});