// 为编辑页面提供扩展功能。

// Tab输入支持
$('#wpTextbox1').keydown(function(e) {
	if (e.keyCode == 9) {
		var old_selectionStart = this.selectionStart;
		var old_selectionEnd = this.selectionEnd;
		var old_scrollTop = this.scrollTop;
		var selectedText = this.value.substring(old_selectionStart, old_selectionEnd);
		if ( selectedText.match( /\n/ ) ) {
			selectedText = selectedText.replace( /\n/g, '\n\t' );
		} else {
			selectedText = '\t';
			var new_selectionStart = old_selectionStart + selectedText.length;
		}
		this.value = this.value.substring(0, old_selectionStart) + selectedText + this.value.substring(old_selectionEnd, this.value.length);
		this.focus();
		this.selectionStart = new_selectionStart || old_selectionStart;
		this.selectionEnd = old_selectionStart + selectedText.length;
		this.scrollTop = old_scrollTop;
		e.preventDefault();
	}
});

//用户页检测
if ( mw.config.get('wgNamespaceNumber') == 2 && mw.config.get('wgRelevantUserName') !=  mw.config.get('wgUserName') ) {
	var $wpSave = $('#wpSave');
	$wpSave.prop('disabled', true);
	var warning = '<div style="margin: 0.5em 0;">'
		+'<span class="pw-editup__warning" style="font-weight:bold;">这个页面属于另一位用户所有，请在所有者的许可下进行编辑。</span>'
		+'<a class="pw-editup__confirm" href="#" >[我确定]</a>'
		+'</div>';
	$('.editButtons').after(warning);
	$('.pw-editup__confirm').click(function(){
		$wpSave.prop('disabled', false);
		$(this).hide();
		return false;
	});
}

// 预设摘要
(function(){
	$( '#wpSummaryLabel .mw-summary-preset-item' ).each(function(){
		var $a = $('<a></a>')
			.attr( 'href', '#' )
			.html( $(this).html() )
		;
		$(this).html($a);
	});
	$( '#wpSummaryLabel .mw-summary-preset-item a' ).click(function(){
		var summary = $( '#wpSummary' ).val();
		var pre = $(this).text();
		if ( summary.indexOf( pre ) == -1 ) {
			if ( summary.length > 0 ) if ( summary[summary.length-1] != ' ' ) summary += ' ';
			summary += pre;
		} else {
			summary = summary.replace( eval('/( *)'+pre+'( *)/'), '$1' );
		}
		$( '#wpSummary' ).val( summary );
		return false;
	});

	$('.mw-summary-preset-item').css({
		'border-left'  : '1px solid #aaa',
		'padding'      : '0 0.5em'
	});
	$('.mw-summary-preset-item:first-child').css({
		'border-left'  : 'none',
		'padding-left' : '0.2em'
	});
	$('.mw-summary-preset-item:last-child').css({
		'padding-right' : '0.2em'
	});
})();

