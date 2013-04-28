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

    /// <var type='RegExp'>定义提取字符串中参数组的正则表达式。</var>
    var R_string_parameter = /\$\(([^)]+)\)/g;

    /// <var type='String'>定义匹配浏览器版本信息的正则表达式的模式字符串。</var>
    var R_browser_version = "(vendor)(?:\\s|/)+(\\w+(?:\\.\\w+)*)";

    /// <var type='String'>定义 ISO 时间格式的字符串模式。</var>
    var R_date_iso_string = "$(a)-$(b)-$(c)T$(d):$(e):$(f).$(g)Z";

    /// <var type='String'>定义删除字符串，前缀空白，以及后缀空白的正则表达式。</var>
    var R_string_trim = /^[\s\xA0\uFEFF]+|[\s\xA0\uFEFF]+$/g;
        

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

        /*< inline >*/Fxlib.forkInspectPointer = function forkInspectPointer( pointer, constructor ) {
            if ( !(pointer instanceof constructor) ) {
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

            if ( (Fxlib.isImpWithJsEngine( handler.bind )) ) {
                return handler.bind.apply( handler, Slice.call(arguments, 1) );
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


    /// [ "Core" ]:
    /// ###########################################################################
        var ClassObject;
        
        Fxlib.namespace( "core", {
            ClassObject:
            ClassObject = Fxlib.linkPrototype( function ClassObject () {
                /// <summary>定义框架中类型的顶级继承类型。</summary>

                Fxlib.forkInspectPointer( this, ClassObject );

            }, Object )
        });


        ClassObject.prototype.toString = function toString () {
            /// <summary>获取对象的字符串形式。</summary>
            /// <returns type='String'>返回一个 String 值。</returns>

            try {

                var o = Fxlib.foundPrototype( this ).constructor;
                var n = Fxlib.foundClassName( o ) || "Anons";
                return ( "[object " + n + "]" );

            } catch( exception ){};

            return ToString.call( this );
        };


    /// [ "Events" ]:
    /// ###########################################################################
        var Event;
        var Listener;
        var Dispatcher;
        /*< template >*/var MouseEvent;
        /*< template >*/var FocusEvent;
        /*< template >*/var KeyboardEvent;
        /*< template >*/var TouchEvent;

        var HTMLEvent;
        var HTMLDispatcher;


        Fxlib.namespace( "events", {
            Event: 
            Event = Fxlib.linkPrototype( function Event( type, bubbles, cancelable ) {
                /// <summary>创建一个框架事件对象，事件对象为调度器调度事件提供事件信息。</summary>
                /// <param name='type' type='String'>必须，事件对象的类型。</param>
                /// <param name='bubbles' type='Boolean' optional='true'>可选，默认值：false。指示事件是否是一个冒泡事件。</param>
                /// <param name='cancelable' type='Boolean' optional='true'>可选，默认值：false。指示事件是否可阻止对象执行默认行为。</param>

                Fxlib.forkInspectPointer( this, Event );

                this.type       = ( "" + type );
                this.bubbles    = Boolean( bubbles || false );
                this.cancelable = Boolean( cancelable || false );
                
                this.target = null;
                this.currentTarget = null;
                this.eventPhase = 0;

                /*< private >*/this._isPreventDefault     = false;
                /*< private >*/this._isStoppedPropagation = false;
                /*< private >*/this._isStoppedImmediate   = false;

            }, ClassObject ),


            Listener:
            Listener = Fxlib.linkPrototype( function Listener( handler, context, useCapture, priority ) {
                /// <summary>创建一个事件侦听器对象，事件侦听器在对象调度事件时，负责调用事件处理函数处理事件信息。</summary>
                /// <param name='handler' type='Function'>必须，该事件侦听器的事件处理函数。</param>
                /// <param name='context' type='Object' optional='true'>可选，默认值：undefined，事件处理函数的执行上下文。</param>
                /// <param name='useCapture' type='Boolean' optional='true'>可选，默认值：false。指示该侦听器是否事件捕获阶段处理事件。</param>
                /// <param name='priority' type='Number' optional='true'>可选，默认值：false。设置事件侦听器的优先级。</param>

                Fxlib.forkInspectPointer( this, Listener );

                if ( !(typeof handler === "function") ) {
                    throw Error( "传递给 Listener 构造函数的 handler 参数不是一个 Function 对象。" );
                };

                this.handler    = handler;
                this.context    = context;
                this.useCapture = Boolean( useCapture || false );
                this.priority   = Fxlib.isInvaildNumber( priority ) ? 0 : priority;

            }, ClassObject ),


            Dispatcher:
            Dispatcher = Fxlib.linkPrototype( function Dispatcher( target ) {
                /// <summary>创建一个事件调度器对象， Dispatcher 类型是框架具备事件调度能力类型的基类。</summary>
                /// <param name='target' type='Object' optional='true'>可选，默认值：null。设置事件调度目标对象。</param>

                Fxlib.forkInspectPointer( this, Dispatcher );

                /*< private >*/this.target = ( target || this );
                /*< private >*/this.tplist = {};

                if ( !(Fxlib.isReferenceObject( this.target )) ) {
                    throw Error( "传递给 Dispatcher 构造函数的 target 参数必须为引用类型。" );
                };

            }, ClassObject ),


            MouseEvent:
            MouseEvent = Fxlib.linkPrototype( function MouseEvent( type, bubbles, cancelable ) {
                /// <summary>创建一个鼠标事件对象。</summary>
                /// <param name='type' type='String'>必须，事件对象的类型。</param>
                /// <param name='bubbles' type='Boolean' optional='true'>可选，默认值：false。指示事件是否是一个冒泡事件。</param>
                /// <param name='cancelable' type='Boolean' optional='true'>可选，默认值：false。指示事件是否可阻止对象执行默认行为。</param>

                Fxlib.forkInspectPointer( this, MouseEvent );
                Event.call( this, type, bubbles, cancelable );

            }, Event ),


            FocusEvent:
            FocusEvent = Fxlib.linkPrototype( function FocusEvent( type, bubbles, cancelable ) {
                /// <summary>创建一个焦点事件对象。</summary>
                /// <param name='type' type='String'>必须，事件对象的类型。</param>
                /// <param name='bubbles' type='Boolean' optional='true'>可选，默认值：false。指示事件是否是一个冒泡事件。</param>
                /// <param name='cancelable' type='Boolean' optional='true'>可选，默认值：false。指示事件是否可阻止对象执行默认行为。</param>

                Fxlib.forkInspectPointer( this, FocusEvent );
                Event.call( this, type, bubbles, cancelable );

            }, Event ),


            KeyboardEvent:
            KeyboardEvent = Fxlib.linkPrototype( function KeyboardEvent( type, bubbles, cancelable ) {
                /// <summary>创建一个键盘事件对象。</summary>
                /// <param name='type' type='String'>必须，事件对象的类型。</param>
                /// <param name='bubbles' type='Boolean' optional='true'>可选，默认值：false。指示事件是否是一个冒泡事件。</param>
                /// <param name='cancelable' type='Boolean' optional='true'>可选，默认值：false。指示事件是否可阻止对象执行默认行为。</param>

                Fxlib.forkInspectPointer( this, KeyboardEvent );
                Event.call( this, type, bubbles, cancelable );

            }, Event ),


            TouchEvent:
            TouchEvent = Fxlib.linkPrototype( function TouchEvent( type, bubbles, cancelable ) {
                /// <summary>创建一个触屏事件对象。</summary>
                /// <param name='type' type='String'>必须，事件对象的类型。</param>
                /// <param name='bubbles' type='Boolean' optional='true'>可选，默认值：false。指示事件是否是一个冒泡事件。</param>
                /// <param name='cancelable' type='Boolean' optional='true'>可选，默认值：false。指示事件是否可阻止对象执行默认行为。</param>

                Fxlib.forkInspectPointer( this, TouchEvent );
                Event.call( this, type, bubbles, cancelable );

            }, Event ),


            HTMLDispatcher:
            HTMLDispatcher = Fxlib.linkPrototype( function HTMLDispatcher( target ) {
                /// <summary>创建一个 HTML 事件调度器。</summary>
                /// <param name='target' type='HTMLElement'>必须， 绑定的 DOM 元素。</param>

                if ( (Fxlib.isInvaildObject( target )) ) {
                    throw Error( "传递给 HTMLDispatcher 构造函数的 target 参数不能为空。" );
                };

                Fxlib.forkInspectPointer( this, HTMLDispatcher );
                Dispatcher.call( this, target );
                
                /*< private >*/this.tpbind = {};
                /*< private >*/this.handleHtmlEvent = Fxlib.builtProxy( this.handleHtmlEvent, this );

            }, Dispatcher ),


            HTMLEvent:
            HTMLEvent = Fxlib.linkPrototype( function HTMLEvent( domEvent ) {
                /// <summary>创建一个 HTML 事件代理对象。</summary>
                /// <param name='domEvent' type='Event'>必须， 代理的 HTML 事件对象。</param>

                if ( !(Fxlib.isReferenceObject( domEvent )) ) {
                    throw Error( "传递给 HTMLEvent 构造函数的 domEvent 参数必须为引用类型。" );
                };

                Fxlib.forkInspectPointer( this, HTMLEvent );
                Event.call( this, domEvent.type, domEvent.bubbles, domEvent.cancelable );

                this.domEvent = domEvent;
                /*< default >*/this.eventPhase = 2;
                /*< default >*/this.bubbles    = false;
                /*< default >*/this.cancelable = true;

                if ( (Fxlib.isNumber( this.domEvent.eventPhase )) ) {
                    this.eventPhase = this.domEvent.eventPhase;
                };

                if ( (Fxlib.isBoolean( this.domEvent.bubbles )) ) {
                    this.bubbles = this.domEvent.bubbles;
                };

                if ( (Fxlib.isBoolean( this.domEvent.cancelable )) ) {
                    this.cancelable = this.domEvent.cancelable;
                };

            }, Event )

        });


        Event.prototype.initEvent = function initEvent( type, bubbles, cancelable ){
            /// <summary>初始化事件属性，该方法不是必须的，可以在 Event 构造函数中传入事件的初始属性。</summary>
            /// <param name='type' type='String'>必须，事件对象的类型。</param>
            /// <param name='bubbles' type='Boolean' optional='true'>可选，默认值：false。指示事件是否是一个冒泡事件。</param>
            /// <param name='cancelable' type='Boolean' optional='true'>可选，默认值：false。指示事件是否可阻止对象执行默认行为。</param>

            Fxlib.forkInspectPointer( this, Event );
            
            this.type       = ( "" + type );
            this.bubbles    = Boolean( bubbles || false );
            this.cancelable = Boolean( cancelable || false );
        };


        Event.prototype.stopPropagation = function stopPropagation () {
            /// <summary>停止事件传递，使得事件流中的下一个节点不再处理该事件对象。</summary>

            Fxlib.forkInspectPointer( this, Event );

            this._isStoppedPropagation = true;
        };


        Event.prototype.stopImmediatePropagation = function stopImmediatePropagation () {
            /// <summary>立刻停止事件传递，使得事件流中的下一个节点以及当前节点的后续侦听器都不再处理该事件。</summary>

            Fxlib.forkInspectPointer( this, Event );

            this._isStoppedPropagation = true;
            this._isStoppedImmediate = true;
        };


        Event.prototype.preventDefault = function preventDefault () {
            /// <summary>阻止事件调度对象处理默认行为。</summary>

            Fxlib.forkInspectPointer( this, Event );

            this._isPreventDefault = !!this.cancelable;
        };


        Event.prototype.defaultPrevented = function defaultPrevented () {
            /// <summary>查看当前事件对象是否取消了默认行为。</summary>
            /// <returns type='Boolean'>返回一个 Boolean 值。</returns>

            Fxlib.forkInspectPointer( this, Event );

            return this._isPreventDefault;
        };


        Event.prototype.toString = function toString () {
            /// <summary>获取事件对象的字符串信息。</summary>
            /// <returns type='String'>返回一个 String 值。</returns>

            try {
                
                var o = Fxlib.foundPrototype( this ).constructor;
                var n = Fxlib.foundClassName( o ) || "Event";

                return ( "[" + n + " type=\"" + this.type + 
                    "\", bubbles=\""    + this.bubbles + 
                    "\", cancelable=\"" + this.cancelable + 
                    "\", eventPhase=\"" + this.eventPhase + "\"]" );

            } catch( exception ) {};

            return ToString.call( this );
        };


        /*< internal >*/Event.prototype.isPropagation = function isPropagation() {
            return !this._isStoppedPropagation;
        };


        /*< internal >*/Event.prototype.isImmediate = function isImmediate() {
            return !this._isStoppedImmediate;
        };


        HTMLEvent.prototype.stopPropagation = function stopPropagation () {
            /// <summary>停止事件传递，使得事件流中的下一个节点不再处理该事件对象。</summary>

            Fxlib.forkInspectPointer( this, HTMLEvent );
            Event.prototype.stopPropagation.call( this );

            if ( (Fxlib.isImpWithJsEngine( this.domEvent.stopPropagation )) ) {
                this.domEvent.stopPropagation();
            };

            if ( (Fxlib.isBoolean( this.domEvent.cancelBubble )) ) {
                this.domEvent.cancelBubble = true;
            };
        };


        HTMLEvent.prototype.stopImmediatePropagation = function stopImmediatePropagation () {
            /// <summary>立刻停止事件传递，使得事件流中的下一个节点以及当前节点的后续侦听器都不再处理该事件。</summary>

            Fxlib.forkInspectPointer( this, HTMLEvent );
            Event.prototype.stopImmediatePropagation.call( this );

            if ( (Fxlib.isImpWithJsEngine( this.domEvent.stopImmediatePropagation )) ) {
                this.domEvent.stopImmediatePropagation();
            };

            if ( (Fxlib.isBoolean( this.domEvent.cancelBubble )) ) {
                this.domEvent.cancelBubble = true;
            };
        };


        HTMLEvent.prototype.preventDefault = function preventDefault () {
            /// <summary>阻止事件调度对象处理默认行为。</summary>

            Fxlib.forkInspectPointer( this, HTMLEvent );
            Event.prototype.preventDefault.call( this );

            if ( (Fxlib.isImpWithJsEngine( this.domEvent.preventDefault )) ) {
                this.domEvent.preventDefault();
            };
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
            this.context    = context;
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

            Fxlib.forkInspectPointer( this, Dispatcher );

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
            
            Fxlib.forkInspectPointer( this, Dispatcher );

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

            Fxlib.forkInspectPointer( this, Dispatcher );

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

            if ( !(evt.isPropagation()) || !(evt.bubbles) ) {
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

            Fxlib.forkInspectPointer( this, Dispatcher );

            var type = "" + type;

            return ( (this.tplist.hasOwnProperty( type )) && (this.tplist[ type ].length > 0) );
        };


        Dispatcher.prototype.willTrigger = function willTrigger( type ) {
            /// <summary>查看当前调度器以及事件流中任何始主调度器的事件侦听器列表中是否为指定类型的事件，注册了事件侦听器。</summary>
            /// <returns type='Boolean'>如果存在处理该类型事件的事件侦听器，则返回 true。否则返回 false。</returns>

            Fxlib.forkInspectPointer( this, Dispatcher );

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


        HTMLDispatcher.prototype.addEventListener = function( type, listener, useCapture, context, priority ) {
            /// <summary>为事件调度器注册一个指定类型的事件侦听器。</summary>
            /// <param name='type' type='String'>必须，事件侦听器侦听的事件类型。</param>
            /// <param name='listener' type='Listener'>必须，事件侦听器对象或者函数对象。</param>
            /// <param name='useCapture' type='Boolean' optional='true'>可选，默认值：false。指示是否是为捕获阶段的事件注册的侦听器。</param>
            /// <param name='context' type='Object' optional='true'>可选，默认使用当前调度器，设置侦听器事件处理函数的执行上下文。</param>
            /// <param name='priority' type='Number' optional='true'>可选，默认值：0。设置事件侦听器的优先级。</param>

            Fxlib.forkInspectPointer( this, HTMLDispatcher );
            Dispatcher.prototype.addEventListener.call( this, type, listener, useCapture, context, priority );

            if ( (Fxlib.isImpWithJsEngine( this.target.addEventListener )) ) {
                this.target.addEventListener( "" + type, this.handleHtmlEvent, Boolean( useCapture || false ) );
                return;
            };

            if ( (Boolean( useCapture || false ) === true) ) {
                try {
                    console.warn( "HTMLDispatcher: 客户端不支持使用 useCapture 参数，该事件侦听器将被忽略。" );
                } catch( exception ) {};

                return;
            };

            if ( (Fxlib.isImpWithJsEngine( this.target.attachEvent )) ) {
                /// detachEvent 方法不会删除重复的事件侦听器。
                this.target.detachEvent( "on" + type, this.handleHtmlEvent );
                this.target.attachEvent( "on" + type, this.handleHtmlEvent );
                return;
            };

            var type = "on" + type;

            if ( !(this.handleHtmlEvent === this.target[ type ]) ) {
                this.tpbind[ type ] = this.target[ type ];
                this.target[ type ] = this.handleHtmlEvent;
            };
        };


        HTMLDispatcher.prototype.removeEventListener = function( type, listener, useCapture ) {
            /// <summary>删除事件调度器事件侦听器列表中指定类型的事件侦听器。</summary>
            /// <param name='type' type='String'>必须，要删除侦听器的侦听的事件类型。</param>
            /// <param name='listener' type='Listener'>必须，要删除的事件侦听器对象或者一个函数对象。</param>
            /// <param name='useCapture' type='Boolean' optional='true'>可选，默认值：false。指示是否是删除捕获阶段的侦听器(true)。</param>

            Fxlib.forkInspectPointer( this, HTMLDispatcher );
            Dispatcher.prototype.removeEventListener.call( this, type, listener, useCapture );

            if ( (this.hasEventListener( "" + type )) ) {
                /// 存在任何可能的事件侦听器。
                return;
            };

            if ( (Fxlib.isImpWithJsEngine( this.target.removeEventListener )) ) {
                this.target.removeEventListener( "" + type, this.handleHtmlEvent, true );
                this.target.removeEventListener( "" + type, this.handleHtmlEvent, false );
                return;
            };

            if ( (Fxlib.isImpWithJsEngine( this.target.detachEvent )) ) {
                this.target.detachEvent( "on" + type );
                return;
            };

            var type = "on" + type;

            if ( (this.handleHtmlEvent === this.target[ type ]) ) {
                try {
                    this.target[ type ] = ( this.tpbind[ type ] || null );
                } catch( exception ) {};

                delete this.tpbind[ type ];
            };
        };


        /*< protected >*/HTMLDispatcher.prototype.handleHtmlEvent = function( evt ) {
            /// <summary>HTML 事件侦听器函数， 负责接收 HTML 对象事件调度并将事件广播给注册的侦听器。</summary>
            /// <param name='evt' type='Event'>必须，要广播的 HTML 事件对象。</param>
            /// <returns type='Boolean'>如果事件取消默认行为，则返回 false，否则返回 true。</returns>

            var fromEvent = ( evt || window.event );
            var htmlEvent = new HTMLEvent( fromEvent );

            /// 处理绑定事件：
            if ( (typeof this.tpbind[ htmlEvent.type ] === "function") ) {
                try {
                /// 防止函数抛出错误，而中断事件流。
                    this.tpbind[ htmlEvent.type ].call( this.target, evt );
                } catch( exception ) {};
            };

            this.dispatchEventFunction( htmlEvent );
            return ( fromEvent.returnValue = !htmlEvent.defaultPrevented() );
        };


        /*< static >*/Event.NONE            = 0;
        /*< static >*/Event.CAPTURING_PHASE = 1;
        /*< static >*/Event.AT_TARGET       = 2;
        /*< static >*/Event.BUBBLING_PHASE  = 3;

        /*< static >*/FocusEvent.BLUR          = "blur";
        /*< static >*/FocusEvent.DOM_FOCUS_IN  = "DOMFocusIn";
        /*< static >*/FocusEvent.DOM_FOCUS_OUT = "DOMFocusOut";
        /*< static >*/FocusEvent.FOCUS         = "focus";
        /*< static >*/FocusEvent.FOCUS_IN      = "focusin";
        /*< static >*/FocusEvent.FOCUS_OUT     = "focusout";

        /*< static >*/MouseEvent.CLICK         = "click";
        /*< static >*/MouseEvent.DBL_CLICK     = "dblclick";
        /*< static >*/MouseEvent.MOUSE_DOWN    = "mousedown";
        /*< static >*/MouseEvent.MOUSE_ENTER   = "mouseenter";
        /*< static >*/MouseEvent.MOUSE_LEAVE   = "mouseleave";
        /*< static >*/MouseEvent.MOUSE_MOVE    = "mousemove";
        /*< static >*/MouseEvent.MOUSE_OUT     = "mouseout";
        /*< static >*/MouseEvent.MOUSE_OVER    = "mouseover";
        /*< static >*/MouseEvent.MOUSE_UP      = "mouseup";
        /*< static >*/MouseEvent.MOUSE_WHEEL   = "mousewheel";

        /*< static >*/KeyboardEvent.KEY_DOWN   = "keydown";
        /*< static >*/KeyboardEvent.KEY_PRESS  = "keypress";
        /*< static >*/KeyboardEvent.KEY_UP     = "keyup";

        /*< static >*/TouchEvent.TOUCH_START   = "touchstart";
        /*< static >*/TouchEvent.TOUCH_END     = "touchend";
        /*< static >*/TouchEvent.TOUCH_MOVE    = "touchmove";
        /*< static >*/TouchEvent.TOUCH_ENTER   = "touchenter";
        /*< static >*/TouchEvent.TOUCH_LEAVE   = "touchlevae";
        /*< static >*/TouchEvent.TOUCH_CANCEL  = "touchcancel";
        /*< static >*/TouchEvent.MS_POINTER_CANCEL  = "mspointercancel";
        /*< static >*/TouchEvent.MS_POINTER_DOWN    = "mspointerdown";
        /*< static >*/TouchEvent.MS_POINTER_HOVER   = "mspointerhover";
        /*< static >*/TouchEvent.MS_POINTER_MOVE    = "mspointermove";
        /*< static >*/TouchEvent.MS_POINTER_OUT     = "mspointerout";
        /*< static >*/TouchEvent.MS_POINTER_OVER    = "mspointerover";
        /*< static >*/TouchEvent.MS_POINTER_UP      = "mspointerup";
        /*< static >*/TouchEvent.INTERFACE          = {};

        /*< static >*/Event.ABORT              = "abort";
        /*< static >*/Event.ACTIVATE           = "activate";
        /*< static >*/Event.AFTER_PRINT        = "afterprint";
        /*< static >*/Event.AFTER_UPDATE       = "afterupdate";
        /*< static >*/Event.BEFORE_ACTIVATE    = "beforeactivate";
        /*< static >*/Event.BEFORE_COPY        = "beforecopy";
        /*< static >*/Event.BEFORE_CUT         = "beforecut";
        /*< static >*/Event.BEFORE_DEACTIVATE  = "beforedeactivate";
        /*< static >*/Event.BEFORE_EDIT_FOCUS  = "beforeeditfocus";
        /*< static >*/Event.BEFORE_PASTE       = "beforepaste";
        /*< static >*/Event.BEFORE_PRINT       = "beforeprint";
        /*< static >*/Event.BEFORE_UNLOAD      = "beforeunload";
        /*< static >*/Event.BOUNCE             = "bounce";
        /*< static >*/Event.CELL_CHANGE        = "cellchange";
        /*< static >*/Event.CHANGE             = "change";
        /*< static >*/Event.COMPLETE           = "complete";
        /*< static >*/Event.CONTEXT_MENU       = "contextmenu";
        /*< static >*/Event.CONTROL_SELECT     = "controlselect";
        /*< static >*/Event.COPY               = "copy";
        /*< static >*/Event.CUT                = "cut";
        /*< static >*/Event.DATA_AVAILABLE     = "dataavailable";
        /*< static >*/Event.DATA_SET_CHANGED   = "datasetchanged";
        /*< static >*/Event.DATA_SET_COMPLETE  = "datasetcomplete";
        /*< static >*/Event.DEACTIVATE         = "deactivate";
        /*< static >*/Event.DRAG               = "drag";
        /*< static >*/Event.DRAG_END           = "dragend";
        /*< static >*/Event.DRAG_ENTER         = "dragenter";
        /*< static >*/Event.DRAG_LEAVE         = "dragleave";
        /*< static >*/Event.DRAG_OVER          = "dragover";
        /*< static >*/Event.DRAG_START         = "dragstart";
        /*< static >*/Event.DROP               = "drop";
        /*< static >*/Event.ERROR              = "error";
        /*< static >*/Event.ERROR_UPDATE       = "errorupdate";
        /*< static >*/Event.FILTER_CHANGE      = "filterchange";
        /*< static >*/Event.FINISH             = "finish";
        /*< static >*/Event.HASH_CHANGE        = "hashchange";
        /*< static >*/Event.HELP               = "help";
        /*< static >*/Event.INPUT              = "input";
        /*< static >*/Event.INTER_ACTIVE       = "interactive";
        /*< static >*/Event.LAYOUT_COMPLETE    = "layoutcomplete";
        /*< static >*/Event.LOAD               = "load";
        /*< static >*/Event.LOSE_CAPTURE       = "losecapture";
        /*< static >*/Event.MESSAGE            = "message";
        /*< static >*/Event.MOVE               = "move";
        /*< static >*/Event.MOVE_END           = "moveend";
        /*< static >*/Event.MOVE_START         = "movestart";
        /*< static >*/Event.OFF_LINE           = "offline";
        /*< static >*/Event.ON_LINE            = "online";
        /*< static >*/Event.PAGE               = "page";
        /*< static >*/Event.PASTE              = "paste";
        /*< static >*/Event.POP_STATE          = "popstate";
        /*< static >*/Event.PROPERTY_CHANGE    = "propertychange";
        /*< static >*/Event.READY_STATE_CHANGE = "readystatechange";
        /*< static >*/Event.RESET              = "reset";
        /*< static >*/Event.RESIZE             = "resize";
        /*< static >*/Event.RESIZE_END         = "resizeend";
        /*< static >*/Event.RESIZE_START       = "resizestart";
        /*< static >*/Event.ROW_ENTER          = "rowenter";
        /*< static >*/Event.ROW_EXIT           = "rowexit";
        /*< static >*/Event.ROWS_DELETE        = "rowsdelete";
        /*< static >*/Event.ROWS_INSERTED      = "rowsinserted";
        /*< static >*/Event.SCROLL             = "scroll";
        /*< static >*/Event.SELECT             = "select";
        /*< static >*/Event.SELECTION_CHANGE   = "selectionchange";
        /*< static >*/Event.SELECT_START       = "selectstart";
        /*< static >*/Event.START              = "start";
        /*< static >*/Event.STOP               = "stop";
        /*< static >*/Event.STORAGE            = "storage";
        /*< static >*/Event.STORAGE_COMMIT     = "storagecommit";
        /*< static >*/Event.SUBMIT             = "submit";
        /*< static >*/Event.UNLOAD             = "unload";
        /*< static >*/Event.INTERFACE = {
            /// <summary>定义 DOM 准备完成事件常量。</summary>
            LOADED: ( (Fxlib.isImpWithJsEngine( window.addEventListener )) ? "DOMContentLoaded" : "readystatechange" )
        };


    /// [ "Utils" ]:
    /// ###########################################################################
        var ByteArray;
        var Color;
        var URI;

        Fxlib.namespace( "utils", {
            /*< reference >*/foundClassName: Fxlib.foundClassName,
            /*< reference >*/foundPrototype: Fxlib.foundPrototype,
            /*< reference >*/builtPrototype: Fxlib.builtPrototype,
            /*< reference >*/builtProxy    : Fxlib.builtProxy,

            /// <field type='Array' elementType='String'>定义供应商 CSS 属性键前缀。</field>
            CVSPrefix: [ "-ms-", "-moz-", "-webkit-", "-o-" ],

            /// <field type='Array' elementType='String'>定义供应商 JS 属性前缀。</field>
            JVSPrefix: [  "ms" ,  "moz" ,  "webkit" ,  "o"  ],


            foundParameter: function foundParameter( string, parameter, handler ) {
                /// <summary>查找字符串中的参数组，并使用指定对象的属性值替换该参数组。</summary>
                /// <param name='string' type='String'>必须，要查找参数组的字符串。</param>
                /// <param name='parameter' type='Object'>必须，替换结果属性值对象。</param>
                /// <param name='handler' type='Function' optional='true'>可选，默认值：转换字符串函数。指定替换参数组时，过滤结果的函数。</param>

                if ( !(Fxlib.isString( string )) ) {
                    throw Error( "传递给 foundParameter() 方法的 string 参数不是一个 String 对象。" );
                };

                if ( !(Fxlib.isReferenceObject( parameter )) ) {
                    throw Error( "传递给 foundParameter() 方法的 parameter 参数必须为引用类型。" );
                };

                return string.replace( R_string_parameter, function( token, name ) {
                    return ( (name in parameter) ? (typeof handler === "function") ? handler(parameter[ name ], name) : ("" + parameter[ name ]) : token );
                });
            },


            foundBrowser: function foundBrowser( vendor ) {
                /// <summary>获取浏览器版本信息。</summary>
                /// <param name='vendor' type='String'>必须，浏览器的供应商名称。</param>
                /// <returns type='Array'>返回版本信息数组，如果没有匹配，则返回 null。</returns>

                if ( !(Fxlib.isString( vendor )) ) {
                    throw Error( "传递给 foundBrowser() 方法的 vendor 参数不是一个 String 对象。" );
                };

                return ( new RegExp(R_browser_version.replace("vendor", vendor), "i") ).exec( navigator.userAgent );
            },


            foundExtDefinition: function foundExtDefinition( target ) {
                /// <signature>
                /// <summary>获取 HTML 对象由供应商提供的扩展属性。</summary>
                /// <param name='target' type='Object'>必须，一个 HTML 对象。</param>
                /// <param name='...list' optional='true'>可选，默认值：无。提供一个可能的名称列表。</param>
                /// <returns type='Object'>如果在可能属性列表中的某个键存在于目标对象上，则返回该键的键值。否则返回 null。</returns>
                /// </signature>

                if ( !(Fxlib.isReferenceObject( target )) ) {
                    throw Error( "传递给 foundExtDefinition() 方法的 target 参数必须为引用类型。" );
                };

                for ( var i = 1, name = null; i < arguments.length; ++i ) {
                    name = ( "" + arguments[ i ] );

                    if ( (name in target) ) {
                        return target[ name ];
                    };

                    var suffix = ( name.charAt(0).toUpperCase() + name.slice(1) );
                    var prefix = Fxlib.utils.JVSPrefix;

                    for ( var j = 0, keyname = null; j < prefix.length; ++j ) {
                        keyname = ( prefix[ i ] + suffix );

                        if ( (keyname in target) ) {
                            return target[ keyname ];
                        };
                    };

                    var suffix = name;
                    var prefix = Fxlib.utils.CVSPrefix;

                    for ( var j = 0, keyname = null; j < prefix.length; ++j ) {
                        keyname = ( prefix[ i ] + suffix );

                        if ( (keyname in target) ) {
                            return target[ keyname ];
                        };
                    };
                };

                return null;
            },


            timeNow: Fxlib.isImpWithJsEngine( Date.now ) ? Date.now : function timeNow () {
                /// <value type='Number'>获取当前系统的时间戳。</value>

                return ( (new Date).getTime() );
            },


            foundISOTimeString: function foundISOTimeString( date ) {
                /// <summary>获取日期对象的 ISO 格式的字符串。</summary>
                /// <param name='date' type='Date' optional='true'>可选，默认值：当前时间。要获取 ISO 格式的字符串的日期对象。</param>
                /// <returns type='String'>返回一个 String 值。</returns>

                if ( (Fxlib.isInvaildObject( date )) ) {
                    date = ( new Date );
                };

                if ( !(Fxlib.isReferenceObject( date )) ) {
                    throw Error( "传递给 foundISOTimeString() 方法的 date 参数必须为引用类型。" );
                };

                /// "$(a)-$(b)-$(c)T$(d):$(e):$(f).$(g)Z"
                var format = {
                    a : ( "" + date.getFullYear() ),
                    b : ( (date.getMonth  () < 10) ? ("0" + date.getMonth  ()) : ("" + date.getMonth  ()) ),
                    c : ( (date.getDate   () < 10) ? ("0" + date.getDate   ()) : ("" + date.getDate   ()) ),
                    d : ( (date.getHours  () < 10) ? ("0" + date.getHours  ()) : ("" + date.getHours  ()) ),
                    e : ( (date.getMinutes() < 10) ? ("0" + date.getMinutes()) : ("" + date.getMinutes()) ),
                    f : ( (date.getSeconds() < 10) ? ("0" + date.getSeconds()) : ("" + date.getSeconds()) ),
                    g : ( (date.getMilliseconds() < 10) ? ("00" + date.getMilliseconds()) : (date.getMilliseconds() < 100) ? ("0" + date.getMilliseconds()) : ("" + date.getMilliseconds()) ),
                };
                
                return Fxlib.utils.foundParameter( R_date_iso_string, format );
            },


            removeWhitespace: function removeWhitespace( data ) {
                /// <summary>删除字符串中的前缀空白，以及后缀空白字符。</summary>
                /// <param name='data' type='String'>必须，一个 String 值。</param>
                /// <returns type='String'>返回删除空白后的新字符串。</returns>

                if ( !(Fxlib.isString( data )) ) {
                    throw Error( "传递给 removeWhitespace() 方法的 data 参数不是一个 String 对象。" );
                };

                if ( (Fxlib.isImpWithJsEngine( data.trim )) ) {
                    return data.trim();
                };

                return data.replace( R_string_trim, "" );
            },


            embedFlashObject: function embedFlashObject () {
                /// <summary>嵌入一个 Flash 对象。</summary>
            },


            ByteArray:
            ByteArray = Fxlib.linkPrototype( function ByteArray( length ) {
                /// <signature>
                /// <summary>创建固定长度的二进制数组。</summary>
                /// <param name='length' type='Number'>必须，字节数组的长度。</param>
                /// </signature>
                /// <signature>
                /// <summary>将数组转换成一个二进制数组。(可能引用原始数组)。</summary>
                /// <param name='array' type='Array' elementType='Number'>必须，保存字节数据的数组。</param>
                /// </signature>
                /// <signature>
                /// <summary>使用 ArrayBuffer 对象创建一个二进制数组。(引用原始数组)。</summary>
                /// <param name='buffer' type='ArrayBuffer'>必须，保存字节数据的 ArrayBuffer 对象。</param>
                /// </signature>

                Fxlib.forkInspectPointer( this, ByteArray );
                ClassObject.call( this );

                /*< default >*/this.byteLength   = 0;
                /*< default >*/this.bytePosition = 0;
                /*< default >*/this.byteProvider = null;
                /*< default >*/this.byteOperater = null;

                /// Array 对象：
                if ( (Fxlib.isArray( length )) ) {
                    this.byteLength   = ( length.length );
                    this.byteProvider = ( (typeof ArrayBuffer === "undefined") ? length : new ArrayBuffer(this.byteLength) );
                    this.byteOperater = ( (typeof ArrayBuffer === "undefined") ? null   : new DataView(this.byteProvider, 0, this.byteLength) );

                    if ( !(typeof ArrayBuffer === "undefined") ) {
                        for ( var i = 0; i < this.byteLength; ++i ) {
                            this.byteOperater.setUint8( length[ i ] );
                        };
                    };

                    this.bytePosition = 0;
                    return;
                };

                /// ArrayBuffer 对象：
                if ( !(typeof ArrayBuffer === "undefined") && (length instanceof ArrayBuffer) ) {
                    this.byteLength   = length.byteLength;
                    this.byteProvider = length;
                    this.byteOperater = new DataView( this.byteProvider, 0, this.byteLength );
                    return;
                };

                /// Number 对象：
                if ( !(Fxlib.isInvaildNumber( length )) ) {
                    this.byteLength   = ( length );
                    this.byteProvider = ( (typeof ArrayBuffer === "undefined") ? new Array(this.byteLength) : new ArrayBuffer(this.byteLength) );
                    this.byteOperater = ( (typeof ArrayBuffer === "undefined") ? null : new DataView(this.byteProvider, 0, this.byteLength) );
                    return;
                };

                throw Error( "传递给 ByteArray 构造函数的 length 参数无效。" );

            }, ClassObject ),


            Color:
            Color = Fxlib.linkPrototype( function Color( R, G, B, A ) {
                /// <summary>创建一个颜色对象。</summary>

                Fxlib.forkInspectPointer( this, Color );
                ClassObject.call( this );

            }, ClassObject ),


            URI:
            URI = Fxlib.linkPrototype( function URI( path ) {
                /// <summary>创建一个 URI 对象。</summary>

                Fxlib.forkInspectPointer( this, URI );
                ClassObject.call( this );

            }, ClassObject )

        });


        /// 不支持 ArrayBuffer 对象：
        if ( (typeof ArrayBuffer === "undefined") ) {

            ByteArray.prototype.getUint8 = function getUint8 () {
                /// <summary>从字节数组的当前位置读取一个 8 位无符号整数。</summary>
                /// <returns tyep='Number'>返回一个数值。</returns>

                Fxlib.forkInspectPointer( this, ByteArray );

                if ( !(this.byteAvailable()) ) {
                    throw Error( "可用字节不足。" );
                };

                return ( this.byteProvider[ this.bytePosition ] || 0 );
            };


            ByteArray.prototype.setUint8 = function setUint8( value ) {
                /// <summary>从字节数组的当前位置写入一个 8 位无符号整数。</summary>
                /// <param name='value' type='Number'>必须，写入的数值。</param>

                Fxlib.forkInspectPointer( this, ByteArray );

                if ( !(this.byteAvailable()) ) {
                    throw Error( "可用字节不足。" );
                };

                this.byteProvider[ this.bytePosition ] = value & 255;
            };

        }

        else {

            ByteArray.prototype.getUint8 = function getUint8 () {
                /// <summary>从字节数组的当前位置读取一个 8 位无符号整数。</summary>
                /// <returns tyep='Number'>返回一个数值。</returns>

                Fxlib.forkInspectPointer( this, ByteArray );

                return this.byteOperater.getUint8( this.bytePosition );
            };


            ByteArray.prototype.setUint8 = function setUint8( value ) {
                /// <summary>从字节数组的当前位置写入一个 8 位无符号整数。</summary>
                /// <param name='value' type='Number'>必须，写入的数值。</param>

                Fxlib.forkInspectPointer( this, ByteArray );

                this.byteOperater.setUint8( value, this.bytePosition );
            };

        };


        ByteArray.prototype.byteAvailable = function byteAvailable () {
            /// <value type='Number'>获取字节数组中可用的字节数。</value>

            return Math.max( 0, this.byteLength - this.bytePosition );
        };


    // [ "Service" ]:
    /// ###########################################################################
        Fxlib.namespace( "service", {
            Axtypes: [ "Msxml2.XMLHttp.5.0", "Msxml2.XMLHttp.4.0", "Msxml2.XMLHttp.3.0", "Msxml2.XMLHttp", "Microsoft.XMLHttp" ],


            createXmlHttpRequest: function createXmlHttpRequest () {
                /// <summary>创建 XMLHttpRequest 对象。</summary>
                /// <returns type='XMLHttpRequest'>返回 XMLHttpRequest 或 Msxml.XMLHttp 或 null。</returns>

                /// IE 本地环境使用 Msxml.XMLHttp 对象。
                if ( (location.protocol.indexOf("file") === 0) && (Fxlib.utils.foundBrowser("msie")) ) {
                    return Fxlib.service.createHttpActiveXObject();
                };

                return ( (typeof XMLHttpRequest === "undefined") ? Fxlib.service.createHttpActiveXObject() : new XMLHttpRequest() );
            },


            createHttpActiveXObject: function createHttpActiveXObject () {
                /// <summary>[仅 IE]: 创建 Msxml.XMLHttp 对象。</summary>
                /// <returns type='XMLHttpRequest'>返回 Msxml.XMLHttp 或 null。</returns> 

                if ( !(typeof ActiveXObject === "undefined") ) {
                    var Axtypes = Fxlib.service.Axtypes;

                    for ( var i = 0; i < Axtypes.length; ++i ) {
                        try {
                            return new ActiveXObject( Axtypes[ i ] );
                        } catch( exception ){};
                    };
                };

                return null;
            },


            timeNow: function timeNow( url, username, password ) {
                /// <summary>获取服务端时间戳。(同步方式)。</summary>
                /// <param name='url' type='String' optional='true'>可选，默认值：当前页面地址。服务端 URL 路径。</param>
                /// <param name='username' type='String' optional='true'>可选，默认值：无。验证用户名。</param>
                /// <param name='password' type='String' optional='true'>可选，默认值：无。验证密码。</param>
                /// <returns type='Number'>如果无法获取则返回 null。</returns>

                var http = Fxlib.service.createXmlHttpRequest();

                if ( (Fxlib.isInvaildObject( http )) ) {
                    return null;
                };

                try {
                    if ( (Fxlib.isString( username )) && (Fxlib.isString( password )) ) {
                        http.open( "HEAD", (url || location.href), false, ("" + username), ("" + password) );
                        http.send( null );
                    }

                    else {
                        http.open( "HEAD", (url || location.href), false );
                        http.send( null );
                    };

                    var dateHeader = http.getResponseHeader( "Date" );
                    
                    if ( (Fxlib.isInvaildObject( dateHeader )) ) {
                        return null;
                    };

                    var timeNow = Date.parse( dateHeader );

                    return ( (Fxlib.isInvaildNumber( timeNow )) ? null : timeNow );
                } catch( exception ){};

                return null;
            }

        });


    // [ "Motion" ]:
    /// ###########################################################################
        Fxlib.namespace( "motion", {

        });


  
/// ###########################################################################
/** @end: */})( window, window.document, window.location, window.navigator );
/// ###########################################################################
/// ]]>