/*
	Coolt: Already Designed Templates Usable
*/

function coolt() {
	_var = {};

	// STAGING
	this.platform = 'WEB';
	this.size = [400,580];
	this.orientation = 'portrait';
	this.zoom = 100;

	this.widgetStream = {};
	this.templates = new CooltTemplates();

	// STATE
	this.currentBuild = '';

	// EVENTS
	this.onadded = {};

	// CREATE AUTO STYLES
	this.ready(function(){
		_var['element'] = document.createElement('STYLE');
		_var['element'].innerHTML = '.coolt-screen-up.active {-webkit-animation: TUp .2s ease-in;-ms-animation: TUp .2s ease-in;animation: TUp .2s ease-in;}.coolt-screen-down.active {-webkit-animation: TDown .2s ease-in;-ms-animation: TDown .2s ease-in;animation: TDown .2s ease-in;}.coolt-screen-right.active {-webkit-animation: TRight .2s ease-in;-ms-animation: TRight .2s ease-in;animation: TRight .2s ease-in;}.coolt-screen-left.active {-webkit-animation: TLeft .2s ease-in;-ms-animation: TLeft .2s ease-in;animation: TLeft .2s ease-in;}@-webkit-keyframes TRight {from {transform: translateX(-100vw);}to {transform: translateX(0);}}@-ms-keyframes TRight {from {transform: translateX(-100vw);}to {transform: translateX(0);}}@keyframes TRight {from {transform: translateX(-100vw);}to {transform: translateX(0);}}@-webkit-keyframes TLeft {from {transform: translateX(100vw);}to {transform: translateX(0);}}@-ms-keyframes TLeft {from {transform: translateX(100vw);}to {transform: translateX(0);}}@keyframes TLeft {from {transform: translateX(100vw);}to {transform: translateX(0);}}@-webkit-keyframes TDown {from {transform: translateY(-100vh);}to {transform: translateY(0);}}@-ms-keyframes TDown {from {transform: translateY(-100vh);}to {transform: translateY(0);}}@keyframes TDown {from {transform: translateY(-100vh);}to {transform: translateY(0);}}@-webkit-keyframes TUp {from {transform: translateY(100vh);}to {transform: translateY(0);}}@-ms-keyframes TUp {from {transform: translateY(100vh);}to {transform: translateY(0);}}@keyframes TUp {from {transform: translateY(100vh);}to {transform: translateY(0);}}';
		
		document.head.appendChild(_var['element']);
	});
}

coolt.prototype.commonSettings = function(e,o){
	if( o.style && typeof o.style=='object' )
		for(prop in o.style){
			if( typeof o.style[prop]==( 'string' || 'number' ) )
				e.style[prop] = o.style[prop];
		}

	e.onadded = [];
	e.onadded.push(o.then||function(_this){});
	coolt.onadded[coolt.currentBuild].push(e);

	return e;
}

coolt.prototype.doScreenAnim = function(e,a){
	if( a!='' && typeof a=='object' && !a.isAxe ){

		e.classList.add('coolt-screen-'+(a.animation||'left'));
		e.classList.add('active');

	} else if( a.isAxe==true ) {
		if( $XE && typeof $XE=='object' && a.animation ){
			if( typeof a.animation=='string' ){
				_var['initializer'] = $XE.easy(a.animation, {
					t: a.duration||1
				});
			} else {
				_var['initializer'] = $XE.$(a.animation);
			}

			_var['controller'] = _var['initializer'].apply(e);

			e.axe = {
				initializer: _var['initializer'],
				controller: _var['controller']
			};

			e.axe.controller.start();
		}
	}
}

