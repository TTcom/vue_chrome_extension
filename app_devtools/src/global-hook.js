import { registerComponents } from "@front/slots";

let _instance = null;

window.dispatchEvent(new CustomEvent("content:send", {
    detail: "init:one"
}))

window.addEventListener(
    "message",
    function (event) {
        const data = event.data;
        if (data.key === 'document:send') {
            console.debug('%ccontent -> document', 'color:#888;', data)
            switch (data.payload) {
                case "search":
                    console.debug("[debug]_instance:", _instance)
                    break;
                case "slots":
                    registerComponents(_instance)
                    break;
            }
        }
    },
    false
);

function interceptor(event, ...args) {
    if (event === 'init' && args[0]) {
        console.debug("%cVue 实例挂载", "color: #888;")
        _instance = args[0]
        console.debug("[debug]_instance:", _instance)
    }
}
if (window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
    console.debug("%cdevtools 已存在的情况", "color: red;")
    const emit = window.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit
    window.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit = function (event, ...args) {
        interceptor(event, ...args)
        emit.call(this, event, ...args)
    }
} else {
    console.debug("%cdevtools 不存在，需要手动创建实例", "color: red;")
    window.__VUE_DEVTOOLS_GLOBAL_HOOK__ = {
        Vue: null,
        emit: function (event, ...args) {
            if (event === 'init' && args[0]) {
                window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = args[0]
            }
            interceptor(event, ...args)
        },
        once: function () { },
        on: function () { },
        store: function () { },
    }
}