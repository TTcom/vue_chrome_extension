
let current_port = undefined;

function onConnectByServiceWorker(
    onConnectFn,
    onDisconnectFn,
) {
    chrome.runtime.onConnect.addListener((port) => {
        onConnectFn(port)
        port.onDisconnect.addListener(() => onDisconnectFn())
    })
}

onConnectByServiceWorker((port) => {
    if (port.name === "connect:backend") {
        current_port = port
    }
}, () => {
    current_port = undefined
})

function noticeContent(data) {
    if (current_port) {
        try {
            current_port.postMessage({
                key: "backend:send", payload: data.payload, type: data.type
            })
        } catch (error) { }
    }
}

// 接收content 和 panels 传来的信息
chrome.runtime.onMessage.addListener((msg) => {

    if (msg.key === "panel:send") {
        noticeContent(msg)
    }
});



// 此处保留用于接受当文件发生改变时webpack中间件发送的消息通知

if (process.env.NODE_ENV === 'development') {
    const eventSource = new EventSource(
        `http://localhost:3000/reload/`
    );
    eventSource.addEventListener('content_changed_reload',  ({ data }) => {
        console.log('--- 开始监听更新消息---');

        chrome.tabs.query({
            active: true
        },function(tabs){
            console.log(`tabbbbbbbbbbbbbbbbbbb`,tabs); 
            // chrome.runtime.reload(); 
            // setTimeout(()=>{
                 chrome.tabs.sendMessage(tabs[0].id, {
                     type: 'window.location.reload',
                 });
            // },300)
            
        });

        console.log('chrome extension will reload', data);
    });
}