coolt.prototype.init = function(){
	if( document.readyState=='loading' )
		return coolt.ready(coolt.init);

	if( coolt.platform!=='WEB' ){
		_var['f'] = function(){
			//document.documentElement.requestFullscreen();
		};
		window.addEventListener('click', _var['f']);
	}

	// STAGE
	_var['stage'] = document.createElement('DIV');
	_var['stage'].id = 'coolt-stage';

	if( coolt.orientation=='landscape' ){
		_var['tmp'] = coolt.size[0];
		coolt.size[0] = coolt.size[1];
		coolt.size[1] = _var['tmp'];
	}

	_var['stage'].style.width = coolt.size[0];
	_var['stage'].style.height = coolt.size[1];

	_var['stage'].style.position = 'fixed';
	_var['stage'].style.overflow = 'hidden';
	_var['stage'].style.boxSizing = 'border-box';

	_var['stage'].style.borderRadius = '10px';
	_var['stage'].style.border = '2px solid black';

	_var['stage'].style.top = '50%';
	_var['stage'].style.left = '50%';
	_var['stage'].style.transform = 'scale('+(coolt.zoom/100)+')';

	_var['stage'].style.marginTop = (coolt.size[1]*-1)/2;
	_var['stage'].style.marginLeft = (coolt.size[0]*-1)/2;

	document.body.appendChild( _var['stage'] );
	coolt.stage = _var['stage'];
	coolt.init = null;

	coolt.splash({
		time: 3,
		child: () => coolt.center(
			coolt.text({
				text: 'COOLT<br/>...',
				style: {
					fontSize: '76px',
					textAlign: 'center'
				},
				then: function(el){
					setInterval(function(){
						if(el.innerHTML.indexOf('...') !== -1){
							el.innerHTML = el.innerHTML.replace('...', '..&nbsp;');
						} else if(el.innerHTML.indexOf('..') !== -1){
							el.innerHTML = el.innerHTML.replace('..', '.&nbsp;');
						} else if(el.innerHTML.indexOf('.') !== -1){
							el.innerHTML = el.innerHTML.replace('.', '&nbsp;');
						} else {
							el.innerHTML = el.innerHTML.replace('&nbsp;&nbsp;&nbsp;', '...');
						}
					}, 250);
				}
			})
		),
		proceed: '/'
	});
};

coolt.prototype.run = function( route, widget_s ) {
	if( !coolt.widgetStream[route] ) {
		if( typeof widget_s=='function' ) {

			// INSTANTIAZE
			coolt.currentBuild = route;
			coolt.onadded[route] = [];

			coolt.widgetStream[route] =  widget_s();
			return true;
		}
	} else {
		// Throw Warning
		console.log('Warning: trying to redefine route already in the widget stream');
	}
}

coolt.prototype.runShow = function( route, widget_s ) {
	if( coolt.run(route, widget_s )===true ){
		coolt.show( route );
	}
}

coolt.prototype.set = function(e){
	return {
		e: e,
		FlexContainer: function(o){
			this.e.style.display = '-webkit-box';
			this.e.style.display = '-ms-flexbox';
			this.e.style.display = 'flex';

			if( o && o.justifyContent==='between' ){
				this.e.style.WebkitBoxPack = 'justify';
				this.e.style.MsFlexPack = 'justify';
				this.e.style.justifyContent = 'space-between';
			} else if ( o && o.justifyContent==='around' ){
				this.e.style.MsFlexPack = 'distribute';
				this.e.style.justifyContent = 'space-around';
			}

			if( o && o.alignItems==='center' ){
				_var['element'].style.WebkitBoxAlign = 'center';
				_var['element'].style.MsFlexAlign = 'center';
				_var['element'].style.alignItems = 'center';
			}
		}
	};
}

coolt.prototype.show = function( route, a='' ){
	if( coolt.isLoaded == true || route == '/splash' ){
		coolt.stage.innerHTML = '';
		_var['screen'] = coolt.widgetStream[route] || coolt.templates._404();
		coolt.stage.appendChild( _var['screen'] );
		
		coolt.onadded[route].forEach(function(e){
			e.onadded.forEach(function(f,i){
				f(e);
				delete(e.onadded[i]);
			});
		});

		if( route != ('/splash' || '/') ){
			setTimeout(function(){
				coolt.doScreenAnim( _var['screen'], a )
			}, 10);
		}
	}
}

coolt.prototype.splash = function( options ) {
	_var = {};
	_var['useProceed'] = true;

	if( typeof options=='object' ){
		coolt.runShow('/splash', options.child);
		setTimeout( function() {
			if( options.done ){
				_var['useProceed'] = options.done();
			}

			coolt.isLoaded = true;
			if( _var['useProceed'] ){
				coolt.show(options.proceed);
			}
		}, options.time*1000||3000);
	}
}

// W I D G E T S
// W I D G E T S
// W I D G E T S
// W I D G E T S
// W I D G E T S
// W I D G E T S

coolt.prototype.link = function( options ) {
	_var['element'] = document.createElement('A');
	_var['element'].classList.toggle('LINK');
	_var['element'].href = options.url||'';

	if( options.child && typeof options.child=='object' )
		_var['element'].appendChild( options.child );
	else
		_var['element'].innerHTML = options.child||'';

	_var['element'] = coolt.commonSettings( _var['element'], options );
	return _var['element'];
}