var customizeToolbar = function() {
	$( '#wpTextbox1' ).wikiEditor( 'removeFromToolbar', {
	        'section': 'characters'
	}).wikiEditor( 'addToToolbar', {
		'sections': {
			'wikicode': {
				'type': 'booklet',
				'label': '代码',
				'pages': {
					'tags': {
						'layout': 'characters',
						'label': '标签',
						'characters':[
	{ 'label' : '<noinclude></noinclude>', 'action': { 'type': 'encapsulate', 'options': { 'pre': '<noinclude>', 'post': '</noinclude>' } } },
	{ 'label' : '<includeonly></includeonly>', 'action': { 'type': 'encapsulate', 'options': { 'pre': '<includeonly>', 'post': '</includeonly>' } } },
	{ 'label' : '<onlyinclude></onlyinclude>', 'action': { 'type': 'encapsulate', 'options': { 'pre': '<onlyinclude>', 'post': '</onlyinclude>' } } },
	{ 'label' : '<code></code>', 'action': { 'type': 'encapsulate', 'options': { 'pre': '<code>', 'post': '</code>' } } },
	{ 'label' : '<nowiki></nowiki>', 'action': { 'type': 'encapsulate', 'options': { 'pre': '<nowiki>', 'post': '</nowiki>' } } },
						]
					},
					'magicwords': {
						'layout': 'characters',
						'label': '魔术字',
						'characters':[
							'{{PAGENAME}}',
							'{{FULLPAGENAME}}',
							'{{SUBPAGENAME}}',
							'{{TALKPAGENAME}}',,
							'{{DISPLAYTITLE:}}',
							'{{FULLURL:}}',
							'{{SERVER}}',
							'__TOC__',
							'__NOTOC__',
							'__NOEDITSECTION__',
							'__NEWSECTIONLINK__',
							'__HIDDENCAT__'
						]
					},
					'parsers': {
						'layout': 'characters',
						'label': '解析函数',
						'characters':[
							'{{#if:}}',
							'{{#ifeq:}}',
							'{{#ifexpr:}}',
							'{{#switch:}}',
							'{{#time:}}'
						]
					},
					'others': {
						'layout': 'characters',
						'label': '其它',
						'characters':[
	{ 'label' : '[[分类:]]', 'action': { 'type': 'encapsulate', 'options': { 'pre': '[[分类:', 'post': ']]' } } },
						]
					}
				}
			},
			'characters2': {
				'type': 'booklet',
				'label': '特殊文字',
				'pages': {
					'hiragana': {
						'layout': 'characters',
						'label': '平假名',
						'characters':[ 
							"ぁ", "あ", "ぃ", "い", "ぅ", "う", "ぇ", "え", "ぉ", "お",
							"か", "が", "き", "ぎ", "く", "ぐ", "け", "げ", "こ", "ご",
							"さ", "ざ", "し", "じ", "す", "ず", "せ", "ぜ", "そ", "ぞ",
							"た", "だ", "ち", "ぢ", "つ", "づ", "て", "で", "と", "ど",
							"な", "に", "ぬ", "ね", "の",
							"は", "ば", "ぱ", "ひ", "び", "ぴ", "ふ", "ぶ", "ぷ", "へ", "べ", "ぺ", "ほ", "ぼ", "ぽ",
							"ま", "み", "む", "め", "も",
							"ゃ", "や", "ゅ", "ゆ", "ょ", "よ",
							"ら", "り", "る", "れ", "ろ",
							"ゎ", "わ", "ゐ", "ゑ", "を", "ん", "っ", "ゔ"
						]
					},
					'katagana': {
						'layout': 'characters',
						'label': '片假名',
						'characters':[
					 		"ァ", "ア", "ィ", "イ", "ゥ", "ウ", "ェ", "エ", "ォ", "オ",
							"カ", "ガ", "キ", "ギ", "ク", "グ", "ケ", "ゲ", "コ", "ゴ",
							"サ", "ザ", "シ", "ジ", "ス", "ズ", "セ", "ゼ", "ソ", "ゾ",
							"タ", "ダ", "チ", "ヂ", "ツ", "ヅ", "テ", "デ", "ト", "ド",
							"ナ", "ニ", "ヌ", "ネ", "ノ",
							"ハ", "バ", "パ", "ヒ", "ビ", "ピ", "フ", "ブ", "プ", "ヘ", "ベ", "ペ", "ホ", "ボ", "ポ",
							"マ", "ミ", "ム", "メ", "モ",
							"ャ", "ヤ", "ュ", "ユ", "ョ", "ヨ",
							"ラ", "リ", "ル", "レ", "ロ",
							"ヮ", "ワ", "ヰ", "ヱ", "ヲ", "ン", "ヴ", "ヵ", "ヶ", "ヷ", "ヸ", "ヹ", "ヺ", "ッ", "・", "ー"
						]
					},
					'greek': {
						'layout': 'characters',
						'label': '希腊字母',
						'characters': ['Α','Β','Γ','Δ','Ε','Ζ','Η','Θ','Ι','Κ','Λ','Μ','Ν','Ξ','Ο','Π','Ρ','Σ','Τ','Υ','Φ','Χ','Ψ','Ω','α','β','γ','δ','ε','ζ','η','θ','ι','κ','λ','μ','ν','ξ','ο','π','ρ','σ','τ','υ','φ','χ','ψ','ω']
					},
					'pinin': {
						'layout': 'characters',
						'label': '汉语拼音',
						'characters': ['ā','á','ǎ','à','ō','ó','ǒ','ò','ē','é','ě','è','ī','í','ǐ','ì','ū','ú','ǔ','ù','ǖ','ǘ','ǚ','ǜ','ǜ','ü']
					},
					'ipa': {
						'layout': 'characters',
						'label': '国际音标',
						'characters': [
		"p", "t̪", "t", "ʈ", "c", "k", "q", "ʡ", "ʔ", "b","d̪", "d", "ɖ",
		"ɟ", "ɡ", "ɢ", "ɓ", "ɗ", "ʄ", "ɠ", "ʛ", "t͡s",
		"t͡ʃ", "t͡ɕ", "d͡z", "d͡ʒ", "d͡ʑ", "ɸ", "f",
		"θ", "s", "ʃ", "ʅ", "ʆ", "ʂ", "ɕ", "ç", "ɧ", "x",
		"χ", "ħ", "ʜ", "h", "β", "v", "ʍ", "ð", "z", "ʒ", "ʓ",
		"ʐ", "ʑ", "ʝ", "ɣ", "ʁ", "ʕ", "ʖ", "ʢ", "ɦ",
		"ɬ", "ɮ", "m", "m̩", "ɱ", "ɱ̩", "ɱ̍", "n̪",
		"n̪̍", "n", "n̩", "ɳ", "ɳ̩", "ɲ", "ɲ̩", "ŋ",
		"ŋ̍", "ŋ̩", "ɴ", "ɴ̩", "ʙ", "ʙ̩", "r",
		"r̩", "ʀ", "ʀ̩", "ɾ", "ɽ", "ɿ", "ɺ", "l̪",
		"l̪̩", "l", "l̩", "ɫ", "ɫ̩", "ɭ", "ɭ̩", "ʎ",
		"ʎ̩", "ʟ", "ʟ̩", "w", "ɥ", "ʋ", "ɹ", "ɻ", "j",
		"ɰ", "ʘ", "ǂ", "ǀ", "!", "ǁ", "ʰ", "ʱ", "ʷ", "ʸ",
		"ʲ", "ʳ", "ⁿ", "ˡ", "ʴ", "ʵ", "ˢ", "ˣ", "ˠ",
		"ʶ", "ˤ", "ˁ", "ˀ", "ʼ", "i", "i̯", "ĩ", "y", "y̯",
		"ỹ", "ɪ", "ɪ̯", "ɪ̃", "ʏ", "ʏ̯", "ʏ̃",
		"ɨ", "ɨ̯", "ɨ̃", "ʉ", "ʉ̯", "ʉ̃", "ɯ",
		"ɯ̯", "ɯ̃", "u", "u̯", "ũ", "ʊ", "ʊ̯",
		"ʊ̃", "e", "e̯", "ẽ", "ø", "ø̯", "ø̃", "ɘ",
		"ɘ̯", "ɘ̃", "ɵ", "ɵ̯", "ɵ̃", "ɤ",
		"ɤ̯", "ɤ̃", "o", "o̯", "õ", "ɛ", "ɛ̯",
		"ɛ̃", "œ", "œ̯", "œ̃", "ɜ", "ɜ̯",
		"ɜ̃", "ə", "ə̯", "ə̃", "ɞ", "ɞ̯",
		"ɞ̃", "ʌ", "ʌ̯", "ʌ̃", "ɔ", "ɔ̯",
		"ɔ̃", "æ", "æ̯", "æ̃", "ɶ", "ɶ̯",
		"ɶ̃", "a", "a̯", "ã", "ɐ", "ɐ̯", "ɐ̃", "ɑ",
		"ɑ̯", "ɑ̃", "ɒ", "ɒ̯", "ɒ̃", "ˈ", "ˌ",
		"ː", "ˑ", "˘", ".", "‿", "|", "‖",
	]
					}
				}
			},
			'symbols': {
				'type': 'booklet',
				'label': '符号',
				'pages': {
					'punc': {
						'layout': 'characters',
						'label': '标点符号',
						'characters': [ '。','，','、','；','：','？','！','…','—','·','ˉ','ˇ','¨','々','～','‖','＂','＇','｀','｜','〃','〈' , '〉','《' , '》','「' , '」','『' , '』','〖' , '〗','【' , '】','（' , '）','［' , '］','｛' , '｝','‘' , '’','“' , '”']
					},
					'symble': {
						'layout': 'characters',
						'label': '特殊符号',
						'characters': [
		'■','◆','▲','●','★','□','◇','△','○','☆','·','§','※',
		'♠','♣','♥','♦','↔','↑','↓','←','→','↖','↗','↘','↙',
	]
					},
					'math': {
						'layout': 'characters',
						'label': '数学符号',
						'characters': [
		'≈','≡','≠','＝','≤','≥','＜','＞','≮','≯','∷','±','＋','－','×','÷','／','∫','∮','∝','∞','∧','∨','∑','∏',
		'∪','∩','∈','∵','∴','⊥','∥','∠','⌒','⊙','≌','∽','√','℃','°','′','″','＄','￡','￥','‰','％','℃','¤','￠',
		'½','⅓','⅔','¼','¾','⅛','⅜','⅝','⅞','²','m','³',['⌈','⌉'],['⌊','⌋'],
		'Ⅰ','Ⅱ','Ⅲ','Ⅳ','Ⅴ','Ⅵ','Ⅶ','Ⅷ','Ⅸ','Ⅹ','①','②','③','④','⑤','⑥','⑦','⑧','⑨','⑩',
	]
					},
				}
			},
			'tools': {
				'type': 'booklet',
				'label': '工具'
			}
		}
	});
};

mw.util.addCSS('.wikiEditor-ui-toolbar .page-characters div span {box-sizing: content-box !important;font-family: monospace;}'	);

mw.loader.using( 'user.options', function () {
	if ( mw.user.options.get( 'usebetatoolbar' ) == 1 ) {
		$.when(
			mw.loader.using( 'ext.wikiEditor.toolbar' ), $.ready
		).then( customizeToolbar );
	}
} );