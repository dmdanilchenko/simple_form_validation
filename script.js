"use strict"
//ДД простая валидация формы
$(document).ready(function(){
	
	//ДД если в адресной строке есть знак вопроса ?, то значит форма успешно прошла валидацию покажем сообщение пользователю
	if(location.href.match(/\?/)){
		alert('Форма прошла валидацию и успешно отправлена! Спасибо');
	}
	
	//ДД навешиваем обработчик на blur то есть уход фокуса с элемента
	$('#userRegistration').find('[name]').blur(function(){
		var notValid = false;
		//ДД вызиваем функцию проверки
		checkInput(this, notValid);	
	});
	
	//ДД навешиваем обработчик на отправку формы
	$('#userRegistration').submit(function(){
		
		//ДД очищаем спаны с информацией
		$("span").each(function(){
			$(this).text('');	
		});
		
		//ДД через each перебираем поля
		var notValid = false;
		$(this).find('[name]').each(function(){
			//ДД вызиваем функцию проверки
			notValid = checkInput(this, notValid);	
		})
		
		//ДД если флаг notValid истина останавливаем отправку формы
		if(notValid){
			event.preventDefault();
		}		
		
	})	
	
});

//ДД функция проверяет инпут
function checkInput(oneInput, notValid){

	//ДД положим в преременные имя инпута и значение
	var thisVal = $(oneInput).val();
	var thisName = $(oneInput).attr('name');
	
	if(thisVal===''){
		notValid = true;
		//подсветить незаполненные поля
		if(!$(oneInput).hasClass('withoutVal')){
			$(oneInput).addClass('withoutVal');
		}	
	}else if(thisName==='userLogin' && !thisVal.match(/^\w{6,20}$/)){
		notValid = true;
		$(oneInput).next("span").text('Логин должен быть 6-20 символов и состоять из букв латинского алфавита, цифр и/или знака _');
	}else if(thisName==='eMail' && !thisVal.match(/^\w{4,20}@[a-zA-Z0-9\-]{1,20}\.[a-z]{1,20}\.{0,1}[a-z]{0,4}$/)){
		notValid = true;
		$(oneInput).next("span").text('Адрес эл. почты не корректен');
	}else if(thisName==='userPasswdConfirm' && thisVal!=$('[name="userPasswd"]').val()){
		//ДД пароли должны совпадать
		notValid = true;
		$(oneInput).next("span").text('Не совпадают пароли');
	}else if(thisName==='phoneNumber' && !thisVal.match(/^\+38[\(\s]{0,1}0\d{2}[\)\s]{0,1}\d{3}[-\s]{0,1}\d{2}[-\s]{0,1}\d{2}$/)){
		notValid = true;
		$(oneInput).next("span").text('Телефон в формате +38(0ХХ)ХХ-ХХ-ХХ или +380ХХХХХХХХХ или +38 0ХХ ХХХ ХХ ХХ');
	}else if(thisName==='dayOfBirth' && (Number(thisVal)>31||Number(thisVal)<1||!(Number(thisVal) ^ 0))){
		notValid = true;
		$(oneInput).next("span").text('День рождения должен быть целым числом от 1 до 31');
	}else if(thisName==='yearOfBirth' && (Number(thisVal)>2016||Number(thisVal)<1900||!(Number(thisVal) ^ 0))){
		notValid = true;
		$(oneInput).next("span").text('Год рождения должен быть между 1900-2016');	
	}else{
		$(oneInput).next("span").text('');
		if($(oneInput).hasClass('withoutVal')){
			$(oneInput).removeClass('withoutVal');
		}
	};	
	
	return notValid;
}