coolt.prototype.bottombar = function( options ){
	_var['element'] = document.createElement('DIV');
	_var['element'].classList.toggle('BOTTOMBAR');

	_var['element'].style.padding = '1.2em';
	_var['element'].style.backgroundColor = 'royalblue';
	
	_var['element_settings'] = coolt.set(_var['element']);
	_var['element_settings'].FlexContainer({
		alignItems: 'center',
		justifyContent: 'around'
	});

	_var['element'].oncooltclick = options.onclick||function(e){};

	if( options.children )
		options.children.forEach(function(e,i){
			e.onclick = function(ev){
				ev.preventDefault();
				this.parentElement.oncooltclick(i);
			};
			_var['element'].appendChild(e);
		});
	else
		_var['element'].appendChild(coolt.text({text: '{{}}'}));

	_var['element'] = coolt.commonSettings( _var['element'], options );
	return _var['element'];
}

coolt.prototype.center = function( child ){
	_var['element'] = document.createElement('DIV');
	_var['element'].classList.toggle('CENTER');

	_var['element'].style.position = 'relative';
	_var['element'].style.height = '100%';
	_var['element'].style.width = '100%';

	child.style.position = 'absolute';
	child.style.top = '50%';
	if( child.style.textAlign!='center' )
		child.style.left = '50%';

	child.onadded.push(function(_this){
		
		_var['dimension'] = _this.getBoundingClientRect();
		_this.style.marginTop = (_var['dimension'].height*-1)/2;
		if( _this.style.textAlign!='center' )
			_this.style.marginLeft = (_var['dimension'].width*-1)/2;
		else
			_this.style.marginLeft = (_this.parentElement.getBoundingClientRect().width-_var['dimension'].width)/2;
	
	});
	coolt.onadded[coolt.currentBuild].push(child);
	
	_var['element'].appendChild(child);
	return _var['element'];
};

coolt.prototype.root = function( options ) {
	_var['element_body'] = document.createElement('DIV');
	_var['element_body'].style.position = 'relative';
	_var['element_body'].style.height = '100%';
	_var['element_body'].appendChild(
		options.body||coolt.center( coolt.text({ text: '{{COOLT_ROOT_WIDGET}}' }) )
	);
	options.body = _var['element_body'];

	_var['element'] = document.createElement('DIV');
	_var['element'].classList.toggle('ROOT');

	if( options.topbar && typeof options.topbar=='object' ){
		options.topbar.onadded.push(function(_this){
			_this.nextElementSibling.style.height = coolt.size[1]-_this.getBoundingClientRect().height;
		});
		coolt.onadded[coolt.currentBuild].push(options.topbar);
		_var['element'].appendChild(options.topbar);
	}

	_var['element'].appendChild( options.body );
	
	if( options.bottombar && typeof options.bottombar=='object' ){
		options.bottombar.onadded.push(function(_this){
			ht = coolt.size[1];
			if( _this.previousElementSibling.style.height!='100%' )
				ht = parseInt(_this.previousElementSibling.style.height);
			_this.previousElementSibling.style.height = ht-_this.getBoundingClientRect().height;
		});
		coolt.onadded[coolt.currentBuild].push(options.bottombar);
		_var['element'].appendChild(options.bottombar);
	}

	_var['element'].style.backgroundColor = '#f7f7f7';
	_var['element'].style.position = 'relative';
	_var['element'].style.width = '100%';
	_var['element'].style.height = '100%';

	_var['element'] = coolt.commonSettings( _var['element'], options );
	return _var['element'];
}

coolt.prototype.text = function( options ){
	_var['element'] = document.createElement('DIV');
	_var['element'].classList.toggle('TEXT');
	_var['element'].innerHTML = options.text || '{{COOLT_TEXT_WIDGET}}';

	_var['element'] = coolt.commonSettings( _var['element'], options );
	return _var['element'];
}

coolt.prototype.topbar = function( options ){
	options.content = options.content||coolt.text({ text: '{{APPBAR_CONTENT}}' });

	_var['element'] = document.createElement('DIV');
	_var['element'].classList.toggle('TOPBAR');
	
	_var['element_settings'] = coolt.set(_var['element']);
	_var['element_settings'].FlexContainer({
		alignItems: 'center'
	});

	_var['element'] = _var['element_settings'].e;

	if( options.leading && typeof options.leading=='object' )
		options.leading.style.marginRight = '2rem';
		_var['element'].appendChild( options.leading )

	_var['element'].appendChild( options.content );
	_var['element'].style.backgroundColor = 'royalblue';
	_var['element'].style.padding = '1.2em';

	if( options.actions && typeof options.actions=='object' ) {
		_var['element'].children[1].style.marginRight = 'auto';
		options.actions.forEach(function(e){
			e.style.marginLeft = '1.5rem';
			_var['element'].appendChild( e );
		});
	}

	_var['element'] = coolt.commonSettings( _var['element'], options );
	return _var['element'];
}

