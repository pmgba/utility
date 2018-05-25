(function() {
		document.title = '草稿';
		$('#firstHeading').html('草稿');
		var html = '';
		html += '<p>您在口袋百科上编辑的内容草稿会自动保存在本地的浏览器中，如果您变更电脑或浏览器，草稿不会随之转移。</p>';
		html += '<p><input id="autosave-clear" type="button" value="清空" /></p>';
		html += '<table class="wikitable" style="width:100%;"><tr><th style="width:30%;">标题</th><th style="width:40%;">内容</th><th style="width:20%;">修改日期</th><th style="width:10%;">操作</th></tr>';
		$.each( pw.autosave.draftList, function( title, data ) {
			var time = ''
			if ( data.time ) {
				var d = new Date(data.time);
				time = d.getFullYear() + '年' + (d.getMonth()+1) + '月' + d.getDate() + '日 ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
			}
			html += '<tr>';
			html += '<td><a href="' + mw.util.getUrl(title) + '">' + title + '</a></td>';
			html += '<td style="font-style:italic;">' + $('<div>').text( pw.localStorage.get( pw.autosave.getDraftKey(title),'' ).substring(0,50)).html() + '</td>';
			html += '<td>' + time + '</td>';
			html += '<td><a href="' + mw.util.getUrl(title) + '">查看</a>';
			html += ' <a href="' + mw.util.getUrl(title,{action:"edit"}) + '">编辑</a>';
			html += ' <a class="autosave-delete" href="#" data-title="' + title + '">删除</a></td>';
			html += '</tr>';
		});
		html += '</table>';
		$('#mw-content-text').html(html);
		$('#autosave-clear').click(function(){
			$.each( pw.autosave.draftList, function( title, data ) {
				delete pw.autosave.draftList[title];
				pw.localStorage.remove(pw.autosave.getDraftKey(title));
			});
			pw.localStorage.remove( pw.autosave.listKey );
			location.reload();
		});
		$('.autosave-delete').click(function(){
			pw.autosave.removeDraft($(this).data('title'));
			$(this).parent().parent().remove();
		});
})();