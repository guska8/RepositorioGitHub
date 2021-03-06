(function($) {
	"use strict";
	jQuery.fn.DynamicTable = function(options) {
		var AddLnButton = '<input type="button" id="addLn" class="btnAddLn" value="+">';
		var RmvLnButton = '<input type="button" id="rmvLn" class="btnRmvLn" value="-">';
		var AddButtonAdded = 0;
		var FirstLn = '';
		var ScdLn = '';
		var AllTr = '';
		var LnContent = '';
		var Flag = 0;
		var settings = $.extend({
			'table' : ''
		}, options);
		SetVar();

		//conteudo da linha vazia
		LnContent = FirstLn.html();

		//Adiciona a coluna nova na tabela com botões
		AllTr.each(function() {
			//Adiciona o botao mais na primeira linha
			if (AddButtonAdded == 0) {
				$(this).append('<td>' + AddLnButton + '</td>');
				AddButtonAdded = 1;
			} else { //Adiciona o botao remover nas outras linhas
				var btn = $(this).append('<td>' + RmvLnButton + '</td>');
				btn.on('click', RemoveLn);
			}
		});

		$('#addLn').on('click', function() {
			Addline();
		});

		this.AddLn = function() {
			Addline();
		}

		this.RmvLn = function(el) {
			//Se nao tem só o cabeçalho e a primeira linha
			if ($(el).closest('tr') != settings.table.find('tr:first') && $(el).closest('tr') != settings.table.find('tr:nth-child(2)')) {
				$(el).closest('tr').remove();
			}

		}

		function Addline() {
			//Salva o botão COM EVENTO
			var Addbtn = $(FirstLn).find('td:last').find('input[type=button]').detach();

			//Adiciona uma linha no início
			FirstLn.before('<tr>' + LnContent + '</tr>');
			//Atualiza a var FirstLn
			SetVar();
			FirstLn.append('<td></td>');
			//Adiciona o botão no ultimo td
			Addbtn.appendTo(FirstLn.find('td:last'));

			//Adiciona botão menos e gruda o evento de apagar nele
			ScdLn.find('td:last').append(RmvLnButton);
			var rmvB = ScdLn.find('td:last').find('input[type=button]');
			rmvB.on('click', RemoveLn);
		}

		function RemoveLn() {
			$(this).closest('tr').remove();
		}

		function SetVar() {
			//Faz uma referencia para uma linha completa e todas a linhas da tabela se tiver cabeçalho ou nao
			FirstLn = $(settings.table).find('tbody').find('tr:nth-child(2)');
			ScdLn = $(settings.table).find('tbody').find('tr:nth-child(3)');
			AllTr = $(settings.table).find('tbody').find('tr:not(:first)');
		}
	}
})(jQuery);