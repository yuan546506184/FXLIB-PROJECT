//: <![CDATA[
//: 版权所有(c) 2012-2013 炫影(R)-Style(R), 作者保留所有权利。
//: http://license.fxlib.org/
//: 
//:   @Version: Alpha-3.2.181
//:   @Authors: Yuan546506184@gmail.com-sharplight
//:   @Created: Sat Apr 13 13:38:35 UTC+0800 2013
//:   @Updated: Sat Apr 19 14:50:00 UTC+0800 2013
//:   @Display: Visual Studio 2012 Terminal 9px
//:   @Urlhome: http://projects.fxlib.org/javascript/
//:
//:
/// ###########################################################################
/** @main: */(function ( window, document, location, navigator, configuration ){ "use strict"; 
/// ###########################################################################
    /// <var type='String'>定义框架的作者列表信息。</var>
    var Authors  = "yuan546506184@gmail.com:sharplight";

    /// <var type='String'>定义框架的版本信息。</var>
    var Version  = "Alpha-3.2.181";

    /// <var type='String'>定义框架的 Github 页面地址。</var>
    var GitPage  = "https://github.com/yuan546506184/FXLIB-PROJECT";

    /// <var type='String'>定义框架的官网地址。</var>
    var HomePage = "http://projects.fxlib.org/javascript/";

    /// <var type='*'>定义框架覆盖的全局对象。</var>
    var OldProme = ( window.Fxlib || null );

    /// <var type='Function'>定义框架的全局对象。</var>
    var Fxlib    = ( window.Fxlib = function Fxlib () {} );

    /// <var type='Function'>对 Object.prototype.toString() 方法的本地引用。</var>
    var ToString = ( Object.prototype.toString );

    /// <var type='Function'>对 Array.prototype.slice() 方法的本地引用。</var>
    var Slice    = ( Array.prototype.slice );

    /// <var type='RegExp'>定义匹配函数字符串形式中的 "[native code]"字段的正则表达式。</var>
    var R_function_native = /\{\s*\[native code\]\s*\}\s*$/i;

    /// <var type='RegExp'>定义测试名称空间路径节点是否合法的正则表达式。</var>
    var R_namespace_vaildtoken = /^\w+$/;

    /// <var type='RegExp'>定义提取函数字符串形式中函数名称的正则表达式。</var>
    var R_function_name = /function\s+([^\(\s]+)/;
        

    /// [ "Static" ]:
    /// ###########################################################################
        /*< inline >*/Fxlib.isImpWithJsEngine = function isImpWithJsEngine( scriptor ) {
            return ( (typeof scriptor === "function") && R_function_native.test("" + scriptor) );
        };

        /*< inline >*/Fxlib.isInvaildObject = function isInvaildObject( data ) {
            return ( (typeof data === "undefined") || (data === null) );
        };

        /*< inline >*/Fxlib.isReferenceObject = function isReferenceObject( data ) {
            return ( !(data === null) && ((typeof data === "object") || (typeof data === "function")) );
        };

        /*< inline >*/Fxlib.isValueObject = function isValueObject( data ) {
            return ( (typeof data === "string") || (typeof data === "number") || (typeof data === "boolean") );
        };

        /*< inline >*/Fxlib.isString = function isString( data ) {
            return ( (typeof data === "string") || (ToString.call( data ) === "[object String]") );
        };

        /*< inline >*/Fxlib.isNumber = function isNumber( data ) {
            return ( (typeof data === "number") || (ToString.call( data ) === "[object Number]") );
        };

        /*< inline >*/Fxlib.isBoolean = function isBoolean( data ) {
            return ( (typeof data === "boolean") || (ToString.call( data ) === "[object Boolean]") );
        };

        /*< inline >*/Fxlib.isArray = Fxlib.isImpWithJsEngine( Array.isArray ) ? Array.isArray : function isArray( data ) {
            return ( (typeof data === "object") && (ToString.call( data ) === "[object Array]") );
        };

        /*< inline >*/Fxlib.isInvaildNumber = function isInvaildNumber( data ) {
            return ( !((typeof data === "number") || (ToString.call( data ) === "[object Number]")) || (isNaN( data )) || !(isFinite( data )) );
        };

        /*< inline >*/Fxlib.checkThisPointer = function checkThisPointer( thisPointer, ContrastClass ) {
            if ( !(thisPointer instanceof ContrastClass) ) {
                throw Error( "构造函数或绑定的对象方法禁止修改 this 指针。" );
            };
        };


        Fxlib.namespace = function namespace( uri, scriptor ) {
            /// <summary>创建/获取一个名称空间，并在该名称空间添加定义。</summary>
            /// <param name='uri' type='String'>必须，名称空间的路径。</param>
            /// <param name='scriptor' type='Object' optional='true'>可选，默认值：null。添加进名称空间中的定义。</param>
            /// <returns type='Object'>返回对该名称空间的引用。</returns>

            if ( !(Fxlib.isReferenceObject( this )) ) {
                throw Error( "调用 namespace() 方法的对象必须是引用类型。" );
            };

            if ( !(Fxlib.isString( uri )) ) {
                throw Error( "传递给 namespace() 方法的 uri 参数不是一个 String 对象。" );
            };

            var list = uri.split( /\.+/ );
            var token = this;
            var name = "";

            for ( var i = 0; i < list.length; ++i ) {
                name = list[ i ];

                if ( !(R_namespace_vaildtoken.test( name )) ) {
                    throw Error( "传递给 namespace() 方法的 uri 参数中包含无效的路径组件。" );
                };

                if ( !(Fxlib.isReferenceObject( token )) ) {
                    throw Error( "传递给 namespace() 方法的 uri 参数指向了非引用类型的节点。" );
                };

                // IE7,8 中的 DOM 对象，没有 hasOwnProperty 方法，但是可以使用 in 关键字。
                if ( !(Fxlib.isImpWithJsEngine( token.hasOwnProperty ) ? token.hasOwnProperty( name ) : ( name in token )) ) {
                    try {
                        token[ name ] = {};
                    } catch( exception ) {
                        // 至少对当前节点调用了 Object.preventExtensions 方法。
                        throw Error( "无法为被标记为不可扩展的对象，创建名称空间子节点。" );
                    };
                };

                token = token[ name ];
            };

            if ( (Fxlib.isInvaildObject( scriptor )) ) {
                return token;
            };

            if ( !(Fxlib.isReferenceObject( scriptor )) ) {
                throw Error( "传递给 namespace() 方法的 scriptor 参数必须为引用类型。" );
            };

            if ( !(Fxlib.isReferenceObject( token )) ) {
                throw Error( "传递给 namespace() 方法的 uri 参数指向了非引用类型的节点。" );
            };

            for ( var name in scriptor ) {
                if ( (Fxlib.isImpWithJsEngine( scriptor.hasOwnProperty )) && !(scriptor.hasOwnProperty( name )) ) {
                    continue;
                };

                if ( (Fxlib.isImpWithJsEngine( token.hasOwnProperty ) ? token.hasOwnProperty( name ) : ( name in token )) ) {
                    throw Error( "传递给 namespace() 方法的 scriptor 参数中包含已经存在原始名称的定义。" );
                };

                token[ name ] = scriptor[ name ];
            };

            return token;
        };


        Fxlib.dispose = function dispose() {
            /// <summary>注销框架的全局引用。</summary>
            /// <returns type='Function'>返回对当前框架的引用。</returns>

            return ( window.Fxlib = OldProme, Fxlib );
        };


        Fxlib.linkPrototype = function linkPrototype( thisConstructor, linkConstructor ) {
            /// <summary>将构造函数的原型关联另外一个构造函数的，这将实现原型上的继承。</summary>
            /// <param name='thisConstructor' type='Function'>必须，子类构造函数的引用。</param>
            /// <param name='linkConstructor' type='Function'>必须，父类构造函数的引用。</param>
            /// <returns type='Function'>返回子类构造函数的引用。</returns>

            if ( !(typeof thisConstructor === "function") ) {
                throw Error( "传递给 linkPrototype() 方法的 thisConstructor 参数不是一个 Function 对象。" );
            };

            if ( !(typeof linkConstructor === "function") ) {
                throw Error( "传递给 linkPrototype() 方法的 linkConstructor 参数不是一个 Function 对象。" );
            };

            return ( (thisConstructor.prototype = Fxlib.builtPrototype( linkConstructor.prototype )).constructor = thisConstructor );
        };


        Fxlib.builtPrototype = Fxlib.isImpWithJsEngine( Object.create ) ? Object.create : function builtPrototype( prototype ) {
            /// <summary>使用指定的原型对象，创建一个新的原型。</summary>
            /// <param name='prototype' type='Object'>必须，一个原型对象。</param>
            /// <returns type='Object'>返回一个 Object 对象。</returns>

            if ( !(Fxlib.isReferenceObject( prototype )) ) {
                throw Error( "传递给 builtPrototype() 方法的 prototype 参数必须为引用类型。" );
            };

            var AnonsDefine = function () {}; 
                AnonsDefine.prototype = prototype;

            return new AnonsDefine();
        };


        Fxlib.foundPrototype = Fxlib.isImpWithJsEngine( Object.getPrototypeOf ) ? Object.getPrototypeOf : function foundPrototype( object ) {
            /// <summary>获取目标对象的原型对象。</summary>
            /// <param name='object' type='Object'>必须，获取原型对象的目标对象。</param>
            /// <returns type='Object'>如果目标对象是引用类型，并且具有原型，则返回原型对象。否则返回 null。</returns>

            if ( !(Fxlib.isReferenceObject( object )) ) {
                throw Error( "传递给 foundPrototype() 方法的 object 参数必须为引用类型。" );
            };

            /// Webkit 内核的浏览器可能支持该属性。
            if ( !(Fxlib.isInvaildObject( object["__proto__"] )) ) {
                return object[ "__proto__" ];
            };

            /// 如果对象自身具有 constructor 属性，则说明该对象被作为其他类型的原型对象。
            if ( (Fxlib.isImpWithJsEngine( object.hasOwnProperty )) && (object.hasOwnProperty("constructor")) ) {
                try {
                    var tmp = object.constructor; delete object.constructor;
                    var fat = object.constructor; object.constructor = tmp;

                    return fat.prototype;
                } catch( exception ) {
                    /// 对象的 constructor 的 configurable 被设置成 false。或者该属性是内部实现的。
                    return ( object.constructor.prototype || null );
                };
            };

            /// IE7 以及更低版本的 IE 浏览器中的 DOM 元素，不支持 constructor 属性。
            if ( !(typeof object.constructor === "function") ) {
                return null;
            };

            return ( object.constructor.prototype || null );
        };


        Fxlib.foundClassName = function foundClassName( handler ) {
            /// <summary>获取函数的函数名称。</summary>
            /// <param name='handler' type='Function'>必须，获取函数名称的函数。</param>
            /// <returns type='String'>返回函数的定义名称，对于匿名函数则返回空字符串。</returns>

            if ( !(typeof handler === "function") ) {
                throw Error( "传递给 foundClassName() 方法的 handler 参数不是一个 Function 对象。" );
            };

            /// Webkit 浏览器可能支持 name 属性。
            if ( (handler.hasOwnProperty( "name" )) ) {
                return handler[ "name" ];
            };

            return ( ( R_function_name.exec( "" + handler ) || {} )[1] || "" );
        };


        Fxlib.builtProxy = function builtProxy( handler, context ) {
            /// <signature>
            /// <summary>为指定函数创建具有特定执行上下文，并且具有默认参数的代理函数。</summary>
            /// <param name='handler' type='Function'>必须，创建代理函数的原始函数。</param>
            /// <param name='context' type='Object'>必须，设置代理函数的执行上下文。</param>
            /// <param name='...defArgs' optional='true'>可选，设置函数的默认参数。</param>
            /// </signature>

            if ( !(typeof handler === "function") ) {
                throw Error( "传递给 builtProxy() 方法的 handler 参数不是一个 Function 对象。" );
            };

            if ( !(Fxlib.isReferenceObject( context )) ) {
                throw Error( "传递给 builtProxy() 方法的 context 参数必须为引用类型。" );
            };

            /// 没有提供默认参数时，不需要提取 arguments 中的值，而消耗性能。
            if ( (arguments.length === 2) ) {
                return function () { return handler.apply( context, arguments ); };
            };

            var lastArgs = Slice.call( arguments, 2 );
            var lastLens = lastArgs.length;

            return function () {
                /// 删除上一次调用函数传递的参数。
                lastArgs.length = lastLens;

                /// 复制本次调用函数的参数。
                /// lastArgs.concat( Slice.call(arguments, 0) );
                for ( var i = 0; i < arguments.length; ++i ) { 
                    lastArgs[ lastArgs.length ] = arguments[ i ];
                };

                return handler.apply( context, lastArgs );
            };
        };


        Fxlib.ClassObject = Fxlib.linkPrototype( function ClassObject () {
            /// <summary>定义框架中类型的顶级继承类型。</summary>
            
            Fxlib.checkThisPointer( this, Fxlib.ClassObject );

        }, Object );


    /// [ "Events" ]:
    /// ###########################################################################
        var Event;
        var Listener;
        var Dispatcher;


        Fxlib.namespace( "events", {
            Event: 
            Event = Fxlib.linkPrototype( function Event( type, bubbles, cancelable ) {
                /// <summary>创建一个框架事件对象，事件对象为调度器调度事件提供事件信息。</summary>
                /// <param name='type' type='String'>必须，事件对象的类型。</param>
                /// <param name='bubbles' type='Boolean' optional='true'>可选，默认值：false。指示事件是否是一个冒泡事件。</param>
                /// <param name='cancelable' type='Boolean' optional='true'>可选，默认值：false。指示事件是否可阻止对象执行默认行为。</param>

                Fxlib.checkThisPointer( this, Event );

                this.type       = ( "" + type );
                this.bubbles    = Boolean( bubbles || false );
                this.cancelable = Boolean( cancelable || false );
                
                this.target = null;
                this.currentTarget = null;
                this.eventPhase = 0;

                /*< private >*/this._isPreventDefault     = false;
                /*< private >*/this._isStoppedPropagation = false;
                /*< private >*/this._isStoppedImmediate   = false;

            }, Fxlib.ClassObject ),


            Listener:
            Listener = Fxlib.linkPrototype( function Listener( handler, context, useCapture, priority ) {
                /// <summary>创建一个事件侦听器对象，事件侦听器在对象调度事件时，负责调用事件处理函数处理事件信息。</summary>
                /// <param name='handler' type='Function'>必须，该事件侦听器的事件处理函数。</param>
                /// <param name='context' type='Object' optional='true'>可选，默认值：undefined，事件处理函数的执行上下文。</param>
                /// <param name='useCapture' type='Boolean' optional='true'>可选，默认值：false。指示该侦听器是否事件捕获阶段处理事件。</param>
                /// <param name='priority' type='Number' optional='true'>可选，默认值：false。设置事件侦听器的优先级。</param>

                Fxlib.checkThisPointer( this, Listener );

                if ( !(typeof handler === "function") ) {
                    throw Error( "传递给 Listener 构造函数的 handler 参数不是一个 Function 对象。" );
                };

                this.handler = handler;
                this.context = context;
                this.useCapture = Boolean( useCapture || false );
                this.priority   = Fxlib.isInvaildNumber( priority ) ? 0 : priority;

            }, Fxlib.ClassObject ),


            Dispatcher:
            Dispatcher = Fxlib.linkPrototype( function Dispatcher( target ) {
                /// <summary>创建一个事件调度器对象， Dispatcher 类型是框架具备事件调度能力类型的基类。</summary>
                /// <param name='target' type='Object' optional='true'>可选，默认值：null。设置事件调度目标对象。</param>

                Fxlib.checkThisPointer( this, Dispatcher );

                /*< private >*/this.target = ( target || this );
                /*< private >*/this.tplist = {};

                if ( !(Fxlib.isReferenceObject( this.target )) ) {
                    throw Error( "传递给 Dispatcher 构造函数的 target 参数必须为引用类型。" );
                };

            }, Fxlib.ClassObject )

        });


        Event.prototype.initEvent = function initEvent( type, bubbles, cancelable ){
            /// <summary>初始化事件属性，该方法不是必须的，可以在 Event 构造函数中传入事件的初始属性。</summary>
            /// <param name='type' type='String'>必须，事件对象的类型。</param>
            /// <param name='bubbles' type='Boolean' optional='true'>可选，默认值：false。指示事件是否是一个冒泡事件。</param>
            /// <param name='cancelable' type='Boolean' optional='true'>可选，默认值：false。指示事件是否可阻止对象执行默认行为。</param>

            Fxlib.checkThisPointer( this, Event );
            
            this.type       = ( "" + type );
            this.bubbles    = Boolean( bubbles || false );
            this.cancelable = Boolean( cancelable || false );
        };


        Event.prototype.stopPropagation = function stopPropagation () {
            /// <summary>停止事件传递，使得事件流中的下一个节点不再处理该事件对象。</summary>

            Fxlib.checkThisPointer( this, Event );

            this._isStoppedPropagation = true;
        };


        Event.prototype.stopImmediatePropagation = function stopImmediatePropagation () {
            /// <summary>立刻停止事件传递，使得事件流中的下一个节点以及当前节点的后续侦听器都不再处理该事件。</summary>

            Fxlib.checkThisPointer( this, Event );

            this._isStoppedPropagation = true;
            this._isStoppedImmediate = true;
        };


        Event.prototype.preventDefault = function preventDefault () {
            /// <summary>阻止事件调度对象处理默认行为。</summary>

            Fxlib.checkThisPointer( this, Event );

            this._isPreventDefault = !!this.cancelable;
        };


        Event.prototype.defaultPrevented = function defaultPrevented () {
            /// <summary>查看当前事件对象是否取消了默认行为。</summary>
            /// <returns type='Boolean'>返回一个 Boolean 值。</returns>

            Fxlib.checkThisPointer( this, Event );

            return this._isPreventDefault;
        };


        Event.prototype.toString = function toString () {
            /// <summary>获取对象的字符串格式。</summary>
            /// <returns type='Stirng'>返回一个 String 值。</returns>

            return ( "[object Event]" );
        };


        /*< internal >*/Event.prototype.isPropagation = function isPropagation() {
            return !this._isStoppedPropagation;
        };


        /*< internal >*/Event.prototype.isImmediate = function isImmediate() {
            return !this._isStoppedImmediate;
        };


        /*< private >*/Listener.prototype.handleEvent = function handleEvent( evt ) {
            /// <summary>处理一个事件对象，并使用该事件对象调用事件处理函数。</summary>
            /// <param name='evt' type='Event'>必须，要处理的事件对象。</param>

            try {
                ( (evt.eventPhase === 2) &&                                (this.handler.call( this.context, evt )) ) ||
                ( (evt.eventPhase === 1) && (this.useCapture === true ) && (this.handler.call( this.context, evt )) ) ||
                ( (evt.eventPhase === 3) && (this.useCapture === false) && (this.handler.call( this.context, evt )) );
            } catch( exception ) {};
        };


        /*< internal >*/Listener.prototype.initListener = function initListener( context, useCapture, priority ) {
            this.context = context;
            this.useCapture = Boolean( useCapture || false );
            this.priority   = Fxlib.isInvaildNumber( priority ) ? 0 : priority;
        };


        Dispatcher.prototype.addEventListener = function addEventListener( type, listener, useCapture, context, priority ) {
            /// <summary>为事件调度器注册一个指定类型的事件侦听器。</summary>
            /// <param name='type' type='String'>必须，事件侦听器侦听的事件类型。</param>
            /// <param name='listener' type='Listener'>必须，事件侦听器对象或者函数对象。</param>
            /// <param name='useCapture' type='Boolean' optional='true'>可选，默认值：false。指示是否是为捕获阶段的事件注册的侦听器。</param>
            /// <param name='context' type='Object' optional='true'>可选，默认使用当前调度器，设置侦听器事件处理函数的执行上下文。</param>
            /// <param name='priority' type='Number' optional='true'>可选，默认值：0。设置事件侦听器的优先级。</param>

            Fxlib.checkThisPointer( this, Dispatcher );

            if ( (typeof listener === "function") ) {
                listener = new Listener( listener );
            };

            if ( !(listener instanceof Listener) ) {
                throw Error( "传递给 addEventListener() 方法的 listener 参数不是一个 Listener 对象。" );
            };

            listener.initListener( (context || this), useCapture, priority );

            var type = "" + type;

            if ( !(this.tplist.hasOwnProperty( type )) || (this.tplist[ type ].length <= 0) ) {
                /// 当没有该类型的事件侦听器时，直接构造数组，并返回。
                this.tplist[ type ] = [ listener ];
                return;
            };

            var listenerCollection = this.tplist[ type ];
            
            /// 删除重复的事件侦听器。
            for ( var i = 0; i < listenerCollection.length; ++i ) {
                if ( (listenerCollection[ i ].handler === listener.handler) && (listenerCollection[ i ].useCapture === listener.useCapture) ) {
                    listenerCollection.splice( i, 1 );
                    break;
                };
            };

            /// 按侦听器的优先级排序。
            for ( var i = 0; i < listenerCollection.length; ++i ) {
                if ( (listenerCollection[ i ].priority < listener.priority) ) {
                    listenerCollection.splice( i, 0, listener );
                    return;
                };
            };

            ( listenerCollection[ listenerCollection.length ] = listener );
        };


        Dispatcher.prototype.removeEventListener = function removeEventListener( type, listener, useCapture ) {
            /// <summary>删除事件调度器事件侦听器列表中指定类型的事件侦听器。</summary>
            /// <param name='type' type='String'>必须，要删除侦听器的侦听的事件类型。</param>
            /// <param name='listener' type='Listener'>必须，要删除的事件侦听器对象或者一个函数对象。</param>
            /// <param name='useCapture' type='Boolean' optional='true'>可选，默认值：false。指示是否是删除捕获阶段的侦听器(true)。</param>
            
            Fxlib.checkThisPointer( this, Dispatcher );

            var type = "" + type;

            if ( !(this.tplist.hasOwnProperty( type )) || (this.tplist[ type ].length <= 0) ) {
                return;
            };

            var listenerCollection = this.tplist[ type ];
            var handler = null;
            var capture = Boolean( useCapture || false );

            if ( (listener instanceof Listener) ) {
                handler = listener.handler;
            };

            if ( !(typeof handler === "function") ) {
                throw Error( "传递给 removeEventListener() 方法的 listener 参数不是一个 Listener 对象。" );
            };

            for ( var i = 0; i < listenerCollection.length; ++i ) {
                if ( (listenerCollection[ i ].handler === handler) && (listenerCollection[ i ].useCapture === capture) ) {
                    listenerCollection.splice( i, 1 );

                    if ( (listenerCollection.length <= 0) ) {
                        delete this.tplist[ type ];
                    };

                    break;
                };
            };
        };


        Dispatcher.prototype.dispatchEvent = function dispatchEvent( evt ) {
            /// <summary>使用事件调度器调度一个事件对象到事件流中。</summary>
            /// <param name='evt' type='String'>必须，要调度的事件对象或者一个指示事件类型的字符串。</param>
            /// <returns type='Boolean'>如果事件传递经过当前调度器，并且当前调度器执行了默认的行为，则返回 true。否则返回 false。</returns>

            Fxlib.checkThisPointer( this, Dispatcher );

            if ( (Fxlib.isString( evt )) ) {
                evt = new Event( evt, false, false );
            };

            if ( !(evt instanceof Event) ) {
                throw Error( "传递给 dispatchEvent() 方法的 evt 参数不是一个 Event 对象。" );
            };

            var streamPropagation = this.builtPropagation();
            var thisIndexPointer  = streamPropagation.length >> 1;
            
            /// 调度“捕获阶段”:
            ( evt.eventPhase    = 1 );
            ( evt.currentTarget = this.target );
            for ( var i = 0; (i < thisIndexPointer) && (evt.isPropagation()); ++i ) {
                streamPropagation[ i ].dispatchEventFunction( evt );
            };

            if ( !(evt.isPropagation()) ) {
                return false;
            };

            /// 调度“目标阶段”:
            ( evt.eventPhase    = 2 );
            ( evt.currentTarget = this.target );
            ( this.dispatchEventFunction(evt) );

            if ( !(evt.isPropagation()) ) {
                return ( !(evt.defaultPrevented()) );
            };

            /// 调度“冒泡阶段”:
            ( evt.eventPhase    = 3 );
            ( evt.currentTarget = this.target );
            for ( ++i; (i < streamPropagation.length) && (evt.isPropagation()); ++i ) {
                streamPropagation[ i ].dispatchEventFunction( evt );
            };

            return ( !(evt.defaultPrevented()) );
        };


        Dispatcher.prototype.hasEventListener = function hasEventListener( type ) {
            /// <summary>查看当前调度器的事件侦听器列表中是否为指定类型的事件，注册了事件侦听器。</summary>
            /// <returns type='Boolean'>如果存在处理该类型事件的事件侦听器，则返回 true。否则返回 false。</returns>

            Fxlib.checkThisPointer( this, Dispatcher );

            var type = "" + type;

            return ( (this.tplist.hasOwnProperty( type )) && (this.tplist[ type ].length > 0) );
        };


        Dispatcher.prototype.willTrigger = function willTrigger( type ) {
            /// <summary>查看当前调度器以及事件流中任何始主调度器的事件侦听器列表中是否为指定类型的事件，注册了事件侦听器。</summary>
            /// <returns type='Boolean'>如果存在处理该类型事件的事件侦听器，则返回 true。否则返回 false。</returns>

            Fxlib.checkThisPointer( this, Dispatcher );

            var streamPropagation = this.builtPropagation();
            var dispatcher;
            var type = "" + type;

            for ( var i = 0; i < streamPropagation.length; ++i ) {
                dispatcher = streamPropagation[ i ];

                if ( (dispatcher.tplist.hasOwnProperty( type )) && (dispatcher.tplist[ type ].length > 0) ) {
                    return true;
                };
            };

            return false;
        };


        /*< protected >*/Dispatcher.prototype.dispatchEventFunction = function dispatchEventFunction( evt ) {
            /// <summary>为指定事件对象，调用调度器列表中的事件侦听器。并为该事件调用默认行为处理函数。</summary>
            /// <param name='evt' type='Event'>必须，要调度的事件对象。</param>

            if ( !(this.tplist.hasOwnProperty( evt.type )) ) {
                return;
            };

            if ( (evt.eventPhase < 0) || (evt.eventPhase > 3) ) {
                /// 事件对象的 eventPhase 值无效。
                return;
            };

            var listenerCollection = this.tplist[ evt.type ];
            var target = evt.target = this.target;

            for ( var i = 0; (i < listenerCollection.length) && (evt.isImmediate()); ++i ) {
                listenerCollection[ i ].handleEvent( evt );
            };

            ( !(evt.defaultPrevented()) && (this.handleDefaultBehavior( evt )) );
        };


        /*< protected >*/Dispatcher.prototype.handleDefaultBehavior = function handleDefaultBehavior( evt ) {
            /// <summary>为指定事件对象，处理该事件相关的一个或者多个默认动作。</summary>
            /// <param name='evt' type='Event'>必须，处理默认动作的事件对象。</param>
        };


        /*< protected >*/Dispatcher.prototype.builtPropagation = function builtPropagation () {
            /// <summary>创建事件传递路径。</summary>
            /// <returns type='Array' elementType='Dispatcher'>返回一个事件调度器列表。</returns>

            return ( [ this ] );
        };

  
/// ###########################################################################
/** @end: */})( window, window.document, window.location, window.navigator );
/// ###########################################################################
/// ]]>