coolt.prototype.mediaQuery = function( definition ) {
	return '@media only screen and (max-width: '+'d'+'){}';
}

// T E M P L A T E S
// T E M P L A T E S
// T E M P L A T E S
// T E M P L A T E S
// T E M P L A T E S
// T E M P L A T E S

function CooltTemplates(){

}

CooltTemplates.prototype._404 = function(){
	return coolt.link('404', '404');
}

CooltTemplates.prototype.parse = function(c,d=[]){
	_var['built_code'] = c;
	if( typeof c=='function' ){
		_var['built_code'] = c();
	}

	_var['built_code'] = atob(_var['built_code']).split('\n');
	_var['built_code'][0] = _var['built_code'][0].split('+').reverse();
	_var['built_code'][3] = _var['built_code'][3].split(';;');

	_var['built_code'][0].forEach(function(p){
		p = parseInt(p);
		b64 = btoa(p);
		_var['t_b'] = _var['built_code'][2].substring(0, p);
		_var['t_a'] = _var['built_code'][2].substring(p+b64.length);

		_var['built_code'][2] = _var['t_b']+_var['t_a'];
	});
	
	for(x=0;x<_var['built_code'][1];x++){
		_var['built_code'][2] = '='+_var['built_code'][2];
	}

	_var['built_code'][2] = new DOMParser().parseFromString(
		atob(_var['built_code'][2].split('').reverse().join(''))
	, 'text/html').body.children[0];

	_var['built_code'][3].forEach(function(ep){
		ep = ep.split('::');
		if( ep.length==2 ){
			ep[1] = atob(ep[1]);
			if( ep[1].indexOf('::::') !== -1 ) {
				ep[1] = ep[1].split('::::');
				ep[1].pop();
				epp = [];
				ep[1].forEach(function(f,i){
					eval('epp.push('+f+');');
				});
				ep[1] = epp;
			}
			_var['built_code'][2][ep[0]] = ep[1];
		}
	});

	return _var['built_code'][2];
}

CooltTemplates.prototype.stringify = function(e){
	_var['didSome'] = false;
	_var['functions'] = '';

	for( x in e ){
		if( x.indexOf('on')==0 && e[x] ){
			if( typeof e[x]=='object' )
				e[x].push('DUMMY');
				e[x] = e[x].join('::::');
			_var['functions'] = x+'::'+btoa(e[x].toString())+';;';
		} else if( _var['didSome']==true ){
			break;
		}
	}

	return btoa(e.outerHTML);
}

CooltTemplates.prototype.toCooltCode = function(e){
	if( typeof e=='function' ){
		_var['raw_code'] = this.stringify(e());
	} else if( typeof e=='object' ) {
		_var['raw_code'] = this.stringify(e);
	}

	_var['tmp'] = '';
	for( x=_var['raw_code'].length;x>0;x-- ){
		_var['tmp'] += _var['raw_code'][x-1];
	}

	_var['raw_code'] = _var['tmp'];
	_var['=_length'] = _var['raw_code'].match(/=/g);
	_var['=_length'] = _var['=_length']  ? _var['=_length'].length : 0;

	_var['raw_code'] = _var['raw_code'].substring(_var['=_length']);
	_var['rand_i_pos'] = [];

	_var['l'] = Math.floor(Math.random()*(_var['raw_code'].length/2));
	_var['l'] = _var['l'] > 30 ? 30 : _var['l'];

	for(x=0;x<_var['l'];x++){
		_var['rand'] = Math.floor(Math.random()*_var['raw_code'].length);
		if( _var['rand_i_pos'].indexOf(_var['rand'])!==-1 ){
			continue;
		}

		_var['rand_i_pos'].push(_var['rand']);
		_var['t_b'] = _var['raw_code'].substring(0, _var['rand']);
		_var['t_a'] = _var['raw_code'].substring(_var['rand']);
		
		_var['raw_code'] = _var['t_b']+btoa(_var['rand'])+_var['t_a'];
	}

	return btoa(_var['rand_i_pos'].join('+')+'\n'+_var['=_length']+'\n'+_var['raw_code']+'\n'+_var['functions']);
}

coolt.prototype.ready = function( f ){
	if( document.readyState=='loading' ) {
		document.addEventListener('DOMContentLoaded', f);
	} else {
		f();
	}
}

window.coolt=new coolt();