
const script = document.createElement("script");
script.setAttribute("type", "module");
script.setAttribute("src", chrome.runtime.getURL("global-hook.js"));
document.documentElement.appendChild(script)

const port = chrome.runtime.connect({ name: "connect:backend" });
port.onMessage.addListener(function (msg) {
    console.log("portHOtaddlistenerrrrrrrr", msg);
    if (msg.key === "backend:send") {
        console.debug('%cbackend -> content', 'color:#888;', msg)
        window.postMessage({
            key: "document:send",
            type: msg.type,
            payload: msg.payload,
        });
    }
});

window.addEventListener(
    "content:send",
    function (event) {
        console.debug('%cdevtools -> content', 'color:#888;', event)
        chrome.runtime.sendMessage({
            key: "devtools:send",
            payload: event.detail,
        }).catch(err => { });
    },
    false
);



chrome.runtime.onMessage.addListener(
    (
        msg,
        sender,
        sendResponse
    ) => {  
        console.log('[content.js]. Message received', msg);
        if (msg.type === 'window.location.reload') {
            window.location.reload();
        }
    }
);